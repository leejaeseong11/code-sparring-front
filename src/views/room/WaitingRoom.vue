<template>
  <main class="container-fluid ps-0 pe-0">
    <div id="room-layout" class="row">
      <div id="room-member-layout" class="col-6">
        <img id="main-logo" src="/images/logo.gif" alt="logo" />
        <div id="room-title-container">
          <div id="room-number">No. 1000</div>
          <div id="room-title">
            아무나 들어오세요, 그런데 방 제목이 기니까 조심하세요, 아시겠죠?
          </div>
        </div>
        <div id="room-member_container">
          <RoomMember />
          <RoomMember />
          <RoomMember />
          <RoomMember />
        </div>
        <div id="room-chat">
          <div id="chat-title">채팅방</div>
          <div id="chat-content">누구: 불라불라</div>
          <div id="room-chat-input-container">
            <input type="text" />
            <button class="btn">입력</button>
          </div>
        </div>
      </div>
      <div id="room-info-layout" class="col-6">
        <button>방 나가기</button>
        <div id="room-quiz-containers">
          <div id="room-quiz-title">선택된 문제</div>
          <div id="quiz-info-container">
            <div class="row">
              <div class="col-2">번호</div>
              <div class="col-6">제목</div>
              <div class="col-4">제출자</div>
            </div>
            <div id="quiz-info" class="row">
              <div class="col-2">1.</div>
              <div class="col-6">짝수와 홀수</div>
              <div class="col-4">admin1</div>
            </div>
          </div>
          <div id="quiz-content-container">
            <div id="quiz-content-title">문제 설명</div>
            <div id="quiz-content">
              정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는 solution 함수를
              완성하세요.
            </div>
          </div>
        </div>
        <div id="room-info-containers">
          <div id="room-info-title">
            <font-awesome-icon :icon="['fas', 'house']" />
            <span>방 정보</span>
          </div>
          <div class="row mb-3">
            <label for="inputEmail3" class="col-sm-2 col-form-label">방 제목</label>
            <div class="col-sm-10">
              <input type="email" class="form-control" id="inputEmail3" />
            </div>
          </div>
          <div class="row mb-3">
            <label for="inputPassword3" class="col-sm-2 col-form-label">비밀번호</label>
            <div class="col-sm-10">
              <input type="password" class="form-control" id="inputPassword3" />
            </div>
          </div>
          <fieldset class="row mb-3">
            <legend class="col-form-label col-sm-2 pt-0">코드공개여부</legend>
            <div class="col-sm-10">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios1"
                  value="option1"
                  checked
                />
                <label class="form-check-label" for="gridRadios1"> First radio </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="gridRadios"
                  id="gridRadios2"
                  value="option2"
                />
                <label class="form-check-label" for="gridRadios2"> Second radio </label>
              </div>
            </div>
          </fieldset>
          <button type="submit" class="btn btn-primary">시작하기</button>
        </div>
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
  </main>
</template>
<script>
import RoomMember from '../../components/room/RoomMember.vue'
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
    }
  }
}
</script>
<style scoped>
#room-layout {
  min-width: 1280px;

  display: flex;
  justify-content: space-around;

  overflow: auto;
  white-space: nowrap;

  color: var(--main5-color);
}
#main-logo {
  width: 150px;

  cursor: pointer;
}
#room-title-container {
  margin-top: 24px;
  padding: 16px;

  display: flex;

  border: 3px solid var(--main5-color);
  border-radius: 10px;
}
#room-number {
  margin-right: 16px;
}

#room-title {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

#room-member_container {
  display: flex;
}
</style>
