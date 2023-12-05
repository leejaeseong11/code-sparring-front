<template>
  <main class="container">
    <div id="main-layout" class="row">
      <div id="main-side-layout" class="col-3">
        <img id="main-logo" src="/images/logo.gif" alt="logo" />
        <div id="main-profile-containers">
          <div id="my-profile-container">
            <img id="profile-image" src="/images/tmp_profile.png" alt="profile" />
            <div id="main-profile-buttons">
              <button id="mypage-button" class="btn btn-primary">마이 페이지</button>
              <button id="logout-button" class="btn btn-danger">로그아웃</button>
            </div>
          </div>
          <div id="tier-containers">
            <div id="tier-container">
              <img class="my-rank-tier-icon" src="/images/rank/bronze.png" alt="my-tier" />
              <div>브론즈 1</div>
            </div>
            <div id="rank-tier-help">?</div>
          </div>
          <div id="exp-container">
            <div id="my-level">Lv. 10</div>
            <div class="progress col-sm-9">
              <div
                class="progress-bar progress-bar-striped bg-primary progress-bar-animated"
                role="progressbar"
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
                style="width: 10%"
              >
                <span id="my-exp">10 / 100</span>
              </div>
            </div>
          </div>
        </div>
        <div id="rank-container">
          <div id="rank-title">랭킹 목록</div>
          <ol id="rank-list">
            <li>
              <div class="rank-number">1위</div>
              <img class="rank-tier-icon" src="/images/rank/platinum.png" alt="rank-tier" />
              <div class="rank-nickname">닉네임</div>
            </li>
            <li>
              <div class="rank-number">2위</div>
              <img class="rank-tier-icon" src="/images/rank/gold.png" alt="rank-tier" />
              <div class="rank-nickname">아주아주긴닉네임이지요너무길어서안보일지경이에요</div>
            </li>
          </ol>
        </div>
      </div>
      <div id="room-layout" class="col-9">
        <div id="main-navigation">
          <div id="main-navigation-left">
            <div id="normal-mode-title">일반 모드</div>
            <button class="btn btn-primary room-menu-button">랭킹 모드</button>
          </div>
          <div id="main-navigation-right">
            <router-link
              id="create-problem-button"
              class="btn btn-danger room-menu-button"
              to="quiz/add"
              >문제 만들기</router-link
            >
            <button class="btn btn-primary room-menu-button" @click="createWaitingRoomclickHandler">
              방 만들기
            </button>
          </div>
        </div>
        <div id="main-room-containers">
          <div id="room-navigation">
            <div id="all-room-title">전체 게임방</div>
            <div id="room-buttons">
              <button id="room-number-sort" class="btn">
                <div>방 번호</div>
                <font-awesome-icon v-if="roomNumberOrder == 'desc'" :icon="['fa', 'caret-down']" />
                <font-awesome-icon v-if="roomNumberOrder == 'asc'" :icon="['fa', 'caret-up']" />
              </button>
              <div id="room-number-search-container">
                <input id="room-number-search-input" type="number" placeholder="방 번호 검색" />
                <font-awesome-icon
                  id="room-number-search-icon"
                  :icon="['fa', 'magnifying-glass']"
                />
              </div>
              <button class="btn">
                <font-awesome-icon id="room-refresh-icon" :icon="['fa', 'arrows-rotate']" />
              </button>
            </div>
          </div>
          <div id="room-list-container">
            <div class="row row-cols-2 room-containers">
              <MainHomeRoom v-model:roomNumber="roomNumber" />
            </div>
            <nav aria-label="...">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" tabindex="-1" aria-disabled="true">◀</a>
                </li>
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
                <li class="page-item" aria-current="page">
                  <a class="page-link" href="#">2</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item">
                  <a class="page-link" href="#">▶</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import axios from 'axios'
import MainHomeRoom from '../../components/home/MainHomeRoom.vue'

export default {
  name: 'MainHome',
  components: { MainHomeRoom },
  data() {
    return {
      roomNumberOrder: 'desc',
      roomNumber: 1000
    }
  },
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
<style scoped>
#main-layout {
  min-width: 1280px;

  display: flex;
  justify-content: space-around;

  overflow: auto;
  white-space: nowrap;
}
#main-side-layout {
  display: flex;
  flex-direction: column;
}
#main-logo {
  width: 150px;
  margin-bottom: 12px;

  cursor: pointer;
}
#main-profile-containers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#my-profile-container {
  min-width: 240px;

  display: flex;
  flex-direction: column;
  align-items: center;

  border: 3px solid var(--main5-color);
  border-radius: 10px;
}
#main-profile-buttons > button {
  margin: 8px;
}
#profile-image {
  width: 50%;
  margin: 8px;

  border-radius: 50%;
}
.btn-primary {
  background-color: var(--main4-color);
  border: none;

  &:hover {
    border: none;
    background-color: var(--main2-color);
  }
}
.btn-danger {
  background-color: var(--red-color);
  border: none;

  &:hover {
    background-color: var(--red2-color);
    border: none;
  }
}
#tier-containers {
  display: flex;
  align-items: flex-end;
}
#tier-container {
  padding: 4px 12px;
  margin-top: 8px;

  display: flex;
  justify-content: center;
  align-items: center;

  white-space: nowrap;

  border-radius: 10px;
  border: 3px solid var(--main5-color);
}
#rank-tier-help {
  width: 1.2rem;
  height: 1.2rem;
  margin-left: 4px;

  display: inline-block;

  text-align: center;
  font-size: 0.75rem;

  cursor: pointer;

  color: var(--main2-color);
  border: 1px solid var(--main2-color);
  border-radius: 50%;
}
#rank-tier-hlep {
  justify-self: flex-end;
}
.my-rank-tier-icon {
  width: 36px;
  margin-right: 8px;
}
#exp-container {
  display: flex;
  align-items: center;
}
#my-level {
  margin-top: 8px;
  padding: 2px;

  display: flex;
  align-items: center;

  aspect-ratio: 1 / 1;
  white-space: nowrap;

  border-radius: 50%;
  border: 3px solid var(--main5-color);
}
#exp-container > .progress {
  margin-left: 4px;
  min-width: 200px;
  height: 28px;

  position: relative;

  background-color: var(--main2-color);
}
#my-exp {
  position: absolute;
  right: 0;
  left: 0;

  color: var(--main5-color);
}
#rank-container {
  margin-top: 12px;

  display: flex;
  flex-direction: column;

  overflow: hidden;
  text-align: center;

  border-radius: 10px;
  border: 3px solid var(--main5-color);
}
#rank-title {
  padding: 8px;

  font-size: 1.25rem;
}
#rank-list > li {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
#rank-list > li > * {
  margin: 4px 4px;
}
.rank-number {
  width: 24px;
}
.rank-tier-icon {
  width: 24px;
}
ol {
  padding: 0;
}
li {
  list-style: none;
}
.rank-nickname {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
#room-layout {
  padding-top: 32px;
}
#main-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
#main-navigation-left,
#main-navigation-right {
  display: flex;
  align-items: center;

  font-size: 1.5rem;
}
#main-navigation-left > *,
#main-navigation-right > * {
  margin: 0 8px;
}
#create-problem-button {
  color: var(--white-color) !important;
}
.room-menu-button {
  font-size: 1.25rem;
}
#main-room-containers {
  padding: 16px;
  margin-top: 8px;

  border: 3px solid var(--main5-color);
  border-radius: 10px;
}
#room-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
#all-room-title {
  font-size: 1.5rem;
}
#room-number-sort {
  padding: 6px;
  margin-right: 12px;
  display: flex;
  align-items: center;

  color: var(--white-color);
  background-color: var(--main3-color);
  border: none;
  border-radius: 10px;

  &:hover {
    background-color: var(--main2-color);
  }
}
#room-number-sort > div {
  margin-right: 8px;
}
#room-buttons {
  display: flex;
  align-items: center;
}
#room-buttons > * {
  margin: 0 8px;
}
#room-number-search-container {
  display: flex;
  align-items: center;
}
#room-number-search-input {
  height: 2rem;

  text-indent: 4px;

  outline: none;
  border: 1px solid var(--main3-color);
}
#room-number-search-icon {
  padding: 4px;

  font-size: 1.5rem;

  cursor: pointer;

  color: var(--white-color);
  background-color: var(--main3-color);
  border: none;
}
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#room-refresh-icon {
  font-size: 3rem;

  color: var(--main3-color);

  &:hover {
    color: var(--main2-color);
  }
}
#room-list-container {
  display: flex;
  flex-direction: column;
}

#room-list-container > nav {
  align-self: center;
}
.active > a {
  color: var(--white-color) !important;
  background-color: var(--main4-color);
  border: none;
}
</style>
