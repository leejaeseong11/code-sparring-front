<template>
  <header>
    <img src="../../../images/logo.gif" alt="logo" class="logo" @click="gotoMain" />
    <div class="headerBar">
      <button class="addQuizEx" @mouseenter="onHelp" @mouseleave="offHelp" id="helpBt">?</button
      >&nbsp;&nbsp;문제 추가하기
    </div>
  </header>
  <div id="popup" class="popup">
    <div class="popup-content"></div>
  </div>
  <div class="addTitle">
    <input class="titleInput" placeholder="문제 타이틀을 입력하세요" id="title" v-model="title" />
  </div>
  <div class="addQuizBox">
    <div class="quizInfo">
      <div class="addInfo">
        <textarea class="infoInput" placeholder="문제를 설명하세요" id="info" v-model="info"></textarea>
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
            <td><input placeholder="리턴값을 설명하세요" id="returnInfo" v-model="returnInfo" /></td>
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
        readonly
      ></textarea>
    </div>
  </div>
  <div class="btBox">
    <button class="addTestcase">테스트케이스 추가</button>
    <div class="rightBt">
      <button class="cancleBt" @click="cancleBtClick" type="button">취소하기</button>
      <button class="submitBt" @click="submitBtClick" type="button">확인하기</button>
      <button v-if="consoleChk" class="submitBt" @click="addQuizBtClick" type="submit">
        추가하기
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addQuiz',
  data() {
    return {
      title: '',
      info: '',
      inputCnt: 1,
      consoleChk: false,
      returnType: '',
      returnInfo: '',
      consoleCode: ''
    }
  },
  methods: {
    gotoMain() {
      alert('변경된 내용이 저장되지 않습니다')
      location.href='/'
    },
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
      if (this.inputCnt <= 1) {
        alert('입력값이 최소 1개는 존재해야 합니다')
      } else {
        const inputTable = document.getElementById('inputTable')
        inputTable.deleteRow(this.inputCnt - 1)
        this.inputCnt--
      }
    },
    cancleBtClick() {
      alert('문제 추가를 취소합니다.')
      location.href = '/'
    },
    submitBtClick() {
      let returnHtml = ''
      const x = this.returnType
      if(x=='') this.returnType='void'
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
      if(x=='' || x=='void') {
        html+=inputObj.value +' )  {\n\n  }'
        this.returnType='void'
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
      alert('문제가 추가되었습니다')
      location.href = '/'
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
  position: relative;
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

input:focus,
textarea:focus {
  outline: none;
}

::placeholder {
  color: var(--main2-color);
}

.logo {
  width: 150px;
  margin-left: 10px;
  margin-top: 10px;
  cursor: pointer;
}

.headerBar {
  font-size: 25px;
  text-align: right;
  width: 100%;
  margin-right: 20px;
  padding-top: 45px;
}

.addQuizEx {
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
  width: 100%;
}

.titleInput {
  border: none;
  color: #eaebfe;
  width: 95%;
  margin-left: 20px;
  font-size: large;
}

.addQuizBox {
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow: scroll;
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
  overflow: scroll;
}

.infoInput {
  margin-left: 15px;
  margin-top: 10px;
  width: 96%;
  height: 93%;
  overflow: scroll;
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
  overflow: scroll;
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
.subInputBt {
  width: 22px;
  height: 22px;
  font-size: 20px;
  line-height: 17px;
}

.subInputBt {
  background-color: var(--red-color);
  border-color: var(--red-color);
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

.addTestcase {
  margin-left: 15px;
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

.cancleBt {
  background-color: var(--red-color);
  border-color: var(--red-color);
}

.fileUpload {
  cursor: pointer;
  color: var(--main1-color);
  background-color: var(--main3-color);
  border: 3px solid var(--main3-color);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
}

#fileInput {
  display: none;
}

.popup {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 90%;
  margin-top: 100px;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  /* background-color: #fff;  */
  width: 500px;
  padding: 20px;
  border-radius: 8px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
