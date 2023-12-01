<template>
  <div>채팅방</div>

  <br />
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
  </ul>
</template>
<script>
export default {
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
          sender: 'me',
          message: ''
        }
        this.socket.onclose = () => {
          console.log('disconnet')
        }
        this.socket.onmessage = (e) => {
          console.log(e.data)
        }
        this.socket.send(JSON.stringify(enterMessage))
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
<style scoped></style>
