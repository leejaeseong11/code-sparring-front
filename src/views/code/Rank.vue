<template lang="">

    <div id="code-layout" class="row">
        <body class="flex-container">
    
            <div id="code-side-layout">
                <div id="problem-des-title" class="title">문제설명</div>
                <div id="problem-des-container">
                    <div id="problem-des-content">
                        <textarea
                        class="readonlyTextarea"
                        :value="this.quizContent"
                        readonly></textarea>
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
    import Monaco from '../../components/code/RankMonaco.vue'
    import {apiClient} from '@/axios-interceptor'
    export default {
        name: 'rank',
        components: {Monaco},
        data(){
            return{
                quizNo: '',
                testcaseNo: '',
                testcaseList: [],
                quizContent: '',
                timerRunning: true,
                minutes: 60,
                seconds: 0,
                
            }
        },
        computed: {
            formattedTime() {
                return `${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`;
            },
        },
        
        methods: {
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
                if(this.seconds === 0 && this.minutes === 0){
                    if(confirm("시간이 초과되어 메인으로 이동합니다")){
                        this.$router.push({ path: `/` })
    
                    }
                }
            },
            // /n을 <br> 태그로 대체하는 메서드
            replaceNewlines(text) {
                return text.replace(/\n/g, '<br>');
            },
            // beforeunload 이벤트 핸들러
            beforeUnloadHandler(event) {
                // 여기에 알림창을 띄우는 로직 추가
                const confirmationMessage = '변경사항이 저장되지 않을 수 있습니다. 정말로 나가시겠습니까?';
                event.returnValue = confirmationMessage; // Standard for most browsers
                // 알림창에서 확인 버튼을 눌렀을 때 홈으로 이동
                const shouldNavigateHome = window.confirm(confirmationMessage);
                if (shouldNavigateHome) {
                    this.$router.push({ path: `/` });
                }
                return confirmationMessage; // For some older browsers
            },
    
            
        },
        created(){
            window.addEventListener('beforeunload', this.beforeUnloadHandler);
            //타이머 시작
            this.updateTimer();
    
        
            const url = `${this.backURL}/rankgame/${this.$router.currentRoute.value.params.rankNo}`
            apiClient
            .get(url)
            .then((response) => {
                this.quizNo = response.data.quizNo
                
                const url2 = `${this.backURL}/quiz/${this.quizNo}`
                apiClient
                .get(url2)
                .then((response) => {
                    this.quizContent = response.data.quizContent
                })
                .catch(()=>{
                    alert('문제 조회에 실패하였습니다')
                })

    
                const url3 = `${this.backURL}/submit/${this.quizNo}`
                apiClient
                .get(url3)
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
        beforeDestroy() {
        // 컴포넌트가 파괴되기 전에 이벤트 리스너를 제거하는 것이 좋습니다.
        window.removeEventListener('beforeunload', this.beforeUnloadHandler);
        },
    }
    
    </script>
    <style scoped>
    
    #timer-content.timer-expired {
      color: red;
    }
    
    #code-layout {
      min-width: 1280px;
      width: 100vh;
      height: max-content;
    
      display: flex;
      justify-content: space-around;
    
      overflow: visible;
      white-space: nowrap;
    }
    
    body.flex-container{
        display: inline-flex;
        justify-content: center; 
        height: 100vh;
        padding-bottom: 10px;
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
        height: 300px;
        margin-bottom: 10px;
        background-color: var(--white-color);
        border: 3px solid var(--main5-color);
        border-radius: 10px;
    
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }
    
    #problem-des-content{
        box-sizing: border-box;
        font-size: 0.8rem;
        padding: 8px;
    }
    
    
    #testcase-des-container{
        height: 300px;
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
    #timer-title{
        margin-top: 55px;
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
        height: 26vh;
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
    


.readonlyTextarea {
  width: 98%;
  height: 250px;
  overflow: auto;
  cursor: default;
  outline: none;
  border: none;
  resize: none;
}
::-webkit-scrollbar {
  width: 0;
}

    </style>