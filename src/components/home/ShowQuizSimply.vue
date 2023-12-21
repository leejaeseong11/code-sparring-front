<template>
  <div id="quiz-info-container">
    <div class="row">
      <div class="col-3">티어</div>
      <div class="col-5">제목</div>
      <div class="col-2">정답률</div>
      <div class="col-2">출제자</div>
    </div>
    <div class="tier-info-container row">
      <div class="col-3" v-if="quizInfo.quizTier == 'BRONZE'" style="color: var(--bronze-color)">
        {{ quizInfo.quizTier }}
      </div>
      <div
        class="col-3"
        v-else-if="quizInfo.quizTier == 'SILVER'"
        style="color: var(--silver-color)"
      >
        {{ quizInfo.quizTier }}
      </div>
      <div class="col-3" v-else-if="quizInfo.quizTier == 'GOLD'" style="color: var(--silver-color)">
        {{ quizInfo.quizTier }}
      </div>
      <div
        class="col-3"
        v-else-if="quizInfo.quizTier == 'PLATINUM'"
        style="color: var(--platinum-color)"
      >
        {{ quizInfo.quizTier }}
      </div>
      <div class="col-3" v-else>
        {{ quizInfo.quizTier }}
      </div>
      <div class="col-5">{{ quizInfo.quizTitle }}</div>
      <div class="col-2">
        {{
          quizInfo.quizSubmitCnt == 0
            ? 0
            : Math.round(
                (quizInfo.quizSuccessCnt / quizInfo.quizSubmitCnt + Number.EPSILON) * 10000
              ) / 100
        }}%
      </div>
      <div class="col-2">{{ quizInfo.memberName }}</div>
    </div>
  </div>
  <div id="quiz-content-title">문제 설명</div>
  <div id="quiz-content-container">
    <div id="quiz-content">{{ quizInfo.quizContent }}</div>
  </div>
</template>
<script>
export default {
  name: 'ShowQuizSimply',
  props: ['quizInfo']
}
</script>
<style scoped>
* {
  cursor: default;
}
#quiz-info-container {
  padding: 8px 12px;
}
#quiz-info {
  padding: 4px;

  border-top: 3px solid var(--main5-color);
}
#quiz-content-container {
  height: 454px;

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

  white-space: pre-wrap;
  overflow: scroll;
  font-family: 'DNFBitBitv2';

  word-wrap: break-word;
  font-size: 1.125rem;
  line-height: 1.5rem;
}
</style>
