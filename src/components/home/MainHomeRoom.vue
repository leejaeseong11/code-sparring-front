<template>
  <div :class="{ 'in-game': roomInfo.roomStatus == 1 }" class="room-containers">
    <div class="room-container">
      <div class="room-no">{{ roomInfo.roomNo }}</div>
      <div class="room-infos">
        <h5 class="room-title" :title="roomInfo.roomTitle">
          {{ roomInfo.roomTitle }}
        </h5>
        <div class="room-info">
          <div>
            <div v-if="roomInfo.roomStatus == 1" style="color: var(--red-color)">WAITING</div>
            <div v-else-if="roomInfo.roomStatus == 0" style="color: var(--red-color)">PLAYING</div>
            <div v-else style="color: var(--red-color)"></div>
          </div>
          <div class="room-enter">
            <font-awesome-icon :icon="['fa', 'user']" />
            <div v-if="roomInfo.roomMember != null" class="room-member-number">
              {{ roomMember.length }}/4
            </div>
            <div v-else class="room-member-number">0/4</div>
            <button class="btn-custom-primary see-quiz-button">
              <div>문제보기</div>
            </button>
            <button class="btn-custom-primary enter-button" @:click="enterButtonClickHandler">
              <div>입장</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MainHomeRoom',
  props: ['roomInfo'],
  methods: {
    enterButtonClickHandler() {
      this.$router.push({ path: `/room/1000` })
    }
  },
  mounted() {
    console.log(this.roomInfo)
  }
}
</script>
<style scoped>
.room-containers {
  width: 48%;
  margin: 8px;
  padding: 0;

  color: var(--main5-color);
  background-color: var(--white-color);
  border: 6px solid var(--main5-color);
  opacity: 30%;
}
.in-game {
  opacity: 100%;
}
.room-container {
  display: flex;
}
.room-no {
  width: 24%;
  padding: 0 4px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;

  font-size: 1.5rem;

  border-right: 3px solid var(--main5-color);
}
.room-infos {
  width: 100%;
}
.room-title {
  height: 48px;
  padding: 10px;

  overflow: hidden;
  text-overflow: ellipsis;

  border-bottom: 2px dashed var(--main5-color);
}
.room-info {
  padding: 0 10px 10px 10px;

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
