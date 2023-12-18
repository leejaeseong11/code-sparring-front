<template>
  <div v-if="!this.startButton"   id="room-layout" class="row">
    <!-- <div id="room-layout" class="row"> -->
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
            @click="showProfileDetailClickHandler(roomMemberList[index - 1].memberNo)"
            :isRoomManager="isRoomManager"
          />
          <RoomMember v-else v-model:member="nullMember" />
        </template>
      </div>

      <div class="modal-wrap" v-show="memberProfilePopup" @click="showMemberClickHandler">
        <div class="modal-container" @click.stop="">
          <MemberProfile
            v-model:memberProfile="memberProfile"
            @showMember="showMemberClickHandler"
          />
        </div>
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
      <button id="game-start-button" @:click="gameStartButtonClickHandler" :disabled="!isRoomManager">시 작 하 기</button>
    </div>
  </div>

  <div v-else>
    <Normal />
  </div>
  
</template>
<script>
import { apiClient } from '@/axios-interceptor'
import ShowQuizSimply from '../../components/home/ShowQuizSimply.vue'
import MemberProfile from '../../components/home/MemberProfile.vue'
import RoomMember from '../../components/room/RoomMember.vue'
import Normal from '../../components/code/Normal.vue'
import SweetAlert from '../../util/modal.js'

export default {
  name: 'WaitingRoom',
  components: { RoomMember, ShowQuizSimply, MemberProfile, Normal},
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
      nullMember: null,
      loginMemberName: '',
      loginMemberNo: 0,
      memberProfilePopup: false,
      memberProfile: {
        memberProfileImg: 0,
        memberTier: '',
        memberName: '',
        winCnt: 0,
        drawCnt: 0,
        loseCnt: 0,
        memberLevel: 0,
        memberExp: 0,
        tierPoint: 0,
        memberInfo: ''
      },
      isRoomManager: false,
      startButton: '',
    }
  },
  methods: {
    connect() {
      this.socket = new WebSocket(this.socketURL)

      this.socket.onopen = () => {
        const enterMessage = {
          type: 'ROOM_ENTER',
          roomNo: this.roomNo,
          sender: this.loginMemberName
        }
        this.socket.send(JSON.stringify(enterMessage))
      }

      this.socket.onclose = () => {}

      this.socket.onerror = () => {}

      this.socket.onmessage = (e) => {
        if (this.socket.readyState === WebSocket.OPEN) {
          if (e.data.includes('님이 입장했습니다.') || e.data.includes('님이 퇴장했습니다.')) {
            apiClient
              .get(`${this.backURL}/room/${this.roomNo}`)
              .then((response) => {
                this.roomMemberList = response.data.roomMemberList
              })
              .catch(async (error) => {
                const ok = await SweetAlert.error(error.response.data.errors[0])
                if (ok) {
                  this.$router.push({ path: '/' })
                }
              })
          }
          if (e.data.includes('start')){
            this.startButton = e.data
          }
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
          sender: this.loginMemberName
        }
        this.socket.send(JSON.stringify(outMessage))
        this.socket.close()
      }
    },
    sendMessage() {
      if (this.chatMessage == '') return
      else{
        var talkMessage = {
          type: 'ROOM_TALK',
          roomNo: this.roomNo,
          sender: this.loginMemberName,
          message: this.chatMessage
        }
        this.socket.send(JSON.stringify(talkMessage))
        this.chatMessage = ''
        this.scrollToBottom()
      }

    },
    gameStartButtonClickHandler() {
      this.startButton = 'start'
      var talkMessage = {
        type: 'ROOM_TALK',
        roomNo: this.roomNo,
        sender: this.loginMemberName,
        message: this.startButton
      }
      // console.log('sendMessage(): ' + this.startButton)
      this.socket.send(JSON.stringify(talkMessage))
      this.startButton = ''
      const url = `${this.backURL}/room/${this.roomNo}`
      apiClient
      .put(url,{
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .catch(error => {
        console.log(error)
        alert('서버 에러 발생')
      })
    },


    roomOutButtonClickHandler() {
      this.disconnect()
      this.$router.push({ path: '/' })
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const roomChat = this.$refs.roomChat
        roomChat.scrollTop = roomChat.scrollHeight
      })
    },
    unLoadEvent: function () {
      const outMessage = {
        type: 'ROOM_QUIT',
        roomNo: this.roomNo,
        sender: this.loginMemberName
      }
      this.socket.send(JSON.stringify(outMessage))

      if (this.socket.readyState === WebSocket.OPEN) {
        this.socket.close()
      }

      apiClient.delete(`${this.backURL}/room-member/${this.loginMemberNo}`).then(() => {
        this.disconnect()
        this.$router.push({ path: '/' })
      })
    },
    showMemberClickHandler() {
      this.memberProfilePopup = !this.memberProfilePopup
      this.preventScroll()
    },
    preventScroll() {
      if (this.memberProfilePopup === true) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    },
    showProfileDetailClickHandler(memberNo) {
      this.memberProfilePopup = !this.memberProfilePopup
      if (this.memberProfilePopup) {
        apiClient.get(`${this.backURL}/member/${memberNo}`).then((response) => {
          this.memberProfile = response.data
        })
      }
      this.preventScroll()
    }
  },
  mounted() {
    this.roomNo = this.$router.currentRoute.value.params.roomNo
    apiClient.get(`${this.backURL}/member/my`).then((response) => {
      this.loginMemberName = response.data.memberName
      this.loginMemberNo = response.data.memberNo
      apiClient
        .get(`${this.backURL}/room/${this.roomNo}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          this.roomInfo = response.data
          this.roomMemberList = response.data.roomMemberList
          if (
            this.roomMemberList.filter((roomMember) => roomMember.memberNo == this.loginMemberNo)
              .length == 0
          ) {
            let addMemberUrl
            if (this.roomInfo.roomPwd) {
              addMemberUrl = `${this.backURL}/room-member?roomPwd=${this.roomInfo.roomPwd}`
            } else {
              addMemberUrl = `${this.backURL}/room-member`
            }
            apiClient
              .post(
                addMemberUrl,
                {
                  memberNo: this.loginMemberNo,
                  roomNo: this.roomInfo.roomNo,
                  hostStatus: 1
                },
                {
                  headers: {
                    'Content-Type': 'application/json'
                  }
                }
              )
              .then(() => {
                apiClient.get(`${this.backURL}/room/${this.roomNo}`).then((response) => {
                  this.roomInfo = response.data
                  this.roomMemberList = response.data.roomMemberList
                  this.connect()
                })
              })
              .catch((error) => {
                SweetAlert.error(error.response.data.errors[0])
              })
          } else {
            this.connect()
          }
        })
        .catch(async (error) => {
          const ok = await SweetAlert.error(error.response.data.errors[0])
          if (ok) {
            this.$router.push({ path: '/' })
          }
        })
    })
    apiClient.get(`${this.backURL}/room-member`).then((response) => {
      this.isRoomManager = response.data
    })
    window.addEventListener('beforeunload', this.unLoadEvent)
  },
  beforeUnmount() {
    const outMessage = {
      type: 'ROOM_QUIT',
      roomNo: this.roomNo,
      sender: this.loginMemberName
    }
    this.socket.send(JSON.stringify(outMessage))

    apiClient.delete(`${this.backURL}/room-member/${this.loginMemberNo}`).then(() => {
      this.disconnect()
      this.$router.push({ path: '/' })
    })
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
.modal-wrap {
  width: 100%;
  height: 100%;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 2;

  background: rgba(0, 0, 0, 0.4);
}

.modal-container {
  min-width: 550px;
  width: 50%;
  height: 440px;
  padding: 10px;

  display: flex;
  flex-direction: column;

  position: relative;
  top: 400px;
  left: 50%;

  transform: translate(-50%, -50%);

  background: #fff;
  border-radius: 10px;
  box-sizing: border-box;
}
</style>
