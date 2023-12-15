<template>
  <div id="layout">
    <div id="title-div">
      <input id="title-input" placeholder="방 제목을 입력하세요" v-model="this.roomTitle" />
    </div>

    <div id="header-div">
      <div id="text-obj">✔︎ 문제 선택</div>
      <div>
        <span class="sort-obj" @click="changeAsc">정답률 ▲</span>&nbsp;
        <span class="sort-obj" @click="changeDesc">정답률 ▼</span>
      </div>
    </div>

    <div id="quiz-div">
      <div v-if="!this.quizSelect" id="tier-select-div">
        <button class="tierButton" id="ALL" @click="changeTier">ALL</button>
        <button class="tierButton" id="UNRANKED" style="color: var(--main4-color)" @click="changeTier">
          UNRANKED
        </button>
        <button class="tierButton" id="BRONZE" style="color: var(--bronze-color)" @click="changeTier">
          BRONZE
        </button>
        <button class="tierButton" id="SILVER" style="color: var(--silver-color)" @click="changeTier">
          SILVER
        </button>
        <button class="tierButton" id="GOLD" style="color: var(--gold-color)" @click="changeTier">
          GOLD
        </button>
        <button class="tierButton" id="PLATINUM" @click="changeTier">PLATINUM</button>
      </div>

      <div id="quiz-select-div">
        <div id="quiz-index-div">
          <span class="quizTitle">제목</span>
          <span class="quizTier">티어</span>
          <span class="submitCnt">제출횟수</span>
          <span class="correctPercent">정답률</span>
        </div>
        <div id="quiz-list-box">
          <div v-for="quiz in quizList" :key="quiz" class="quizObj" :id="''+quiz.quizNo" @click="clickQuiz">
            <span class="quizTitle" :title="'' + quiz.quizTitle" :id="''+quiz.quizNo">{{ quiz.quizTitle }}</span>
            <span :class="'tier-' + quiz.quizTier" :id="''+quiz.quizNo">{{ quiz.quizTier }}</span>
            <span class="submitCnt" :id="''+quiz.quizNo">{{ quiz.quizSubmitCnt }}회</span>
            <span class="correctPercent" :id="''+quiz.quizNo">{{
              quiz.quizCorrectPercent == '-' ? '' : quiz.quizCorrectPercent
            }}</span>
          </div>
        </div>
      </div>

      <div v-if="this.quizSelect" id="quiz-info-div">
      <div id="quiz-title" :title="''+this.quiz.quizTitle">[문제 제목]&nbsp; {{ this.quiz.quizTitle }}</div>
      <div>[출제자]&nbsp; {{ this.quiz.memberName }}</div>
      <div>[문제 내용]<br>
        <textarea id="quiz-content" :value="this.quiz.quizContent" readonly></textarea></div>
      <button id="back-button" @click="backQuizSelect">닫기</button>
      </div>
    </div>

    <div id="footer-div">
      <div id="option-div">
        <span id="code-view-opt">
          코드공개 <input class="checkBox" type="checkbox" v-model="this.codeShare" />
        </span>
        <span id="secret-opt">
          비밀방 <input class="checkBox" type="checkbox" v-model="this.secret" />
        </span>
        <span v-if="this.secret" id="pwd-span">
          <input id="pwd-input" v-model="this.roomPwd" placeholder="숫자 4자리 입력" />
        </span>
      </div>

      <div id="button-div">
        <button id="cancle-button" @click="$emit('close-popup')">취소</button>&nbsp;
        <button id="add-button" @click="clickAddRoom">생성</button>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
import {apiClient} from '@/axios-interceptor'

export default {
  name: 'AddRoom',
  data() {
    return {
      quizSelect: false,
      tier: 'ALL',
      quizList: [],
      roomTitle: '',
      quizNo: '',
      quiz: [],
      codeShare: false,
      secret: false,
      roomPwd: ''
    }
  },
  methods: {
    changeTier(e) {
      this.tier = e.target.id

      if (this.tier == 'ALL') {
        const url = `${this.backURL}/quiz/list`
        apiClient.get(url).then((res) => {
          this.quizList = res.data
        })
      } else {
        const url = `${this.backURL}/quiz/tier/` + this.tier
        apiClient.get(url).then((res) => {
          this.quizList = res.data
        })
      }

    },
    changeAsc() {
      if (this.tier == 'ALL') {
        const url = `${this.backURL}/quiz/list/asc`
        apiClient.get(url).then((res) => {
          this.quizList = res.data
        })
      } else {
        const url = `${this.backURL}/quiz/tier/` + this.tier+`/asc`
        apiClient.get(url).then((res) => {
          this.quizList = res.data
        })
      }
    },
    changeDesc() {
      if (this.tier == 'ALL') {
        const url = `${this.backURL}/quiz/list/desc`
        apiClient.get(url).then((res) => {
          this.quizList = res.data
        })
      } else {
        const url = `${this.backURL}/quiz/tier/` + this.tier+`/desc`
        apiClient.get(url).then((res) => {
          this.quizList = res.data
        })
      }
    },
    clickQuiz(e) {
      this.quizNo=e.target.id
      // const sortBt=document.querySelectorAll('.sort-obj')
      
      const url=`${this.backURL}/quiz/`+this.quizNo
      apiClient.get(url)
      .then(res=>{
        this.quiz=res.data
      })
      this.quizSelect=true
    },
    backQuizSelect() {
      this.quiz=[]
      this.quizNo=''
      this.quizSelect=false
    },
    clickAddRoom() {
      if(this.roomTitle=='') {
        alert('방 제목을 입력하세요')
      } else if(this.secret==true & this.roomPwd=='') {
        alert('방 비밀번호를 입력하세요')
      } else if(this.quizNo=='') {
        alert('문제를 선택하세요')
      }
    }
  },
  mounted() {
    const url = `${this.backURL}/quiz/list`
    apiClient.get(url).then((res) => {
      this.quizList = res.data
    })
  }
}
</script>
<style scoped>
* {
  color: var(--main5-color);
}
span {
  display: inline-block;
  /* text-align: center; */
}

textarea {
  resize: none;
  outline: none;
  border: none;
}

#title-div {
  background-color: var(--main5-color);
  height: 50px;
  line-height: 50px;
  border: 1px solid var(--main5-color);
  border-radius: 10px;
  margin-top: 20px;
  width: 98%;
  margin-left: 1%;
  padding-left: 10px;
}

#title-input {
  background-color: var(--main5-color);
  height: 40px;
  width: 100%;
  border: none;
  color: var(--main1-color);
  font-size: 20px;

  &::placeholder {
    color: var(--main2-color);
  }
}

#quiz-div,
#footer-div {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 98%;
  margin-left: 1%;
}

#tier-select-div {
  border-left: 7px solid var(--main5-color);
  border-right: 7px solid var(--main5-color);
  padding-left: 20px;
  padding-right: 20px;
  height: 450px;
  overflow: scroll;
}

::-webkit-scrollbar {
  width: 0px;
}

.tierButton {
  display: block;
  text-align: center;
  width: 200px;
  height: 130px;
  background-color: var(--main1-color);
  border: none;
  border-bottom: 3px solid var(--main2-color);
  font-size: 20px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    height: 150px;
  }
}

#PLATINUM {
  border: none;
  color: var(--platinum-color);
}

#quiz-select-div {
  width: 950px;
  margin-right: 10px;
}

#header-div {
  margin-top: 20px;
  padding-right: 30px;
  display: flex;
  justify-content: space-between;
}

.sort-obj,
#text-obj {
  border: 3px solid var(--main5-color);
  border-radius: 10px;
  width: 110px;
  height: 34px;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
}

.sort-obj {
  &:hover {
    color: var(--main5-hover-color);
    border-color: var(--main5-hover-color);
  }
}

#text-obj {
  margin-left: 20px;
  border: none;
  font-size: 20px;
  cursor: default;
}

#quiz-index-div {
  width: 100%;
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  margin-left: 10px;
  display: flex;
  flex-wrap: nowrap;
}

.quizTitle {
  width: 55%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tier-UNRANKED, .tier-BRONZE, .tier-SILVER, .tier-GOLD, .tier-PLATINUM {
  width: 15%;
  margin-left: 10px;
}

.submitCnt {
  width: 15%;
  margin-left: 30px;
}

.correctPercent {
  width: 15%;
  margin-left: 5px;
}

.quizSort {
  width: 25px;
  height: 50px;
  border: none;
  background-color: var(--main1-color);
}

#footer-div {
  margin-top: 30px;
}

#option-div {
  font-size: 20px;
}

#code-view-opt,
#secret-opt {
  margin-right: 30px;
}

.checkBox {
  width: 20px;
}

#pwd-input {
  border: 2px solid var(--main5-color);
  border-radius: 10px;
  margin-left: -10px;
  text-indent: 5px;
  height: 30px;
  font-size: 15px;
  &::placeholder {
    color: var(--main2-color);
  }
}

#cancle-button,
#add-button {
  width: 90px;
  height: 45px;
  font-size: 18px;
  border: 1px solid var(--main1-color);
  border-radius: 10px;
  color: var(--main1-color);
}

#cancle-button {
  background-color: var(--red-color);

  &:hover {
    background-color: var(--red-hover-color);
  }
}

#add-button {
  background-color: var(--main4-color);

  &:hover {
    background-color: var(--main4-hover-color);
  }
}

#button-div {
  margin-top: -10px;
}

.quizObj {
  height: 40px;
  margin-top: 7px;
  border: 1px solid var(--white-color);
  line-height: 40px;
  background-color: var(--white-color);
  padding-left: 20px;
  border-radius: 10px;
  display: flex;
  flex-wrap: nowrap;
  cursor: pointer;

  &:hover {
    opacity: 70%;
  }
}

.quizTitle {
  width: 55%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tier-UNRANKED, .tier-BRONZE, .tier-SILVER, .tier-GOLD, .tier-PLATINUM {
  width: 15%;
  margin-left: 10px;
}

.submitCnt {
  width: 15%;
  margin-left: 30px;
}

.correctPercent {
  width: 15%;
  margin-left: 5px;
}

.quizSort {
  width: 25px;
  height: 50px;
  border: none;
  background-color: var(--main1-color);
}

#quiz-list-box {
  overflow: scroll;
  height: 400px;
}

.tier-UNRANKED {
  color: var(--main4-color);
}

.tier-BRONZE {
  color: var(--bronze-color);
}

.tier-SILVER {
  color: var(--silver-color);
}

.tier-GOLD {
  color: var(--gold-color);
}

.tier-PLATINUM {
  color: var(--platinum-color);
}

#quiz-info-div {
  width: 520px;
  margin-top: 30px;
  padding-top: 20px;
  padding-left: 10px;
  background-color: var(--main2-color);
  border: 1px solid var(--main2-color);
  border-radius: 10px;
}

#quiz-content {
  height: 260px;
  width: 490px;
  background-color: var(--main2-color);
  border: 3px solid var(--main5-color);
  border-radius: 10px;
  margin-top: 5px;
  padding-top: 5px;
  padding-left: 5px;
}

#quiz-title {
  width: 500px;
  overflow: hidden;
  text-overflow: ellipsis;
}

#back-button {
  width: 80px;
  height: 40px;
  background-color: var(--main4-color);
  color: var(--main1-color);
  border: 1px solid var(--main4-color);
  border-radius: 10px;

  &:hover {
    background-color: var(--main4-hover-color);
    border-color: var(--main4-hover-color);
  }
}
</style>
