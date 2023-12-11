<template>
  <div class="room-member-profile-container">
    <div class="room-member-profile">
      <font-awesome-icon v-if="!isRoomManager" id="room-manager-icon" :icon="['fas', 'crown']" />
      <button v-if="isRoomManager" class="room-resign-button">x</button>
      <img class="profile-image" src="/images/tmp_profile.png" alt="profile" />
    </div>
    <div class="member-info-container">
      <div>Lv.5</div>
      <div class="member-nickname">닉네임</div>
      <img class="rank-tier-icon" src="/images/rank/bronze.png" alt="my-tier" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'RoomMember',
  data() {
    return {
      isRoomManager: false
    }
  }
}
</script>
<style>
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
  width: 50%;
  margin: 12px;

  border-radius: 50%;
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
