<template>
    <div class="remove-object" @click="close - modal">
        <div class="remove-box">
            <div class="profile-remove-title">회 원 탈 퇴</div>
            <div class="remove-content">회원탈퇴 완료 시 당사 사이트 이용 권한이 소멸되며, 이용자의 정보는 복구가 불가능합니다.</div>
            <div class="remove-box flex-container">
                <input type="checkbox" id="confirmCheckbox" v-model="confirmChecked"> 위 내용을
                확인하였습니다.
            </div>
            <div class="remove-title">
                <div id="remove-id">아이디 : {{ loginMember.memberId }}</div>
            </div>
            <div id="remove-pwd">비밀번호 :
                <input id="remove-pwd-input" type="password" v-model="password" placeholder="비밀번호를 입력하세요">
            </div>
            <div id="bt-area">
                <div></div>
                <div class="button-container">
                    <button id="add-bt" :disabled="!confirmChecked" :class="{ 'disabled-btn': !confirmChecked }"
                        @click="submitRemove">탈퇴</button>
                    <button id="cancle-bt" @click="$emit('close-modal')">취소</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { apiClient } from '@/axios-interceptor'
import sweetAlert from '../../util/modal.js'
export default {
    name: 'ProfileRemove',
    data() {
        return {
            loginMember: {
                memberId: '',
            },
            password: '',
            confirmChecked: false
        }
    },
    mounted() {
        apiClient
            .get(`${this.backURL}/member/my`)
            .then((response) => {
                this.loginMember = response.data
            })
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },

        submitRemove() {
            const url = `${this.backURL}/member/my/withdraw`;
            const data = {
                memberPwd: this.password
            }
            apiClient
                .put(url, data, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(() => {
                    sweetAlert.success("회원탈퇴가 완료되었습니다", "", "확인").then(() => {
                        window.sessionStorage.removeItem('accessToken');
                        window.location.href = '/login';
                    })

                })
                .catch((error) => {
                    sweetAlert.warning(error.response.data.errors[0], "", "확인")
                })


        }
    }
}

</script>

<style scoped>
.remove-object {
    max-width: 600px;
    margin: 20px auto;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    color: var(--main5-color);
    cursor: default;
}

.remove-box {
    margin-bottom: 10px;
}

.remove-title {
    display: inline;
    margin-bottom: 5px;
    width: 120px;
    padding-top: 3px;
    text-align: center;
}

.profile-remove-title {
    text-align: center;
    align-items: center;
    padding-bottom: 10px;
    font-size: 1.9rem;
}

.remove-content {
    font-size: 1.5rem;
    border: 1px solid black;
    border-radius: 5px;
    text-align: center;
}

#remove-id,
#remove-pwd {
    font-size: 1.3rem;
    justify-content: center;
    text-align: center;
}

#remove-pwd-input {
    width: 199px;
    font-size: 1.1rem;
    text-align: center;
}

.flex-container {
    display: flex;
    gap: 8px;
    font-size: 1.3rem;
    justify-content: center;
    padding-top: 10px
}

.button-container {
    grid-area: button-container;
    display: flex;
    justify-content: center;
    gap: 10px;
    padding-top: 10px;
}


button {
    border: 1px solid;
    border-radius: 10px;
    width: 60px;
    height: 40px;
    color: var(--white-color);
}

#cancle-bt {
    background-color: var(--main4-hover-color);
    border-color: var(--main4-hover-color);

    &:hover {
        background-color: var(--main4-hover-color);
        border-color: var(--main4-hover-color);
    }
}

#add-bt {
    background-color: var(--red-color);
    border-color: var(--red-color);

    &:hover {
        background-color: var(--red-hover-color);
        border-color: var(--red-hover-color);

    }
}

#add-bt:disabled {
    background-color: var(--main2-color);
    border-color: var(--main2-color);
    cursor: not-allowed;
}
</style>