<template>
  <div class="report-object" @click="close - modal">
    <div class="report-box">
      <div class="report-title" @click="redirectToQuizDetail">문제번호</div>
      <div class="report-title" id="report-content" @click="redirectToQuizDetail">
        {{ reportDetail.quizNo }}
      </div>
      <div class="report-title">신고자</div>
      <div class="report-title" id="report-content">{{ reportDetail.memberName }}</div>
    </div>
    <div class="report-box flex-container">
      <div class="report-title">신고사유</div>
      <select
        class="report-title"
        id="report-reason"
        :disabled="true"
        v-model="reportDetail.reportType"
        style="background-color: transparent"
      >
        <option value="1">테스트케이스 추가요청</option>
        <option value="2">문제 오류</option>
        <option value="3">기타</option>
      </select>
    </div>
    <div class="report-box flex-container">
      <div class="report-title">신고내용</div>
      <textarea
        v-model="reportDetail.reportContent"
        class="report-title"
        readonly
        style="background-color: transparent"
      ></textarea>
    </div>
    <div class="report-box flex-container">
      <div class="report-title">조치내역</div>
      <textarea
        v-model="editedReportComment"
        class="report-title"
        id="report-answer"
        placeholder="조치 내역을 작성해주세요."
      ></textarea>
    </div>
    <div id="bt-area">
      <div></div>
      <div class="button-container">
        <button id="edit-bt" @click="editReport">수정</button>
        <button id="delete-bt" @click="deleteReport">삭제</button>
        <button id="cancle-bt" @click="$emit('close-modal')">취소</button>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from '@/util/axios-interceptor'
import sweetAlert from '../../util/modal.js'

export default {
  name: 'AddReportComment',
  props: ['reportNo'],
  data() {
    return {
      reportDetail: {
        memberName: '',
        quizNo: 0,
        reportContent: '',
        reportComment: '',
        reportType: 0
      },
      editedReportComment: ''
    }
  },
  mounted() {
    this.readReport()
  },
  methods: {
    redirectToQuizDetail() {
      const quizNo = this.reportDetail.quizNo
      location.href = '/quiz/' + quizNo
    },
    closeModal() {
      this.$emit('close-modal')
    },
    readReport() {
      apiClient
        .get(`${this.backURL}/admin/report/${this.reportNo}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('Report Detail:', response.data)
          this.reportDetail = response.data
          this.editedReportComment = this.reportDetail.reportComment
        })
        .catch((error) => {
          console.error('Error fetching report details:', error.message)
        })
    },
    editReport() {
      const url = `${this.backURL}/admin/report/${this.reportNo}`
      const data = {
        reportComment: this.editedReportComment
      }
      apiClient
        .put(url, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(() => {
          sweetAlert.success('신고조치가 완료되었습니다', '', '확인')
          this.$emit('close-modal')
        })
        .catch(() => {
          sweetAlert.warning('신고조치가 실패하였습니다', '', '확인')
        })
    },
    deleteReport() {
      sweetAlert
        .question('삭제 확인', '신고를 삭제하시겠습니까?', '네', '아니오')
        .then((result) => {
          if (result.isConfirmed) {
            const url = `${this.backURL}/admin/report/${this.reportNo}`
            return apiClient.delete(url, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
          } else {
            throw new Error('삭제가 취소되었습니다')
          }
        })
        .then(() => {
          sweetAlert.success('신고조치가 완료되었습니다', '', '확인')
          this.$emit('report-deleted')
          this.$emit('close-modal')
        })
        .catch((error) => {
          if (error.message !== '삭제가 취소되었습니다') {
            sweetAlert.warning('신고조치가 실패하였습니다', '', '확인')
          }
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
  padding: 25px;
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
  height: 100px;
}

textarea.report-title#report-answer {
  height: 68px;
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

#edit-bt {
  background-color: var(--green-color);
  border-color: var(--green-color);
  font-size: 1.3rem;

  &:hover {
    background-color: var(--green-hover-color);
    border-color: var(--green-hover-color);
  }
}

#delete-bt {
  background-color: var(--red-color);
  border-color: var(--red-color);
  margin-left: 10px;
  margin-right: 10px;
  font-size: 1.3rem;

  &:hover {
    background-color: var(--red-hover-color);
    border-color: var(--red-hover-color);
  }
}

#cancle-bt {
  background-color: var(--main4-color);
  border-color: var(--main4-color);
  font-size: 1.3rem;

  &:hover {
    background-color: var(--main4-hover-color);
    border-color: var(--main4-hover-color);
  }
}
</style>
