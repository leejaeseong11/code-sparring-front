<template>
  <div id="layout">
    <div id="header">
      <div id="match-text">・・・ Matching ・・・</div>
      <img
        src="../../../public/images/rank/matching.gif"
        id="matching-icon"
        alt="rank-matching"
      />&nbsp;
      <span id="timer-content" class="title" :class="{ 'timer-expired': timerRunning }">{{
        formattedTime
      }}</span>
    </div>

    <div id="content">
      <img
        :src="'../../../public/images/icon/' + this.rankMember.memberProfileImg + '.png'"
        id="member-profile-img"
        alt="my-profile-img"
      />
      <div id="member-profile">
        <div id="member-name">{{ this.rankMember.memberName }}</div>
        <div id="rank-point">
          <span :id="'tier-' + this.rankMember.memberTier">{{ this.rankMember.memberTier }}</span
          >&nbsp;&nbsp;
          <span id="point">{{ this.rankMember.tierPoint }}pt</span>
        </div>
        <div id="tier-icon-div">
          <img
            :src="'../../../public/images/rank/' + this.tierImg + '.png'"
            id="tier-icon"
            alt="my-tier-icon"
          />
        </div>
        <div id="member-score">{{ this.rankMember.winCnt }}승 {{ this.rankMember.loseCnt }}패 {{ this.rankMember.drawCnt }}무</div>
      </div>
    </div>

    <div id="footer">
      <button id="cancle-button" @click="$emit('close-popup')">취소</button>
    </div>
  </div>
</template>
<script>
import { apiClient } from '@/axios-interceptor'
export default {
  name: 'RankMatching',
  props: ['memberNo'],
  data() {
    return {
      rankMember: {
        memberProfileImg: 0,
        memberTier: '',
        memberName: '',
        winCnt: 0,
        drawCnt: 0,
        loseCnt: 0,
        memberLevel: 0,
        memberExp: 0,
        tierPoint: 0,
        memberInfo: ''
      },
      tierImg: '',
      score: '',
      timerRunning: true,
      minutes: 0,
      seconds: 0
    }
  },
  computed: {
    formattedTime() {
      return `${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`
    }
  },
  methods: {
    updateTimer() {
      if (this.seconds === 59) {
        this.minutes++
        this.seconds = 0
      } else {
        this.seconds++
      }

      if (this.timerRunning) {
        setTimeout(this.updateTimer, 1000)
      }
    }
  },
  created() {
    this.updateTimer()
    apiClient
      .get(`${this.backURL}/member/${this.memberNo}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        this.rankMember = response.data
        const rank=this.rankMember.memberTier
        if(rank=='BRONZE') this.tierImg='bronze'
        else if(rank=='SILVER') this.tierImg='silver'
        else if(rank=='GOLD') this.tierImg='gold'
        else if(rank=='PLATINUM') this.tierImg='platinum'
      })
  }
}
</script>
<style scoped>
* {
  color: var(--main1-color);
}

#header {
  margin-top: 20px;
  text-align: center;
  padding-right: 10px;
}

#match-text {
  padding-left: 15px;
  margin-bottom: 10px;
  color: var(--white-color);
}

#matching-icon {
  width: 60px;
  height: 60px;
}

#timer-content.timer-expired {
  font-size: 22px;
  color: var(--main2-color);
}

#content {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  margin-left: 100px;
}

#member-profile {
  width: 500px;
  line-height: 80px;
  font-size: 20px;
  margin-top: 10px;
}

#member-profile-img {
  width: 330px;
  height: 330px;
}

#tier-icon-div {
  text-align: center;
}

#tier-icon {
  width: 100px;
  height: 100px;
}

#tier-UNRANKED {
  color: var(--main4-color);
}

#tier-BRONZE {
  color: var(--bronze-color);
}

#tier-SILVER {
  color: var(--silver-color);
}

#tier-GOLD {
  color: var(--gold-color);
}

#tier-PLATINUM {
  color: var(--platinum-color);
}

#footer {
  text-align: center;
  margin-top: 50px;
}

#cancle-button {
  font-size: 20px;
  width: 120px;
  height: 55px;
  background-color: var(--red-color);
  border: 1px solid var(--red-color);
  border-radius: 10px;

  &:hover {
    height: 60px;
    width: 130px;
    margin-top: -2px;
    font-size: 22px;
  }
}
</style>
