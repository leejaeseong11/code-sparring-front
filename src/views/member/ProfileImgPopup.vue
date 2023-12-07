<template>
  <div class="popup-container" v-if="showPopup">
    <div class="icon-container" id="iconContainer">
      <div v-for="i in 10" :key="i" class="icon" @click="selectProfileImage(i-1)">
        <img :src="'images/icon/' + (i - 1) + '.png'" :alt="'Icon ' + (i - 1)">
      </div>
      <button @click="closePopup">닫기</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileImgPopup',
  props: ["pImg"],
  data() {
    return {
      
      showPopup: true,
    }
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
    selectProfileImage(index) {
      console.log("Selected profile image:", index);
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
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
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
  /* 5개의 열 */
  gap: 10px;
  /* 열 사이의 간격 */
}

.icon {
  width: 80px;
  /* 아이콘의 가로 크기 */
  height: 80px;
  /* 아이콘의 세로 크기 */
  border-radius: 50%;
  /* 원 형태를 만들기 위해 반지름 설정 */
}

.icon img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

</style>