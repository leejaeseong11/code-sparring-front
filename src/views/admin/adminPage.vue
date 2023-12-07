<template>
  <main class="main-container">

    <div class="header">
      <img src="../../../public/images/logo.gif" class="logo-img" alt="logo" @click="goMain" />
      <div class="header-text">관리자페이지</div>
    </div>

    <div class="content-box">
      <div class="index-bar">
        <div class="quiz-page" id="quiz-page" @click="OnQuizPage">전체 문제 조회</div>
        <div class="report-page" id="report-page" @click="OnReportPage">신고 목록 조회</div>
        <img src="../../../public/images/admin/home.png" class="home-bt" alt="home" @click="goMain">
      </div>

      <div class="content-area">
        <AdminQuizPage v-if="this.quizPage"></AdminQuizPage>
        <AdminReportPage v-if="this.reportPage"></AdminReportPage>
      </div>
    </div>

  </main>
</template>
<script>
// import axios from 'axios'
import AdminQuizPage from '../../components/admin/adminQuizPage.vue'
import AdminReportPage from '../../components/admin/adminReportPage.vue'

export default {
  name: 'AdminPage',
  components: {AdminQuizPage, AdminReportPage},
  data() {
    return {
        quizPage: true,
        reportPage: false
    }
  },
  methods: {
    goMain(e) {
        if(e.target.className=='logo-img') {
            alert('페이지를 나가시겠습니까?')
        } else {
            alert('메인으로 이동합니다')
        }
        location.href='/'
    },
    OnQuizPage() {
        this.quizPage=true
        this.reportPage=false

        const onPg=document.getElementById('quiz-page')
        onPg.style.color='var(--main5-color)'
        onPg.style.backgroundColor='var(--main1-color)'

        const offPg=document.getElementById('report-page')
        offPg.style.color='var(--main1-color)'
        offPg.style.backgroundColor='var(--main5-color)'
    },
    OnReportPage() {
        this.quizPage=false
        this.reportPage=true

        const onPg=document.getElementById('report-page')
        onPg.style.color='var(--main5-color)'
        onPg.style.backgroundColor='var(--main1-color)'

        const offPg=document.getElementById('quiz-page')
        offPg.style.color='var(--main1-color)'
        offPg.style.backgroundColor='var(--main5-color)'
    }
  }
}
</script>
<style scoped>
* {
  color: var(--main5-color);
  width: 100%;
  height: 100%;
  cursor: default;
}

.header {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-img {
  width: 150px;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.header-text {
  font-size: 25px;
  text-align: right;
  width: 100%;
  margin-right: 20px;
  padding-top: 45px;
}

.content-box {
  display: flex;
  justify-content: space-between;
  border: 5px solid var(--main5-color);
  width: 98%;
  margin-left: 1%;
  margin-top: 10px;
  border-radius: 18px;
}

.index-bar {
  background-color: var(--main5-color);
  width: 20%;
  height: 650px;
  padding-right: 5px;
}

.quiz-page, .report-page {
    color: var(--main1-color);
    font-size: 20px;
    text-align: center;
    height: 50px;
    line-height: 50px;
    margin-top: 40px;
    cursor: pointer;

    &:hover {
        font-size: 21px;
    }
}

.quiz-page {
    background-color: var(--main1-color);
    color: var(--main5-color);
}

.report-page {
    margin-top: 20px;
}

.home-bt {
    width: 40px;
    height: 40px;
    margin-left: 10%;
    margin-top: 430px;
    cursor: pointer;

    &:hover {
        width: 42px;
        height: 42px;
        margin-left: 9.5%;
        margin-top: 429px;
    }
}

.content-area {
  height: 650px;
}
</style>
