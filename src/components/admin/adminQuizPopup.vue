<template>
    <div v-if="this.status" class="quiz-object">
        <span class="quiz-no">{{ this.quizNo }}</span>
        <span :class="'quiz-tier-' + this.quizTier">{{ this.quizTier }}</span>
        <span class="quiz-title">{{ this.quizTitle }}</span>
        <span class="quiz-correct">{{ this.quizCorrectPercent }}</span>
        <button class="quiz-info-bt" @click="quizView">조회</button>
    </div>
</template>
<script>
import axios from 'axios'

export default {
    name: 'AdminQuizPopup',
    data() {
        return {
            quizNo: '',
            quizTitle: '',
            quizAuthor: '',
            quizContent: '',
            quizReportCnt: '',
            quizCorrect: '',
            quizTier: '',
            status: false
        }
    },
    methods: {
      quizView() {
        location.href='/quiz/'+this.quizNo
      }
    },
    created() {
        const quizNo=document.getElementById('search-text').value
        const url = `${this.backURL}/quiz/${quizNo}`
        axios.get(url).then((res) => {
            this.quizNo=res.data.quizNo
            this.quizTitle=res.data.quizTitle
            this.quizAuthor=res.data.memberName
            this.quizContent=res.data.quizContent
            this.quizCorrect=res.data.quizCorrectPercent
            this.quizTier=res.data.quizTier
            this.status=true
        }).catch(()=>{
            alert('존재하지 않는 번호입니다')
            location.href='/admin'
        })
    }
}
</script>
<style scoped>
.quiz-object {
  border: 3px solid var(--white-color);
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  height: 9%;
  background-color: var(--white-color);
  vertical-align: center;
}

.quiz-no {
  width: 5%;
  display: inline-block;
  color: var(--main5-color);
  font-size: 13px;
}

.quiz-tier-UNRANKED,
.quiz-tier-BRONZE,
.quiz-tier-SILVER,
.quiz-tier-GOLD,
.quiz-tier-PLATINUM {
  width: 15%;
  display: inline-block;
  color: var(--main4-color);
}

.quiz-tier-BRONZE {
  color: #846353;
}

.quiz-tier-SILVER {
  color: #7382a3;
}

.quiz-tier-GOLD {
  color: #cc9336;
}

.quiz-tier-PLATINUM {
  color: #34a8b1;
}

.quiz-title {
  width: 50%;
  display: inline-block;
}

.quiz-correct {
  width: 20%;
  display: inline-block;
}

.quiz-info-bt {
  width: 10%;
  background-color: var(--main4-color);
  border: 2px solid var(--main4-color);
  border-radius: 5px;
  color: var(--white-color);

  &:hover {
    background-color: var(--main4-hover-color);
    border-color: var(--main4-hover-color);
  }
}
</style>