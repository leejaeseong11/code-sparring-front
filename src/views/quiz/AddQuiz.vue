<template>
  <div id="layout">
    <TestcaseHelp v-if="this.helpPop" id="help-popup"></TestcaseHelp>
    <div id="header">문제 만들기</div>

    <div id="title">
      <input id="title-obj" placeholder="제목을 입력하세요" />
    </div>

    <div id="content">
      <div id="testcase">
        <div id="input-info">
          <div class="index">| 입력값 설명</div>
          <textarea id="input-textarea" placeholder="입력값을 설명하세요"></textarea>
        </div>
        <div id="output-info">
          <div class="index">| 출력값 설명</div>
          <textarea id="output-textarea" placeholder="출력값을 설명하세요"></textarea>
        </div>
        <div id="testcase-value">
          <div class="index">
            | 테스트케이스 목록&nbsp;
            <button id="help-button" @mouseover="onOffHelp" @mouseout="onOffHelp">?</button>
          </div>
          <div id="testcase-content">
            <div style="height: 50px" v-for="index in testcaseCnt" :key="index">
              <textarea class="input-obj" placeholder="테스트케이스 입력값"></textarea>&nbsp;
              <textarea class="output-obj" placeholder="테스트케이스 출력값"></textarea>
            </div>
          </div>
        </div>

        <div id="answer-code">
            <button id="tc-add-button" @click="addTestcase" @mouseover="hoverBt" @mouseout="hoverBt">테스트케이스 추가</button>&nbsp;
            <span v-if="tcHelp" id="help-tc-add">클릭 시 목록에 입력칸이 추가됩니다</span>
        </div>
      </div>

      <div id="quiz-info">
        <div class="index">| 문제 내용</div>
        <textarea id="quiz-content" placeholder="문제를 설명하세요"></textarea>
        <div id="etc-button">
          
          <label for="fileInput" style="display: flex; justify-content: space-between">
            <button id="fileUpload" @click="openFile()">정답 코드 첨부</button>
            <div id="fileName" title="">선택된 파일 없음</div>
          </label>
          <input type="file" id="fileInput" accept=".java" @change="updateFileName" />
          <div id="right-button">
            <button id="cancle-button" @click="cancle">취소</button>&nbsp;
            <button id="add-button">저장</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TestcaseHelp from '../../components/quiz/TestcaseHelp.vue'
export default {
  name: 'AddQuiz',
  components: { TestcaseHelp },
  data() {
    return {
      testcaseCnt: 10,
      helpPop: false,
      tcHelp: false
    }
  },
  methods: {
    addTestcase() {
        this.testcaseCnt++
    },
    hoverBt() {
        this.tcHelp=!this.tcHelp
    },
    openFile() {
      document.getElementById('fileInput').click()
    },
    updateFileName(e) {
      const input = e.target
      const fileNameDiv = document.getElementById('fileName')
      if(input.files[0]==null) {
        fileNameDiv.innerHTML = '선택된 파일 없음'
        fileNameDiv.title = ''
       } else {
        fileNameDiv.innerHTML = input.files[0].name
        fileNameDiv.title = input.files[0].name
      }
    },
    onOffHelp() {
      this.helpPop = !this.helpPop
    },
    cancle() {
        location.href='/'
    }
  }
}
</script>
<style scoped>
* {
  height: 100%;
  margin: 0;
  color: var(--main5-color);
  cursor: default;
}

#layout {
  min-width: 1024px;
}

input {
  border: 3px solid var(--main5-color);
  border-radius: 5px;
  padding-left: 5px;
  cursor: text;

  &::placeholder {
    color: var(--main2-color);
  }
}

textarea {
  resize: none;
  outline: none;
  background-color: var(--main1-color);
  border: 3px solid var(--main5-color);
  border-radius: 5px;
  padding-left: 10px;
  padding-top: 5px;
  cursor: text;

  &::placeholder {
    color: var(--main2-color);
  }
}

button {
  border: 1px solid;
  border-radius: 10px;
  color: var(--main1-color);
  height: 50px;
  font-size: 18px;
}

#header {
  height: 85px;
  text-align: right;
  line-height: 120px;
  font-size: 25px;
  padding-right: 10px;
}

#title {
  height: 45px;
  border: 1px solid var(--main5-color);
  border-radius: 10px;
  background-color: var(--main5-color);
  margin-bottom: 10px;
  margin-top: 5px;
}

#title-obj {
  background-color: var(--main5-color);
  border: none;
  color: var(--main1-color);
  padding-left: 10px;
  width: 98%;
  font-size: 20px;
}

.index {
  font-size: 20px;
  margin-bottom: 10px;
  margin-top: 5px;
}

#content {
  display: flex;
  justify-content: space-between;
}

#testcase {
  width: 40%;
}

#input-info,
#input-textarea,
#output-info,
#output-textarea,
#testcase-value,
#quiz-content {
  width: 100%;
}

.input-obj,
.output-obj {
  display: inline-block;
  width: 49%;
  height: 40px;
}

#testcase-content {
  height: 250px;
  overflow: auto;
}

#help-button {
  width: 30px;
  height: 30px;
  font-size: 18px;
  border-radius: 5px;
  background-color: var(--main2-color);
  border-color: var(--main2-color);
  color: var(--white-color);

  &:hover {
    background-color: var(--main2-hover-color);
    border-color: var(--main2-hover-color);
  }
}

#quiz-info {
  width: 58%;
}

#quiz-content {
  height: 460px;
}

#fileUpload {
  width: 150px;
  background-color: var(--main3-color);
  border-color: var(--main3-color);

  &:hover {
    background-color: var(--main3-hover-color);
    border-color: var(--main3-hover-color);
  }
}

#fileInput {
  display: none;
}

#fileName {
  line-height: 50px;
  font-size: 18px;
  width: 350px;
  text-align: right;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: 10px;
}

#answer-code,
#etc-button {
  margin-top: 20px;
}

#etc-button {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

#tc-add-button {
  background-color: var(--main3-color);
  border-color: var(--main3-color);
  width: 170px;

  &:hover {
    background-color: var(--main3-hover-color);
    border-color: var(--main3-hover-color);
  }
}

#help-tc-add {
    background-color: var(--main2-color);
    color: var(--white-color);
    padding: 6px;
    border: 1px solid var(--main2-color);
    border-radius: 5px;
}

#cancle-button {
  background-color: var(--red-color);
  border-color: var(--red-color);
  width: 100px;

  &:hover {
    background-color: var(--red-hover-color);
    border-color: var(--red-hover-color);
  }
}

#add-button {
  background-color: var(--main4-color);
  border-color: var(--main4-color);
  width: 100px;

  &:hover {
    background-color: var(--main4-hover-color);
    border-color: var(--main4-hover-color);
  }
}

#help-popup {
  padding: 10px;
  position: absolute;
  background-color: var(--main2-color);
  border: 8px solid var(--main2-color);
  color: var(--white-color);
  border-radius: 10px;
  width: 710px;
  min-width: 710px;
  height: 290px;
  margin-top: 360px;
  margin-left: 230px;
  z-index: 2;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 0px;
}
</style>
