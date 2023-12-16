<template>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <link rel="stylesheet" href="../main.css">
    <link rel="stylesheet" href="addComment.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>문제 조치</title>
    <style>
    </style>
</head>
<body>
    <div class="report-object">
        <div class="report-box">
            <div class="report-title">문제번호</div>
            <div class="report-title" id="report-content">quizTitle</div>
        </div>
        <div class="report-box flex-container">
            <div class="report-title">신고사유</div>
            <select class="report-title" id="report-reason">
                <option value="" disabled selected>선택해주세요</option>
                <option value="1">테스트케이스 추가요청</option>
                <option value="2">문제 오류</option>
                <option value="3">기타</option>
            </select>
        </div>
        <div class="report-box flex-container">
            <div class="report-title">신고내용</div>
            <textarea class="report-title"></textarea>
        </div>
        <div class="report-box flex-container">
            <div class="report-title">조치내역</div>
            <textarea class="report-title" id="report-answer" placeholder="조치 내역을 작성해주세요."></textarea>
        </div>
        <div id="bt-area">
            <div></div>
            <div>
                <button id="edit-bt" @click="addTestcase">수정</button>
                <button id="delete-bt" @click="addTestcase">삭제</button>
                <button id="cancle-bt" @click="$emit('close-testcase')">취소</button>

            </div>
        </div>
    </div>
</body>
</html>
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
  }
}
</script>

<style sc>
.report-object {
    max-width: 600px;
    margin: 20px auto;
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    color: var(--main5-color);
    cursor: default;
}

.report-box {
    margin-bottom: 15px;
    text-align: left;
}

.report-title {
    display: inline;
    margin-bottom: 5px;
    width: 120px;
    padding-top: 3px;
}

#report-content {
    font-size: 1.2rem;
    padding: 30px;
}

select.report-title,
textarea.report-title {
    flex: 1;
    padding: 5px;
    box-sizing: border-box;
    margin-top: 5px;
    font-size: 1.2rem;
    
}

textarea.report-title {
    height: 100px;
}

textarea.report-title#report-answer {
    height: 68px;
}

.flex-container {
    display: flex;
    gap: 8px;
}

#bt-area {
    display: flex;
    justify-content: center;
}

button {
    border: 1px solid;
    border-radius: 10px;
    width: 60px;
    height: 40px;
    color: var(--main1-color);
}

#edit-bt {
    background-color: var(--green-color);
    border-color: var(--green-color);

    &:hover {
        background-color: var(--green-hover-color);
        border-color: var(--green-hover-color);
    }
}


#delete-bt {

    background-color: var(--red-color);
    border-color: var(--red-color);

    &:hover {
        background-color: var(--red-hover-color);
        border-color: var(--red-hover-color);

    }
}


#cancle-bt {
    background-color: var(--main4-color);
    border-color: var(--main4-color);
    margin-right: 10px;

    &:hover {
        background-color: var(--main4-hover-color);
        border-color: var(--main4-hover-color);
    }
}

</style>