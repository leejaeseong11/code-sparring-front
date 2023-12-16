<template>
  <div id="layout">
    <div id="code-content" ref="scrollContainer" @scroll="handleScroll">
      <div id="announcement">🚨 랭크모드의 코드는 저장되지 않습니다! 🚨</div>
      <div v-for="code in codeList" :key="code" :class="'code-obj-' + code.quizCorrect" :id="'code.' + code.quizNo">
        <span class="opposing-name" >{{ code.quizCorrect === 1 ? '성공' : '실패' }}</span>
        <span class="opposing-name">{{ code.quizTitle }}</span>
        <span class="opposing-name">{{ code.quizDt }}</span>
        <button id="codeInfo" :data-quizno="code.quizNo" @click="codeClickHandler($event)">조회</button>
      </div>
    </div>
  </div>
</template>

<script>
import {apiClient} from '@/axios-interceptor'
export default {
    name: 'MyCode',
    data(){
        return{
            memberNo: '',
            quizNo: '',
            quizCorrect: '',
            quizUrl: '',
            quizDt: '',
            quizTitle: '',
            codeList: [],
            tmpList: [],

            roomPage: 0,
            roomSize: 8,
            totalPages: 1,

        }
    },
    methods: {
        handleScroll() {
            if (this.isScrolling) return
            const container = this.$refs.scrollContainer
            const scrollPosition = container.scrollTop + container.clientHeight
            const totalHeight = container.scrollHeight
            if (scrollPosition >= totalHeight) {
                this.isScrolling = true
                this.handleScrollEnd()
                // this.isScrolling = false
            }
        },
        handleScrollEnd() {
            const url = `${this.backURL}/mycode/${this.memberNo}`;
            apiClient.get(url).then((response) => {
                this.tmpList = response.data;
                this.tmpList.forEach((code) => {
    
                    const quizUrl = `${this.backURL}/quiz/${code.quizNo}`;
                    apiClient.get(quizUrl).then((quizResponse) => {
                        code.quizTitle = quizResponse.data.quizTitle;
                    });
                });
                
                this.codeList.push(...this.tmpList);
                this.tmpList = [];

                this.isScrolling = false;
            });
        },
        codeClickHandler(event) {
          const clickedElement = event.currentTarget;
          const quizNoValue = clickedElement.dataset.quizno;

          console.log('1. this.memberNo:', this.memberNo);
          console.log('2. quizNo:', quizNoValue);
          this.$router.push({ path: `/code/${this.memberNo}/${quizNoValue}` });
        },
    },
    mounted(){
        this.memberNo = this.$route.params.memberNo;

        const url = `${this.backURL}/mycode/${this.memberNo}`;
        apiClient
        .get(url)
        .then((response) => {
            this.codeList = response.data;
            this.codeList.forEach((code) => {
                const quizUrl = `${this.backURL}/quiz/${code.quizNo}`;
                apiClient.get(quizUrl).then((quizResponse) => {
                    code.quizTitle = quizResponse.data.quizTitle;
                });
            });
            this.quizNo = response.data[0].quizNo;
            this.quizCorrect = response.data[0].quizCorrect;
            this.quizUrl = response.data[0].quizUrl;
            this.quizDt = response.data[0].quizDt;
        })
        .catch((error) => {
            console.log(error);
        });
    }
    
}
</script>

<style scoped>
#layout{
  padding: 20px;
}
#code-content {
  height: 100%;
  overflow-y: scroll;
  margin-left: 5px;
}

#announcement{
  font-size: 20px;
  margin-bottom: 10px;
}

.code-obj-1,
.code-obj-0{
  width: 99%;
  height: 55px;
  padding: 0px 20px;
  border: 1px solid var(--main1-color);
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  &:hover {
    /* background-color: red;
    font-size: 300px; */
  }
}

.code-obj-1 {
  border: 5px double var(--main1-color);
  background: linear-gradient(
    40deg,
    var(--main4-hover-color) 5%,
    var(--main4-color) 5%,
    var(--main4-color) 20%,
    var(--main4-hover-color) 20%,
    var(--main4-hover-color) 40%,
    var(--main4-color) 40%,
    var(--main4-color) 60%,
    var(--main4-hover-color) 60%,
    var(--main4-hover-color) 80%,
    var(--main4-hover-color) 80%,
    var(--main4-color) 80%,
    var(--main4-color) 95%,
    var(--main4-hover-color) 95%
  );
}

.code-obj-0 {
  border: 5px double var(--main1-color);
  background: linear-gradient(
    40deg,
    var(--red-hover-color) 5%,
    var(--red-color) 5%,
    var(--red-color) 20%,
    var(--red-hover-color) 20%,
    var(--red-hover-color) 40%,
    var(--red-color) 40%,
    var(--red-color) 60%,
    var(--red-hover-color) 60%,
    var(--red-hover-color) 80%,
    var(--red-hover-color) 80%,
    var(--red-color) 80%,
    var(--red-color) 95%,
    var(--red-hover-color) 95%
  );
}

.opposing-name {
  width: 20%;
  line-height: 45px;
  color: var(--main1-color);
  font-size: 20px;
  text-align: center;
  white-space: nowrap; /* 텍스트를 한 줄에 나타내기 위해 */
  overflow: hidden;    /* 넘치는 텍스트를 숨김 */
  text-overflow: ellipsis; /* 넘치는 텍스트에 "..." 추가 */
}

.game-result {
  color: var(--main1-color);
  width: 50%;
  font-size: 20px;
}

#codeInfo{
  width: 10%;
  padding: 8px;
    margin: 5px;
    font-size: 1.0rem;

    color: var(--main1-color);
    background-color: var(--main3-color);
    border: none;
    border-radius: 6px;

    &:hover {
        background-color: var(--main3-hover-color);
    }
}

::-webkit-scrollbar {
  width: 0;
}

</style>

