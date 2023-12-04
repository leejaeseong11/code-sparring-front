<template>
  <header>
    <img src="../../../images/logo.gif" alt="logo" class="logo" />
    <div class="headerBar"><button class="addQuizEx">?</button>&nbsp;&nbsp;문제 추가하기</div>
  </header>
  <div class="addTitle">
    <input class="titleInput" placeholder="문제 타이틀을 입력하세요" />
  </div>
  <div class="addQuizBox">
    <div class="quizInfo">
      <div class="addInfo">
        <textarea class="infoInput" placeholder="문제를 설명하세요"></textarea>
      </div>
      <div class="addInput">
        Input&nbsp;&nbsp;<button class="addInputBt">+</button>
        <table class="inputTable">
          <tr>
            <td><input placeholder="입력값 형식을 입력하세요" /></td>
            <td><input placeholder="입력값을 설명하세요" /></td>
          </tr>
        </table>
      </div>
      <div class="addOutput">
        Output<br />
        <table class="outputTable">
          <tr>
            <td><input placeholder="리턴 타입을 입력하세요" /></td>
            <td><input placeholder="리턴값을 설명하세요" /></td>
          </tr>
        </table>
      </div>
      <div class="addExCode">
        <label for="fileInput">예시 코드 첨부 : </label>
        <input type="file" id="fileInput" accept=".java" />
      </div>
    </div>
    <div class="consoleEx">
      <div class="console">/* console 창 형태 예시 */</div>
    </div>
  </div>
  <div class="btBox">
    <button class="addTestcase">테스트케이스 추가</button>
    <div class="rightBt">
      <button class="cancleBt">취소하기</button>
      <button class="submitBt">확인하기</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'addQuiz'
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
  color: #eaebfe;
  background-color: var(--main4-color);
  border: 3px solid var(--main4-color);
  border-radius: 8px;
}

input,
textarea {
  border: none;
  background-color: var(--main1-color);
  font-size: 15px;
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
  width: 97%;
  height: 281px;
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
  align-self: flex-end;
  font-size: 15px;
  margin-left: 20px;
  overflow: scroll;
}

.console {
  margin-top: 20px;
  padding-left: 30px;
  width: 97%;
  height: auto;
  color: var(--main2-color);
}

.addInput,
.addOutput {
  margin-left: 15px;
  margin-top: 10px;
  width: 100%;
}

.addInputBt {
  width: 22px;
  height: 22px;
  font-size: 20px;
  line-height: 17px;
}

.inputTable,
.outputTable {
  width: 100%;
}

div.addQuizBox > div.quizInfo > div.addInput > table.inputTable > tbody > tr > td,
div.addQuizBox > div.quizInfo > div.addOutput > table.outputTable > tbody > tr > td {
  width: 50%;
  height: 30px;
  border: 3px solid var(--main5-color);
  border-radius: 3px;
}

div.addQuizBox > div.quizInfo > div.addInput > table.inputTable > tbody > tr > td > input,
div.addQuizBox > div.quizInfo > div.addOutput > table.outputTable > tbody > tr > td > input {
  width: 98%;
  height: 30px;
  padding-left: 5px;
}

.addExCode {
  margin-top: 20px;
  padding-top: 10px;
  margin-left: 15px;
  font-size: large;
  width: 100%;
}

.addTestcase,
.cancleBt,
.submitBt {
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

#fileInput {
  cursor: pointer;
}
</style>
