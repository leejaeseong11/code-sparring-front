<template>
  <div id="room-layout" class="row">
    <div id="room-member-layout" class="col-6">
      <div id="room-title-container">
        <div id="room-number">No. 1000</div>
        <div id="room-title">아무나 들어오세요</div>
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
          <div v-for="(chatContent, index) in chatContentList" :key="'chat' + index">
            {{ chatContent }}
          </div>
        </div>
      </div>
      <div id="room-chat-input-container">
        <input type="text" id="chat-input" />
        <button id="chat-input-button" placeholder="채팅을 입력하세요.">입력</button>
      </div>
    </div>
    <div id="room-info-layout" class="col-6">
      <button id="room-out-button">방 나가기</button>
      <div id="room-quiz-containers">
        <div id="room-quiz-title">선택된 문제</div>
        <ShowQuizSimply />
      </div>
      <div id="room-info-containers">
        <div id="room-info-title">
          <font-awesome-icon :icon="['fas', 'house']" />
          <span>방 정보</span>
        </div>
        <div class="row">
          <label for="inputRoomName" class="col-3">방 제목</label>
          <div class="col-9">
            <input type="text" id="inputRoomName" class="roomInfoInput" disabled />
          </div>
        </div>
        <div class="row">
          <label for="inputRoomPassword" class="col-3">비밀번호</label>
          <div class="col-9">
            <input type="text" id="inputRoomPassword" class="roomInfoInput" disabled />
          </div>
        </div>
        <fieldset class="row">
          <div class="col-3">코드공개여부</div>
          <div id="room-radio-button" class="col-9">
            <div class="room-info-code-open">
              <input
                type="radio"
                name="gridRadios"
                id="gridRadios1"
                value="open"
                checked
                disabled
              />
              <label for="gridRadios1"> 공개 </label>
            </div>
            <div class="room-info-code-open">
              <input type="radio" name="gridRadios" id="gridRadios2" value="close" disabled />
              <label for="gridRadios2"> 비공개 </label>
            </div>
          </div>
        </fieldset>
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
import ShowQuizSimply from '../../components/home/ShowQuizSimply.vue'
import RoomMember from '../../components/room/RoomMember.vue'
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
      chatContentList: ['a: aa', 'b: bb', 'a: ?zz'],
      roomNo: ''
    }
  },
  methods: {
    connect() {
      this.socket = new WebSocket(this.socketURL)
      this.socket.onopen = () => {
        console.log('open server')
        const enterMessage = {
          type: 'ROOM_ENTER',
          roomNo: this.roomNo,
          sender: '닉네임'
        }
        this.socket.send(JSON.stringify(enterMessage))

        this.socket.onclose = () => {
          // alert(this.socket.readyState === WebSocket.OPEN)
        }
        this.socket.onmessage = (e) => {
          this.chatContentList.push(JSON.parse(e.data))
        }
        this.status = 'connected'
      }
    },
    disconnect() {
      this.socket.close()
      this.status = 'disconnected'
    },
    sendMessage() {
      var talkMessage = {
        type: 'ROOM_TALK',
        roomNo: this.roomNo,
        sender: 'me',
        msg: this.chatMessage
      }
      this.socket.send(JSON.stringify(talkMessage))
    },
    gameStartButtonClickHandler() {
      this.$router.push({ path: `` })
    },
    unLoadEvent: function (event) {
      console.log(event)
      console.log('1' + this.canLeaveSite)
      const outMessage = {
        type: 'ROOM_QUIT',
        roomNo: this.roomNo,
        sender: '닉네임'
      }
      this.socket.send(JSON.stringify(outMessage))
      console.log('2' + this.canLeaveSite)
      event.preventDefault()
      event.returnValue = ''
    }
  },
  mounted() {
    window.addEventListener('beforeunload', this.unLoadEvent)
    console.log('?')
    this.roomNo = this.$router.currentRoute.value.params.roomNo
    this.connect()
  },
  beforeUnmount() {
    window.removeEventListener('beforeunload', this.unLoadEvent)
    const outMessage = {
      type: 'ROOM_QUIT',
      roomNo: this.roomNo,
      sender: '닉네임'
    }
    this.socket.send(JSON.stringify(outMessage))
    this.disconnect()

    console.log(this.status)
    confirm('realrrrearly???')
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
#room-title-container {
  margin-top: 100px;
  padding: 16px;

  display: flex;
  align-items: center;

  border: 3px solid var(--main5-color);
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  background-color: var(--white-color);
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
  height: 52.725%;

  background-color: var(--white-color);
  border: 3px solid var(--main5-color);
  border-radius: 10px;
}
#room-quiz-title {
  font-size: 1.625rem;
  text-align: center;
  color: var(--main5-color);
}
#room-info-containers {
  margin: 12px 0;
  padding: 12px;

  background-color: var(--white-color);
  border: 3px solid var(--main5-color);
  border-radius: 10px;
}
#room-info-title {
  padding-bottom: 12px;

  font-size: 1.375rem;
  text-align: center;

  color: var(--main5-color);
}
#room-info-title > span {
  margin-left: 12px;
}

.roomInfoInput {
  padding: 4px;
  color: var(--main5-color);
  width: 100%;
  margin-bottom: 12px;
}
#room-radio-button {
  display: flex;
  justify-content: space-evenly;
}
#game-start-button {
  padding: 8px;

  font-size: 1.5rem;

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
