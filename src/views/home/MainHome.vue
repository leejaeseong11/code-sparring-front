<template>
  <main class="container-fluid">
    <div id="main-layout" class="row">
      <div id="main-side-layout" class="col-2">
        <img id="main-logo" src="/images/logo.gif" alt="logo" />
        <div id="main-profile-containers">
          <div id="my-profile-container">
            <img id="profile-image" src="/images/tmp_profile.png" alt="profile" />
            <div id="profile-tier-container">
              <div id="tier-container">
                <div id="rank-tier-help" class="custom-tooltip">
                  ?<span class="custom-tooltiptext"
                    >티어는 랭크 모드 결과를 통해 정해지집니다. <br />
                    티어의 종류는 다음과 같습니다.<br />
                    <img
                      class="rank-tier-icon"
                      src="/images/rank/bronze.png"
                      alt="my-tier" />브론즈<br />
                    <img
                      class="rank-tier-icon"
                      src="/images/rank/silver.png"
                      alt="my-tier" />실버<br />
                    <img
                      class="rank-tier-icon"
                      src="/images/rank/gold.png"
                      alt="my-tier" />골드<br />
                    <img
                      class="rank-tier-icon"
                      src="/images/rank/platinum.png"
                      alt="my-tier" />플래티넘<br
                  /></span>
                </div>
                <img
                  id="my-rank-tier"
                  class="rank-tier-icon"
                  src="/images/rank/bronze.png"
                  alt="my-tier"
                />
              </div>
              <div id="profile-nickname">닉네임이길어지면어떨까요</div>
            </div>
            <div id="exp-container">
              <div id="my-level">Lv. 10</div>
              <div class="progress col-sm-8">
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
            <div id="main-profile-buttons"></div>
          </div>
        </div>
        <button id="rank-matching-button" class="btn btn-danger room-menu-button">
          랭 크
          <img id="rank-title-icon" src="/images/swords.png" alt="rank-icon" />
          매 칭
        </button>
        <div id="rank-container">
          <div id="rank-title">순 위</div>
          <ol id="rank-list">
            <li>
              <div class="rank-number" style="color: #ffcd69">1위</div>
              <img class="rank-tier-icon" src="/images/rank/platinum.png" alt="rank-tier" />
              <div class="rank-nickname" title="닉네임">닉네임</div>
            </li>
            <li>
              <div class="rank-number" style="color: #ff7d97">2위</div>
              <img class="rank-tier-icon" src="/images/rank/platinum.png" alt="rank-tier" />
              <div class="rank-nickname" title="닉네임">닉네임</div>
            </li>
            <li>
              <div class="rank-number" style="color: #33d6f5">3위</div>
              <img class="rank-tier-icon" src="/images/rank/platinum.png" alt="rank-tier" />
              <div class="rank-nickname" title="닉네임">닉네임</div>
            </li>
            <li>
              <div class="rank-number" style="color: var(--main1-color)">4위</div>
              <img class="rank-tier-icon" src="/images/rank/gold.png" alt="rank-tier" />
              <div class="rank-nickname" title="닉네임">닉네임</div>
            </li>
            <li>
              <div class="rank-number" style="color: var(--main1-color)">5위</div>
              <img class="rank-tier-icon" src="/images/rank/bronze.png" alt="rank-tier" />
              <div class="rank-nickname" title="아주아주긴닉네임이지요너무길어서안보일지경이에요">
                아주아주긴닉네임이지요너무길어서안보일지경이에요
              </div>
            </li>
          </ol>
        </div>
      </div>
      <div id="room-layout" class="col">
        <div id="main-navigation">
          <div id="main-navigation-left">
            <button class="btn btn-primary room-menu-button" @click="createWaitingRoomclickHandler">
              방 만들기
            </button>
            <router-link
              id="create-problem-button"
              class="btn btn-primary room-menu-button"
              to="quiz/add"
              >문제 만들기</router-link
            >
          </div>
          <div id="main-navigation-right">
            <button id="mypage-button" class="btn">마이페이지</button>
            <button id="logout-button" class="btn btn-danger">종료</button>
          </div>
        </div>
        <div id="main-room-containers">
          <div id="room-navigation">
            <div id="all-room-title">
              전체 게임방
              <button class="btn" id="room-refresh-button">
                <!-- <font-awesome-icon id="room-refresh-icon" :icon="['fa', 'arrows-rotate']" /> -->
                <img src="/images/refresh.png" style="width: 40px" alt="" />
              </button>
            </div>
            <div id="room-buttons">
              <!-- <button id="room-number-sort" class="btn">
                <div>방 번호</div>
                <font-awesome-icon v-if="roomNumberOrder == 'desc'" :icon="['fa', 'caret-down']" />
                <font-awesome-icon v-if="roomNumberOrder == 'asc'" :icon="['fa', 'caret-up']" />
              </button> -->
              <div id="room-number-search-container">
                <input id="room-number-search-input" type="number" placeholder="방 번호 검색" />
                <font-awesome-icon
                  id="room-number-search-icon"
                  :icon="['fa', 'magnifying-glass']"
                />
              </div>
            </div>
          </div>
          <div id="room-list-container">
            <div class="row row-cols-2 room-containers">
              <MainHomeRoom v-model:roomNumber="roomNumber" v-model:roomStatus="roomStatus" />
              <MainHomeRoom v-model:roomNumber="roomNumber" v-model:roomStatus="roomStatus" />
              <MainHomeRoom v-model:roomNumber="roomNumber" v-model:roomStatus="roomStatus" />
              <MainHomeRoom v-model:roomNumber="roomNumber" v-model:roomStatus="roomStatus" />
              <MainHomeRoom v-model:roomNumber="roomNumber" v-model:roomStatus="roomStatus" />
              <MainHomeRoom v-model:roomNumber="roomNumber" v-model:roomStatus="roomStatus" />
              <MainHomeRoom v-model:roomNumber="roomNumber" v-model:roomStatus="roomStatus" />
              <MainHomeRoom v-model:roomNumber="roomNumber" v-model:roomStatus="roomStatus" />
              <MainHomeRoom v-model:roomNumber="roomNumber" v-model:roomStatus="roomStatus" />
              <MainHomeRoom v-model:roomNumber="roomNumber" v-model:roomStatus="roomStatus" />
            </div>
            <nav aria-label="...">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" tabindex="-1" aria-disabled="true">◀</a>
                </li>
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
      roomNumber: 1000,
      roomStatus: 1
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
        roomTitle: '테스트방 in vue',
        roomDt: new Date().toJSON()
      }
      data = JSON.stringify(data)
      axios
        .post(`${this.backURL}/room`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log(res)
          this.$router.push({ path: `/room/${res.data}` })
        })
    },
    rankTierHelpHoverHandler() {}
  },
  mounted() {
    axios.get(`${this.backURL}/room`).then((res) => {
      console.log(res)
    })
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

  color: var(--main5-color);
}
#main-side-layout {
  min-width: 260px;
  padding-left: 0;

  display: flex;
  flex-direction: column;
}
#main-logo {
  width: 150px;
}
#main-profile-containers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#my-profile-container {
  margin-top: 24px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
#profile-image {
  width: 50%;
  margin: 12px;

  border-radius: 50%;
}
#profile-tier-container {
  margin-bottom: 12px;

  display: flex;
  align-items: center;
}
#tier-container {
  display: flex;
  align-items: flex-end;
}
#rank-tier-help {
  width: 1rem;
  height: 1rem;

  display: inline-block;

  text-align: center;
  font-size: 0.625rem;

  cursor: pointer;

  color: var(--main2-color);
  border: 1px solid var(--main2-color);
  border-radius: 50%;
}
.custom-tooltip {
  position: relative;
}
.custom-tooltip .custom-tooltiptext {
  width: 260px;
  padding: 8px 12px;

  visibility: hidden;

  position: absolute;
  z-index: 1;
  top: -100px;
  left: 140%;

  text-align: left;

  border-radius: 6px;
  color: var(--white-color);
  background-color: var(--black-color);
}

.custom-tooltip:hover .custom-tooltiptext {
  visibility: visible;
}
.rank-tier-icon {
  width: 36px;
  margin-right: 8px;
}
#my-rank-tier {
  width: 36px;
  margin: 0 4px 0 -4px;
}
#profile-nickname {
  margin-left: 4px;

  white-space: wrap;
  font-size: 1.25rem;
}
#rank-tier-hlep {
  justify-self: flex-end;
}

#exp-container {
  width: 100%;

  display: flex;
  align-items: center;
}
#my-level {
  padding-right: 4px;

  display: flex;
  align-items: center;
  white-space: nowrap;
}
#exp-container > .progress {
  margin-left: 4px;
  min-width: 172px;
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
.btn-primary {
  color: var(--main1-color);
  background-color: var(--main4-color);
  border: none;

  &:hover {
    color: var(--main1-color);
    background-color: var(--main4-hover-color);
    border: none;
  }
}
.btn-danger {
  color: var(--main1-color);
  background-color: var(--red-color);
  border: none;

  &:hover {
    border: none;
    background-color: var(--red-hover-color);
  }
}
#rank-matching-button {
  margin-top: 34px;
  padding: 20px;

  font-size: 1.8rem;

  cursor: pointer;
  transition: transform 0.5s linear infinite;

  background-color: var(--red-color);
  color: var(--main1-color);

  &:hover {
    background-color: var(--red-hover-color);
  }
}
#rank-matching-button:hover #rank-title-icon {
  animation-name: rotate;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
#rank-title-icon {
  width: 2rem;
}
/* todo tomorrow */
#rank-container {
  padding: 8px;
  margin-top: 34px;

  display: flex;
  flex-direction: column;

  overflow: hidden;
  text-align: center;

  color: var(--white-color);
  /* background-color: #295402; */
  background-color: var(--main5-color);
  /* opacity: 80%; */
  /* background-color: #feeaeb; */
  border: 5px inset var(--main1-color);
  border-style: dotted solid;
  border-radius: 10px;
}

#rank-title {
  padding: 8px;

  font-size: 2rem;
  align-self: center;

  color: var(--main1-color);

  /* border: 3px solid var(--main5-color);
  border-radius: 10px; */
}

#rank-list > li {
  padding: 12px;

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

  color: var(--main1-color);
}
#room-layout {
  padding-top: 32px;
}
#main-navigation {
  margin-bottom: 24px;

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
#mypage-button {
  background-color: var(--main3-color);
  color: var(--main1-color);

  &:hover {
    background-color: var(--main3-hover-color);
    color: var(--main1-color);
  }
}
#main-navigation-left > *,
#main-navigation-right > * {
  margin: 0 4px;
}
#create-problem-button {
  color: var(--main1-color) !important;
}
.room-menu-button {
  font-size: 1.25rem;
}
#main-room-containers {
  padding: 16px;
  margin-top: 16px;

  border-top: 3px solid var(--main5-color);
}
#room-navigation {
  margin-bottom: 16px;

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

  color: var(--main1-color);
  background-color: var(--main3-color);
  border: none;
  border-radius: 10px;

  &:hover {
    background-color: var(--main3-hover-color);
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

  border: 1px solid var(--main3-color);
  border-radius: 10px;
}
#room-number-search-input {
  height: 2rem;

  text-indent: 4px;

  outline: none;
  /* border: 1px solid var(--main3-color); */
}
#room-number-search-icon {
  padding: 4px;

  font-size: 1.5rem;

  cursor: pointer;

  color: var(--main1-color);
  background-color: var(--main3-color);
  border: none;
}
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#room-refresh-icon {
  font-size: 2rem;

  color: var(--main5-color);

  &:hover {
    color: var(--main5-hover-color);
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
  color: var(--main1-color) !important;
  background-color: var(--main4-color);
  border: none;
}
.page-link {
  width: 100px;
  margin: 0 20px;
  color: var(--main5-color) !important;
}
#room-refresh-button {
  cursor: pointer;
  transition: transform 0.5s;
  &:hover {
    transform: scale(1.5) rotate(180deg);
  }
}
</style>
