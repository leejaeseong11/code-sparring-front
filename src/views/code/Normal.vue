<template lang="">

<div id="code-layout" class="row">
    <body class="flex-container">

        <div id="code-side-layout">
            <div id="problem-des-title" class="title">문제설명</div>
            <div id="problem-des-container">
                <div id="problem-des-content">
                    <span v-html="replaceNewlines(this.quizContent)"></span>
                </div>
            </div>

            <div id="testcase-des-title" class="title">테스트케이스</div>
            <div id="testcase-des-container">
                <div id="testcase-des-content" v-for="testcase in testcaseList.slice(0, 3)" :key="testcase.testcaseNo">
                    <div>입력:</div>
                    <div class="testcase-div">
                        <span v-html="replaceNewlines(testcase.testcaseInput)"></span>
                    </div>
                    <br>
                    <div>출력:</div>
                    <div class="testcase-div">
                        <span v-html="replaceNewlines(testcase.testcaseOutput)"></span>
                    </div>
                    <hr id="testcase-hr">
                </div>
            </div>
            <button class="button" @:click="reportButtonClickHandler">문제신고하기</button>
            
            <div id="timer-title" class="title">제한시간</div>
            <div id="timer-content" class="title" :class="{ 'timer-expired': timerRunning }">{{ formattedTime }}</div>

            <button class="button" id="exit" @:click="exitButtonClickHandler">나가기</button>
        </div>


        <div class="monaco">
            <Monaco v-bind:childQuizNoValue="quizNo"/>
        </div>

        <div id="relative-code-layout">
            <div id="relative-code-title" class="title">상대코드</div>
            <div id="relative-code-container">
                <div id="relative-code-content">1P</div>
                <div id="relative-code-content">2P</div>
                <div id="relative-code-content">3P</div>
            </div>
        </div>
    </body>

</div>
</template>

<script>
import Monaco from '../../components/code/Monaco.vue'
// import axios from 'axios';
import {apiClient} from '@/axios-interceptor'
export default {
    name: 'normal',
    components: {Monaco},
    data(){
        return{
            quizNo: '',
            testcaseNo: '',
            testcaseList: [],
            quizContent: '',
            timerRunning: true,
            minutes: 1,
            seconds: 0,
            
        }
    },
    computed: {
        formattedTime() {
            return `${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`;
        },
    },
    
    methods: {
        reportButtonClickHandler(){
            //신고팝업창
        },
        exitButtonClickHandler(){
            this.$router.push({ path: `/` })
        },
        updateTimer() {
            if (this.minutes === 0 && this.seconds === 0) {
                this.timerRunning = false; // 타이머 종료
                return;
            }

            if (this.seconds === 0) {
                this.minutes--;
                this.seconds = 59;
            } else {
                this.seconds--;
            }

            if (this.timerRunning) {
                setTimeout(this.updateTimer, 1000); // 1초마다 업데이트
                
            }  
        },
        // /n을 <br> 태그로 대체하는 메서드
        replaceNewlines(text) {
            return text.replace(/\n/g, '<br>');
        },

        
    },
    created(){
        //타이머 시작
        this.updateTimer();

        // room에서 roomNo에 해당하는 quizNo, quizContent 가져오기
        const url = `${this.backURL}/room/${this.$router.currentRoute.value.params.roomNo}`
        apiClient
        .get(url)
        .then((response) => {
            this.quizNo = response.data.quizNo
            this.quizContent = response.data.quizContent

            const url2 = `${this.backURL}/submit/${this.quizNo}`

            apiClient
            .get(url2)
            .then((response) => {
                this.testcaseList = response.data
            })
            .catch(()=>{
                alert('테스트케이스 조회에 실패하였습니다')
            })
        })
        .catch(() => {
            alert('문제 정보 조회에 실패하였습니다')
        })

    },
}

</script>
<style scoped>

#timer-content.timer-expired {
  color: red;
}

#code-layout {
  min-width: 1280px;
  height: max-content;

  display: flex;
  justify-content: space-around;

  overflow: visible;
  white-space: nowrap;

  color: var(--main5-color);
  border: 3px solid var(--main5-color);
}

body.flex-container{
    display: inline-flex;
    justify-content: center; 
    height: 792px;
    padding-bottom: 10px;
    
    /* align-items: center; */
}


#code-side-layout {
  width: 260px;
  padding: 10px;
  margin-top: 90px;
  margin-right: 10px;

  display: flex;
  flex-direction: column;
  align-items: left;

  border: 3px solid var(--main5-color);
  border-radius: 10px;
}


#problem-des-container{
    box-sizing: border-box;
    height: 250px;
    margin-bottom: 10px;
    background-color: var(--white-color);
    border: 3px solid var(--main5-color);
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    overflow-y: auto;
    word-wrap: break-word; /* 단어 단위로 자동 줄 바꿈  */
}

#problem-des-content{
    box-sizing: border-box;
    font-size: 0.8rem;
    padding: 8px;
    overflow-wrap: break-word; /* 단어 단위로 자동 줄 바꿈  */
}


#testcase-des-container{
    height: 250px;
    margin-bottom: 10px;
    background-color: var(--white-color);
    border: 3px solid var(--main5-color);
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    overflow-y: auto;
}
#testcase-des-content{

    font-size: 0.8rem;
    padding: 8px
}
.monaco {
    width: 760px;
    margin-top: 90px;
     margin-right: 10px;
    /* margin-left: 10px;  */
    border: 3px solid var(--main5-color);
    border-radius:10px;
    
}

.button{
    padding: 8px;
    font-size: 1.5rem;

    color: var(--main1-color);
    background-color: var(--main4-color);
    border: none;
    border-radius: 6px;

    &:hover {
        background-color: var(--main4-hover-color);
    }
}

#exit{
    color: var(--main1-color);
    background-color: var(--red-color);
    border: none;
    border-radius: 6px;

    &:hover {
        background-color: var(--red-hover-color);
    }
}

#relative-code-layout{
    width: 260px;
    padding: 10px;
    margin-top: 90px;
    margin-right: 10px;

    display: flex;
    flex-direction: column;
    align-items: left;

    border: 3px solid var(--main5-color);
    border-radius: 10px;
}


.title{
    padding-left: 10px;
}
#relative-code-container{
    /* display: flex; */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    
    
}

#relative-code-content{
    width: 200px;
    height: 22vh;
    margin-bottom: 16px;
    border: 3px solid var(--main5-color);
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: var(--white-color);
    /* justify-content: space-around; */
    
}
.testcase-div{
    background-color: var(--main2-color);
    background-clip: content-box;
}

#testcase-hr{
    border: 0px;
    height: 3px;
    background-color: var(--black-color);
    margin:16px 0px 0px
}

</style>