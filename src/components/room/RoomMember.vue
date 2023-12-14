<template>
  <div v-if="member != null" class="room-member-profile-container">
    <div class="room-member-profile">
      <font-awesome-icon v-if="!isRoomManager" id="room-manager-icon" :icon="['fas', 'crown']" />
      <button v-if="isRoomManager" class="room-resign-button">x</button>
      <img
        class="profile-image"
        :src="'/images/icon/' + member.memberProfileImg + '.png'"
        alt="profile"
      />
    </div>
    <div class="member-info-container">
      <div>Lv.{{ member.memberLevel }}</div>
      <div class="member-nickname">{{ member.memberName }}</div>
      <img
        class="rank-tier-icon"
        :src="'/images/rank/' + member.memberTier.toLowerCase() + '.png'"
        alt="my-tier"
      />
    </div>
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
  props: ['member'],
  data() {
    return {
      isRoomManager: false
    }
  }
}
</script>
<style scoped>
.room-member-profile-container {
  padding: 12px;

  display: table-cell;

  border: 3px solid var(--main5-color);
  background-color: var(--white-color);
}
.room-member-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#room-manager-icon {
  align-self: flex-start;

  color: var(--yellow-rank-color);
}
.room-resign-button {
  width: 24px;
  height: 24px;

  align-self: flex-end;

  border: none;
  color: var(--white-color);
  background-color: var(--red-rank-color);
}
.profile-image {
  width: 60%;
  margin-bottom: 12px;
}
.member-info-container {
  width: 100%;

  display: flex;
  justify-content: space-around;
}
.rank-tier-icon {
  width: 24px;
}
</style>
