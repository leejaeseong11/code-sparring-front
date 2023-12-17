<template>
    <div class="remove-object" @click="close - modal">
        <div class="remove-box">
            <div class="remove-title">회 원 탈 퇴</div>
            <div class="remove-title">회원탈퇴 완료 시 당사 사이트 이용 권한이 소멸되며, 이용자의 정보는 복구가 불가능합니다.</div>
            <div class="remove-box flex-container">
                <input type="checkbox" id="confirmCheckbox"> 위 내용을 확인하였습니다.
            </div>
            <div class="remove-title">
                <div class="remove-id">사용자의 아이디 : {{ loginMember.memberId }}</div>
            </div>
            <div class="remove-title">비밀번호 :
                <input type="password" v-model="password" placeholder="비밀번호를 입력하세요.">
            </div>
            <div id="bt-area">
                <div></div>
                <div>
                    <button id="add-bt" @click="submitRemove">탈퇴</button>
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
            password: ''
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
    }
}

</script>

<style scoped>
.remove-object {
    max-width: 600px;
    margin: 20px auto;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    color: var(--main5-color);
    cursor: default;
}

.remove-box {
    margin-bottom: 15px;
    text-align: left;
}

.remove-title {
    display: inline;
    margin-bottom: 5px;
    width: 120px;
    padding-top: 3px;
}

#remove-content {
    font-size: 1.2rem;
    padding: 30px;
}

.flex-container {
    display: flex;
    gap: 8px;
}

#bt-area {
    display: flex;
    justify-content: center;
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
    margin-right: 10px;

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
</style>