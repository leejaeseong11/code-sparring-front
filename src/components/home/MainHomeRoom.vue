<template>
  <div class="card ms-3 mb-3 room-container">
    <div class="row">
      <div class="col-2 ps-0 pe-0">
        <div class="room-no">{{ roomNumber }}</div>
      </div>
      <div class="col-10 ps-0 pe-0">
        <div class="pb-2 room-info-container">
          <div class="col">
            <h5
              class="ps-3 pb-3 pt-2 card-title"
              title="아무나들어와도되지만이방의제목은매우길기때문에잘릴수있습니다"
            >
              아무나들어와도되지만이방의제목은매우길기때문에잘릴수있습니다
            </h5>
          </div>
          <div class="room-info">
            <div v-if="roomStatus == 1" class="ps-3" style="color: var(--red-color)">WAITING</div>
            <div v-if="roomStatus == 0" class="ps-3" style="color: var(--red-color)">PLAYING</div>
            <div class="pe-3 room-enter">
              <font-awesome-icon :icon="['fa', 'user']" />
              <div class="room-member-number">3/4</div>
              <button class="btn-custom-primary see-quiz-button">
                <div>문제보기</div>
              </button>
              <button class="btn-custom-primary enter-button"><div>입장</div></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MainHomeRoom',
  props: ['roomNumber', 'roomTitle', 'roomStatus', 'roomMember', 'roomPwd']
}
</script>
<style scoped>
.room-container {
  width: 48%;

  color: var(--main5-color);
  border: 6px solid var(--main5-color);

  /* opacity: 30%; */
}
.room-no {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;

  font-size: 1.5rem;

  border-right: 3px solid var(--main3-color);
}
.room-info-container {
  padding: 8px 0;
}

.card-title {
  overflow: hidden;
  text-overflow: ellipsis;

  border-bottom: 2px dashed var(--main3-color);
}
.room-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.room-enter {
  display: flex;
  align-items: center;
}
.room-member-number {
  margin: 0 8px 0 4px;
}
.see-quiz-button {
  width: 92px;
  margin-right: 8px;

  border: none;
  background-color: var(--main4-color);

  &:hover {
    border: none;
    background-color: var(--main4-hover-color);
  }
  &:active {
    border: none;
    background-color: var(--main4-hover-color);
  }
}
.enter-button {
  width: 55px;

  border: none;
  background-color: var(--red-color);

  &:hover {
    border: none;
    background-color: var(--red-hover-color);
  }
  &:active {
    border: none;
    background-color: var(--red-hover-color);
  }
}
.btn-custom-primary {
  padding: 6px 12px;

  color: var(--white-color);
  border: none;
  border-radius: 6px;
}
</style>
