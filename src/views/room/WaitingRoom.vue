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
        <RoomMember />
        <RoomMember />
        <RoomMember />
        <RoomMember />
      </div>
      <div id="room-chat">
        <div id="chat-title">채팅방</div>
        <div id="chat-content">
          <div>누구: 불라불라</div>
          <div>누구2: 불라불라?</div>
          <div>누구: ㅇㅇ</div>
          <div>누구: 불라불라</div>
          <div>누구2: 불라불라?</div>
          <div>누구: ㅇㅇ</div>
          <div>누구: 불라불라</div>
          <div>누구2: 불라불라?</div>
          <div>누구: ㅇㅇa</div>
          <div>누구: 불라불라</div>
          <div>누구2: 불라불라?</div>
          <div>누구: ㅇㅇb</div>
          <div>누구: 불라불라</div>
          <div>누구2: 불라불라?</div>
          <div>누구: ㅇㅇ</div>
          <div>누구: 불라불라</div>
          <div>누구2: 불라불라?</div>
          <div>누구: ㅇㅇ</div>
          <div>누구: 불라불라</div>
          <div>누구2: 불라불라?</div>
          <div>누구: ㅇㅇ</div>
          <div>누구: 불라불라</div>
          <div>누구2: 불라불라?</div>
          <div>누구: ㅇㅇz</div>
        </div>
      </div>
      <div id="room-chat-input-container">
        <input type="text" id="chat-input" />
        <button id="chat-input-button" placeholder="채팅을 입력하세요.">입력</button>
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
  <!-- <br />
    <button @click="disconnect" v-if="status === 'connected'">연결끊기</button>
    <button @click="connect" v-if="status === 'disconnected'">연결</button> {{ status }}
    <br />
    <br />
    <div v-if="status === 'connected'">
      <input
        type="text"
        placeholder="보낼 메세지를 입력하세요."
        class="content"
        v-model="chatMessage"
        onkeyup="() => {
  if(window.event.keyCode==13) { sendMessage(); }
}"
      />

      <button @click="sendMessage">메시지 전송</button>
    </div>
    <ul id="logs">
      <li v-for="(log, index) in logs" :key="index" class="log">{{ log.event }}: {{ log.data }}</li>
    </ul> -->
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
      status: 'disconnected',
      chatMessage: '',
      socket: null,
      roomInfo: {}
    }
  },
  methods: {
    connect() {
      this.socket = new WebSocket(this.socketURL)
      this.socket.onopen = () => {
        console.log('open server')
        let enterMessage = {
          type: 'ROOM_ENTER',
          roomNo: this.$router.currentRoute.value.params.roomNo,
          sender: 'me'
        }
        this.socket.send(JSON.stringify(enterMessage))

        this.socket.onclose = () => {
          console.log('disconnet')
        }
        this.socket.onmessage = (e) => {
          console.log(e.data)
        }
        this.status = 'connected'
      }
    },
    disconnect() {
      console.log('close server')
      this.socket.close()
      this.status = 'disconnected'
    },
    sendMessage() {
      var talkMessage = {
        type: 'ROOM_TALK',
        roomNo: this.$router.currentRoute.value.params.roomNo,
        sender: 'me',
        msg: this.chatMessage
      }
      this.socket.send(JSON.stringify(talkMessage))
    },
    gameStartButtonClickHandler() {
      this.$router.push({ path: `` })
    },
    roomOutButtonClickHandler() {
      this.$router.push({ path: '/' })
    }
  },
  mounted() {
    axios
      .get(`${this.backURL}/room/${this.$router.currentRoute.value.params.roomNo}`)
      .then((response) => {
        this.roomInfo = response.data
      })
      .catch(async (error) => {
        const ok = await SweetAlert.error(error.response.data.errors[0])
        if (ok) {
          this.$router.go(-1)
        }
      })
  }
}
</script>
<style scoped>
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
