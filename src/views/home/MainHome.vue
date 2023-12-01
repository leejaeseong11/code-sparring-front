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
    <font-awesome-icon :icon="['fas', 'gamepad']" />
    <h1>test</h1>
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
<style scoped></style>
