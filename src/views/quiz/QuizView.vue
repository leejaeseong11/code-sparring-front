<template>
  <main>
    <div id="layout">
      <div id="header">
        <div></div>
        <button v-if="!modifyBt" id="back-button" @click="backHome">뒤로가기</button>
        <button v-if="modifyBt" id="not-button">임시버튼</button>
      </div>

      <div id="title">
        <div v-if="!modifyBt" id="quiz-title-div">대충 제목이라 칩시다 맞다 근데 db 제목 길이 수정해야됨 잊지말기 지금 너무 짧음</div>
        <input v-if="modifyBt" id="quiz-title-input" :value="'대충 제목이라 칩시다 맞다 근데 db 제목 길이 수정해야됨 잊지말기 지금 너무 짧음'">
      </div>

      <div id="quiz-box">
        <div id="info">
          <div id="quiz-info">
            <div class="index-name">문제 정보</div>
            <div class="info-div" id="tier">
              <span class="info-text">티어</span>:<span v-if="!modifyBt" class="info-span" id="quiz-tier">GOLD</span>
              <input v-if="modifyBt" id="quiz-tier-input" value="GOLD">
            </div>
            <div class="info-div" id="author">
              <span class="info-text">출제자</span>:<span class="info-span" id="quiz-author">나다 임마</span>
            </div>
            <div class="info-div" id="submit-cnt">
              <span class="info-text">제출된 횟수</span>:<span class="info-span" id="quiz-submit-cnt">10991회</span>
            </div>
            <div class="info-div" id="success-cnt">
              <span class="info-text">성공한 횟수</span>:<span class="info-span" id="quiz-success-cnt">7898회</span>
            </div>
            <div class="info-div" id="correct">
              <span class="info-text">정답률</span>:<span class="info-span" id="quiz-correct">71.86%</span>
            </div>
          </div>

          <div id="testcase">
            <div class="index-name">테스트케이스 목록</div>
            <div>솰라솰라다</div>
          </div>
        </div>

        <div id="content">
          <div class="index-name">문제 내용</div>
          <div v-if="!modifyBt" id="quiz-content">이 편지는 영국에서 최초로 시작되어 일년에 한 바퀴 돌면서 받는 사람에게 행운을 주었고 지금 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다. 영국에서 HGXWCH이라는 사람은 1930년에 이 편지를 받았습니다. 그는 비서에게 복사해서 보내라고 했습니다. 며칠 뒤에 복권에 당첨되어 20억을 받았습니다. 어떤 이는 이 편지를 받았으나 96시간 이내 자신의 손에서 떠나야 한다는 사실을 잊었습니다. 그는 곧 사직되었습니다. 나중에야 이 사실을 알고 7통의 편지를 보냈는데 다시 좋은 직장을 얻었습니다. 미국의 케네디 대통령은 이 편지를 받았지만 그냥 버렸습니다. 결국 9일 후 그는 암살 당했습니다. 기억해 주세요. 이 편지를 보내면 7년의 행운이 있을 것이고 그렇지 않으면 3년의 불행이 있을 것입니다. 그리고 이 편지를 버리거나 낙서를 해서는 절대로 안됩니다. 7통입니다. 이 편지를 받은 사람은 행운이 깃들 것입니다. 힘들겠지만 좋은게 좋다고 생각하세요. 7년의 행운을 빌면서..
            만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?
            만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?</div>
          <textarea v-if="modifyBt" id="quiz-content">이 편지는 영국에서 최초로 시작되어 일년에 한 바퀴 돌면서 받는 사람에게 행운을 주었고 지금 당신에게로 옮겨진 이 편지는 4일 안에 당신 곁을 떠나야 합니다. 이 편지를 포함해서 7통을 행운이 필요한 사람에게 보내 주셔야 합니다. 복사를 해도 좋습니다. 혹 미신이라 하실지 모르지만 사실입니다. 영국에서 HGXWCH이라는 사람은 1930년에 이 편지를 받았습니다. 그는 비서에게 복사해서 보내라고 했습니다. 며칠 뒤에 복권에 당첨되어 20억을 받았습니다. 어떤 이는 이 편지를 받았으나 96시간 이내 자신의 손에서 떠나야 한다는 사실을 잊었습니다. 그는 곧 사직되었습니다. 나중에야 이 사실을 알고 7통의 편지를 보냈는데 다시 좋은 직장을 얻었습니다. 미국의 케네디 대통령은 이 편지를 받았지만 그냥 버렸습니다. 결국 9일 후 그는 암살 당했습니다. 기억해 주세요. 이 편지를 보내면 7년의 행운이 있을 것이고 그렇지 않으면 3년의 불행이 있을 것입니다. 그리고 이 편지를 버리거나 낙서를 해서는 절대로 안됩니다. 7통입니다. 이 편지를 받은 사람은 행운이 깃들 것입니다. 힘들겠지만 좋은게 좋다고 생각하세요. 7년의 행운을 빌면서..
            만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?
            만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?만약엄청길면어케되징?
          </textarea>

          <div id="button-area">
            <div id="left-button">
              <button id="rpc-button">신고 내역 조회</button>
            </div>
            <div id="right-button">
              <button v-if="!modifyBt" id="modify-button" @click="modifyQuiz">수정</button>&nbsp;
              <button v-if="!modifyBt" id="delete-button">삭제</button>
              <button v-if="modifyBt" id="cancle-button" @click="modifyQuiz">취소</button>&nbsp;
              <button v-if="modifyBt" id="save-button" @click="modifyQuiz">저장</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
export default {
  name: 'QuizView',
  data() {
    return {
        modifyBt: false
    }
  },
  methods: {
    backHome() {
      location.href='/admin'
    },
    modifyQuiz(e) {
      if(e.target.id=='modify-button') {
        this.modifyBt=true
      } else if(e.target.id=='cancle-button') {
        alert('문제 수정을 취소합니다')
        this.modifyBt=false
      } else if(e.target.id=='save-button') {
        alert('문제를 저장합니다')
        this.modifyBt=false
      }
      
    }
  }
}
</script>
<style scoped>

*{
  color: var(--main5-color);
  cursor: default;
}

button {
  font-size: 18px;
}

input, textarea {
  cursor: text;
  color: var(--main3-hover-color) !important;
}

#header {
  display: flex;
  justify-content: space-between;
}

#back-button, #not-button {
  width: 100px;
  height: 45px;
  margin-top: 30px;
  margin-right: 20px;
  background-color: var(--main2-color);
  border: 2px solid var(--main2-color);
  border-radius: 10px;
  color: var(--main1-color);

  &:hover {
    background-color: var(--main2-hover-color);
    border-color: var(--main2-hover-color);
  }
}

#not-button {
  opacity: 0%;
  cursor: default;
}

#title {
  margin-top: 10px;
  width: 100%;
  background-color: var(--main5-color);
  height: 50px;
  border: 5px solid var(--main5-color);
  border-radius: 10px;
  padding-left: 10px;
}

#quiz-title-div, #quiz-title-input {
  height: 100%;
  width: 99%;
  background-color: var(--main5-color);
  color: var(--main1-color);
  border: none;
  font-size: 20px;
}

#quiz-title-div {
  line-height: 200%;
}

#quiz-box {
  display: flex;
  justify-content: space-between;
}

#info {
  margin-top: 15px;
  padding: 15px;
  width: 35%;
}

.info-text {
  display: inline-block;
  width: 100px;
}

.info-div {
  height: 30px;
  line-height: 30px;
}

.info-span {
  display: inline-block;
  height: 20px;
  width: 260px;
  text-align: center;
}

#quiz-tier-input {
  text-align: center;
  border: none;
  width: 150px;
  margin-left: 55px;
}

.index-name {
  border: 3px solid var(--main5-color);
  border-radius: 10px;
  font-size: 20px;
  padding-left: 10px;
  margin-bottom: 10px;
  width: 97%;
}

#testcase {
  margin-top: 30px;
}

#content {
  width: 800px;
  margin-top: 15px;
  padding: 15px;
}

#quiz-content {
  width: 98%;
  height: 500px;
  /* background-color: var(--main1-color); */
  border: none;
  resize: none;
  line-height: 30px;
  overflow: auto;

  &:focus {
    outline: none;
  }
}

#button-area {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

#rpc-button {
  margin-left: 15px;
  width: 150px;
  height: 50px;
  background-color: var(--main3-color);
  border: 2px solid var(--main3-color);
  border-radius: 10px;
  color: var(--main1-color);

  &:hover {
    background-color: var(--main3-hover-color);
  border: 2px solid var(--main3-hover-color);
  }
}

#modify-button, #delete-button, #save-button, #cancle-button {
  width: 100px;
  height: 50px;
  color: var(--main1-color);
  border-radius: 10px;
}

#modify-button, #save-button {
  background-color: var(--main4-color);
  border: 2px solid var(--main4-color);
  
  &:hover {
    background-color: var(--main4-hover-color);
    border-color: var(--main4-hover-color);
  }
}

#delete-button, #cancle-button {
  background-color: var(--red-color);
  border: 2px solid var(--red-color);
  
  &:hover {
    background-color: var(--red-hover-color);
    border-color: var(--red-hover-color);
  }
}
</style>