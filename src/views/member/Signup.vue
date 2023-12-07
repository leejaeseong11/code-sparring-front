<template>
    <div class="logo">
        <img id="main-logo" src="/images/logo.gif" alt="logo" @click="gotoMain">
    </div>
    <form class="signup" v-on:submit.prevent="signupFormSubmitHandler">
        <div class="content">
            <section>
                <div class="info" id="info-profileImg">
                    <div id="profile-input">
                        <button @click="openProfilePopup">변경</button>
                        <ProfileImgPopup v-if="isProfilePopupOpen" :pImg="memberProfileImg"
                        @close="closeProfilePopup"/>
                    </div>
                    <div class="error-msg"></div>
                </div>

                <div class="info" id="info-id">
                    <div id="id-input">
                        <input class="box" type="text" name="id" id="i" required v-model="c.id" placeholder="아이디 입력 (6~20자)"
                            @input="validateId" @focus="clearAllErrMsg" />
                        <button id="id-check" @click="btIdDupchkClickHandler">중복 확인</button>
                    </div>
                    <div class="error-msg"
                        :class="{ 'invalid': errMsg.id.invalid, 'fail': errMsg.id.fail, 'success': errMsg.id.success }">
                        {{ errMsg.id.invalid || errMsg.id.fail || errMsg.id.success }}
                    </div>
                </div>

                <div class="info" id="info-pwd">
                    <input class="box" type="password" name="pwd" id="p" required v-model="c.pwd" ref="p"
                        placeholder="비밀번호 입력 (문자, 숫자, 특수문자 포함 8~20자)" @input="checkPwdValidHandler"
                        @focus="clearAllErrMsg" />
                    <div class="error-msg"
                        :class="{ 'invalid': errMsg.pwd.invalid, 'fail': errMsg.pwd.fail, 'success': errMsg.pwd.success }">
                        {{ errMsg.pwd.invalid || errMsg.pwd.fail || errMsg.pwd.success }}
                    </div>
                </div>

                <div class="info" id="info-pwdRe">
                    <input class="box" type="password" id="pwdRe" required v-model="pwdRe" @input="checkPwdReHandler"
                        placeholder="비밀번호 재입력" @focus="clearAllErrMsg" />
                    <div class="error-msg"
                        :class="{ 'invalid': errMsg.pwdRe.invalid, 'fail': errMsg.pwdRe.fail, 'success': errMsg.pwdRe.success }">
                        {{ errMsg.pwdRe.invalid || errMsg.pwdRe.fail || errMsg.pwdRe.success }}
                    </div>
                </div>


                <div class="info" id="info-id">
                    <div id="id-input">
                        <input class="box" type="text" name="nick" id="n" required v-model="c.nick"
                            placeholder="닉네임 입력 (추후변경가능)" @input="validateNick" @focus="clearAllErrMsg" />
                        <button id="nick-check" @click="btNickDupchkClickHandler">중복 확인</button>
                    </div>
                    <div class="error-msg"
                        :class="{ 'invalid': errMsg.nick.invalid, 'fail': errMsg.nick.fail, 'success': errMsg.nick.success }">
                        {{ errMsg.nick.invalid || errMsg.nick.fail || errMsg.nick.success }}
                    </div>
                </div>
                <div class="info" id="info-introduction">
                    <textarea class="box" type="text" name="intro" id="intro" required v-model="intro"
                        placeholder="소개(자신에 대해 알려주세요)" @focus="clearAllErrMsg"></textarea>
                </div>
            </section>
            <p for="privacy-checkbox" class="info" id="privacy-agreement">
                ※ 개인정보 수집 및 이용 동의 ※<br>
                코드스파링은 이용자 식별을 위해 아이디와 비밀번호를 수집하고 있으며, 게임 탈퇴 시까지 이용합니다.
            </p>
            <div id="info-agree">
                <input type="checkbox" id="privacy-checkbox" v-model="privacyAgreed" @focus="clearAllErrMsg">
                위의 내용에 동의합니다.
            </div>


            <button id="submit" @click="signupFormSubmitHandler" :disabled="!isFormValid || !privacyAgreed"
                @focus="clearAllErrMsg">가입하기</button>
            <!-- <div id="result-fail">{{ resultFailMsg }}</div> -->
            <div class="exist">
                <span>이미 회원이신가요?</span>
                <router-link :to="`${this.backURL}/auth/login`">로그인 하러가기</router-link>
            </div>

        </div>
    </form>
</template>

<script>
import ProfileImgPopup from './ProfileImgPopup.vue'
import axios from 'axios'

export default {
    name: "Signup",
    components: { ProfileImgPopup },
    data() {
        return {
            pwdRe: '',
            intro: '',
            c: {
                id: '',
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
        }
    },
    computed: {
        isFormValid() {
            const valid = (
                this.privacyAgreed &&
                this.errMsg.id.success !== '' &&
                this.errMsg.pwd.success !== '' &&
                this.errMsg.pwdRe.success !== '' &&
                this.errMsg.nick.success !== ''
            );
            return valid;
        },


    },
    methods: {
        openProfilePopup() {
            this.isProfilePopupOpen = (this.isProfilePopupOpen) ? false :true;
        },
        closeProfilePopup() {
            this.isProfilePopupOpen = false;
        },
        gotoMain() {
            location.href = '/'
        },
        clearAllErrMsg() {
            Object.keys(this.errMsg).forEach(field => {
                if (this.errMsg[field].invalid === '' && this.errMsg[field].fail === '') {
                    this.errMsg[field].success = '';
                }
            });
        },

        validateId() {
            const idRegExp = /^[a-zA-Z0-9]{5,20}$/;
            let isIdValid = false;
            if (!idRegExp.test(this.c.id)) {
                this.errMsg.id.invalid = '5~20자의 영문 소문자와 숫자만 사용 가능합니다';
                this.errMsg.id.success = '';
                this.errMsg.id.fail = '';
            } else {
                this.errMsg.id.invalid = '';
                this.errMsg.id.fail = '';
                this.errMsg.id.success = '아이디 중복 확인을 해주세요';
                isIdValid = true;
            }

        },
        btIdDupchkClickHandler() {
            const url = `${this.backURL}/auth/chkDupId`
            console.log(1)
            axios.post(url, `memberId=${this.c.id}`)
            console.log(2)
                .then(response => {
                    const isDuplicate = response.data;
                    if (isDuplicate) {
                        this.errMsg.id.fail = '이미 사용중인 아이디입니다';
                        this.errMsg.id.success = '';
                    } else {
                        this.errMsg.id.success = '사용 가능한 아이디입니다';
                        this.errMsg.id.fail = '';
                    }
                })
                .catch(error => {
                    console.error(error);
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
            let isNickValid = false;
            if (!nickRegExp.test(this.c.nick)) {
                this.errMsg.nick.invalid = '5~20자의 영문 소문자와 숫자만 사용 가능합니다';
                this.errMsg.nick.success = '';
                this.errMsg.nick.fail = '';
            } else {
                this.errMsg.nick.invalid = '';
                this.errMsg.nick.fail = '';
                this.errMsg.nick.success = '닉네임 중복 확인을 해주세요';
                isNickValid = true;
            }
        },

        btNickDupchkClickHandler() {
            const url = `${this.backURL}/auth/chkDupName`
            axios.post(url, `memberName=${this.c.nick}`)
                .then(response => {
                    const isDuplicate = response.data;
                    console.log(response)
                    if (isDuplicate) {
                        this.errMsg.nick.fail = '이미 사용중인 닉네임입니다';
                        this.errMsg.nick.success = '';
                    } else {
                        this.errMsg.nick.success = '사용 가능한 닉네임입니다';
                        this.errMsg.nick.fail = '';
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        },

        signupFormSubmitHandler(e) {
            const url = `${this.backURL}/auth/signup`
            const data = new FormData(e.target)
            axios
                .post(url, data)
            console.log(1)
                .then(response => {
                    if (response.data) {
                        location.href = `${this.backURL}/auth/login`
                    }
                })
                .catch(error => {
                    alert(error.message)
                })
        }
    },
}

</script>

<style scoped>
/* Logo */
.logo {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 10px;
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
    background-color: var(--main5-color);
}

button:disabled {
    background-color: #d3d3d3;
    color: #f0f0f0;
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
    color: green;
}


/* select box */
select.box {
    margin-left: 5px;
    padding-left: 10px;
    color: var(--white-color);
}

option {
    font-size: 16px;
}

/* signup */
.signup {
    position: relative;


    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 450px;
    height: 980px;
    min-width: 450px;
    margin: auto;


    border: 1px solid var(--main2-color);
    border-radius: 40px;
    box-shadow: 1px 1px 12px var(--main2-color);
    box-sizing: border-box;
}

.content {
    width: 80%;
    flex-direction: column;
    align-items: center;
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
    color: var(--main5-color) !important;
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
    /* 아이콘의 세로 크기 */
    border-radius: 50%;
    /* 원 형태를 만들기 위해 반지름 설정 */

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
    /* 이미지와 섹션 간격을 조절합니다. */
}

section {
    margin: 10px 0 25px 0;
    /* 섹션 간격을 조절합니다. */
}




/* WEB - SMALL SCREEN */
@media screen and (min-width: 500px) and (max-height: 850px) {
    body {
        min-height: 700px;
    }

    .signup {
        height: 900px;
    }

    .content {
        width: 360px;
        margin-top: 30px;
        margin-bottom: 10px;
    }

    section {
        margin: 20px 0 0px 0;
    }

    .info {
        margin-bottom: 18px;
    }
}

/* MOBILE */
@media screen and (max-width: 500px) {
    body {
        min-height: 780px;
        background-color: var(--white-color);
    }

    .signup {
        width: 100vw;
        height: 700px;
        border: 0px;
        box-shadow: none;
    }

    .content {
        width: 85vw;
        min-width: 380px;
    }
}
</style>