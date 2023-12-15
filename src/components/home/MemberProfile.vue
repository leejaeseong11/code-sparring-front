<template>
  <div class="member-profile-detail-layout">
    <div class="profile-detail-containers">
      <div class="profile-image-containers">
        <img
          class="profile-image"
          :src="'/images/icon/' + memberProfile.memberProfileImg + '.png'"
          alt="profile"
        />
        <div class="profile-rank-container">
          <img
            class="rank-tier-icon"
            :src="'/images/rank/' + memberProfile.memberTier.toLowerCase() + '.png'"
            alt="my-tier"
          />
          <div class="profile-name-container">
            <div>{{ memberProfile.memberName }}</div>
            <div>
              {{ memberProfile.winCnt }} 승 {{ memberProfile.drawCnt }} 무
              {{ memberProfile.loseCnt }} 패
            </div>
          </div>
        </div>
      </div>
      <div class="proflie-info-containers">
        <div id="exp-container">
          <div id="my-level">Lv. {{ memberProfile.memberLevel }}</div>
          <div class="progress col-sm-8">
            <div
              class="progress-bar progress-bar-striped bg-primary progress-bar-animated"
              role="progressbar"
              aria-valuenow="10"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="'width: ' + memberProfile.memberExp + '%'"
            >
              <span id="my-exp">{{ memberProfile.memberExp }} / 100</span>
            </div>
          </div>
        </div>
        <div class="member-tier-container">
          <div v-if="memberProfile.memberTier == 'BRONZE'" style="color: var(--bronze-color)">
            {{ memberProfile.memberTier }}
          </div>
          <div v-else-if="memberProfile.memberTier == 'SILVER'" style="color: var(--silver-color)">
            {{ memberProfile.memberTier }}
          </div>
          <div v-else-if="memberProfile.memberTier == 'GOLD'" style="color: var(--silver-color)">
            {{ memberProfile.memberTier }}
          </div>
          <div
            v-else-if="memberProfile.memberTier == 'PLATINUM'"
            style="color: var(--platinum-color)"
          >
            {{ memberProfile.memberTier }}
          </div>
          <div v-else>
            {{ memberProfile.memberTier }}
          </div>
          <div>{{ memberProfile.tierPoint }} pt</div>
        </div>
        <textarea :value="memberProfile.memberInfo" disabled></textarea>
      </div>
    </div>
    <button id="modal-close-button" class="btn-custom-primary" @click="showQuizEventEmit">
      닫기
    </button>
  </div>
</template>
<script>
export default {
  name: 'memberProfile',
  props: ['memberProfile'],
  data() {
    return {}
  },
  methods: {
    showQuizEventEmit() {
      this.$emit('showQuiz')
    }
  }
}
</script>
<style scoped>
* {
  color: var(--main2-color);
}
.member-profile-detail-layout {
  padding: 40px 0 20px 0;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: var(--main5-color);
}
.profile-detail-containers {
  display: flex;
}
.profile-image-containers {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.profile-rank-container {
  display: flex;
  justify-content: center;
}
.profile-image {
  width: 200px;
  margin: 12px;
}
.rank-tier-icon {
  width: 20%;
}
.profile-name-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.proflie-info-containers {
  width: 100%;
  margin-top: 16px;

  display: flex;
  flex-direction: column;
}
#exp-container {
  width: 100%;
  margin-bottom: 12px;

  display: flex;
  align-items: center;
  justify-content: flex-start;
}
#my-level {
  padding-right: 12px;

  display: flex;
  align-items: center;
  white-space: nowrap;
}
#exp-container > .progress {
  margin-left: 4px;
  min-width: 180px;
  width: 75%;
  height: 28px;

  position: relative;

  background-color: var(--main2-color);
}
#my-exp {
  position: absolute;
  right: 0;
  left: 0;

  color: var(--main5-color);
}
.member-tier-container {
  margin: 12px 0 24px 0;

  display: flex;
}
.member-tier-container :first-child {
  margin-right: 20px;
}
textarea {
  margin-right: 24px;
  padding: 12px;
  height: 100%;

  border: none;
  resize: none;
  background-color: var(--main1-color);
  border-radius: 10px;
  color: var(--main4-color);

  &:focus {
    outline: none;
  }
}
.btn-custom-primary {
  width: 60px;
  padding: 6px 12px;
  margin-top: 8px;

  color: var(--main5-color);
  background-color: var(--main2-color);
  border: none;
  border-radius: 6px;

  &:hover {
    color: var(--main5-color);
    background-color: var(--main2-hover-color);
    border: none;
  }
  &:active {
    color: var(--main5-color);
    background-color: var(--main2-hover-color);
    border: none;
  }
}
#modal-close-button {
  margin-top: 40px;
}
</style>
