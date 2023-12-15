<template>
  <div id="testcase-object">
    <div class="index-name">테스트케이스 입력값</div>
    <textarea v-model="this.inputValue" placeholder="입력값을 작성하세요"></textarea>
    <div class="index-name">테스트케이스 출력값</div>
    <textarea v-model="this.outputValue" placeholder="출력값을 작성하세요"></textarea>
    <div id="bt-area">
      <div></div>
      <div>
        <button id="cancle-bt" @click="$emit('close-testcase')">취소</button>
        <button id="add-bt" @click="addTestcase">추가</button>
      </div>
    </div>
  </div>
</template>
<script>
import {apiClient} from '@/axios-interceptor'

export default {
  name: 'AddTestcase',
  data() {
    return {
      inputValue: '',
      outputValue: ''
    }
  },
  methods: {
    addTestcase() {
        const quizNo = this.$route.params.quizNo
        const url=`${this.backURL}/testcase/`+quizNo
        const data={
            testcaseInput: this.inputValue,
            testcaseOutput: this.outputValue
        }
        apiClient
          .post(url, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(() => {
            alert('테스트케이스가 추가되었습니다')
            window.history.go(0)
          }).catch(()=>{
             alert('테스트케이스 추가에 실패하였습니다')
          })
    }
  }
}
</script>
<style scoped>
.index-name {
  font-size: 25px;
}

textarea {
  width: 100%;
  height: 30%;
  padding: 5px;
  resize: none;
}

#bt-area {
  display: flex;
  justify-content: space-between;
}

button {
  border: 1px solid;
  border-radius: 10px;
  width: 60px;
  height: 40px;
  margin-top: 10px;
  color: var(--main1-color);
}

#cancle-bt {
  background-color: var(--red-color);
  border-color: var(--red-color);
  margin-right: 10px;

  &:hover {
    background-color: var(--red-hover-color);
    border-color: var(--red-hover-color);
  }
}

#add-bt {
  background-color: var(--main4-color);
  border-color: var(--main4-color);

  &:hover {
    background-color: var(--main4-hover-color);
    border-color: var(--main4-hover-color);
  }
}
</style>
