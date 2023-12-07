<template>
  <div>
    <div id="room-member-profile-container">
      <div id="room-member-profile">
        <font-awesome-icon :icon="['fas', 'crown']" />
        <img id="profile-image" src="/images/tmp_profile.png" alt="profile" />
      </div>
      <div id="tier-container">
        <div>브론즈 1</div>
        <div>Lv.5</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style>
#room-member-profile-container {
  padding: 12px;

  border: 3px solid var(--main5-color);
  border-radius: 10px;
}
#room-member-profile {
  display: flex;
  flex-direction: column;
}
#profile-image {
  width: 50%;
  margin: 12px;

  border-radius: 50%;
}
</style>
