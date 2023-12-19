<template>
<div class="report-object" @click="close-modal">
        <div class="report-box">
            <div class="report-title">신고문제</div>
            <div class="report-title" id="report-content">{{quizInfo.quizTitle}}</div>
        </div>
        <div class="report-box flex-container">
            <div class="report-title">신고사유</div>
            <select class="report-title" id="report-reason" v-model="reportType">
                <option value="" disabled selected>선택해주세요</option>
                <option value="1">테스트케이스 추가요청</option>
                <option value="2">문제 오류</option>
                <option value="3">기타</option>
            </select>
        </div>
        <div class="report-box flex-container">
            <div class="report-title">신고내용</div>
            <textarea v-model="reportContent" class="report-title" id="report-textarea" placeholder="상세 신고사유를 작성해주세요."></textarea>
        </div>
        <div id="bt-area">
            <div></div>
            <div class="button-container">
                <button id="add-bt" @click="addReprot">제출</button>
                <button id="cancle-bt" @click="$emit('close-modal')">취소</button>
            </div>
        </div>
    </div>
</template>

<script>
import {apiClient} from '@/axios-interceptor'
import sweetAlert from '../../util/modal.js'
export default {
  name: 'AddReport',
  props : ['quizInfo'],
  data() {
    return {
      reportType: '',
      reportContent: '',
    }
  },
  methods: {
    closeModal() {
      this.$emit('close-modal')
    },
    addReprot() {
        if (!this.reportType) {
        sweetAlert.warning('신고사유을 선택해주세요!', '', '확인')(() =>{
            this.$refs.reportTypeInput.focus()
            return
            })
        }
        if (!this.reportContent) {
        sweetAlert.warning('신고내용을 입력해주세요!', '', '확인')(() =>{
            this.$refs.reportContentInput.focus()
            return
            })
        }
        const url=`${this.backURL}/report`
        const data={
            reportType: this.reportType,
            reportContent: this.reportContent,
            quizNo : this.quizInfo.quizNo,
        }
        apiClient
                .post(url, JSON.stringify(data), {
                    headers: {
                     'Content-Type': 'application/json'
                    }
                })
                .then(() => {
                    sweetAlert.success("신고제출이 완료되었습니다", "", "확인")
                    this.$emit('close-modal')
                }).catch(()=>{
                    sweetAlert.warning("신고제출이 실패하였습니다", "", "확인")
        })
    }
  }
}
</script>

<style scoped>
.report-object {
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

.report-box {
    margin-bottom: 15px;
    text-align: left;
}

.report-title {
    display: inline;
    margin-bottom: 5px;
    width: 120px;
    padding-top: 3px;
}

#report-content {
    font-size: 1.2rem;
    padding: 30px;
}

select.report-title,
textarea.report-title {
    flex: 1;
    padding: 5px;
    box-sizing: border-box;
    margin-top: 5px;
    font-size: 1.2rem;
    
}

textarea.report-title {
    height: 96px;
}

.flex-container {
    display: flex;
    gap: 8px;
}

.button-container {
    grid-area: button-container;
    display: flex;
    justify-content: center;
    gap: 10px;
}

button {
    border: 1px solid;
    border-radius: 10px;
    width: 60px;
    height: 40px;
    color: var(--main1-color);
}

#cancle-bt {
    background-color: var(--red-color);
    border-color: var(--red-color);

    &:hover {
        background-color: var(--red-hover-color);
        border-color: var(--red-hover-color);
    }
}

#add-bt {
    background-color: var(--main4-color);
    border-color: var(--main4-color);

    &:hover {
        background-color: var(--main4-hover-color);
        border-color: var(--main4-hover-color);
    }
}

</style>