<template>
  <main>
    <div id="layout">
      <div v-if="this.reportPopup" id="back-off" @click="offPopup"></div>

      <div id="title">
        <div id="quiz-title-div">{{ this.quizTitle }}</div>
      </div>

      <div id="quiz-box">
        <div id="info">
          <div id="quiz-info">
            <div class="index-name">문제 정보</div>
            <div class="info-div" id="tier">
              <span class="info-text">티어</span>:<span
                class="info-span"
                :id="'quiz-tier-' + this.quizTier"
                >{{ this.quizTier }}</span
              >
            </div>
            <div class="info-div" id="author">
              <span class="info-text">출제자</span>:<span class="info-span" id="quiz-author">{{
                this.quizAuthor
              }}</span>
            </div>
            <div class="info-div" id="submit-cnt">
              <span class="info-text">제출된 횟수</span>:<span
                class="info-span"
                id="quiz-submit-cnt"
                >{{ this.quizSubmitCnt }}회</span
              >
            </div>
            <div class="info-div" id="success-cnt">
              <span class="info-text">성공한 횟수</span>:<span
                class="info-span"
                id="quiz-success-cnt"
                >{{ this.quizSuccessCnt }}회</span
              >
            </div>
            <div class="info-div" id="correct">
              <span class="info-text">정답률</span>:<span class="info-span" id="quiz-correct">{{
                this.quizCorrect
              }}</span>
            </div>
          </div>

          <div class="index-name">입력값 설명</div>
          <textarea
            class="readonlyTextarea"
            id="quiz-input"
            :value="this.inputInfo == null ? '존재하지 않습니다' : this.inputInfo"
            readonly
          ></textarea>

          <div class="index-name">출력값 설명</div>
          <textarea
            class="readonlyTextarea"
            id="quiz-output"
            :value="this.outputInfo == null ? '존재하지 않습니다' : this.outputInfo"
            readonly
          ></textarea>
        </div>

        <div id="content">
          <div class="index-name">문제 내용</div>
          <div id="report-box">
            <div class="report-box-for" v-for="report in reportList" :key="report">
              <div v-if="report.reportComment != null">
                <span class="report-span" id="report-date">
                  {{ report.reportComment == null ? '' : '[' + report.reportDate + ']' }}&nbsp;
                </span>
                <span class="report-span" id="report-com">
                    {{ commentNotNull(report.reportComment) }}&nbsp;
                </span>
                <span class="report-span" id="report-id">
                  {{ report.reportComment == null ? '' : '-' + report.memberName + '님 신고' }}
                </span>
                <br>
              </div>
            </div>
          </div>
          <div v-if="this.rptOkCnt!=0"><hr></div>
          <textarea
            class="readonlyTextarea"
            id="quiz-content"
            v-model="this.quizContent"
            readonly
          ></textarea>
        </div>

        <div id="code-area">
          <div class="index-name">제출한 코드</div>
          <textarea class="readonlyTextarea" id="quiz-code"
          readonly>{{fileContent}}</textarea>

          <div id="button-area">
            <div></div>
            <div id="right-button">
              <button id="rpt-button" @click="rptQuiz">문제 신고하기</button>&nbsp;
              <button id="close-button" @click="closePage">닫기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
// import axios from 'axios'
import {apiClient} from '@/axios-interceptor'

export default {
  name: 'CodeView',
  data() {
    return {
      quizNo: 0,
      quizTitle: '',
      quizContent: '',
      quizTier: '',
      quizAuthor: '',
      quizSubmitCnt: '',
      quizSuccessCnt: '',
      quizCorrect: '',
      inputInfo: '',
      outputInfo: '',
      reportList: [],
      rptOkCnt: 0,
      reportPopup: false,
      memberNo: '',
      quizUrl: '',
      fileContent: '',
    }
  },
  methods: {
    commentNotNull(obj) {
        if(obj!=null) {
            this.rptOkCnt++
            return obj
        } else {
            return null
        }
    },
    rptQuiz() {
      this.reportPopup = true
    },
    offPopup() {
      this.reportPopup = false
    },
    closePage() {
      const memberNo = this.$route.params.memberNo
      location.href = '/profile/code/' + memberNo
    },
    objectUrlGet(){
      
    }
  },
  created() {
    this.quizNo = this.$route.params.quizNo
    const url = `${this.backURL}/quiz/${this.quizNo}`
    apiClient
      .get(url)
      .then((res) => {
        this.quizTitle = res.data.quizTitle
        this.quizContent = res.data.quizContent
        this.quizTier = res.data.quizTier
        this.quizAuthor = res.data.memberName
        this.quizSubmitCnt = res.data.quizSubmitCnt
        this.quizSuccessCnt = res.data.quizSuccessCnt
        this.quizCorrect = res.data.quizCorrectPercent
        this.inputInfo = res.data.quizInput
        this.outputInfo = res.data.quizOutput
        this.reportList = res.data.reportDTOList
      })
      .catch(() => {
        alert('문제 조회에 실패하였습니다')
      })
      this.memberNo = this.$route.params.memberNo
      const url2 = `${this.backURL}/mycode/${this.memberNo}/${this.quizNo}`
      apiClient
      .get(url2)
      .then((res)=>{
        this.quizUrl = res.data
      })
  },
  mounted(){
        // S3 객체의 URL 사용 (직접 접근)
    const s3ObjectUrl = 'https://s3.ap-northeast-2.amazonaws.com/codesparring/1/1_101.java';

    // 파일 내용을 가져오기
    fetch(s3ObjectUrl)
      .then(response => response.text())
      .then(data => {
        // 파일 내용을 화면에 출력
        this.fileContent = data;
      })
      .catch(error => {
        console.error('Error fetching file from S3:', error);
      });
  }
}
</script>
<style scoped>
* {
  color: var(--main5-color);
  cursor: default;
}

#layout {
  padding-top: 80px;
}

button {
  font-size: 18px;
}

hr {
    width: 470px;
}

input,
textarea {
  cursor: text;
  color: var(--main3-hover-color);
  padding: 5px;
  resize: none;

  &:focus {
    outline: none;
  }
}

#quiz-info {
  margin-bottom: 40px;
}

#title {
  margin-top: 15px;
  width: 100%;
  background-color: var(--main5-color);
  height: 50px;
  border: 5px solid var(--main5-color);
  border-radius: 10px;
  padding-left: 10px;
}

#quiz-title-div,
#quiz-title-input {
  height: 100%;
  width: 99%;
  background-color: var(--main5-color);
  color: var(--main1-color);
  font-size: 20px;
}

#quiz-title-input {
  color: var(--main2-color);
}

#quiz-title-div {
  line-height: 200%;
}

#quiz-box {
  display: flex;
  justify-content: space-between;
}

#info {
  margin-top: 15px;
  padding: 15px;
  width: 20%;
}

.info-text {
  display: inline-block;
  width: 85px;
  font-size: 15px;
}

.info-div {
  height: 30px;
  line-height: 30px;
}

.info-span {
  display: inline-block;
  height: 30px;
  width: 130px;
  text-align: center;
  font-size: 15px;
}

#quiz-tier-input {
  text-align: center;
  padding: 0px !important;
  width: 150px;
  margin-left: 55px;
}

#quiz-tier-UNRANKED {
  color: var(--main4-color);
}

#quiz-tier-BRONZE {
  color: #846353;
}

#quiz-tier-SILVER {
  color: #7382a3;
}

#quiz-tier-GOLD {
  color: #cc9336;
}

#quiz-tier-PLATINUM {
  color: #34a8b1;
}

.index-name {
  border: 3px solid var(--main5-color);
  border-radius: 10px;
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 10px;
  width: 97%;
}

#content,
#code-area {
  width: 40%;
  margin-top: 15px;
  padding: 15px;
}

#code-area {
  width: 40%;
}

#quiz-content,
#quiz-code {
  width: 98%;
  height: 480px;
  line-height: 30px;
  overflow: auto;
  margin-bottom: 15px;
}

#quiz-content {
  height: 250px;
}

#quiz-input,
#quiz-output {
  width: 98%;
  height: 130px;
  line-height: 30px;
  overflow: auto;
  margin-bottom: 15px;
}

#button-area {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

#rpt-button,
#close-button {
  height: 50px;
  color: var(--main1-color);
  border-radius: 10px;
}

#rpt-button {
  width: 150px;
  background-color: var(--red-color);
  border: 2px solid var(--red-color);

  &:hover {
    background-color: var(--red-hover-color);
    border-color: var(--red-hover-color);
  }
}

#close-button {
  width: 100px;
  background-color: var(--main4-color);
  border: 2px solid var(--main4-color);

  &:hover {
    background-color: var(--main4-hover-color);
    border-color: var(--main4-hover-color);
  }
}

#testcase-popup {
  padding: 10px;
  position: absolute;
  background-color: var(--main1-color);
  border: 8px solid var(--main5-color);
  border-radius: 10px;
  width: 700px;
  height: 400px;
  margin-top: 5%;
  margin-left: 17%;
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

.readonlyTextarea {
  background-color: var(--main1-color);
  color: var(--main5-color);
  border: none;
  cursor: default;
}

#report-id {
  font-size: 14px;
}
</style>
