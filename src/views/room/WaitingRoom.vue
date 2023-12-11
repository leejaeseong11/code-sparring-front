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
    <div id="room-info-layout" class="col-6">
      <button id="room-out-button">방 나가기</button>
      <div id="room-quiz-containers">
        <div id="room-quiz-title">선택된 문제</div>
        <div id="quiz-info-container">
          <div class="row">
            <div class="col-2">번호</div>
            <div class="col-6">제목</div>
            <div class="col-4">출제자</div>
          </div>
          <div id="quiz-info" class="row">
            <div class="col-2">1.</div>
            <div class="col-6">짝수와 홀수</div>
            <div class="col-4">admin1</div>
          </div>
        </div>
        <div id="quiz-content-title">문제 설명</div>
        <div id="quiz-content-container">
          <div id="quiz-content">
            정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는 solution 함수를
            완성하세요. 정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는
            solution 함수를 완성하세요. 정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를
            반환하는 solution 함수를 완성하세요. 정수 num이 짝수일 경우 "Even"을 반환하고 홀수인
            경우 "Odd"를 반환하는 solution 함수를 완성하세요. 정수 num이 짝수일 경우 "Even"을
            반환하고 홀수인 경우 "Odd"를 반환하는 solution 함수를 완성하세요. 정수 num이 짝수일 경우
            "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는 정수 num이 짝수일 경우 "Even"을 반환하고
            홀수인 경우 "Odd"를 반환하는 정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우
            "Odd"를 반환하는
          </div>
        </div>
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
import RoomMember from '../../components/room/RoomMember.vue'
import axios from 'axios';
export default {
  name: 'WaitingRoom',
  components: { RoomMember },
  data() {
    return {
      message: '',
      logs: [],
      status: 'disconnected',
      chatMessage: '',
      socket: null
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
      this.$router.push({ path: `/normal/${this.$router.currentRoute.value.params.roomNo}` })
      // axios
      //   .post(`${this.backURL}/room`, data, {
      //     headers: {
      //       'Content-Type': 'application/json'
      //     }
      //   })
      //   .then((res) => {
      //     console.log(res)
          
          
      //   })
    }
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
  color: var(--red-color);
}
#quiz-info-container {
  padding: 8px 12px;
}
#quiz-info {
  padding: 4px;

  border-top: 3px solid var(--main5-color);
}
#quiz-content-container {
  height: 227px;

  overflow-y: scroll;

  border: 3px dashed var(--main5-color);
}
#quiz-content-title {
  padding: 8px;

  font-size: 1.25rem;
  color: var(--red-color);
}
#quiz-content {
  padding: 8px;

  font-size: 1.125rem;
  line-height: 1.5rem;
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

  color: var(--red-color);
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
