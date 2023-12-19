<template lang="">

    <div id="code-layout" class="row">
        <div v-if="this.gameEnd" id="back-off" @click="backOff"></div>
        <GameEnd 
            id="end-popup" 
            v-if="this.gameEnd" 
            @close-popup="backOff"
            :resultMemberNo = "this.resultMemberNo"
        />
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
                <Monaco 
                @monacoSubmitEvent="setSubmitValue"
                @monacoRunEvent="setRunValue"
                @monacoWinMemberNo="setWinMember"
                :parentButtonValue="this.parentButtonValue"
                v-bind:childQuizNoValue="quizNo"
                />
            </div>
    
            <div id="relative-code-layout">
                <div id="relative-code-container">

                    <div id="member-title">
                        {{ '1P('+this.member1Name + ')'}}
                    </div>
                    <div id="relative-code-content">
                        <div v-if="this.buttonValuePlayer1">
                            {{ this.buttonValuePlayer1 }}
                        </div>
                        <div v-else>1P 작성중...</div>
                    </div>

                    <div id="member-title">
                        {{ '2P('+this.member2Name + ')' }}
                    </div>
                    <div id="relative-code-content">
                        <div v-if="this.buttonValuePlayer2">
                            {{ this.buttonValuePlayer2 }}
                        </div>
                        <div v-else>2P 작성중...</div>
                    </div>

                </div>
            </div>
        </body>
    
    </div>
</template>
    
<script>
import Monaco from '../../components/code/RankMonaco.vue'
import { apiClient } from '@/axios-interceptor'
import SweetAlert from '../../util/modal.js'
import GameEnd from '../../components/game/GameEnd.vue'
export default {
    name: 'rank',
    components: { Monaco, GameEnd },
    data() {
        return {
            rankNo: '',
            quizNo: '',
            testcaseNo: '',
            testcaseList: [],
            quizContent: '',
            quizTitle: '',
            timerRunning: true,
            minutes: 60,
            seconds: 0,
            socket: null,
            buttonValue: '',
            buttonValuePlayer1: '',
            buttonValuePlayer2: '',
            member1No: '',
            member2No: '',
            member1Name: '',
            member2Name: '',
            memberNo: '',
            memberName: '',
            parentButtonValue: '',
            count: 0,
            winMemberNo: '6',
            resultMemberNo: '7',
            gameEnd: false,

        }
    },
    computed: {
        formattedTime() {
            return `${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`;
        },
    },

    methods: {
        setRunValue(dataFromChild){
            this.buttonValue = dataFromChild;
            this.sendMessage()
        },
        setSubmitValue(dataFromChild){
            this.buttonValue = dataFromChild
            this.sendMessage()
        },
        backOff() {
            this.gameEnd=false
            document.body.style.overflow = 'auto'

        },
        setWinMember(dataFromChild){
            this.winMemberNo = dataFromChild;
            console.log(this.winMemberNo)
            var winMember = {
                type: 'CODE_STATUS',
                codeRoomNo: this.roomNo,
                codeSender: this.memberName,
                codeStatus: this.winMemberNo + ',win'
            }
            this.socket.send(JSON.stringify(winMember))
        },
        connect(){
            this.socket = new WebSocket(this.socketURL)

            this.socket.onopen = () => {
                const enterMessage = {
                    type: 'CODE_ENTER',
                    codeRoomNo: this.rankNo,
                    codeSender: this.memberName
                }
                this.socket.send(JSON.stringify(enterMessage))
            }

            this.socket.onclose = () => { }
            this.socket.onerror = () => { }

            this.socket.onmessage = (e) => {
                if(this.socket.readyState === WebSocket.OPEN){

                    const rawData = e.data;
                    const colonIndex = rawData.indexOf(':');
                    var msgMemberName = ''
                    var msgMemberButtonValue = ''
                    //test1: run
                    if (colonIndex !== -1) {
                        msgMemberName = rawData.substring(0, colonIndex).trim();
                        msgMemberButtonValue = rawData.substring(colonIndex + 1).trim();

                        if(this.member1Name === msgMemberName){
                            this.buttonValuePlayer1 = msgMemberButtonValue
                        }
                        else if(this.member2Name === msgMemberName){
                            this.buttonValuePlayer2 = msgMemberButtonValue
                        }
                    }
                    const colonIndex2 = msgMemberButtonValue.indexOf(',');
                    if(colonIndex2 !== -1){
                        this.resultMemberNo = msgMemberButtonValue.substring(0, colonIndex2).trim();
                        this.gameEnd=true
                    }
                    this.parentButtonValue = this.count + e.data;
                    this.count++;
                    this.buttonValue = e.data;
                }else if(
                    this.socket.readyState === WebSocket.CLOSING ||
                    this.socket.readyState === WebSocket.CLOSED
                ){
                    this.connect()
                }

            }
        },
        disconnect(){
            if(this.socket.readyState === WebSocket.OPEN) {
                const outMessage = {
                    type: 'CODE_QUIT',
                    codeRoomNo: this.rankNo,
                    codeSender: this.memberName
                }
                this.socket.send(JSON.stringify(outMessage))
                this.socket.close()
            }
        },
        sendMessage(){
            if(this.buttonValue == '') return
            var talkMessage = {
                type: 'CODE_STATUS',
                codeRoomNo: this.rankNo,
                codeSender: this.memberName,
                codeStatus: this.buttonValue
            }
            this.socket.send(JSON.stringify(talkMessage))

            if(this.member1Name ===  this.memberName){
                this.buttonValuePlayer1 = this.buttonValue
            }
            else if(this.member2Name === this.memberName){
                this.buttonValuePlayer2 = this.buttonValue
            }
            this.buttonValue = ''
        },
        unLoadEvent: function (event) {
            const outMessage = {
                type: 'CODE_QUIT',
                codeRoomNo: this.rankNo,
                codeSender: this.memberName
            }
            this.socket.send(JSON.stringify(outMessage))

            if (this.socket.readyState === WebSocket.OPEN) {
                this.socket.close()
            }
            event.preventDefault()
            event.returnValue = ''
        },
        exitButtonClickHandler() {
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
            if (this.seconds === 0 && this.minutes === 0) {
                if (confirm("시간이 초과되어 메인으로 이동합니다")) {
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
    created() {
        window.addEventListener('beforeunload', this.beforeUnloadHandler);
        //타이머 시작
        this.updateTimer();
        this.rankNo = this.$router.currentRoute.value.params.rankNo

        // quizNo
        const url = `${this.backURL}/rankgame/${this.rankNo}`
        apiClient
            .get(url, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.quizNo = response.data.quizNo

                //  quizContent, quizTitle
                const url2 = `${this.backURL}/quiz/${this.quizNo}`
                apiClient
                    .get(url2, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        this.quizContent = response.data.quizContent
                        this.quizTitle = response.data.quizTitle
                    })
                    .catch(() => {
                        alert('문제 조회에 실패하였습니다')
                    })

                // testcaseList
                const url3 = `${this.backURL}/submit/${this.quizNo}`
                apiClient
                    .get(url3, {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then((response) => {
                        this.testcaseList = response.data
                    })
                    .catch(() => {
                        alert('테스트케이스 조회에 실패하였습니다')
                    })
            })
            .catch(() => {
                alert('문제 정보 조회에 실패하였습니다')
            })
            //memberNo
            const url4 = `${this.backURL}/member/memberNo`
            apiClient
            .get(url4, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                this.memberNo = response.data

                //memberName
                const url5 = `${this.backURL}/member/${this.memberNo}`
                apiClient
                .get(url5, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    this.memberName = response.data.memberName
                })
            })

    },
    mounted(){
        const url = `${this.backURL}/rankgame/${this.rankNo}`
        apiClient
        .get(url, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            this.member1No = response.data.member1No
            this.member2No = response.data.member2No
            this.member1Name = response.data.member1Name
            this.member2Name = response.data.member2Name
        })
        .catch(async (error) => {
            const ok = await SweetAlert.error(error.response.data.errors[0])
            if (ok) {
                this.$router.push({ path: '/' })
            }
        })
        window.addEventListener('beforeunload', this.unLoadEvent)
        this.rankNo = this.$router.currentRoute.value.params.rankNo
        this.connect()
    },
    beforeUnmount() {
        const outMessage = {
            type: 'CODE_QUIT',
            codeRoomNo: this.rankNo,
            codeSender: this.memberName
        }
        this.socket.send(JSON.stringify(outMessage))
        this.disconnect()
    },
    beforeDestroy() {
        // 컴포넌트가 파괴되기전 이벤트 리스너 제거
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
    #member-title{
        width: 200px;
        text-align: center;
        white-space: nowrap; /* 텍스트를 한 줄에 나타내기 위해 */
        overflow: hidden;    /* 넘치는 텍스트를 숨김 */
        text-overflow: ellipsis; /* 넘치는 텍스트에 "..." 추가 */
    }
    
    
    #problem-des-container{
        box-sizing: border-box;
        height: 33vh;
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
        height: 33vh;
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
        height: 40vh;
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
