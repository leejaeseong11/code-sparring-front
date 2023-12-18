<template>
  <div
    v-if="member != null"
    class="room-member-profile-container"
    :style="member != null ? 'cursor: pointer' : ''"
  >
    <div class="room-member-profile">
      <font-awesome-icon
        v-show="member.hostStatus == 0"
        id="room-manager-icon"
        :icon="['fas', 'crown']"
      />
      <button v-show="(member.hostStatus == 1) & isRoomManager" class="room-resign-button">
        x
      </button>
      <img
        class="profile-image"
        :src="'/images/icon/' + member.memberProfileImg + '.png'"
        alt="profile"
      />
    </div>
    <div class="member-info-container">
      <div>Lv.{{ member.memberLevel }}</div>
      <img
        class="rank-tier-icon"
        :src="'/images/rank/' + member.memberTier.toLowerCase() + '.png'"
        alt="my-tier"
      />
    </div>
    <div class="member-nickname">{{ member.memberName }}</div>
  </div>
  <div
    v-else
    class="room-member-profile-container"
    style="background: var(--yellow-rank-color)"
  ></div>
</template>
<script>
export default {
  name: 'RoomMember',
  props: ['member', 'isRoomManager']
}
</script>
<style scoped>
.room-member-profile-container {
  padding: 4px;

  display: table-cell;
  position: relative;

  border: 3px solid var(--main5-color);
  background-color: var(--white-color);
}
.room-member-profile {
  padding-top: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
#room-manager-icon {
  width: 24px;
  height: 24px;

  position: absolute;
  top: 0;
  left: 0;

  color: var(--yellow-rank-color);
}
.room-resign-button {
  width: 24px;
  height: 24px;

  position: absolute;
  top: 0;
  right: 0;

  border: none;
  color: var(--white-color);
  background-color: var(--red-rank-color);
}
.profile-image {
  width: 60%;
  margin-bottom: 12px;
}
.member-nickname {
  text-align: center;
}
.member-info-container {
  width: 100%;
  height: 20%;

  display: flex;
  justify-content: space-evenly;
}
.rank-tier-icon {
  width: 24px;
}
</style>
