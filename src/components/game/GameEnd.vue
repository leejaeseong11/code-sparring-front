<template>
  <main>
    <div id="popup-area">
        <div id="header">
      <img src="../../../public/images/rank/winner.gif" id="winner-icon" alt="win-icon" />
      WINNER
      <img src="../../../public/images/rank/winner.gif" id="winner-icon" alt="win-icon" />
    </div>
    <div id="winner-img">
      <img
        :src="'../../../public/images/icon/' + this.winNo + '.png'"
        id="win-profile-img"
        alt="win-member"
      />
    </div>
    <div id="win-content">
        <div id="winner-name">{{ this.winName }}</div>
    <div id="time">{{ this.winTime }}</div>
    </div>
    <div id="button-div">
      <button id="close-button" @click="$emit('close-popup')">닫기</button>
    </div>
    </div>
</main>
</template>
<script>
export default {
  name: 'GameEnd',
  data() {
    return {
      winNo: '0',
      winName: '닉네임1212',
      winTime: '21:25'
    }
  }
}
</script>
<style scoped>

#header,
#winner-name,
#time {
  color: var(--white-color);
}

#time {
    color: var(--main1-color);
    font-size: 18px;
}

#header {
  margin-top: 20px;
  text-align: center;
  font-size: 25px;
}

#winner-img {
  margin-top: 40px;
  text-align: center;
}

#win-profile-img {
  width: 200px;
  height: 200px;
}

#winner-icon {
  width: 50px;
  height: 50px;
}

#win-content {
    text-align: center;
    margin-top: 30px;
    font-size: 20px;
}

#button-div {
    text-align: center;
    margin-top: 40px;
    margin-bottom: 20px;
}

#close-button {
    width: 120px;
    height: 50px;
    font-size: 18px;
    background-color: var(--main2-color);
    color: var(--white-color);
    border: 1px solid var(--main2-color);
    border-radius: 10px;

    &:hover {
        background-color: var(--main2-hover-color);
        border-color: var(--main2-hover-color);
    }
}

#popup-area {
    border: 10px dotted var(--white-color);
    padding: 5px;
}
</style>
