<script setup>
import NavigationBar from '../../components/NavigationBar.vue'
</script>

<template>
  <main>
    <NavigationBar />
    <input type="text" name="name" placeholder="채팅방 이름" />
    <button type="submit" @click="createWaitingRoomclickHandler" class="btn btn-primary">
      방 만들기
    </button>
    <br />
    <font-awesome-icon :icon="['fas', 'user-secret']" size="2xl" />
  </main>
</template>
<script>
import axios from 'axios'

export default {
  name: 'MainHome',
  methods: {
    createWaitingRoomclickHandler() {
      let data = {
        quiz: {
          quizNo: 1
        },
        // "roomPwd": "1234",
        codeShare: 0,
        roomTitle: '테스트방 in vue'
      }

      axios
        .post(`${this.backURL}/room`, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log(res)
          this.$router.push({ path: `/room/${res.data}` })
        })
    }
  }
}
</script>
<style>
:root {
  --main1-color: #f8f0e5;
  --main2-color: #eadbc8;
  --main3-color: #dac0a3;
  --main4-color: #0f2c59;
  --black-color: #000000;
  --white-color: #ffffff;
  --red-color: #ff0000;
  --yellow-color: #fcae05;
}

@font-face {
  font-family: 'DNFBitBitv2';
  font-style: normal;
  font-weight: 400;
  src: url('//cdn.df.nexon.com/img/common/font/DNFBitBitv2.otf') format('opentype');
}

* {
  margin: 0;
  padding: 0;

  font-family: DNFBitBitv2;
}

body {
  min-width: 480px;
  line-height: unset !important;
}

a {
  text-decoration: none !important;
  color: var(--black-color) !important;
}

a:link {
  text-decoration: none;
}

input:focus {
  outline: none;
}

main {
  margin: 20px;
}

h1 {
  font-size: 2em !important;
  font-weight: bold !important;
  margin-bottom: unset !important;
  color: var(--main4-color) !important;
}
</style>
