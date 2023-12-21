<template>
  <div class="container">
    <div class="profile-check-title">내 정보 확인</div>
    <div class="profile-icon-container">
      <img
        id="profile-icon"
        :src="'/images/icon/' + loginMember.memberProfileImg + '.png'"
        alt="profile"
      />
    </div>

    <div class="member-id-container">{{ loginMember.memberId }}</div>

    <div class="memberLevel-container">
      <span class="mini-title">레벨</span>
      <div class="content-container">
        <div id="exp-container">
          <div id="my-level">Lv. {{ loginMember.memberLevel }}</div>
          <div class="progress col-sm-8">
            <div
              class="progress-bar progress-bar-striped bg-primary progress-bar-animated"
              role="progressbar"
              aria-valuenow="10"
              aria-valuemin="0"
              aria-valuemax="100"
              :style="'width: ' + loginMember.memberExp + '%'"
            >
              <span id="my-exp">{{ loginMember.memberExp }} / 100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="member-tier-container">
      <span class="mini-title">랭크</span>
      <div class="content-container">
        <img
          class="rank-tier-icon"
          :src="'/images/rank/' + loginMember.memberTier.toLowerCase() + '.png'"
          alt="my-tier"
        />
        <div v-if="loginMember.memberTier == 'BRONZE'" style="color: var(--bronze-color)">
          {{ loginMember.memberTier }}
        </div>
        <div v-else-if="loginMember.memberTier == 'SILVER'" style="color: var(--silver-color)">
          {{ loginMember.memberTier }}
        </div>
        <div v-else-if="loginMember.memberTier == 'GOLD'" style="color: var(--silver-color)">
          {{ loginMember.memberTier }}
        </div>
        <div v-else-if="loginMember.memberTier == 'PLATINUM'" style="color: var(--platinum-color)">
          {{ loginMember.memberTier }}
        </div>
        <div v-else>
          {{ loginMember.memberTier }}
        </div>
        <div>{{ loginMember.tierPoint }} pt</div>
      </div>
    </div>

    <div class="member-name-container">
      <span class="mini-title">닉네임</span>
      <div class="content-container">
        <span id="mini-name">{{ loginMember.memberName }}</span>
      </div>
    </div>
    <div class="member-info-container">
      <span class="mini-title">소개</span>
      <div class="content-container">
        <textarea id="input-box" type="text" v-model="loginMember.memberInfo"></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { apiClient } from '@/util/axios-interceptor'
export default {
  name: 'ProfileCheck',
  data() {
    return {
      loginMember: {
        memberId: '',
        memberName: '',
        memberInfo: '',
        memberProfileImg: 0,
        memberLevel: 0,
        memberExp: 0,
        memberTier: '',
        tierPoint: 0
      }
    }
  },
  mounted() {
    apiClient
      .get(`${this.backURL}/member/my`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        this.loginMember = response.data
      })
  }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 0.8fr 1.1fr 0.45fr 2.4fr 0.8fr;
  grid-template-rows: 0.12fr 0.05fr 0.25fr 0.3fr 0.25fr 0.3fr 0.1fr;
  gap: 0px 0px;
  grid-template-areas:
    'profile-check-title profile-check-title profile-check-title profile-check-title profile-check-title'
    '. profile-icon-container . . .'
    '. profile-icon-container . memberLevel-container .'
    '. profile-icon-container . member-tier-container .'
    '. profile-icon-container . member-name-container .'
    '. member-id-container . member-info-container .'
    '. . . . .';
  padding: 20px;
}

.profile-check-title {
  grid-area: profile-check-title;
  font-size: 20px;
}

.profile-icon-container {
  grid-area: profile-icon-container;
}

#profile-icon {
  width: 200px;
  height: 200px;
  margin-top: 20px;
}

.memberLevel-container {
  grid-area: memberLevel-container;
}

.mini-title {
  font-size: 1.4rem;
}

.member-tier-container {
  grid-area: member-tier-container;
}

.member-tier-container > .content-container {
  display: flex;
  align-items: center;
  gap: 10px;
}
.content-container {
  margin-top: 5px;
}

.rank-tier-icon {
  width: 36px;
}

#exp-container {
  width: 100%;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

#my-level {
  padding-right: 12px;

  display: flex;
  align-items: center;
  white-space: nowrap;
}

#exp-container > .progress {
  margin-left: 4px;
  min-width: 180px;
  width: 75%;
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

.member-id-container {
  grid-area: member-id-container;
  font-size: 1.3rem;
  text-align: center;
}

.member-name-container {
  grid-area: member-name-container;
}

.member-info-container {
  grid-area: member-info-container;
}

#input-box {
  width: 370px;
  height: 200px;
  background-color: transparent;
  color: var(--main5-color);
  border: none;
}
</style>
