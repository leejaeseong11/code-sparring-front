<template>
  <div class="layout">
    <div v-if="this.gameEnd" id="back-off" @click="backOff"></div>
    <GameEnd id="end-popup" v-if="this.gameEnd" @close-popup="backOff"></GameEnd>
    <header>
      <div id="popup" class="popup">
        <div class="popup-content"></div>
      </div>
      <div class="headerBar">
        <button class="addQuizEx" @mouseover="onHelp" @mouseleave="offHelp" id="helpBt">?</button
        >&nbsp;&nbsp;문제 추가하기
      </div>
    </header>
    <div v-if="this.popup" class="testcasePopup" @click="offWarning">
      <div class="popupBt">
        <div id="outTestcase">
          <img
            src="../../../public/images/quiz/addTestcaseOut.png"
            @click="offPopup"
            class="outTestcase"
          />
        </div>
        <div>
          <button class="testcaseWarn" @mouseover="warning" @mouseleave="warning">!</button>
          <button
            class="testcaseHelp"
            id="testcaseHelp"
            @mouseover="onTcHelp"
            @mouseleave="offTcHelp"
          >
            ?
          </button>
        </div>
      </div>
      <div id="popupInTc" class="popupInTc">
        <div class="popupTc-content"></div>
      </div>
      <div class="testcaseBox">
        <div class="testcaseInput">
          <div style="height: 10%">&nbsp;&nbsp;Input</div>
          <div v-for="index in 10" :key="index" class="inputDiv">
            <input
              class="inputValue"
              placeholder="입력값을 입력하세요"
              v-model="inputValueList[index - 1]"
            />
          </div>
        </div>
        <div class="testcaseOutput">
          <div style="height: 10%">&nbsp;Output</div>
          <div v-for="index in 10" :key="index" class="outputDiv">
            <input
              class="outputValue"
              placeholder="리턴값을 입력하세요"
              v-model="outputValueList[index - 1]"
            />
          </div>
        </div>
        <div v-if="this.testcaseWarning" class="testcaseWarning">
          <div
            style="
              background-color: var(--red-color);
              height: 45px;
              line-height: 45px;
              color: var(--main1-color);
            "
          >
            주의사항
          </div>
          <br />
          [Input] 아래 예시와 같이 선언 형식으로 작성하세요.<br />
          <span style="color: var(--red-color); background-color: var(--main1-color)"
            >int a=1; String[] str={"abc", "de", "f"}; &nbsp;🙆<br />
            int a=1, String [] str={abc, de, f} &nbsp;🙅 </span
          ><br /><br />
          [Output] 예시와 같이 리턴 타입을 준수하여 작성하세요.<br />
          <span style="color: var(--red-color); background-color: var(--main1-color)"
            >ex. 리턴 타입이 String인 경우, "de"<br /><br
          /></span>
          테스트케이스 10개 미만은 문제 제출이 불가합니다. (10개 고정!)<br />또한 잘못된 입력은 오류가 발생할 수 있으니 주의하세요.
        </div>
      </div>
    </div>
    <div class="addTitle">
      <input
        class="titleInput"
        placeholder="문제 타이틀을 입력하세요"
        id="title"
        v-model="title"
        @keyup="titleText"
      />
    </div>
    <div class="addQuizBox">
      <div class="quizInfo">
        <div class="addInfo">
          <textarea
            class="infoInput"
            placeholder="문제를 설명하세요"
            id="info"
            v-model="info"
            @keyup="updateByteInfo()"
          ></textarea>
          <div class="byte-info" id="byteInfo">0 / 10000 자</div>
        </div>
        <div class="addInput">
          Input&nbsp;&nbsp;
          <button class="addInputBt" type="button" @click="addInputBtClick">+</button>&nbsp;
          <button class="subInputBt" type="button" @click="subInputBtClick">-</button>
          <table class="inputTable" id="inputTable">
            <tr>
              <td>
                <input placeholder="입력값 형식을 입력하세요" id="input1" />
              </td>
              <td><input placeholder="입력값을 설명하세요" id="inputInfo1" /></td>
            </tr>
          </table>
        </div>
        <div class="addOutput">
          Output<br />
          <table class="outputTable">
            <tr>
              <td>
                <input placeholder="리턴 타입을 입력하세요" id="returnType" v-model="returnType" />
              </td>
              <td>
                <input placeholder="리턴값을 설명하세요" id="returnInfo" v-model="returnInfo" />
              </td>
            </tr>
          </table>
        </div>
        <div class="addExCode">
          <label for="fileInput" style="display: flex; justify-content: space-between">
            <div class="fileUpload">정답 코드 첨부</div>
            <div class="fileName">선택된 파일 없음</div>
          </label>
          <input type="file" id="fileInput" accept=".java" @change="updateFileName" />
        </div>
      </div>
      <div class="consoleEx">
        <textarea
          class="console"
          placeholder="/* Console 창 예시 */"
          id="console"
          @click="lock"
          readonly
        ></textarea>
      </div>
    </div>
    <div class="btBox">
      <button class="addTestcase" @click="addTestcase">테스트케이스 설정</button>
      <div class="rightBt">
        <button class="cancleBt" @click="cancleBtClick" type="button">취소하기</button>
        <button class="submitBt" @click="submitBtClick" type="button">확인하기</button>
        <button v-if="consoleChk" class="submitBt" @click="addQuizBtClick" type="submit">
          추가하기
        </button>
      </div>
    </div>
    <div v-if="popup" class="backOff" @click="clickBackOff"></div>
  </div>
</template>
<script>
import axios from 'axios'
import GameEnd from '../../components/game/GameEnd.vue'

export default {
  name: 'addQuiz',
  components: {GameEnd},
  data() {
    return {
      title: '',
      info: '',
      inputCnt: 1,
      consoleChk: false,
      returnType: '',
      returnInfo: '',
      consoleCode: '',
      popup: false,
      inputValueList: [],
      outputValueList: [],
      testcaseWarning: false,
      gameEnd: false
    }
  },
  methods: {
    onHelp() {
      const popup = document.getElementById('popup')
      popup.style.display = 'block'

      const title = document.getElementById('title')
      title.placeholder = '[ 문제 생성 예시 ] 인덱스로 배열의 값 찾기'

      const info = document.getElementById('info')
      info.placeholder =
        '\n 숫자 a와 배열 str이 주어진다. \n 이때 str의 a번째 인덱스에 해당하는 값을 리턴하라.'

      if (this.inputCnt <= 1) {
        const input1 = document.getElementById('input1')
        input1.placeholder = 'int a'
        const inputInfo1 = document.getElementById('inputInfo1')
        inputInfo1.placeholder = '인덱스로 이용될 숫자 a이다.'

        const inputTable = document.getElementById('inputTable')
        const newRow = inputTable.insertRow()
        newRow.style.height = '36px'
        newRow.style.margin = '0'
        newRow.style.color = 'var(--main5-color)'
        newRow.style.cursor = 'default'
        newRow.style.position = 'relative'
        newRow.innerHTML =
          '<td style="width: 50%; height: 30px; border: 3px solid var(--main5-color); border-radius: 3px;"><input value="String[] str", style="width: 98%; height: 30px; padding-left: 5px; border: none; background-color: var(--main1-color); font-size: 15px; color: var(--main2-color);" /></td><td style="width: 50%; height: 30px; border: 3px solid var(--main5-color); border-radius: 3px;"><input value="주어지는 배열이다.", style="width: 98%; height: 30px; padding-left: 5px; border: none; background-color: var(--main1-color); font-size: 15px; color: var(--main2-color);" /></td>'
      }

      const returnType = document.getElementById('returnType')
      returnType.placeholder = 'String'

      const returnInfo = document.getElementById('returnInfo')
      returnInfo.placeholder = '인덱스에 해당하는 문자열이다.'

      const console = document.getElementById('console')
      console.innerHTML =
        '\n [ 문제 추가 방법 ] \n\n "확인하기" 클릭 시, console에 출력될 형태를 확인할 수 있습니다. \n   또한 클릭 후 "추가하기" 버튼이 표시됩니다. \n "추가하기" 버튼을 누르면 문제 추가 완료! \n\n\n [ Console 창 예시 ]\n\n  public  String  answer  ( int  a,  String[ ]  str )  {\n \t String  result = ""; \n\n \t return  result;\n  }'
    },
    offHelp() {
      const popup = document.getElementById('popup')
      popup.style.display = 'none'

      const title = document.getElementById('title')
      title.placeholder = '문제 타이틀을 입력하세요'

      const info = document.getElementById('info')
      info.placeholder = '문제를 설명하세요'

      const input1 = document.getElementById('input1')
      input1.placeholder = '입력값 형식을 입력하세요'

      const inputInfo1 = document.getElementById('inputInfo1')
      inputInfo1.placeholder = '입력값을 설명하세요'

      const inputTable = document.getElementById('inputTable')
      while (inputTable.rows.length > this.inputCnt) {
        inputTable.deleteRow(1)
      }

      const returnType = document.getElementById('returnType')
      returnType.placeholder = '리턴 타입을 입력하세요'

      const returnInfo = document.getElementById('returnInfo')
      returnInfo.placeholder = '리턴값을 설명하세요'

      const console = document.getElementById('console')
      console.innerHTML = this.consoleCode
    },
    updateFileName(e) {
      const input = e.target
      const fileNameDiv = document.querySelector('.fileName')

      if (input.files.length > 0) {
        fileNameDiv.textContent = input.files[0].name
      } else {
        fileNameDiv.textContent = '선택된 파일 없음'
      }
    },
    addInputBtClick() {
      if (this.inputCnt == 5) {
        alert('테스트케이스 입력값 종류는 최대 5개입니다')
        return
      }
      const inputTable = document.getElementById('inputTable')
      const newRow = inputTable.insertRow()
      newRow.style.height = '36px'
      newRow.style.margin = '0'
      newRow.style.color = 'var(--main5-color)'
      newRow.style.cursor = 'default'
      newRow.style.position = 'relative'
      newRow.innerHTML =
        '<td style="width: 50%; height: 30px; border: 3px solid var(--main5-color); border-radius: 3px;"><input placeholder="입력값 형식을 입력하세요", style="width: 98%; height: 30px; padding-left: 5px; border: none; background-color: var(--main1-color); font-size: 15px; color: var(--main5-color);" /></td><td style="width: 50%; height: 30px; border: 3px solid var(--main5-color); border-radius: 3px;"><input placeholder="입력값을 설명하세요", style="width: 98%; height: 30px; padding-left: 5px; border: none; background-color: var(--main1-color); font-size: 15px; color: var(--main5-color);" /></td>'
      const style = document.createElement('style')
      style.innerHTML = `
        ::placeholder {
          color: var(--main2-color);
        }
      `
      document.getElementsByTagName('head')[0].appendChild(style)
      this.inputCnt++
    },
    subInputBtClick() {
      if (this.inputCnt > 0) {
        const inputTable = document.getElementById('inputTable')
        inputTable.deleteRow(this.inputCnt - 1)
        this.inputCnt--
      }
    },
    addTestcase() {
      document.body.style.overflow = 'hidden'
      this.popup = true
    },
    offPopup() {
      if (this.testcaseWarning) {
        return
      }
      document.body.style.overflow = 'auto'
      this.popup = false
    },
    clickBackOff() {
      document.body.style.overflow = 'auto'
      this.popup = false
    },
    titleText() {
      const title = document.getElementById('title')
      const maxLength = 5
      const currentLength = title.value.length

      if (currentLength == maxLength + 1) {
        title.value = title.value.slice(0, maxLength)
        this.title = title.value
      } else if (currentLength > maxLength + 1) {
        alert('제목의 글자 수는 50자 이하입니다')
        title.value = title.value.slice(0, maxLength)
        this.title = title.value
      }
    },
    updateByteInfo() {
      const info = document.getElementById('info')
      const byteInfo = document.getElementById('byteInfo')
      const maxLength = 10000

      const currentLength = info.value.length
      byteInfo.innerHTML = currentLength + ' / ' + maxLength + ' 자'

      if (currentLength > maxLength) {
        byteInfo.style.color = 'var(--red-hover-color)'
        info.value = info.value.slice(0, maxLength)
        byteInfo.innerHTML = maxLength + ' / ' + maxLength + ' 자'
        this.infoInput = info.value
      } else if (currentLength == maxLength) {
        byteInfo.style.color = 'var(--main3-color)'
      } else {
        byteInfo.style.color = 'rgba(124, 124, 153, 0.3)'
      }
    },
    cancleBtClick() {
      alert('문제 추가를 취소합니다')
      location.href = '/'
    },
    submitBtClick() {
      let returnHtml = ''
      const x = this.returnType
      if (x == '') this.returnType = 'void'
      if (x == 'String' || x == 'string') {
        returnHtml = '""'
        this.returnType = 'String'
      } else if (
        x == 'int' ||
        x == 'Integer' ||
        x == 'Int' ||
        x == 'char' ||
        x == 'Char' ||
        x == 'Character' ||
        x == 'byte' ||
        x == 'Byte' ||
        x == 'short' ||
        x == 'Short'
      ) {
        if (this.returnType == 'Int') this.returnType = 'int'
        if (this.returnType == 'Char') this.returnType = 'char'
        returnHtml = '0'
      } else if (x == 'double' || x == 'Double' || x == 'float' || x == 'Float') {
        returnHtml = '0.0'
      } else if (x == 'long' || x == 'Long') {
        returnHtml = '0L'
      } else if (x == 'boolean' || x == 'Boolean') {
        returnHtml = 'true'
      } else {
        returnHtml = 'null'
      }

      const inputTable = document.getElementById('inputTable')
      this.consoleChk = true
      alert('console 창 예시를 확인하세요')

      const console = document.getElementById('console')
      let html = '\n  public  ' + this.returnType + '  answer  ( '
      let row = 0
      while (row != this.inputCnt - 1) {
        const cellObj = inputTable.rows[row].cells[0]
        const inputObj = cellObj.querySelector('input')
        html += inputObj.value + ',  '
        row++
      }
      const cellObj = inputTable.rows[row].cells[0]
      const inputObj = cellObj.querySelector('input')
      if (x == '' || x == 'void') {
        html += inputObj.value + ' )  {\n\n  }'
        this.returnType = 'void'
      } else {
        html +=
          inputObj.value +
          ' )  {\n \t ' +
          this.returnType +
          '  result = ' +
          returnHtml +
          '; \n\n \t return  result;\n  }'
      }

      console.innerHTML = html
      this.consoleCode = html
    },
    addQuizBtClick() {

      this.gameEnd=true
    },
    onTcHelp() {
      if (this.testcaseWarning) {
        return
      }

      const popup = document.getElementById('popupInTc')
      popup.style.display = 'block'

      const inputValue = document.getElementsByClassName('inputValue')
      inputValue[0].placeholder = 'int a=1; String[] str={"apple", "banana", "orange"};'
      inputValue[1].placeholder = 'int a=0; String[] str={"Happy", "Birthday"};'
      inputValue[2].placeholder = 'int a=3; String[] str={"aa", "bb", "cc", "dd", "ee"};'
      inputValue[3].placeholder = 'int a=2; String[] str={"aa", "bb", "cc", "dd", "ee"};'
      inputValue[4].placeholder = 'int a=4; String[] str={"aa", "bb", "cc", "dd", "ee"};'
      inputValue[5].placeholder =
        'int a=6; String[] str={"I", "me", "you", "we", "our", "us", "them", "they", "he", "she"};'
      inputValue[6].placeholder = 'int a=1; String[] str={"Lion", "Tiger", "Rabbit"};'
      inputValue[7].placeholder = 'int a=0; String[] str={"heart", "spade", "diamond", "clover"};'
      inputValue[8].placeholder = 'int a=2; String[] str={"8u3418y", "3ur0n19", "1jnf9v"};'
      inputValue[9].placeholder = 'int a=1; String[] str={"901120", "880208", "981213", "930430"};'

      const outputValue = document.getElementsByClassName('outputValue')
      outputValue[0].placeholder = '"banana"'
      outputValue[1].placeholder = '"Happy"'
      outputValue[2].placeholder = '"dd"'
      outputValue[3].placeholder = '"cc"'
      outputValue[4].placeholder = '"ee"'
      outputValue[5].placeholder = '"them"'
      outputValue[6].placeholder = '"Tiger"'
      outputValue[7].placeholder = '"heart"'
      outputValue[8].placeholder = '"1jnf9v"'
      outputValue[9].placeholder = '"880208"'
    },
    offTcHelp() {
      const popup = document.getElementById('popupInTc')
      popup.style.display = 'none'

      const inputValue = document.getElementsByClassName('inputValue')
      for (let i = 0; i < inputValue.length; i++) {
        inputValue[i].placeholder = '입력값을 입력하세요'
      }

      const outputValue = document.getElementsByClassName('outputValue')
      for (let i = 0; i < outputValue.length; i++) {
        outputValue[i].placeholder = '리턴값을 입력하세요'
      }
    },
    warning() {
      if (this.testcaseWarning) {
        this.testcaseWarning = false
        return
      }
      this.testcaseWarning = true
    },
    offWarning(e) {
      if (e.target.className == 'testcaseWarn') {
        return
      }
      this.testcaseWarning = false
    },
    backOff() {
      this.gameEnd=false
      document.body.style.overflow = 'auto'
    },
  }
}
</script>
<style scoped>
.layout {
  min-width: 1024px;
}
* {
  height: 100%;
  margin: 0;
  color: var(--main5-color);
  position: relative;
}

div{
  cursor: default;
}

header {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 3px;
}

button {
  cursor: pointer;
  background-color: var(--main4-color);
  color: var(--main1-color);
  background-color: var(--main4-color);
  border: 3px solid var(--main4-color);
  border-radius: 8px;
}

input,
textarea {
  border: none;
  background-color: var(--main1-color);
  font-size: 15px;
  cursor: text;
}

textarea {
  resize: none;
}

input:focus,
textarea:focus {
  outline: none;
}

::placeholder {
  color: var(--main2-color);
}
.headerBar {
  font-size: 25px;
  text-align: right;
  width: 100%;
  margin-right: 20px;
  padding-top: 45px;
}

.addQuizEx,
.testcaseWarn,
.testcaseHelp {
  width: 30px;
  height: 30px;
  background-color: var(--main2-color);
  border: none;
  font-size: 20px;
}

.addTitle,
.titleInput {
  background-color: var(--main5-color);
  height: 45px;
}

.addTitle {
  width: 98%;
  left: 1%;
  border: 15px solid;
  border-radius: 15px;
  height: 100%;
  margin-top: 5px;
}

.titleInput {
  border: none;
  color: #eaebfe;
  width: 95%;
  /* margin-left: 20px; */
  height: 90%;
  font-size: large;
}

.addQuizBox {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.quizInfo {
  width: 48%;
}

.addInfo {
  border: 3px solid var(--main5-color);
  border-radius: 10px;
  margin-top: 10px;
  margin-left: 15px;
  width: 100%;
  height: 300px;
}

.infoInput {
  margin-left: 15px;
  margin-top: 10px;
  width: 96%;
  height: 93%;
  vertical-align: top;
}

.consoleEx {
  border: 3px solid var(--main5-color);
  border-radius: 10px;
  width: 48%;
  height: 550px;
  margin-top: 10px;
  margin-right: 15px;
  margin-left: 20px;
}

.console {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 5px;
  width: 96%;
  height: 96%;
  color: var(--main5-color);
  font-size: large;
  cursor: default;
}

.addInput,
.addOutput {
  margin-left: 15px;
  margin-top: 10px;
  width: 100%;
}

.addInputBt,
.subInputBt,
.addTestcaseBt {
  width: 22px;
  height: 22px;
  font-size: 20px;
  line-height: 17px;
}

.subInputBt {
  background-color: var(--red-color);
  border-color: var(--red-color);
}

.subInputBt:hover {
  background-color: var(--red-hover-color);
  border-color: var(--red-hover-color);
}

.inputTable,
.outputTable {
  width: 100%;
}

div.addQuizBox > div.quizInfo > div.addInput > table.inputTable > tr > td,
div.addQuizBox > div.quizInfo > div.addOutput > table.outputTable > tr > td {
  width: 50%;
  height: 30px;
  border: 3px solid var(--main5-color) !important;
  border-radius: 3px;
}

div.addQuizBox > div.quizInfo > div.addInput > table.inputTable > tr > td > input,
div.addQuizBox > div.quizInfo > div.addOutput > table.outputTable > tr > td > input {
  width: 98%;
  height: 30px;
  padding-left: 5px;
}

.addExCode {
  margin-top: 10px;
  padding-top: 10px;
  margin-left: 15px;
  font-size: large;
  width: 100%;
  cursor: pointer;
}

.fileName {
  cursor: pointer;
  line-height: 65px;
  color: var(--main2-hover-color);
}

.addTestcase,
.cancleBt,
.submitBt,
.fileUpload {
  width: 150px;
  height: 50px;
  margin-top: 10px;
  font-size: large;
}

.fileUpload:hover {
  background-color: var(--main2-hover-color);
  border-color: var(--main2-hover-color);
}

.addTestcase {
  margin-left: 15px;
}

.addTestcase:hover {
  background-color: var(--main4-hover-color);
  border-color: var(--main4-hover-color);
}

.btBox {
  display: flex;
  justify-content: space-between;
}

.addTestcase {
  background-color: var(--main3-color);
  border-color: var(--main3-color);
  width: 200px;
}

.cancleBt,
.submitBt {
  margin-right: 15px;
}

.submitBt:hover {
  background-color: var(--main4-hover-color);
  border-color: var(--main4-hover-color);
}

.cancleBt {
  background-color: var(--red-color);
  border-color: var(--red-color);
}

.cancleBt:hover {
  background-color: var(--red-hover-color);
  border-color: var(--red-hover-color);
}

.fileUpload {
  cursor: pointer;
  color: var(--main1-color);
  background-color: var(--main2-color);
  border: 3px solid var(--main2-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
}

#fileInput {
  display: none;
}

.popup,
.popupInTc {
  display: none;
  position: fixed;
  left: 0;
  width: 100%;
}

.popup {
  /* top: 100px; */
  height: 1000%;
}

.popupInTc {
  top: 150px;
  width: 71%;
  left: 14%;
  height: 68%;
}

.popup-content,
.popupTc-content {
  /* background-color: #fff;  */
  width: 500px;
  padding: 20px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.testcasePopup {
  position: fixed;
  top: 10%;
  left: 20%;
  padding: 20px;
  width: 60%;
  height: 60%;
  background-color: var(--main1-color);
  border: 7px solid;
  border-radius: 25px;
  border-color: var(--main5-color);
  z-index: 3;
}

.outTestcase {
  margin-left: 5px;
  color: var(--main5-color);
  font-size: x-large;
  cursor: pointer;
  top: 0px;
  transition: transform 0.5s;
  &:hover {
    color: red;
    transform: rotate(180deg);
  }
}

.testcaseWarn {
  background-color: var(--red-color);
  margin-right: 5px;
  position: absolut;
}

.testcaseWarn:hover {
  background-color: var(--red-hover-color);
}

.popupBt {
  display: flex;
  justify-content: space-between;
  height: 5%;
}

.testcaseBox {
  width: 100%;
  height: 90%;
  top: 3%;
  font-size: x-large;
  display: flex;
  justify-content: space-between;
}

.addTestcaseBt {
  top: 2px;
  right: 5px;
  width: 25px;
  height: 25px;
}

.testcaseInput {
  width: 60%;
  margin-left: 5px;
}

.testcaseOutput {
  width: 35%;
  margin-right: 15px;
}

.inputDiv,
.outputDiv {
  width: 100%;
  height: 9%;
  text-align: center;
}

.inputValue,
.outputValue {
  width: 95%;
  height: 80%;
  border: 3px solid;
  border-radius: 5px;
  font-size: 16px;
  padding-left: 10px;
}

.testcaseWarning {
  width: 40%;
  top: 20%;
  left: 30%;
  height: 340px;
  text-align: center;
  font-size: 16px;
  background-color: #eaebfe;
  border: 3px solid #7c354c;
  border-radius: 30px;
  overflow: hidden;
  color: #022954;
  position: fixed;
}

.backOff {
  width: 100%;
  height: 100%;
  display: fixed;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0%;
  left: 0%;
  cursor: pointer;
  z-index: 2;
}

.addInputBt:hover {
  background-color: var(--main4-hover-color);
  border-color: var(--main4-hover-color);
}

.byte-info {
  font-size: 12px;
  color: rgba(124, 124, 153, 0.3);
  text-align: right;
  width: 100%;
  height: 20px;
  padding-right: 10px;
  bottom: 5%;
}

#end-popup {
  padding: 10px;
  position: absolute;
  background-color: var(--main5-color);
  border: 8px solid var(--main5-color);
  border-radius: 10px;
  width: 400px;
  height: 570px;
  margin-top: 80px;
  margin-left: 430px;
  z-index: 2;
  overflow: hidden;
}

#back-off {
  width: 100%;
  height: 100%;

  display: fixed;
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 1;

  background-color: rgba(0, 0, 0, 0.5);
}
</style>
