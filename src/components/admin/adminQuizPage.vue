<template>
  <main>
    <div id="layout">
      <div id="quiz-header">
        <div id="quiz-filter">
          <button class="quiz-opt" id="quiz-all" @click="allquiz">전체</button>&nbsp;
          <button class="quiz-opt" id="quiz-urk" @click="urkquiz">UNRANKED</button>
        </div>

        <div id="quiz-search-box">
          <input id="search-text" type="number" placeholder="문제 번호 검색" @focus="searchQuiz" />
          <font-awesome-icon
            id="search-icon"
            :icon="['fa', 'magnifying-glass']"
            @click="searchQuiz"
          />
        </div>
      </div>

      <div class="quiz-content" v-if="this.popup">
        <AdminQuizPopup class="quiz-object"></AdminQuizPopup>
      </div>

      <div class="quiz-content" v-if="!this.popup">
        <div v-for="q in quizList" :key="q.quizNo" class="quiz-object">
          <span class="quiz-no">{{ q.quizNo }}</span>
          <span :class="'quiz-tier-' + q.quizTier">{{ q.quizTier }}</span>
          <span class="quiz-title">{{ q.quizTitle }}</span>
          <span class="quiz-correct">{{ q.quizCorrectPercent }}</span>
          <button class="quiz-info-bt" :id="''+q.quizNo" @click="quizView">조회</button>
        </div>
      </div>

      <div v-if="!popup" id="quiz-page">
        <button class="page-bt" id="prev" @click="pgPrevClick">◀</button>&nbsp;
        <button
          v-for="pg in totalPage"
          :key="pg"
          class="page-bt-num"
          :id="'' + pg"
          @click="pgClick"
        >
          {{ pg }}</button
        >&nbsp;
        <button class="page-bt" id="next" @click="pgNextClick">▶︎</button>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios'
import AdminQuizPopup from '../admin/adminQuizPopup.vue'

export default {
  name: 'AdminQuizPage',
  components: { AdminQuizPopup },
  data() {
    return {
      currentPage: 1,
      quizList: [],
      totalPage: 0,
      popup: false
    }
  },
  methods: {
    allquiz() {
      const onBt = document.getElementById('quiz-all')
      onBt.style.opacity = '100%'
      const offBt = document.getElementById('quiz-urk')
      offBt.style.opacity = '50%'

      this.popup = false

      const text = document.getElementById('search-text')
      text.value = ''

      this.currentPage = 1
      // const mainPg = document.getElementById(this.currentPage)
      // mainPg.style.opacity = '100%'
      // mainPg.style.cursor = 'default'

      const url = `${this.backURL}/quiz/list/${this.currentPage}`
      axios.get(url).then((res) => {
        this.quizList = res.data
        this.totalPage = Math.ceil(res.data[0].quizCnt / 10)
      })
    },
    urkquiz() {
      const onBt = document.getElementById('quiz-urk')
      onBt.style.opacity = '100%'
      const offBt = document.getElementById('quiz-all')
      offBt.style.opacity = '50%'

      this.popup = false

      const text = document.getElementById('search-text')
      text.value = ''

      this.currentPage = 1
      // const mainPg = document.getElementById(this.currentPage)
      // mainPg.style.opacity = '50%'
      // mainPg.style.cursor = 'default'

      const url = `${this.backURL}/quiz/tier/UNRANKED/${this.currentPage}`
      axios.get(url).then((res) => {
        this.quizList = res.data
        this.totalPage = Math.ceil(res.data[0].quizCnt / 10)
      })
    },
    searchQuiz(e) {
      if (this.popup) {
        if (e.target.id == 'search-icon') return
        const onBt = document.getElementById('quiz-all')
        onBt.style.opacity = '100%'
        this.popup = false
      } else {
        if (e.target.id == 'search-icon') {
          const onBt = document.getElementById('quiz-all')
          onBt.style.opacity = '50%'
          const offBt = document.getElementById('quiz-urk')
          offBt.style.opacity = '50%'

          this.popup = true
        }
      }
    },
    pgPrevClick() {
      this.currentPage = (this.currentPage / 5 - 1) * 5
      // const mainPg = document.getElementById(this.currentPage)
      // mainPg.style.opacity = '50%'
      // mainPg.style.cursor = 'default'

      // location.href='/admin/:viewName/:currentPage'
      const url = `${this.backURL}/quiz/list/${this.currentPage}`
      axios.get(url).then((res) => {
        this.quizList = res.data
        this.totalPage = Math.ceil(res.data[0].quizCnt / 10)
      })
    },
    pgClick(e) {
      this.currentPage = e.target.id
      // const mainPg = document.getElementById(this.currentPage)
      // mainPg.style.opacity = '50%'
      // mainPg.style.cursor = 'default'

      // location.href='/admin/:viewName/:currentPage'
      const url = `${this.backURL}/quiz/list/${this.currentPage}`
      axios.get(url).then((res) => {
        this.quizList = res.data
        this.totalPage = Math.ceil(res.data[0].quizCnt / 10)
      })
    },
    quizView(e) {
      location.href='/quiz/'+e.target.id
    }
  },
  created() {
    const url = `${this.backURL}/quiz/list/${this.currentPage}`
    axios.get(url).then((res) => {
      this.quizList = res.data
      this.totalPage = Math.ceil(res.data[0].quizCnt / 10)

      if (this.totalPage <= 5) {
        const next = document.getElementById('next')
        next.style.display = 'none'
      }
    }).catch((res)=>{
        const next = document.getElementById('next')
        next.style.display = 'none'
        alert(res.data.status)
    })
  }
}
</script>
<style scoped>
#layout {
  width: 100%;
  height: 100%;
  text-align: center;
}

#quiz-header {
  display: flex;
  justify-content: space-between;
}

#quiz-filter {
  margin-left: 10px;
  margin-top: 8px;
}

.quiz-opt {
  padding: 4px;
  border: none;
  background-color: var(--main1-color);
  color: var(--main5-color);

  &:hover {
    background-color: var(--main2-color);
    border-radius: 5px;
  }
}

#quiz-urk {
  opacity: 50%;
}

#quiz-search-box {
  margin-right: 8px;
  display: flex;
  align-items: center;
  border: 3px solid var(--main5-color);
  border-radius: 20px;
  width: 20%;
}

#search-text {
  width: 100%;
  height: 1.5rem;
  font-size: 0.9rem;
  text-indent: 14px;
  border: none;
  border-radius: 20px;
  background-color: var(--main1-color);
  color: var(--main5-color);

  &::placeholder {
    color: var(--main4-hover-color);
  }
}

#search-icon {
  padding: 8px 12px 8px 0;
  font-size: 1rem;
  cursor: pointer;
  color: var(--main5-color);
  border: none;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.quiz-content {
  width: 100%;
  height: 77%;
  margin-top: 25px;
}

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

#quiz-page {
  margin-top: 22px;
}

.page-bt,
.page-bt-num {
  padding: 5px;
  width: 35px;
  height: 35px;
  background-color: var(--main1-color);
  opacity: 50%;
  border: none;
  color: var(--main5-color);
  padding-bottom: 27px;

  &:hover {
    opacity: 100%;
  }
}

#prev {
  display: none;
}
</style>
