<template>
    <div class="container">
        <div class="profile-edit-title">내 정보 수정</div>

        <div class="profile-icon-container">
            <div id="profile-input">
                <img id="profile-icon" :src="'/images/icon/' + editedProfileImg + '.png'" alt="profile" />
            </div>
            <button id="change-button" @click="profileImgView">변경하기</button>
        </div>
        <div v-if="profileModal" id="back-off" @click="offProfileModal"></div>
        <ProfileImgPopup v-if="profileModal" id="profile-popup" @close-modal="offProfileModal"
            @selected="updateEditedProfileImg" v-model="editedProfileImg"></ProfileImgPopup>

        <div class="memberName-container">
            <span class="mini-title">닉네임 변경</span>
            <div class="content-container">
                <input class="input-box" type="text" v-model="editedMemberName">
                <button id="dck-button" @click="btNickDupchkClickHandler">닉네임 중복확인</button>
            </div>
            <span id="info-info">추후 변경가능</span>
        </div>

        <div class="memberPwd-container">
            <span class="mini-title">비밀번호 변경</span>
            <div class="content-container">
                <input id="input-box" type="password" placeholder="문자, 숫자, 특수문자 포함 8~20자" v-model="editedMemberPwd">
            </div>
        </div>

        <div class="memberPwdck-container">
            <span class="mini-title">비밀번호 확인</span>
            <div class="content-container">
                <input class="input-box" type="password" v-model="checkPwd" placeholder="비밀번호를 다시 입력해주세요">
            </div>
        </div>

        <div class="memberInfo-container">
            <span class="mini-title">소개 변경</span>
            <div class="content-container">
                <textarea class="input-box" type="text" v-model="editedMemberInfo"></textarea>
            </div>
            <span id="info-info">*자신에 대해 알려주세요</span>
        </div>
        <div class="button-container">
            <button id="edit-bt" @click="editInfo">제출</button>
            <button id="cancle-bt" @click="create">취소</button>
        </div>
    </div>
</template>
<script>
import { apiClient } from '@/axios-interceptor'
import sweetAlert from '../../util/modal.js'
import ProfileImgPopup from './ProfileImgPopup.vue'
export default {
    name: 'AddReport',
    props: ['profileNo'],
    components: { ProfileImgPopup },
    data() {
        return {
            loginMember: {
                memberProfileImg: 0,
                memberName: '',
                memberInfo: ''
            },
            profileModal: false,
            editedProfileImg: 0,
            editedMemberName: '',
            editedMemberPwd: null,
            editedMemberInfo: '',
            checkPwd: null,
        }
    },
    mounted() {
        this.create();
    },
    methods: {
        create() {
            apiClient
                .get(`${this.backURL}/member/my`, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    this.loginMember = response.data
                    this.editedProfileImg = this.loginMember.memberProfileImg
                    this.editedMemberName = this.loginMember.memberName
                    this.editedMemberInfo = this.loginMember.memberInfo
                    console.log("editedMemberPwd", this.editedMemberPwd)
                    console.log("checkPwd", this.checkPwd)
                })
        },
        offProfileModal() {
            this.profileModal = false
        },
        profileImgView() {
            this.profileModal = true;
        },
        updateEditedProfileImg(index) {
            console.log(index)
            this.editedProfileImg = index;
        },
        btNickDupchkClickHandler() {
            if (this.editedMemberName === this.loginMember.memberName) {
                sweetAlert.warning("변경할 닉네임을 입력해주세요", '', '닫기')
                return;
            }
            const nickRegExp = /^[a-zA-Z0-9]{5,20}$/;
            if (!nickRegExp.test(this.editedMemberName)) {
                sweetAlert.warning("5~20자의 영문 소문자와 숫자만 사용 가능합니다", '', '닫기')
                return;
            }

            const url = `${this.backURL}/auth/chkDupName?memberName=${this.editedMemberName}`
            apiClient
                .get(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })
                .then(response => {
                    const isDuplicate = response.data;
                    if (!isDuplicate) {
                        sweetAlert.success("사용 가능한 닉네임입니다", '', '닫기')
                    } else {
                        sweetAlert.warning("이미 사용중인 닉네임입니다", '', '닫기')
                    }
                })
                .catch(error => {
                    console.error(error);
                    sweetAlert.warning("서버 오류가 발생했습니다", '', '닫기');
                });
        },
        editInfo() {
            const data = {
                memberPwd: null,
                memberName: null,
                memberInfo: null,
                memberProfileImg: null,
            }
            if (!(this.editedMemberName === this.loginMember.memberName)) {
                data.memberName = this.editedMemberName
            }
            if (this.editedMemberPwd != null) {
                const pwdRegExp = /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/
                if (!pwdRegExp.test(this.editedMemberPwd)) {
                    sweetAlert.warning("비밀번호는 8~20자의 영문 대/소문자, 숫자, 특수문자를 포함해야 합니다", '', '닫기')
                    return;
                }
                if (this.editedMemberPwd != this.checkPwd) {
                    sweetAlert.warning("비밀번호 확인을 다시 입력해주세요", '', '닫기')
                    return;
                }
                data.memberPwd = this.editedMemberPwd
            }
            if (!(this.editedProfileImg === this.loginMember.memberProfileImg)) {
                data.memberProfileImg = this.editedProfileImg;
            }

            if (!(this.editedMemberInfo === this.loginMember.memberInfo)) {
                data.memberInfo = this.editedMemberInfo
            }
            console.log("data.memberPwd", data.memberPwd)
            console.log("data.memberName", data.memberName)
            console.log("data.memberInfo", data.memberInfo)
            console.log("data.memberProfileImg", data.memberProfileImg)
            apiClient
                .put(`${this.backURL}/member/my`, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    console.log(response);
                    sweetAlert.success("내 정보 수정이 완료되었습니다", "", "확인")
                })
                .catch(error => {
                    sweetAlert.warning(error.response.data.errors[0], "", "확인")
                })
        },
    }
}
</script>

<style scoped>
.container {
    display: grid;
    grid-template-columns: 0.8fr 1.1fr 0.3fr 2.4fr 0.8fr;
    grid-template-rows: 0.12fr 0.1fr 0.3fr 0.25fr 0.25fr 0.5fr 0.25fr;
    gap: 0px 0px;
    grid-auto-flow: row;
    grid-template-areas:
        "profile-edit-title profile-edit-title profile-edit-title profile-edit-title profile-edit-title"
        ". profile-icon-container . . ."
        ". profile-icon-container . memberName-container ."
        ". profile-icon-container . memberPwd-container ."
        ". . . memberPwdck-container ."
        ". . . memberInfo-container ."
        "button-container button-container button-container button-container button-container";
    padding: 20px;
}

.profile-edit-title {
    grid-area: profile-edit-title;
    font-size: 20px;
}

.profile-icon-container {
    grid-area: profile-icon-container;
}

#profile-icon {
    width: 200px;
    height: 200px;
    border-radius: 50%;
}

#change-button {
    font-size: 1rem;
    width: 200px;
    border-radius: 3px;
}

.input-box {
    margin-right: 10px;
}

.memberName-container {
    grid-area: memberName-container;
}

.memberPwd-container {
    grid-area: memberPwd-container;
}

.memberPwdck-container {
    grid-area: memberPwdck-container;
}

.memberInfo-container {
    grid-area: memberInfo-container;
}

.button-container {
    grid-area: button-container;
    display: flex;
    justify-content: center;
}

#profile-popup {
    padding: 10px;
    position: fixed;
    background-color: var(--main1-color);
    border: 8px solid var(--main5-color);
    border-radius: 10px;
    width: 700px;
    height: 420px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
}

#back-off {
    width: 100%;
    height: 100%;
    display: fixed;
    position: fixed;
    top: 0%;
    left: 0%;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>