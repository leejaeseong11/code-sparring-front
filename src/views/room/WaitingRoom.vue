<template>
  <div v-if="!this.startButton" id="room-layout" class="row">
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
      </div>
      <div id="room-member-container">
        <template v-for="index in 4" :key="'member' + index">
          <RoomMember
            v-if="index <= roomMemberList.length"
            v-model:member="roomMemberList[index - 1]"
            @click="showProfileDetailClickHandler(roomMemberList[index - 1].memberNo, $event)"
            :isRoomManager="isRoomManager"
            @resignRoomMember="
              quitMember(roomMemberList[index - 1].memberName, roomMemberList[index - 1].memberNo)
            "
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
      <button
        id="game-start-button"
        @:click="gameStartButtonClickHandler"
        :disabled="!isRoomManager"
      >
        시 작 하 기
      </button>
    </div>
  </div>

  <div v-else>
    <Normal />
  </div>
</template>
<script>
import { apiClient } from '@/util/axios-interceptor'
import ShowQuizSimply from '../../components/home/ShowQuizSimply.vue'
import MemberProfile from '../../components/home/MemberProfile.vue'
import RoomMember from '../../components/room/RoomMember.vue'
import Normal from '../../components/code/Normal.vue'
import SweetAlert from '../../util/modal.js'

export default {
  name: 'WaitingRoom',
  components: { RoomMember, ShowQuizSimply, MemberProfile, Normal },
  props: ['logoDisabled'],
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
      startButton: ''
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

      this.socket.onclose = async (socketClose) => {
        console.log('socket closed')
        if (socketClose.code != 1000) {
          apiClient.get(`${this.backURL}/room/${this.roomNo}`).then((response) => {
            this.roomMemberList = response.data.roomMemberList
            if (this.roomMemberList.length == 1) {
              apiClient.delete(`${this.backURL}/room-member/${this.loginMemberNo}`).then(() => {
                apiClient.delete(`${this.backURL}/room/${this.roomNo}`)
              })
            }
          })
          SweetAlert.error('입장한 방에 접속할 수 없습니다. 다른 방을 이용해주세요.').then(
            (res) => {
              if (res.isConfirmed) {
                this.$router.push({ path: '/' })
              }
            }
          )
        }
      }

      this.socket.onerror = () => {}

      this.socket.onmessage = async (e) => {
        if (this.socket.readyState === WebSocket.OPEN) {
          if (e.data.includes('님이 강제 퇴장되었습니다.')) {
            const resignedMemberName = e.data.replace('님이 강제 퇴장되었습니다.', '')
            if (resignedMemberName == this.loginMemberName) {
              SweetAlert.warning('방에서 강제 퇴장당했습니다.').then((ok) => {
                if (ok.isConfirmed) {
                  apiClient
                    .delete(`${this.backURL}/room-member/${this.loginMemberNo}`)
                    .then(async () => {
                      const outMessage = {
                        type: 'ROOM_QUIT',
                        roomNo: this.roomNo,
                        sender: this.loginMemberName
                      }
                      if (this.socket.readyState === WebSocket.OPEN) {
                        this.socket.send(JSON.stringify(outMessage))
                        // this.socket.close()
                      }
                      await this.disconnect()
                      this.$router.push({ path: '/' }).then(() => {
                        this.$router.go()
                      })
                    })
                }
              })
            }
          } else {
            if (e.data.includes('님이 입장했습니다.') || e.data.includes('님이 퇴장했습니다.')) {
              apiClient
                .get(`${this.backURL}/room/${this.roomNo}`)
                .then(async (response) => {
                  this.roomMemberList = response.data.roomMemberList
                  if (this.roomMemberList.length == 0) {
                    this.$router.push({ path: '/' })
                    SweetAlert.warning('방이 삭제되었습니다.').then((ok) => {
                      console.log(this.roomInfo.roomStatus)
                      if (ok.isConfirmed) {
                        this.$router.go()
                      }
                    })
                  }
                })
                .catch((err) => {
                  console.log(err)
                  if (err.response.data.message == 'ROOM_NOT_FOUND') {
                    this.$router.push({ path: '/' })

                    if (this.roomInfo.roomStatus == 1) {
                      SweetAlert.warning('방이 삭제되었습니다.').then((ok) => {
                        console.log(this.roomInfo.roomStatus)
                        if (ok.isConfirmed) {
                          this.$router.go()
                        }
                      })
                    }
                  }
                })
            }
            this.chatContentList.push(e.data)
            this.scrollToBottom()
          }
          if (e.data.includes('start')) {
            this.startButton = e.data
          }
        }
      }
    },
    async disconnect() {
      apiClient
        .get(`${this.backURL}/room-member/${this.loginMemberNo}`)
        .then((res) => {
          if (res.data) {
            if (this.isRoomManager || this.roomMemberList.length == 1) {
              let deleteCount = this.roomMemberList.length
              this.roomMemberList.forEach((roomMember) => {
                deleteCount -= 1
                apiClient.delete(`${this.backURL}/room-member/${roomMember.memberNo}`).then(() => {
                  if (deleteCount == 0) {
                    apiClient.get(`${this.backURL}/room/${this.roomNo}`).then((res) => {
                      if (res) {
                        apiClient.delete(`${this.backURL}/room/${this.roomNo}`).then(async () => {
                          console.log(res)
                          const outMessage = {
                            type: 'ROOM_QUIT',
                            roomNo: this.roomNo,
                            sender: this.loginMemberName
                          }
                          if (this.socket.readyState === WebSocket.OPEN) {
                            this.socket.send(JSON.stringify(outMessage))
                            // this.socket.close()
                          }
                          console.log(this.roomInfo.roomStatus)
                          if (this.roomInfo.roomStatus == 1) {
                            SweetAlert.warning('방이 삭제되었습니다.').then((ok) => {
                              console.log(this.roomInfo.roomStatus)
                              if (ok.isConfirmed) {
                                if (this.socket.readyState === WebSocket.OPEN) {
                                  // this.socket.close()
                                }
                                this.$router.push({ path: '/' }).then(() => {
                                  this.$router.go()
                                })
                              }
                            })
                          }
                        })
                      }
                    })
                  }
                })
              })
            } else {
              apiClient.delete(`${this.backURL}/room-member/${this.loginMemberNo}`).then(() => {
                const outMessage = {
                  type: 'ROOM_QUIT',
                  roomNo: this.roomNo,
                  sender: this.loginMemberName
                }
                if (this.socket.readyState === WebSocket.OPEN) {
                  this.socket.send(JSON.stringify(outMessage))
                  // this.socket.close()
                }
                this.$router.push({ path: '/' }).then(() => {
                  this.$router.go()
                })
              })
            }
          }
        })
        .catch(() => {})
    },
    sendMessage() {
      if (this.chatMessage == '') return

      if (this.socket.readyState === WebSocket.OPEN) {
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
    quitMember(memberName, memberNo) {
      apiClient.delete(`${this.backURL}/room-member/${memberNo}`).then(() => {
        if (this.socket.readyState === WebSocket.OPEN) {
          const outMessage = {
            type: 'ROOM_OUT',
            roomNo: this.roomNo,
            sender: memberName
          }
          this.socket.send(JSON.stringify(outMessage))
        }
      })
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
        .put(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          this.roomInfo.roomStatus = 0
        })
    },

    async roomOutButtonClickHandler() {
      await this.disconnect()
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const roomChat = this.$refs.roomChat
        if (roomChat) {
          roomChat.scrollTop = roomChat.scrollHeight
        }
      })
    },
    async unLoadEvent() {
      this.disconnect()
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
    if (!history.state.rightAccess) {
      console.log('history.state: ', history.state.rightAccess)
      SweetAlert.error('잘못된 접근입니다.').then((ok) => {
        if (ok.isConfirmed) {
          this.$router.go(-1)
        }
      })
    } else {
      this.$emit('updateLogoDisabled(true)')
      this.roomNo = this.$router.currentRoute.value.params.roomNo

      apiClient.get(`${this.backURL}/member/my`).then((response) => {
        this.loginMemberName = response.data.memberName
        this.loginMemberNo = response.data.memberNo

        apiClient
          .get(`${this.backURL}/room/${this.roomNo}`)
          .then((response) => {
            this.roomInfo = response.data
            this.roomMemberList = response.data.roomMemberList
            if (
              this.roomMemberList.filter((roomMember) => {
                if (roomMember.memberNo == this.loginMemberNo) {
                  this.isRoomManager = roomMember.hostStatus == 0 ? true : false
                }
                return roomMember.memberNo == this.loginMemberNo
              }).length == 0
            ) {
              let addMemberUrl
              if (this.roomInfo.roomPwd) {
                addMemberUrl = `${this.backURL}/room-member?roomPwd=${this.roomInfo.roomPwd}`
              } else {
                addMemberUrl = `${this.backURL}/room-member`
              }

              apiClient
                .get(`${this.backURL}/room-member/isHost/${this.loginMemberNo}`)
                .then((response) => {
                  console.log(response)
                  this.isRoomManager = response.data

                  apiClient
                    .post(
                      addMemberUrl,
                      {
                        memberNo: this.loginMemberNo,
                        roomNo: this.roomInfo.roomNo,
                        hostStatus: this.isRoomManager ? 0 : 1
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
                        if (this.socket == null) {
                          this.connect()
                        } else if (
                          this.socket.readyState === WebSocket.CLOSED ||
                          this.socket.readyState === WebSocket.CLOSING
                        ) {
                          this.connect()
                        }
                      })
                    })
                    .catch((error) => {
                      SweetAlert.error(error.response.data.errors[0])
                    })
                })
            } else {
              if (this.socket == null) {
                this.connect()
              } else if (
                this.socket.readyState === WebSocket.CLOSED ||
                this.socket.readyState === WebSocket.CLOSING
              ) {
                this.connect()
              }
            }
          })
          .catch(async (error) => {
            SweetAlert.error(error.response.data.errors[0]).then((ok) => {
              if (ok.isConfirmed) {
                this.$router.push({ path: '/' }).then(() => {
                  this.$router.go()
                })
              }
            })
          })
        if (this.socket == null) {
          this.connect()
        } else if (
          this.socket.readyState === WebSocket.CLOSED ||
          this.socket.readyState === WebSocket.CLOSING
        ) {
          this.connect()
        }
      })
      window.addEventListener('beforeunload', this.unLoadEvent)
    }
  },
  beforeUnmount() {
    this.disconnect()
    window.addEventListener('beforeunload', this.unLoadEvent)
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
  opacity: 80%;
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
  width: 50%;

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
#game-start-button:disabled {
  background-color: var(--main4-hover-color);
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
