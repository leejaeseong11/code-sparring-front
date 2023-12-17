<template>
  
  <div class="popup-container" v-if="showPopup">
    <div class="icon-container" id="iconContainer">
      <div v-for="i in 10" :key="i" class="icon" @click="selectProfileImage(i-1)">
        <img :src="'/images/icon/' + (i - 1) + '.png'" :alt="'Icon ' + (i - 1)">
      </div>
    </div>
      <button class="close-button" @click="closePopup">프로필 변경 닫기</button>

  </div>
</template>

<script>
export default {
  name: 'ProfileImgPopup',
  data() {
    return {
      showPopup: true,
    }
  },
  methods: {
    closePopup() {
      this.showPopup = false;
      this.$emit("close-modal");
    },
    selectProfileImage(index) {
      // console.log("Selected profile image:", index);
      this.$emit("selected", index);
      this.closePopup();
    },
  }
}
</script>

<style scoped>
.popup-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--white-color);
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  text-align: center;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
  flex-direction: column;
}

.icon-container {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 10px;
}

.icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}

.icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.close-button {
  margin-top: 8px;
  padding: 5px;
}

</style>