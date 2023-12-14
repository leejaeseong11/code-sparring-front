<template>
  <div id="room-layout" class="row">
    <div id="room-member-layout" class="col-6">
      <div>
        <div id="room-title-containers">
          <div class="room-title-container">
            <div id="room-number">No. {{ roomInfo.roomNo }}</div>
            <div id="room-title">{{ roomInfo.roomTitle }}</div>
          </div>
          <div class="room-title-container">
            <div v-if="roomInfo.codeShare" class="custom-tooltip">
              <font-awesome-icon :icon="['fas', 'eye']" />
              <span class="custom-tooltiptext">코드 공개</span>
            </div>
            <div v-else-if="!roomInfo.codeShare" class="custom-tooltip">
              <font-awesome-icon :icon="['fas', 'eye-slash']" />
              <span class="custom-tooltiptext">코드 비공개</span>
            </div>
            <div v-if="roomInfo.roomPwd != null" id="code-share-icon" class="custom-tooltip">
              <font-awesome-icon :icon="['fa', 'lock']" />
              <span class="custom-tooltiptext">{{ roomInfo.roomPwd }}</span>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div id="room-member-container">
        <template v-for="index in 4" :key="'member' + index">
          <RoomMember
            v-if="index <= roomMemberList.length"
            v-model:member="roomMemberList[index - 1]"
          />
          <RoomMember v-else v-model:member="nullMember" />
        </template>
      </div>
      <div id="room-chat" ref="roomChat">
        <div id="chat-title">채팅방</div>
        <div id="chat-content">
          <template v-for="(chatContent, index) in chatContentList" :key="'chat' + index">
            <pre>{{ chatContent }}</pre>
          </template>
        </div>
      </div>
      <div id="room-chat-input-container">
        <input
          type="text"
          id="chat-input"
          v-model="chatMessage"
          @keypress.enter="sendMessage($event)"
        />
        <button
          id="chat-input-button"
          placeholder="채팅을 입력하세요."
          @click="sendMessage($event)"
        >
          입력
        </button>
      </div>
    </div>
    <div id="room-info-layout" class="col">
      <button id="room-out-button" @click="roomOutButtonClickHandler">방 나가기</button>
      <div id="room-quiz-containers">
        <div id="room-quiz-title">선택된 문제</div>
        <ShowQuizSimply v-model:quizInfo="roomInfo" />
      </div>

      <button id="game-start-button" @:click="gameStartButtonClickHandler">시 작 하 기</button>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import ShowQuizSimply from '../../components/home/ShowQuizSimply.vue'
import RoomMember from '../../components/room/RoomMember.vue'
import SweetAlert from '../../util/modal.js'

export default {
  name: 'WaitingRoom',
  components: { RoomMember, ShowQuizSimply },
  data() {
    return {
      message: '',
      logs: [],
      chatMessage: '',
      socket: null,
      chatContentList: [],
      roomNo: '',
      roomInfo: {},
      roomMemberList: [],
      nullMember: null
    }
  },
  methods: {
    connect() {
      this.socket = new WebSocket(this.socketURL)

      this.socket.onopen = () => {
        const enterMessage = {
          type: 'ROOM_ENTER',
          roomNo: this.roomNo,
          sender: '닉네임'
        }
        this.socket.send(JSON.stringify(enterMessage))
      }

      this.socket.onclose = () => {}

      this.socket.onerror = () => {}

      this.socket.onmessage = (e) => {
        if (this.socket.readyState === WebSocket.OPEN) {
          this.chatContentList.push(e.data)
          this.scrollToBottom()
        } else if (
          this.socket.readyState === WebSocket.CLOSING ||
          this.socket.readyState === WebSocket.CLOSED
        ) {
          this.connect()
        }
      }
    },
    disconnect() {
      if (this.socket.readyState === WebSocket.OPEN) {
        const outMessage = {
          type: 'ROOM_QUIT',
          roomNo: this.roomNo,
          sender: '닉네임'
        }
        this.socket.send(JSON.stringify(outMessage))
        this.socket.close()
      }
    },
    sendMessage() {
      if (this.chatMessage == '') return

      var talkMessage = {
        type: 'ROOM_TALK',
        roomNo: this.roomNo,
        sender: '닉네임',
        message: this.chatMessage
      }
      this.socket.send(JSON.stringify(talkMessage))
      this.chatMessage = ''
      this.scrollToBottom()
    },
    gameStartButtonClickHandler() {
      this.$router.push({ path: `/normal/${this.$router.currentRoute.value.params.roomNo}` })
    },
    roomOutButtonClickHandler() {
      this.disconnect()
      this.$router.push({ path: '/' })
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const roomChat = this.$refs.roomChat
        console.log(roomChat)
        roomChat.scrollTop = roomChat.scrollHeight
      })
    },
    unLoadEvent: function (event) {
      const outMessage = {
        type: 'ROOM_QUIT',
        roomNo: this.roomNo,
        sender: '닉네임'
      }
      this.socket.send(JSON.stringify(outMessage))

      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.close()
      }
      event.preventDefault()
      event.returnValue = ''
    }
  },
  mounted() {
    axios
      .get(`${this.backURL}/room/${this.$router.currentRoute.value.params.roomNo}`)
      .then((response) => {
        this.roomInfo = response.data
        this.roomMemberList = response.data.roomMemberList
        console.log(this.roomMemberList[0])
      })
      .catch(async (error) => {
        const ok = await SweetAlert.error(error.response.data.errors[0])
        if (ok) {
          this.$router.push({ path: '/' })
        }
      })
    window.addEventListener('beforeunload', this.unLoadEvent)
    this.roomNo = this.$router.currentRoute.value.params.roomNo
    this.connect()
  },
  beforeUnmount() {
    const outMessage = {
      type: 'ROOM_QUIT',
      roomNo: this.roomNo,
      sender: '닉네임'
    }
    this.socket.send(JSON.stringify(outMessage))
    this.disconnect()
  }
}
</script>
<style scoped>
pre {
  margin: 0;

  font-size: 1.125rem;
  font-family: 'DNFBitBitv2';
}
#room-layout {
  color: var(--main5-color);
}
#room-member-layout {
  display: flex;
  flex-direction: column;
}
#room-title-containers {
  margin-top: 100px;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border: 3px solid var(--main5-color);
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  background-color: var(--white-color);
}
.room-title-container {
  display: flex;
}
.custom-tooltip {
  position: relative;

  cursor: pointer;
}
.custom-tooltip .custom-tooltiptext {
  width: 110px;
  padding: 8px 12px;

  visibility: hidden;

  position: absolute;
  z-index: 1;
  top: -10px;
  left: 120%;

  text-align: center;

  border-radius: 6px;
  color: var(--white-color);
  background-color: var(--black-color);
}
.custom-tooltip:hover .custom-tooltiptext {
  visibility: visible;
}
#code-share-icon {
  margin-left: 4px;
}
#room-number {
  margin-right: 16px;
}

#room-member-container {
  display: table;

  border-collapse: collapse;

  border: 3px solid var(--main5-color);
}
#room-member-container > * {
  width: 25%;
}
#room-chat {
  width: 100%;
  height: 400px;

  display: flex;
  flex-direction: column;

  overflow-y: scroll;

  background-color: var(--white-color);
  border-right: 3px solid var(--main5-color);
  border-left: 3px solid var(--main5-color);
}
#chat-title {
  padding: 8px 0 8px 12px;

  font-size: 1.5rem;
}
#chat-content {
  padding: 8px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
#room-chat-input-container {
  padding: 8px;

  display: flex;

  background-color: var(--white-color);
  border: 3px solid var(--main5-color);
  border-radius: 0 0 10px 10px;
}
#chat-input {
  width: 89%;
  padding: 8px;
  margin-right: 8px;

  flex: 1;

  color: var(--main5-color);
}
#chat-input-button {
  padding: 8px 16px;

  cursor: pointer;

  background-color: var(--main3-color);
  color: var(--white-color);
  border: none;
  border-radius: 4px;

  &:hover {
    background-color: var(--main3-hover-color);
  }
}
#room-info-layout {
  display: flex;
  flex-direction: column;
}
#room-out-button {
  margin-top: 28px;
  padding: 6px 12px;

  font-size: 1.5em;
  align-self: flex-end;

  color: var(--main1-color);
  background-color: var(--red-color);
  border: none;
  border-radius: 6px;

  &:hover {
    background-color: var(--red-hover-color);
  }
}
#room-quiz-containers {
  margin-top: 24px;
  padding: 12px;
  height: 80%;

  background-color: var(--white-color);
  border: 3px solid var(--main5-color);
  border-radius: 10px;
}
#room-quiz-title {
  font-size: 1.625rem;
  text-align: center;
  color: var(--main5-color);
}

#game-start-button {
  padding: 8px;
  margin-top: 20px;

  font-size: 2rem;

  color: var(--main1-color);
  background-color: var(--main4-color);
  border: none;
  border-radius: 6px;

  &:hover {
    background-color: var(--main4-hover-color);
  }
}
.room-info-code-open {
  display: flex;
  align-items: center;
}
.room-info-code-open > input {
  margin-right: 4px;

  border: 0;
  width: 1.125rem;
  height: 1.125em;
}
.room-info-code-open > label {
  opacity: 50%;
}
</style>
