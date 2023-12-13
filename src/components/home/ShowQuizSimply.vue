<template>
  <div id="quiz-info-container">
    <div class="row">
      <div class="col-2">번호</div>
      <div class="col-6">제목</div>
      <div class="col-4">출제자</div>
    </div>
    <div id="quiz-info" class="row">
      <div class="col-2">1.</div>
      <div class="col-6">짝수와 홀수</div>
      <div class="col-4">admin1</div>
    </div>
  </div>
  <div id="quiz-content-title">문제 설명</div>
  <div id="quiz-content-container">
    <div id="quiz-content">
      정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는 solution 함수를
      완성하세요. 정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는 solution
      함수를 완성하세요. 정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는
      solution 함수를 완성하세요. 정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를
      반환하는 solution 함수를 완성하세요. 정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우
      "Odd"를 반환하는 solution 함수를 완성하세요. 정수 num이 짝수일 경우 "Even"을 반환하고 홀수인
      경우 "Odd"를 반환하는 정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는
      정수 num이 짝수일 경우 "Even"을 반환하고 홀수인 경우 "Odd"를 반환하는
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style scoped>
#quiz-info-container {
  padding: 8px 12px;
}
#quiz-info {
  padding: 4px;

  border-top: 3px solid var(--main5-color);
}
#quiz-content-container {
  height: 227px;

  white-space: wrap;
  overflow: scroll;

  border: 3px dashed var(--main5-color);
}
#quiz-content-title {
  padding: 8px;

  font-size: 1.25rem;
  color: var(--main5-color);
}
#quiz-content {
  padding: 8px;

  word-wrap: break-word;
  font-size: 1.125rem;
  line-height: 1.5rem;
}
</style>
