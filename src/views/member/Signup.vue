<template>
  <div id="logoOff"></div>
  <div class="logo">
    <img id="main-logo" src="/images/logo.gif" alt="logo" @click="gotoLogin" />
  </div>
<form class="signup" v-on:submit.prevent="signupFormSubmitHandler">
    <div class="content">
      <section>
        <div class="divImg"></div>
        <div class="info" id="info-profileImg">
          <div id="profile-input">
            <img
              :src="'images/icon/' + memberProfileImg + '.png'"
              :alt="'Icon ' + memberProfileImg"
              class="profile-icon"
            />
            <button @click="onProfileModal" type="button">변경</button>
          </div>
                </div>
                <div v-if="profileModal" id="back-off" @click="offProfileModal"></div>
                <ProfileImgPopup v-if="profileModal" @selected="handleSelectedProfileImage"
                    @close-modal="offProfileModal" />

                <div class="info" id="info-id">
                    <div id="id-input">
                        <input class="box" type="text" name="id" id="i" v-model="c.id" placeholder="아이디(영문 소문자,숫자 15자까지)" />
                        <button id="id-check" @click="btIdDupchkClickHandler" type="button">중복확인</button>
                    </div>
                </div>

                <div class="info" id="info-pwd">
                    <input class="box" type="password" name="pwd" id="p" v-model="c.pwd"
                        placeholder="비밀번호 입력(문자, 숫자, 특수문자 포함 8~20자)" />
                </div>

                <div class="info" id="info-pwdRe">
                    <input class="box" type="password" id="pwdRe" v-model="pwdRe" placeholder="비밀번호 재입력">
                </div>

                <div class="info" id="info-id">
                    <div id="id-input">
                        <input class="box" type="text" name="memberName" id="n" v-model="c.name"
                            placeholder="닉네임 입력 (추후 변경 가능)" />
                        <button id="name-check" @click="btNameDupchkClickHandler" type="button">중복확인</button>
                    </div>
                </div>
                <div class="info" id="info-introduction">
                    <textarea class="box" type="text" name="intro" id="intro" v-model="intro"
                        placeholder="소개(자신에 대해 알려주세요)"></textarea>
                </div>
            </section>

            <p for="privacy-checkbox" class="info" id="privacy-agreement">
                ※ 개인정보 수집 및 이용 동의 ※<br>
                코드스파링은 이용자 식별을 위해 아이디와 비밀번호를 수집하고 있으며, 게임 탈퇴 시까지 이용합니다.
            </p>
            <div id="info-agree">
                <input type="checkbox" id="privacy-checkbox" v-model="agreeCheck">
                위의 내용에 동의합니다.
            </div>
            <button id="submit" :disabled="!agreeCheck" :class="{ 'disabled-btn': !agreeCheck }">가입하기</button>
            <div class="exist">
                <span>이미 회원이신가요?</span>
                <router-link to="/login">로그인 하러가기</router-link>
            </div>
    </div>
  </form>
</template>

<script>
import { apiClient } from '@/util/axios-interceptor'
import sweetAlert from '../../util/modal.js'
import ProfileImgPopup from '../../components/profile/ProfileImgPopup.vue'

export default {
    name: "Signup",
    components: { ProfileImgPopup },
    data() {
        return {
            pwdRe: null,
            intro: '',
            c: {
                id: null,
                pwd: null,
                name: null,
            },
            memberProfileImg: 0,
            profileModal: false,
            agreeCheck: false,
        }
    },
    methods: {
        offProfileModal() {
            this.profileModal = false
        },
        onProfileModal() {
            this.profileModal = true
        },
        handleSelectedProfileImage(index) {
            this.memberProfileImg = index
            this.onProfileModal()
        },
        gotoLogin() {
            this.$router.push('/login')
        },

        btIdDupchkClickHandler() {
            const idRegExp = /^[a-zA-Z0-9]{4,15}$/
            if (!idRegExp.test(this.c.id)) {
                sweetAlert.warning("4~15자의 영문 소문자와 숫자만 사용 가능합니다", '', '닫기')
                return
            }

            const url = `${this.backURL}/auth/chkDupId?memberId=${this.c.id}`
            apiClient
                .get(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => {
                    const isDuplicate = response.data
                    if (!isDuplicate) {
                        sweetAlert.success("사용 가능한 아이디입니다", '', '닫기')
                    } else {
                        sweetAlert.warning("이미 사용중인 아이디입니다", '', '닫기')
                    }
                })
                .catch(error => {
                    console.error(error)
                    sweetAlert.warning(error.response.data.errors[0], '', '닫기')
                })
        },

        btNameDupchkClickHandler() {
            const nameRegExp = /^[^\s]{1,8}$/;
            if (!nameRegExp.test(this.c.name)) {
                sweetAlert.warning("1~8자만 사용 가능합니다", '', '닫기')
                return
            }

            const url = `${this.backURL}/auth/chkDupName?memberName=${this.c.name}`
            apiClient
                .get(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => {
                    const isDuplicate = response.data
                    if (!isDuplicate) {
                        sweetAlert.success("사용 가능한 닉네임입니다", '', '닫기')
                    } else {
                        sweetAlert.warning("이미 사용중인 닉네임입니다", '', '닫기')
                    }
                })
                .catch(error => {
                    console.error(error)
                    sweetAlert.warning("서버 오류가 발생했습니다", '', '닫기')
                })
        },
        signupFormSubmitHandler(e) {
            if (this.c.id == null || this.c.id == ''
                || this.c.name == null || this.c.name == '') {
                sweetAlert.warning("누락된 항목이 있습니다", '', '닫기')
                return
            }

            const pwdRegExp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
            if (!pwdRegExp.test(this.c.pwd)) {
                sweetAlert.warning("비밀번호는 8~20자의 영문 \n 대/소문자, 숫자, 특수문자를 \n 포함해야 합니다", '', '닫기')
                return
            }
            if (this.c.pwd != this.pwdRe) {
                sweetAlert.warning("비밀번호 확인을 다시 입력해주세요", '', '닫기')
                return
            }
            const data = {
                memberInfo: this.intro === '' ? null : this.intro,
                memberId: this.c.id,
                memberPwd: this.c.pwd,
                memberName: this.c.name,
                memberProfileImg: this.memberProfileImg
            }
            apiClient
                .post(`${this.backURL}/auth/signup`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response)
                    sweetAlert.success("가입에 성공했습니다", '', '닫기').then(() => {
                        location.href = '/login'
                    })
                })
                .catch(error => {
                    sweetAlert.warning(error.response.data.errors[0], '', '닫기')
                    return
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

.logo {
  text-align: center;
  margin-top: 10px;
  margin-bottom: 10px;
  z-index: 2;
  display: flex;
  justify-content: center;
}

#main-logo {
  width: 150px;
  cursor: pointer;
}

body {
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 850px;
  font-size: 15px;
  font-weight: 400;
  line-height: 1.4;
  color: var(--main5-color);
}

button {
  background-color: var(--main4-color);
  color: var(--main1-color);
  cursor: pointer;
  border: none;
  box-sizing: border-box;
  font-weight: 400;
  transition: 0.1s;
}

button:focus-visible {
  outline: 0px solid;
  background-color: var(--main4-color);
}

button:hover {
  outline: 0px solid;
  background-color: var(--main4-hover-color);
}

.info {
  margin-bottom: 22px;
}

.box {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 5px 0 5px 15px;
  border-radius: 4px;
  border: 1px solid var(--main1-color);
  color: var(--main5-color);
  font-weight: 400;
  font-size: 0.9rem;
}

.box::placeholder {
  color: var(--main2-color);
}

.box:focus {
  outline: 1px solid var(--main2-color);
}

select.box {
  margin-left: 5px;
  padding-left: 10px;
  color: var(--main1-color);
}

option {
  font-size: 16px;
}

.signup {
  position: relative;
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 450px;
  height: 866px;
  min-width: 450px;
  margin: auto;
  border: 1px solid var(--main2-color);
  border-radius: 40px;
  box-shadow: 1px 1px 12px var(--main2-color);
  box-sizing: border-box;
  z-index: 3;
  top: 85px;
  margin-bottom: 114px;
}

.content {
  width: 80%;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;
}

/* HEADER */
header {
  width: 100%;
}

header h2 {
  display: inline;
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 3px;
}

/* SECTION */
section {
  margin: 50px 0 25px 0;
}

/* SECTION - ID */
.info#info-id #id-input {
  position: relative;
}

.info#info-id button {
  position: absolute;
  width: 90px;
  height: 40px;
  top: 15px;
  bottom: 0;
  right: 5px;
  margin: auto 0;
  border-radius: 3px;
  box-shadow: 1px 1px 12px var(--main2-color);
  font-size: 14px;
}

.info#info-id #name-check {
  position: absolute;
  width: 90px;
  height: 40px;
  top: 0;
  bottom: 0;
  right: 5px;
  margin: auto 0;
  border-radius: 3px;
  box-shadow: 1px 1px 12px var(--main2-color);
  font-size: 14px;
}

/* SECTION - introduction */
.info#info-introduction .box {
  height: 70px;
  margin-bottom: -10px;
}

/* SECTION - privacy */
#privacy-agreement {
  border: 1px solid var(--main5-color);
  border-radius: 4px;
  text-align: center;
  padding: 8px;
  margin-bottom: 0;
  font-size: 14px;
}

#info-agree {
  align-items: center;
  text-align: center;
  padding-top: 8px;
}

button#submit {
  width: 100%;
  height: 45px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px var(--main5-color);
  font-size: 15px;
  margin-top: 10px;
  background-color: var(--main5-hover-color);
  border-color: var(--main5-hover-color);
}

button#submit:disabled {
  background-color: var(--main2-color);
  border-color: var(--main2-color);
  cursor: not-allowed;
}

.exist {
  font-size: 13px;
  margin-top: 10px;
  text-align: center;
}

.exist a {
  margin-left: 3px;
  text-decoration: none;
  font-weight: 700;
  color: var(--main4-color) !important;
  transition: 0.1s;
}

.exist a:hover {
  text-decoration: none;
  color: var(--main4-hover-color) !important;
}

/* 프로필 이미지*/
.profile-icon {
  width: 180%;
  height: 100%;
  object-fit: contain;
  margin: 0 auto;
}

#profile-input {
  width: 200px;
  height: 200px;
  border-radius: 50%;
}

/* 변경 버튼 스타일 */
#profile-input button {
  position: relative;
  bottom: 15px;
  left: 75px;
  float: right;
  width: 200px;
  border-radius: 3px;
  box-shadow: 2px 2px 4px var(--main4-color);
}

#info-profileImg {
  margin-bottom: 10px;
}

section {
  margin: 10px 0 25px 0;
}

.divImg > img {
  width: 100px;
}

#back-off {
  width: 100%;
  height: 100%;
  display: fixed;
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
