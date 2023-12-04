<template>
  <main>
    <div id="main-side-layout">
      <img src="" alt="logo" />
      <div id="main-profile-containers">
        <div id="my-profile-container">
          <img src="" alt="profile" />
          <div id="main-profile-buttons">
            <button class="btn">마이 페이지</button>
            <button class="btn">로그아웃</button>
          </div>
        </div>
        <div id="tier-container">
          <img src="" alt="my-tier" />
          <div>브론즈 1</div>
        </div>
        <div id="exp-container">
          <div>Lv. 10</div>
          <div>10 / 100</div>
        </div>
      </div>
      <div id="rank-container">
        <div>랭킹 목록</div>
        <ol id="rank-list">
          <li>
            <div>1위</div>
            <img src="" alt="rank-tier" />
            <div>누구</div>
          </li>
        </ol>
      </div>
    </div>
    <div id="main-layout">
      <div id="main-navigation">
        <div id="main-navigation-left">
          <div>일반 모드</div>
          <button class="btn">랭킹 모드</button>
        </div>
        <div id="main-navigation-right">
          <button class="btn">문제 만들기</button>
          <button class="btn btn-primary" @click="createWaitingRoomclickHandler">방 만들기</button>
        </div>
      </div>
      <div id="main-room-containers">
        <div id="room-navigation">
          <div>전체 게임방</div>
          <div id="room-buttons">
            <button class="btn">
              <div>방 번호</div>
              <font-awesome-icon :icon="['fa', 'caret-down']" />
              <font-awesome-icon :icon="['fa', 'caret-up']" />
            </button>
            <div>
              <input type="text" placeholder="방 번호 검색" />
              <font-awesome-icon :icon="['fa', 'magnifying-glass']" />
            </div>
            <button class="btn">
              <font-awesome-icon :icon="['fa', 'arrows-rotate']" />
            </button>
          </div>
        </div>
        <div id="room-list-container">
          <div class="room-container">
            <div class="room-no">No. 1000</div>
            <div class="room-info">
              <div class="room-title">아무나</div>
              <div class="room-detail">
                <div class="room-status">WAITING</div>
                <div>
                  <font-awesome-icon :icon="['fa', 'user']" />
                  <div>3/4</div>
                  <button class="btn">입장</button>
                </div>
              </div>
            </div>
          </div>
          <div id="room-page-buttons">
            <font-awesome-icon :icon="['fa', 'square-caret-left']" />
            <font-awesome-icon :icon="['fa', 'square-caret-right']" />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios'

export default {
  name: 'MainHome',
  components: {},
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
