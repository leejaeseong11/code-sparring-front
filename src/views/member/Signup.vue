<template>
    <div id="logoOff">

    </div>
    <div class="logo">
        <img id="main-logo" src="/images/logo.gif" alt="logo" @click="gotoLogin">
    </div>
    <form class="signup" v-on:submit.prevent="signupFormSubmitHandler">
        <div class="content">
            <section>
                <div class="divImg">
                </div>
                <div class="info" id="info-profileImg">
                    <div id="profile-input">
                        <img :src="'images/icon/' + (memberProfileImg) + '.png'" :alt="'Icon ' + (memberProfileImg)"
                            class="profile-icon" />
                        <button @click="openProfilePopup" type="button">변경</button>
                        <ProfileImgPopup v-if="isProfilePopupOpen" @selected="handleSelectedProfileImage"
                        @close-modal="offProfileModal" />
                    </div>
                </div>

                <div class="info" id="info-id">
                    <div id="id-input">
                        <input class="box" type="text" name="id" id="i" v-model="c.id" placeholder="아이디 입력 (6~20자)"
                            @input="validateId" @focus="clearAllErrMsg" />
                        <button id="id-check" @click="btIdDupchkClickHandler" :disabled="!isIdValid" type="button">중복
                            확인</button>
                    </div>
                    <div class="error-msg"
                        :class="{ 'invalid': errMsg.id.invalid, 'fail': errMsg.id.fail, 'success': errMsg.id.success }">
                        {{ errMsg.id.invalid || errMsg.id.fail || errMsg.id.success }}
                    </div>
                </div>

                <div class="info" id="info-pwd">
                    <input class="box" type="password" name="pwd" id="p" v-model="c.pwd" ref="p"
                        placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)" @input="checkPwdValidHandler"
                        @focus="clearAllErrMsg" />
                    <div class="error-msg"
                        :class="{ 'invalid': errMsg.pwd.invalid, 'fail': errMsg.pwd.fail, 'success': errMsg.pwd.success }">
                        {{ errMsg.pwd.invalid || errMsg.pwd.fail || errMsg.pwd.success }}
                    </div>
                </div>

                <div class="info" id="info-pwdRe">
                    <input class="box" type="password" id="pwdRe" v-model="pwdRe" @input="checkPwdReHandler"
                        placeholder="비밀번호 재입력" @focus="clearAllErrMsg" />
                    <div class="error-msg"
                        :class="{ 'invalid': errMsg.pwdRe.invalid, 'fail': errMsg.pwdRe.fail, 'success': errMsg.pwdRe.success }">
                        {{ errMsg.pwdRe.invalid || errMsg.pwdRe.fail || errMsg.pwdRe.success }}
                    </div>
                </div>


                <div class="info" id="info-id">
                    <div id="id-input">
                        <input class="box" type="text" name="nick" id="n" v-model="c.nick" placeholder="닉네임 입력 (추후변경가능)"
                            @input="validateNick" @focus="clearAllErrMsg" />
                        <button id="nick-check" @click="btNickDupchkClickHandler" :disabled="!isNickValid" type="button">중복
                            확인</button>
                    </div>
                    <div class="error-msg"
                        :class="{ 'invalid': errMsg.nick.invalid, 'fail': errMsg.nick.fail, 'success': errMsg.nick.success }">
                        {{ errMsg.nick.invalid || errMsg.nick.fail || errMsg.nick.success }}
                    </div>
                </div>
                <div class="info" id="info-introduction">
                    <textarea class="box" type="text" name="intro" id="intro" v-model="intro" placeholder="소개(자신에 대해 알려주세요)"
                        @focus="clearAllErrMsg"></textarea>
                </div>
            </section>
            <p for="privacy-checkbox" class="info" id="privacy-agreement">
                ※ 개인정보 수집 및 이용 동의 ※<br>
                코드스파링은 이용자 식별을 위해 아이디와 비밀번호를 수집하고 있으며, 게임 탈퇴 시까지 이용합니다.
            </p>
            <div id="info-agree">
                <!-- <input type="checkbox" id="privacy-checkbox" v-model="privacyAgreed" @click="clearAllErrMsg"> -->
                <input type="checkbox" id="privacy-checkbox" v-model="privacyAgreed">
                위의 내용에 동의합니다.
            </div>

            <!-- :disabled="!isFormValid" -->
            <!-- <button disabled="false"> {{ flag }}</button> -->
            <!-- <button id="submit" :disabled="!flag">가입하기</button> -->
            <button id="submit">가입하기</button>

            <!-- <button id="submit" @click="checkForm" @focus="clearAllErrMsg" type="submit">가입하기</button> -->
            <!-- <div id="result-fail">{{ resultFailMsg }}</div> -->
            <div class="exist">
                <span>이미 회원이신가요?</span>
                <router-link :to="`${this.backURL}/auth/login`">로그인 하러가기</router-link>
            </div>

        </div>
    </form>
</template>

<script>
import ProfileImgPopup from '../../components/profile/ProfileImgPopup.vue';
import { apiClient } from '@/axios-interceptor'
export default {
    name: "Signup",
    components: { ProfileImgPopup },
    data() {
        return {
            pwdRe: '',
            intro: 'hi',
            c: {
                id: 'test',
                pwd: '',
                name: '',
            },
            errMsg: {
                id: {
                    invalid: "",
                    success: "",
                    fail: "",
                },
                pwd: {
                    invalid: "",
                    success: "",
                    fail: "",
                },
                pwdRe: {
                    invalid: "",
                    success: "",
                    fail: "",
                },
                nick: {
                    invalid: "",
                    success: "",
                    fail: "",
                },
            },
            privacyAgreed: false,
            memberProfileImg: 0,
            isProfilePopupOpen: false,
            isIdValid: false,
            isNickValid: false,
            isPwdValid: false,
            flag: false,


        }
    },
    computed: {

    },
    methods: {
        test() {
            this.privacyAgreed = !this.privacyAgreed
            this.clearAllErrMsg()
        },
        isFormValid() {
            // alert("isFormValid")
            const valid = (
                this.privacyAgreed &&
                this.isIdValid &&
                this.isNickValid
            );
            // console.log(" isFormValid",  this.privacyAgreed, this.isIdValid,  this.isNickValid)
            return valid;
        },
        openProfilePopup() {
            this.isProfilePopupOpen = (this.isProfilePopupOpen) ? false : true;
        },
        offProfileModal() {
            this.isProfilePopupOpen = false;
        },
        handleSelectedProfileImage(index) {
            this.memberProfileImg = index;
            this.closeProfilePopup();
        },
        gotoMain() {
            location.href = '/'
        },
        gotoLogin() {
            location.href = '/login'
        },

        clearAllErrMsg() {
            console.log("clearAllErrMsg before call isFormValid privacyAgreed=", this.privacyAgreed)
            this.flag = this.isFormValid();

            Object.keys(this.errMsg).forEach(field => {
                if (this.errMsg[field].invalid === '' && this.errMsg[field].fail === '') {
                    this.errMsg[field].success = '';
                }
            });
            console.log("clearAllErrMsg after call isFormValid privacyAgreed=", this.privacyAgreed)

        },

        validateId() {
            const idRegExp = /^[a-zA-Z0-9]{5,20}$/;
            this.isIdValid = false;
            if (!idRegExp.test(this.c.id)) {
                this.errMsg.id.invalid = '5~20자의 영문 소문자와 숫자만 사용 가능합니다';
                this.errMsg.id.success = '';
                this.errMsg.id.fail = '';
            } else {
                this.errMsg.id.invalid = '';
                this.errMsg.id.fail = '';
                this.errMsg.id.success = '아이디 중복 확인을 해주세요';
                this.isIdValid = true;
                this.isIdCheck = false;
            }

        },
        btIdDupchkClickHandler() {
            const url = `${this.backURL}/auth/chkDupId?memberId=${this.c.id}`
            console.log(url)
            apiClient
                .get(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    const isDuplicate = response.data;
                    if (!isDuplicate) {
                        this.errMsg.id.success = '사용 가능한 아이디입니다';
                        this.errMsg.id.fail = '';
                        this.isIdCheck = true;
                    }
                })
                .catch(error => {
                    this.errMsg.id.fail = error.response.data.errors[0];
                    this.errMsg.id.success = '';
                    this.isIdValid = false;
                    this.isIdCheck = false;
                });
        },

        checkPwdValidHandler() {
            const pwdRegExp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
            let isPwdValid = false; // 비밀번호 유효성 여부
            if (!pwdRegExp.test(this.c.pwd)) {
                // 비밀번호가 유효성 검사를 통과하지 못한 경우
                this.errMsg.pwd.invalid = '8~20자의 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다.';
                this.errMsg.pwd.success = '';
                this.errMsg.pwd.fail = '';
            } else {
                // 비밀번호가 유효성 검사를 통과한 경우
                this.errMsg.pwd.invalid = '';
                this.errMsg.pwd.success = '사용 가능한 비밀번호입니다';
                this.errMsg.pwd.fail = '';
                isPwdValid = true;
            }
            return isPwdValid;
        },

        checkPwdReHandler() {
            let pwdVal = this.c.pwd;
            let pwdReVal = this.pwdRe;
            if (pwdReVal !== '') {
                if (pwdVal !== pwdReVal) {
                    // 비밀번호와 재입력 값이 일치하지 않는 경우
                    this.errMsg.pwdRe.invalid = '비밀번호가 일치하지 않습니다.';
                    this.errMsg.pwdRe.success = '';
                    this.errMsg.pwd.fail = '';
                } else {
                    // 비밀번호 재입력이 유효한 경우
                    this.errMsg.pwdRe.invalid = '';
                    this.errMsg.pwd.fail = '';
                    this.errMsg.pwdRe.success = '비밀번호가 일치합니다.';
                }
            }
            else {
                // 비밀번호 재입력 필드가 비어 있는 경우
                this.errMsg.pwdRe.invalid = '비밀번호를 다시 입력해주세요.';
                this.errMsg.pwdRe.success = '';
                this.errMsg.pwd.fail = '';
            }
        },

        validateNick() {
            const nickRegExp = /^[a-zA-Z0-9]{5,20}$/;
            this.isNickValid = false;
            if (!nickRegExp.test(this.c.nick)) {
                this.errMsg.nick.invalid = '5~20자의 영문 소문자와 숫자만 사용 가능합니다';
                this.errMsg.nick.success = '';
                this.errMsg.nick.fail = '';
            } else {
                this.errMsg.nick.invalid = '';
                this.errMsg.nick.fail = '';
                this.errMsg.nick.success = '닉네임 중복 확인을 해주세요';
                this.isNickValid = true;
            }
        },

        btNickDupchkClickHandler() {
            const url = `${this.backURL}/auth/chkDupName?memberName=${this.c.nick}`
            apiClient
                .get(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    const isDuplicate = response.data;
                    console.log(response)
                    if (!isDuplicate) {
                        this.errMsg.nick.success = '사용 가능한 닉네임입니다';
                        this.errMsg.nick.fail = '';
                    }
                })
                .catch(error => {
                    this.errMsg.nick.fail =  this.errMsg.nick.fail = error.response.data.errors[0];
                    this.errMsg.nick.success = '';
                    this.isNickValid = false;
                    console.error(error);
                });
        },
        checkForm() {
            if (this.c.id == null || !this.isIdValid) {
                alert("아이디를 확인하세요");
                return;
            }
            if (!this.isIdCheck) {
                alert("아이디 중복체크를 하세요")
                return;
            }
            if (this.c.pwd == null || this.c.pwd.trim() === "") {
                alert("비밀번호를 확인하세요");
                return;
            }
            if (this.pwdRe == null || this.pwdRe.trim() === "" || this.c.pwd == this.pwdRe) {
                alert("비밀번호 재입력을 확인하세요");
                return;
            }

            if (this.c.nick == null || this.c.nick.trim() === "" || !this.isNickValid) {
                alert("닉네임을 확인하세요");
                return;
            }
            if (!this.privacyAgreed) {
                alert("개인정보 수집 및 이용에 동의해주세요");
                return;
            }
            // this.signupFormSubmitHandler();
        },
        signupFormSubmitHandler(e) {
            let data = {
                memberInfo: this.intro,
                memberId: this.c.id,
                memberPwd: this.c.pwd,
                memberName: this.c.nick,
                memberProfileImg: this.memberProfileImg
            }
            // JSON.stringify(data)
            apiClient
                .post(`${this.backURL}/auth/signup`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response);
                    alert("가입에 성공했습니다")
                    location.href = '/login'

                })
                .catch(error => {
                    // alert(error.message)
                    alert(error.response.data.errors[0]); // 서버에서 전송한 예외 객체
                })
        }
    },
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

/* COMMON */
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
    transition: .1s;
}

button:focus-visible {
    outline: 0px solid;
    background-color: var(--main4-color);
}

button:hover {
    outline: 0px solid;
    background-color: var(--main4-hover-color);
}

button:disabled {
    background-color: var(--main1-color);
    color: var(--main2-color);
}

.info {
    margin-bottom: 22px;
}

/* box shape input field */
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

/* error msg */
.info .error-msg {
    position: absolute;
    font-size: 11px;
    color: var(--red-color);
    margin: 0px 0 0 10px;
}

.info .error-msg.success {
    color: var(--green-color);
}


/* select box */
select.box {
    margin-left: 5px;
    padding-left: 10px;
    color: var(--main1-color);
}

option {
    font-size: 16px;
}

/* signup */
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
    padding-top:20px;
    padding-bottom:20px;
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

/* SECTION - info-nick*/
.info#info-id #nick-check {
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
    padding-top: 5px;

}

/* SUBMIT */
button#submit {
    width: 100%;
    height: 45px;
    border-radius: 3px;
    box-shadow: 2px 2px 4px var(--main4-color);
    font-size: 15px;
}

/* RESULT */
#result-fail {
    width: 100%;
    /* height: 20px; */
    height: 15px;
    margin-bottom: 5px;
    text-align: center;
    color: var(--red-color);
    font-size: 13px;
}

/* TO SIGNIN */
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
    transition: .1s;
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

/* 프로필 이미지 컨테이너 스타일 */
#profile-input {
    width: 200px;
    /* 아이콘의 가로 크기 */
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

.divImg>img {
    width: 100px;
}

</style>