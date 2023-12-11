<template>
  <main>
    <div id="layout">
      <div id="header">
        <div></div>
        <button v-if="!modifyBt" id="back-button" @click="backHome">뒤로가기</button>
        <button v-if="modifyBt" id="not-button">임시버튼</button>
      </div>

      <div id="title">
        <div v-if="!modifyBt" id="quiz-title-div">{{ this.quizTitle }}</div>
        <input v-if="modifyBt" id="quiz-title-input" :value="this.quizTitle">
      </div>

      <div id="quiz-box">
        <div id="info">
          <div id="quiz-info">
            <div class="index-name">문제 정보</div>
            <div class="info-div" id="tier">
              <span class="info-text">티어</span>:<span v-if="!modifyBt" class="info-span" :id="'quiz-tier-'+this.quizTier">{{this.quizTier}}</span>
              <input v-if="modifyBt" id="quiz-tier-input" :value="this.quizTier">
            </div>
            <div class="info-div" id="author">
              <span class="info-text">출제자</span>:<span class="info-span" id="quiz-author">{{this.quizAuthor}}</span>
            </div>
            <div class="info-div" id="submit-cnt">
              <span class="info-text">제출된 횟수</span>:<span class="info-span" id="quiz-submit-cnt">{{this.quizSubmitCnt}}회</span>
            </div>
            <div class="info-div" id="success-cnt">
              <span class="info-text">성공한 횟수</span>:<span class="info-span" id="quiz-success-cnt">{{this.quizSuccessCnt}}회</span>
            </div>
            <div class="info-div" id="correct">
              <span class="info-text">정답률</span>:<span class="info-span" id="quiz-correct">{{this.quizCorrect}}</span>
            </div>
          </div>

          <div id="testcase">
            <div class="index-name">테스트케이스 목록</div>
            <div>솰라솰라다</div>
          </div>
        </div>

        <div id="content">
          <div class="index-name">문제 내용</div>
          <div v-if="!modifyBt" id="quiz-content">{{ this.quizContent }}</div>
          <textarea v-if="modifyBt" id="quiz-content" :value="this.quizContent"></textarea>

          <div id="button-area">
            <div id="left-button">
              <button id="rpc-button">신고 내역 조회</button>
            </div>
            <div id="right-button">
              <button v-if="!modifyBt" id="modify-button" @click="modifyQuiz">수정</button>&nbsp;
              <button v-if="!modifyBt" id="delete-button">삭제</button>
              <button v-if="modifyBt" id="cancle-button" @click="modifyQuiz">취소</button>&nbsp;
              <button v-if="modifyBt" id="save-button" @click="modifyQuiz">저장</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios'

export default {
  name: 'QuizView',
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
        modifyBt: false
    }
  },
  methods: {
    backHome() {
      window.history.back()
    },
    modifyQuiz(e) {
      if(e.target.id=='modify-button') {
        this.modifyBt=true
      } else if(e.target.id=='cancle-button') {
        alert('문제 수정을 취소합니다')
        this.modifyBt=false
      } else if(e.target.id=='save-button') {
        alert('문제를 저장합니다')
        this.modifyBt=false
      }
    }
  },
  created() {
    this.quizNo=this.$route.params.quizNo
    const url=`${this.backURL}/quiz/${this.quizNo}`
    axios.get(url)
    .then(res=>{
      this.quizTitle=res.data.quizTitle
      this.quizContent=res.data.quizContent
      this.quizTier=res.data.quizTier
      this.quizAuthor=res.data.memberName
      this.quizSubmitCnt=res.data.quizSubmitCnt
      this.quizSuccessCnt=res.data.quizSuccessCnt
      this.quizCorrect=res.data.quizCorrectPercent
    })
  }
}
</script>
<style scoped>

*{
  color: var(--main5-color);
  cursor: default;
}

button {
  font-size: 18px;
}

input, textarea {
  cursor: text;
  color: var(--main3-hover-color) !important;
}

#header {
  display: flex;
  justify-content: space-between;
}

#back-button, #not-button {
  width: 100px;
  height: 45px;
  margin-top: 30px;
  margin-right: 20px;
  background-color: var(--main2-color);
  border: 2px solid var(--main2-color);
  border-radius: 10px;
  color: var(--main1-color);

  &:hover {
    background-color: var(--main2-hover-color);
    border-color: var(--main2-hover-color);
  }
}

#not-button {
  opacity: 0%;
  cursor: default;
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

#quiz-title-div, #quiz-title-input {
  height: 100%;
  width: 99%;
  background-color: var(--main5-color);
  color: var(--main1-color);
  border: none;
  font-size: 20px;
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
  width: 35%;
}

.info-text {
  display: inline-block;
  width: 100px;
}

.info-div {
  height: 30px;
  line-height: 30px;
}

.info-span {
  display: inline-block;
  height: 20px;
  width: 260px;
  text-align: center;
}

#quiz-tier-input {
  text-align: center;
  border: none;
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

#testcase {
  margin-top: 30px;
}

#content {
  width: 800px;
  margin-top: 10px;
  padding: 15px;
}

#quiz-content {
  width: 98%;
  height: 500px;
  /* background-color: var(--main1-color); */
  border: none;
  resize: none;
  line-height: 30px;
  overflow: auto;

  &:focus {
    outline: none;
  }
}

#button-area {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

#rpc-button {
  margin-left: 15px;
  width: 150px;
  height: 50px;
  background-color: var(--main3-color);
  border: 2px solid var(--main3-color);
  border-radius: 10px;
  color: var(--main1-color);

  &:hover {
    background-color: var(--main3-hover-color);
  border: 2px solid var(--main3-hover-color);
  }
}

#modify-button, #delete-button, #save-button, #cancle-button {
  width: 100px;
  height: 50px;
  color: var(--main1-color);
  border-radius: 10px;
}

#modify-button, #save-button {
  background-color: var(--main4-color);
  border: 2px solid var(--main4-color);
  
  &:hover {
    background-color: var(--main4-hover-color);
    border-color: var(--main4-hover-color);
  }
}

#delete-button, #cancle-button {
  background-color: var(--red-color);
  border: 2px solid var(--red-color);
  
  &:hover {
    background-color: var(--red-hover-color);
    border-color: var(--red-hover-color);
  }
}
</style>