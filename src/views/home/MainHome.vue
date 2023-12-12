<template>
  <div id="main-layout" class="row">
    <div id="main-side-layout" class="col-2">
      <div id="main-profile-containers">
        <div id="my-profile-container">
          <img id="profile-image" src="/images/tmp_profile.png" alt="profile" />
          <div id="profile-tier-container">
            <div id="tier-container">
              <div id="rank-tier-help" class="custom-tooltip">
                ?<span class="custom-tooltiptext"
                  >티어는 랭크 모드 결과를 통해 정해집니다. <br />
                  티어의 종류는 다음과 같습니다.<br />
                  <img
                    class="rank-tier-icon"
                    src="/images/rank/bronze.png"
                    alt="my-tier" />브론즈<br />
                  <img
                    class="rank-tier-icon"
                    src="/images/rank/silver.png"
                    alt="my-tier" />실버<br />
                  <img class="rank-tier-icon" src="/images/rank/gold.png" alt="my-tier" />골드<br />
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
            <div id="profile-nickname">닉네임</div>
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
      <button id="rank-matching-button" class="btn-custom-danger room-menu-button">
        랭 크
        <img id="rank-title-icon" src="/images/swords.png" alt="rank-icon" />
        매 칭
      </button>
      <div id="rank-container">
        <div id="rank-title">순 위</div>
        <ol id="rank-list">
          <li>
            <div class="rank-number" style="color: var(--yellow-rank-color)">1위</div>
            <img class="rank-tier-icon" src="/images/rank/platinum.png" alt="rank-tier" />
            <div class="rank-nickname" title="닉네임">닉네임</div>
          </li>
          <li>
            <div class="rank-number" style="color: var(--red-rank-color)">2위</div>
            <img class="rank-tier-icon" src="/images/rank/platinum.png" alt="rank-tier" />
            <div class="rank-nickname" title="닉네임">닉네임</div>
          </li>
          <li>
            <div class="rank-number" style="color: var(--blue-rank-color)">3위</div>
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
    <div id="room-layout" class="col-9">
      <div id="main-navigation">
        <div id="main-navigation-left">
          <button
            class="btn-custom-primary main-menu-button"
            @click="createWaitingRoomclickHandler"
          >
            방 만들기
          </button>
          <router-link
            id="create-problem-button"
            class="btn-custom-primary main-menu-button"
            to="quiz/add"
            >문제 만들기</router-link
          >
        </div>
        <div id="main-navigation-right">
          <button
            id="mypage-button"
            class="btn-custom main-menu-button"
            @:click="mypageButtonClickHandler"
          >
            {{ memberAuthority == 'ROLE_ADMIN' ? '관리자페이지' : '마이페이지' }}
          </button>
          <button
            id="logout-button"
            class="btn-custom-danger main-menu-button"
            @click="logoutButtonClickHandler"
          >
            종료
          </button>
        </div>
      </div>
      <div id="main-room-containers">
        <div id="room-navigation">
          <div id="all-room-title">
            전체 게임방
            <button class="btn-custom" id="room-refresh-button" @:click="refreshButtonClickHandler">
              <img src="/images/refresh.png" style="width: 40px" alt="" />
            </button>
          </div>
          <div id="room-number-search-container">
            <input id="room-number-search-input" type="number" placeholder="방 번호 검색" />
            <font-awesome-icon id="room-number-search-icon" :icon="['fa', 'magnifying-glass']" />
          </div>
        </div>
        <div id="room-list-container">
          <div class="row room-containers">
            <template v-for="room in roomSize" :key="'room' + room">
              <MainHomeRoom v-if="room <= roomList.length" v-model:roomInfo="roomList[room - 1]" />
              <MainHomeRoom v-if="room > roomList.length" v-model:roomInfo="nullRoom" />
            </template>
          </div>
        </div>
        <div id="pagenation-button-container">
          <button
            :class="{ 'page-disabled': roomPage == 0 }"
            class="pagenation-button"
            v-bind:disabled="roomPage == 0"
            @:click="prevButtonClickHandler"
          >
            ◀
          </button>
          <button
            :class="{ 'page-disabled': roomPage == totalPages - 1 }"
            class="pagenation-button"
            v-bind:disabled="roomPage == totalPages - 1"
            @:click="nextButtonClickHandler"
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import MainHomeRoom from '../../components/home/MainHomeRoom.vue'

export default {
  name: 'MainHome',
  components: { MainHomeRoom },
  data() {
    return {
      roomPage: 0,
      roomSize: 8,
      totalPages: 0,
      roomList: [],
      nullRoom: { roomNo: null, roomStatus: null, roomTitle: null },
      memberAuthority: 'ROLE_ADMIN',
      roomNumber: null,
      roomStatus: null
    }
  },
  methods: {
    refreshButtonClickHandler() {
      axios
        .get(`${this.backURL}/room?page=${this.roomPage}&size=${this.roomSize}`)
        .then((response) => {
          this.roomList = response.data.content
          this.totalPages = response.data.totalPages
        })
    },
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
    rankTierHelpHoverHandler() {},
    mypageButtonClickHandler() {
      this.$router.push({ path: `/admin/quiz/all/1` })
    },
    prevButtonClickHandler() {
      this.roomPage -= 1
      this.refreshButtonClickHandler()
    },
    nextButtonClickHandler() {
      this.roomPage += 1
      this.refreshButtonClickHandler()
    },
    logoutButtonClickHandler() {
      console.log('Request sent')
      const url = `${this.backURL}/auth/logout`
      axios
        .post(
          url,
          {},
          {
            withCredentials: true
          }
        )
        .then(() => {
          sessionStorage.removeItem('accessToken')
          location.href = '/login'
        })
        .catch((error) => {
          console.error('Error:', error)
        })
    }
  },
  mounted() {
    this.refreshButtonClickHandler()
  }
}
</script>
<style scoped>
#main-layout {
  min-width: 1280px;

  display: flex;
  justify-content: space-around;

  overflow: visible;
  white-space: nowrap;

  color: var(--main5-color);
}
#main-side-layout {
  min-width: 260px;
  padding: 0;
  margin-top: 80px;

  display: flex;
  flex-direction: column;
  align-items: center;
}
#main-profile-containers {
  display: flex;
  flex-direction: column;
  align-items: center;
}
#my-profile-container {
  margin-top: 12px;

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
  justify-content: center;
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
.btn-custom {
  padding: 6px 12px;

  color: var(--main1-color);
  border-radius: 6px;
}
.btn-custom-primary {
  padding: 6px 12px;

  color: var(--main1-color);
  background-color: var(--main4-color);
  border: none;
  border-radius: 6px;

  &:hover {
    color: var(--main1-color);
    background-color: var(--main4-hover-color);
    border: none;
  }
  &:active {
    color: var(--main1-color);
    background-color: var(--main4-hover-color);
    border: none;
  }
}
.btn-custom-danger {
  padding: 6px 12px;

  color: var(--main1-color);
  background-color: var(--red-color);
  border: none;
  border-radius: 6px;

  &:hover {
    border: none;
    background-color: var(--red-hover-color);
  }
  &:active {
    color: var(--main1-color);
    background-color: var(--red-hover-color);
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
  &:active {
    color: var(--main1-color);
    background-color: var(--red-hover-color);
  }
}
#rank-matching-button {
  width: 84%;
  margin-top: 24px;
  padding: 16px;

  font-size: 1.75rem;

  cursor: pointer;
  transition: transform 0.5s;

  background-color: var(--red-color);
  color: var(--main1-color);

  &:hover {
    /* background-color: var(--red-hover-color); */
    transform: scale(1.2);
  }
}
#rank-title-icon {
  transition: transform 0.5s;
}

#rank-matching-button:hover #rank-title-icon {
  transform: rotate(180deg);
}

#rank-title-icon {
  width: 2rem;
}
#rank-container {
  width: 100%;
  padding: 8px;
  margin-top: 24px;

  display: flex;
  flex-direction: column;

  overflow: hidden;
  text-align: center;

  color: var(--white-color);
  background-color: var(--main5-color);
  border: 5px inset var(--main1-color);
  border-style: dotted solid;
  border-radius: 10px;
}

#rank-title {
  padding: 8px;

  font-size: 1.75rem;
  align-self: center;

  color: var(--main1-color);
}

#rank-list > li {
  padding: 6px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
}
#rank-list > li > * {
  margin: 4px;
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
  border: none;
  background-color: var(--main3-color);
  color: var(--main1-color);

  &:hover {
    background-color: var(--main3-hover-color);
    color: var(--main1-color);
  }
  &:active {
    border: none;
  }
}
#main-navigation-left > *,
#main-navigation-right > * {
  margin: 0 4px;
}
#create-problem-button {
  color: var(--main1-color) !important;
}
.main-menu-button {
  font-size: 1.25rem;
}
#main-room-containers {
  margin-top: 48px;

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
#room-number-search-container {
  margin-right: 8px;

  display: flex;
  align-items: center;

  background-color: var(--white-color);
  border: 1px solid var(--main3-color);
  border-radius: 20px;
}
#room-number-search-input {
  height: 2rem;

  text-indent: 14px;

  border: none;
  border-radius: 20px;
}
#room-number-search-icon {
  padding: 8px 12px 8px 0;

  font-size: 1.5rem;

  cursor: pointer;

  color: var(--black-color);
  opacity: 50%;
  border: none;
}
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#room-refresh-button {
  cursor: pointer;
  transition: transform 0.5s;

  background-color: transparent;
  border: none;

  &:hover {
    transform: rotate(180deg);
  }
  &:active {
    border: none;
  }
}
#room-list-container {
  width: 100%;

  display: flex;
  flex-direction: column;
}
#room-list-container > nav {
  align-self: center;
}
#pagenation-button-container {
  margin-top: 12px;

  display: flex;
  justify-content: center;
}
.pagenation-button {
  width: 120px;
  margin: 0 12px 0 4px;
  padding: 8px 16px;

  font-size: 1.125rem;

  transition: 0.25s;

  color: var(--white-color);
  background-color: var(--main4-color);
  border: none;
  border-radius: 6px;

  &:hover {
    background-color: var(--main4-hover-color);
    border: none;
  }
  &:active {
    background-color: var(--main4-hover-color);
    border: none;
  }
}
.page-disabled {
  cursor: not-allowed;

  background-color: var(--main4-hover-color);
  border: none;
}
</style>
