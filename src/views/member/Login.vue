<template>
  <div id="logoOff"></div>
  <div class="video-background">
    <video autoplay muted loop id="myVideo">
      <source src="/images/login/mainBackGround.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div class="login">
      <div class="action-buttons">
        <img src="/images/login/join.png" alt="join" class="join" @click="signUpForm()" />
      </div>
      <form id="joinForm" class="action-buttons" @keyup.enter="loginFormSubmitHandler">
        <table>
          <tr>
            <td>
              <h2 style="margin-bottom: 5px">ID&nbsp;</h2>
            </td>
            <td>
              <span style="top: -3px">
                <input type="text" name="id" id="i" v-model="id" />
              </span>
            </td>
          </tr>
          <tr>
            <td>
              <h2 style="margin-top: 5px">PW&nbsp;&nbsp;</h2>
            </td>
            <td>
              <span style="top: 3px">
                <input type="password" name="pwd" id="p" v-model="pwd" />
              </span>
            </td>
          </tr>
        </table>
        <div class="action-buttons">
          <img
            src="/images/login/start.png"
            alt="start"
            class="start"
            @click="loginFormSubmitHandler()"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import sweetAlert from '../../util/modal.js'
export default {
  name: 'Login',
  data() {
    return {
      id: '',
      pwd: ''
    }
  },
  mounted() {
    const accessToken = sessionStorage.getItem('accessToken')
    if (accessToken) {
      this.$router.replace('/') // 메인 페이지의 경로로 수정
    }
  },

  methods: {
    signUpForm() {
      location.href = '/signup'
    },

    loginFormSubmitHandler() {
      const url = `${this.backURL}/auth/login`
      let data = {
        memberId: this.id,
        memberPwd: this.pwd
      }

      axios
        .post(url, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        })
        .then((responseData) => {
          // Access Token을 세션 스토리지에 저장
          sessionStorage.setItem('accessToken', responseData.data.accessToken)
          location.href = '/'
        })
        .catch((error) => {
          console.error('Error:', error)
          sweetAlert.warning('로그인 정보를 다시 확인하세요', '', '확인')
        })
    }
  }
}
</script>
<style scoped>
#logoOff {
  width: 100%;
  height: 100px;
  z-index: 1;
  position: absolute;
  background-color: var(--main1-color);
}

.video-background {
  z-index: 2;
}

.action-buttons {
  display: flex;
  justify-content: space-around;
  margin-left: 10px;
  margin-right: 10px;
}

body,
html {
  height: 100%;
  margin: 0;
}

.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#myVideo {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;

  object-fit: cover;
}

.login {
  position: fixed;
  top: 75%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
}

input {
  height: 30px;
}

.join,
.start {
  width: 100px;
  height: 100px;
  margin-top: 5px;
  cursor: pointer;
}

.join:hover,
.start:hover {
  opacity: 0.85;
}

.join:hover {
  content: url('/images/login/join.gif');
}

.start:hover {
  content: url('/images/login/start.gif');
}

span {
  position: relative;
}
</style>
