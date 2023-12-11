<template>
  <main>
    <div id="layout">
      <div id="header">
        <div></div>
        <button v-if="!modifyBt" id="back-button" @click="backHome">뒤로가기</button>
        <button v-if="modifyBt" id="not-button">임시버튼</button>
      </div>

      <div v-if="testcaseBt" id="back-off" @click="offTc"></div>
      <AddTestcase v-if="testcaseBt" id="testcase-popup" @close-testcase="offTc" @update-testcase="updateTestcase"></AddTestcase>

      <div id="title">
        <div v-if="!modifyBt" id="quiz-title-div">{{ this.quizTitle }}</div>
        <input v-if="modifyBt" id="quiz-title-input" v-model="this.quizTitle" />
      </div>

      <div id="quiz-box">
        <div id="info">
          <div id="quiz-info">
            <div class="index-name">문제 정보</div>
            <div class="info-div" id="tier">
              <span class="info-text">티어</span>:<span
                v-if="!modifyBt"
                class="info-span"
                :id="'quiz-tier-' + this.quizTier"
                >{{ this.quizTier }}</span
              >
              <input v-if="modifyBt" id="quiz-tier-input" v-model="this.quizTier" />
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

          <div id="testcase">
            <div class="index-name">테스트케이스 목록</div>
            <div id="textcase-box">
              <div v-if="testcaseCnt==0 && !modifyBt">존재하지 않습니다</div>
              <div v-for="(tc, index) in testcaseList" :key="tc">
                <div class="testcase-no">[{{ index+1 }}]&nbsp;&nbsp;&nbsp;<button v-if="modifyBt" class="delete-tc-button" :id="tc.testcaseNo">삭제</button></div>
                <div>
                  입력값 :
                  <span v-if="!modifyBt">{{
                    tc.testcaseInput == null ? '-' : tc.testcaseInput
                  }}</span>
                  <input v-if="modifyBt" :value="tc.testcaseInput" />
                </div>
                <div>
                  출력값 :
                  <span v-if="!modifyBt">{{
                    tc.testcaseOutput == null ? '-' : tc.testcaseOutput
                  }}</span>
                  <input v-if="modifyBt" :value="tc.testcaseOutput" />
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>

        <div id="content">
          <div class="index-name">문제 내용</div>
          <div v-if="!modifyBt" id="quiz-content">{{ this.quizContent }}</div>
          <textarea v-if="modifyBt" id="quiz-content" v-model="this.quizContent"></textarea>

          <div class="index-name">입력값 설명</div>
          <div v-if="!modifyBt" id="quiz-input">
            {{ this.inputInfo == null ? '존재하지 않습니다' : this.inputInfo }}
          </div>
          <textarea v-if="modifyBt" id="quiz-input" v-model="this.inputInfo"></textarea>

          <div class="index-name">출력값 설명</div>
          <div v-if="!modifyBt" id="quiz-output">
            {{ this.outputInfo == null ? '존재하지 않습니다' : this.outputInfo }}
          </div>
          <textarea v-if="modifyBt" id="quiz-output" v-model="this.outputInfo"></textarea>

          <div id="button-area">
            <div id="left-button">
              <button v-if="!modifyBt" id="tc-button" @click="addTc">테스트케이스 추가</button>
              <button v-if="!modifyBt" id="code-button" @click="codeFile">정답코드 조회</button>
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
import AddTestcase from '../../components/quiz/AddTestcase.vue'

export default {
  name: 'QuizView',
  components: {AddTestcase},
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
      testcaseList: [],
      testcaseCnt: '',
      modifyBt: false,
      testcaseBt: false
    }
  },
  methods: {
    backHome() {
      window.history.back()
    },
    modifyQuiz(e) {
      if (e.target.id == 'modify-button') {
        this.modifyBt = true
      } else if (e.target.id == 'cancle-button') {
        alert('문제 수정을 취소합니다')
        window.history.go(0)
      } else if (e.target.id == 'save-button') {
        alert('문제를 저장합니다')
        this.modifyBt = false
      }
    },
    codeFile() {
      window.open(
        'https://s3.ap-northeast-2.amazonaws.com/codesparring/answer_' + this.quizNo + '.java',
        '_blank'
      )
    },
    addTc() {
      this.testcaseBt=true
    },
    offTc() {
      this.testcaseBt=false
    },
    updateTestcase(input) {
      alert(input)
      this.quizTitle=input
      alert(this.quizTitle)
    }
  },
  created() {
    this.quizNo = this.$route.params.quizNo
    const url = `${this.backURL}/quiz/${this.quizNo}`
    axios.get(url).then((res) => {
      this.quizTitle = res.data.quizTitle
      this.quizContent = res.data.quizContent
      this.quizTier = res.data.quizTier
      this.quizAuthor = res.data.memberName
      this.quizSubmitCnt = res.data.quizSubmitCnt
      this.quizSuccessCnt = res.data.quizSuccessCnt
      this.quizCorrect = res.data.quizCorrectPercent
      this.inputInfo = res.data.quizInput
      this.outputInfo = res.data.quizOutput
      this.testcaseList = res.data.testcaseDTOList
      this.testcaseCnt = this.testcaseList.length
    })
  }
}
</script>
<style scoped>
* {
  color: var(--main5-color);
  cursor: default;
}

button {
  font-size: 18px;
}

input,
textarea {
  cursor: text;
  color: var(--main3-hover-color) !important;
  padding: 5px;
}

#header {
  display: flex;
  justify-content: space-between;
}

#back-button,
#not-button {
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

#quiz-title-div,
#quiz-title-input {
  height: 100%;
  width: 99%;
  background-color: var(--main5-color);
  color: var(--main1-color);
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

.info-text,
.tc-info-text {
  display: inline-block;
  width: 100px;
}

.info-div,
.tc-info-div {
  height: 30px;
  line-height: 30px;
}

.info-span,
.tc-info-span {
  display: inline-block;
  height: 30px;
  width: 260px;
  text-align: center;
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

#testcase-info {
  margin-top: 30px;
}

#testcase {
  margin-top: 30px;
}


#textcase-box {
  height: 300px;
  overflow: auto;
}

#content {
  width: 800px;
  margin-top: 15px;
  padding: 15px;
}

#quiz-content {
  width: 98%;
  height: 250px;
  resize: none;
  line-height: 30px;
  overflow: auto;
  margin-bottom: 15px;

  &:focus {
    outline: none;
  }
}

#quiz-input,
#quiz-output {
  width: 98%;
  height: 50px;
  resize: none;
  line-height: 30px;
  overflow: auto;
  margin-bottom: 15px;

  &:focus {
    outline: none;
  }
}

.testcase-no {
  height: 40px;
}

#button-area {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

#code-button, #tc-button {
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

#tc-button {
  width: 200px;
  margin-right: 10px;
}

#modify-button,
#delete-button,
#save-button,
#cancle-button {
  width: 100px;
  height: 50px;
  color: var(--main1-color);
  border-radius: 10px;
}

#modify-button,
#save-button {
  background-color: var(--main4-color);
  border: 2px solid var(--main4-color);

  &:hover {
    background-color: var(--main4-hover-color);
    border-color: var(--main4-hover-color);
  }
}

#delete-button,
#cancle-button,
.delete-tc-button {
  background-color: var(--red-color);
  border: 2px solid var(--red-color);

  &:hover {
    background-color: var(--red-hover-color);
    border-color: var(--red-hover-color);
  }
}

.delete-tc-button {
  font-size: 15px;
  color: var(--main1-color);
  border-radius: 7px;
  width: 40px;
  height: 30px;
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
  cursor: pointer;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
