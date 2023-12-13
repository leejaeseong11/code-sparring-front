<template>
  <div :class="{ 'in-game': roomInfo.roomStatus == 1 }" class="room-containers">
    <div class="room-container">
      <div class="room-no">{{ roomInfo.roomNo }}</div>
      <div class="room-infos">
        <h5 class="room-title" :title="roomInfo.roomTitle">
          {{ roomInfo.roomTitle }}
        </h5>
        <div class="room-info">
          <div>
            <div v-if="roomInfo.roomStatus == 1" style="color: var(--red-color)">WAITING</div>
            <div v-else-if="roomInfo.roomStatus == 0" style="color: var(--main5-color)">
              PLAYING
            </div>
            <div v-else style="color: var(--red-color)"></div>
          </div>
          <div class="room-enter">
            <font-awesome-icon :icon="['fa', 'user']" />
            <div v-if="roomInfo.roomMemberList != null" class="room-member-number">
              {{ roomInfo.roomMemberList.length }}/4
            </div>
            <div v-else class="room-member-number">0/4</div>
            <button
              :class="{ 'button-disabled': roomInfo.roomStatus == 0 }"
              class="btn-custom-primary see-quiz-button"
              v-bind:disabled="roomInfo.roomStatus == 0"
              @click="showQuizClickHandler"
            >
              문제보기
            </button>
            <div class="modal-wrap" v-show="modalCheck" @click="showQuizClickHandler">
              <div class="modal-container" @click.stop="">
                <h5 id="show-quiz-modal-label">
                  <font-awesome-icon id="show-quiz-modal-house-icon" :icon="['fa', 'house']" />
                  <div>방 문제 확인</div>
                </h5>
                <ShowQuizSimply />
                <button
                  id="modal-close-button"
                  class="btn-custom-primary"
                  @click="showQuizClickHandler"
                >
                  닫기
                </button>
              </div>
            </div>
            <button
              :class="{ 'button-disabled': roomInfo.roomStatus == 0 }"
              class="btn-custom-primary enter-button"
              v-bind:disabled="roomInfo.roomStatus == 0"
              @:click="enterButtonClickHandler"
            >
              <div v-if="roomInfo.roomPwd == null">입장</div>
              <font-awesome-icon v-else :icon="['fa', 'lock']" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import ShowQuizSimply from './ShowQuizSimply.vue'
import sweetAlert from '../../util/modal.js'

export default {
  name: 'MainHomeRoom',
  props: ['roomInfo'],
  data() {
    return {
      modalCheck: false
    }
  },
  methods: {
    showQuizClickHandler() {
      this.modalCheck = !this.modalCheck
    },
    async enterButtonClickHandler() {
      let addMemberUrl
      if (this.roomInfo.roomPwd) {
        const passwordInput = await sweetAlert.prompt('비밀번호를 입력하세요', '')
        addMemberUrl = `${this.backURL}/room-member?roomPwd=${passwordInput.value}`
      } else {
        addMemberUrl = `${this.backURL}/room-member`
      }
      axios
        .post(addMemberUrl, {})
        .then((response) => {
          console.log(response)
          this.$router.push({ path: `/room/${this.roomInfo.roomNo}` })
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  mounted() {
    console.log(this.roomInfo)
  },
  components: { ShowQuizSimply }
}
</script>
<style scoped>
.room-containers {
  width: 48%;
  margin: 8px;
  padding: 0;

  color: var(--main5-color);
  background-color: var(--white-color);
  border: 6px solid var(--main5-color);
  opacity: 30%;
}
.in-game {
  opacity: 100%;
}
.room-container {
  display: flex;
}
.room-no {
  width: 24%;
  padding: 0 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;

  font-size: 1.5rem;

  border-right: 3px solid var(--main5-color);
}
.room-infos {
  width: 100%;
}
.room-title {
  height: 48px;
  padding: 10px;

  overflow: hidden;
  text-overflow: ellipsis;

  border-bottom: 2px dashed var(--main5-color);
}
.room-info {
  padding: 0 10px 10px 10px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
.room-enter {
  display: flex;
  align-items: center;
}
.room-member-number {
  margin: 0 8px 0 4px;
}
.see-quiz-button {
  width: 92px;
  margin-right: 8px;

  border: none;
  background-color: var(--main4-color);

  &:hover {
    border: none;
    background-color: var(--main4-hover-color);
  }
  &:active {
    border: none;
    background-color: var(--main4-hover-color);
  }
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
  width: 50%;
  padding: 20px;

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
#show-quiz-modal-label {
  margin-bottom: 12px;

  display: flex;
  align-items: center;
  align-self: center;

  color: var(--main5-color);
}
#show-quiz-modal-house-icon {
  margin-right: 4px;
}
#modal-close-button {
  margin-top: 12px;
  padding: 4px 16px;

  align-self: center;

  font-size: 1.25rem;

  border: none;
  background-color: var(--main4-color);

  &:hover {
    border: none;
    background-color: var(--main4-hover-color);
  }
  &:active {
    border: none;
    background-color: var(--main5-hover-color);
  }
}
.enter-button {
  width: 55px;

  border: none;
  background-color: var(--red-color);

  &:hover {
    border: none;
    background-color: var(--red-hover-color);
  }
  &:active {
    border: none;
    background-color: var(--red-hover-color);
  }
}
.btn-custom-primary {
  padding: 6px 12px;

  color: var(--white-color);
  border: none;
  border-radius: 6px;
}
.button-disabled {
  cursor: not-allowed;
  pointer-events: none;

  border: none;
}
</style>
