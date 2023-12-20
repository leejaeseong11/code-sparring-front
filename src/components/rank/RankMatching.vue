<template>
  <div v-if="match" id="layout">
    <div id="header">
      <div style="color: var(--red-hover-color)">
        ※ 강제종료 혹은 네트워크 오류 시 랭크에 불이익이 발생할 수 있습니다 ※
      </div>
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
        <div id="member-score">
          {{ this.rankMember.winCnt }}승 {{ this.rankMember.loseCnt }}패
          {{ this.rankMember.drawCnt }}무
        </div>
      </div>
    </div>

    <div id="footer">
      <button v-if="this.p1ready" id="cancle-button" @click="$emit('close-popup')">취소</button>
    </div>
  </div>
</template>
<script>
import { apiClient } from '@/axios-interceptor'
import SweetAlert from '../../util/modal.js'
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
      rankRoom: {
        roomNo: 0,
        member2No: 0,
        quizNo: 0,
        readyCnt: 0,
        rankNo: 0
      },
      tierImg: '',
      score: '',
      timerRunning: true,
      minutes: 0,
      seconds: 0,
      match: false,
      p1ready: false,
      intervalId: null
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
    },
    setQuiz() {
      apiClient
        .get(`${this.backURL}/rankroom/quiz/${this.rankRoom.roomNo}`)
        .then((res) => {
          location.href = '/rank/' + res.data
        })
    },
    whileMatching1() {
      if (this.minutes == 5) {
        SweetAlert.warning('대기시간이 지연되어 매칭을 종료합니다', '', '확인').then(() => {
          this.stopMatching()
          location.href = '/'
        })
      }
      apiClient
        .get(`${this.backURL}/rankroom/check/${this.rankRoom.roomNo}`)
        .then((res) => {
          this.rankRoom = res.data
          if (
            this.rankRoom.member2No != 0 &&
            this.rankRoom.member2No != null &&
            this.rankRoom.member2No != ''
          ) {
            this.stopMatching()
            SweetAlert.success('매칭 성공!', '게임이 곧 시작됩니다', '확인').then(() => {
              this.setQuiz()
            })
          }
        })
    },
    whileMatching2() {
      apiClient
        .get(`${this.backURL}/rankroom/check/${this.rankRoom.roomNo}`)
        .then((res) => {
          this.rankRoom = res.data
          if (this.rankRoom.member2No != this.memberNo) {
            SweetAlert.warning('상대와의 연결이 종료되었습니다', '', '확인').then(() => {
              location.href = '/'
            })
          } else if (
            this.rankRoom.quizNo != 0 &&
            this.rankRoom.quizNo != null &&
            this.rankRoom.quizNo != ''
          ) {
            this.stopMatching()
            location.href = '/rank/' + this.rankRoom.rankNo
          }
        })
        .catch(() => {
          location.href = '/'
        })
    },
    startMatching1() {
      this.intervalId = setInterval(this.whileMatching1, 1000)
    },
    startMatching2() {
      this.intervalId = setInterval(this.whileMatching2, 1000)
    },
    stopMatching() {
      clearInterval(this.intervalId)
      if (
        this.rankRoom.readyCnt == 0 ||
        this.rankRoom.readyCnt == '' ||
        this.rankRoom.readyCnt == null
      ) {
        apiClient
          .delete(`${this.backURL}/rankroom/out/${this.rankRoom.roomNo}`)
          .then(() => {
            // location.href = '/'
          })
          .catch(() => {
            // location.href = '/'
          })
      }
    }
  },
  created() {
    window.addEventListener('beforeunload', () => {
      this.stopMatching()
    })

    apiClient
      .get(`${this.backURL}/member/my`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        this.rankMember = response.data
        const rank = this.rankMember.memberTier
        if (rank == 'BRONZE') this.tierImg = 'bronze'
        else if (rank == 'SILVER') this.tierImg = 'silver'
        else if (rank == 'GOLD') this.tierImg = 'gold'
        else if (rank == 'PLATINUM') this.tierImg = 'platinum'

        SweetAlert.question(
          '랭크 매칭을 진행하시겠습니까?',
          '매칭 성공 이후 퇴장 시 랭크가 떨어질 수 있습니다',
          '확인',
          '취소'
        ).then((res) => {
          if (res.isConfirmed === false) {
            location.href = '/'
          } else {
            this.match = true

            apiClient
              .get(`${this.backURL}/rankroom/match/${rank}`, {
                headers: {
                  'Content-Type': 'application/json'
                }
              })
              .then((res) => {
                this.rankRoom = res.data
                if (this.rankRoom.member2No == null) {
                  SweetAlert.question(
                    '상대를 찾을 수 없습니다',
                    '대기하시겠습니까?',
                    '확인',
                    '취소'
                  ).then((res) => {
                    if (res.isConfirmed === true) {
                      this.p1ready=true
                      this.updateTimer()
                      this.startMatching1()
                    } else {
                      apiClient
                        .delete(`${this.backURL}/rankroom/out/${this.rankRoom.roomNo}`)
                        .then(() => {
                          location.href = '/'
                        })
                        .catch(() => {
                          location.href = '/'
                        })
                    }
                  })
                } else {
                  SweetAlert.success('매칭 성공!', '게임이 곧 시작됩니다', '확인').then(() => {
                    this.updateTimer()
                    this.startMatching2()
                  })
                }
              })
              .catch(() => {
                this.stopMatching()
                location.href = '/'
              })
          }
        })
      })
      .catch(() => {
        this.stopMatching()
      })
  },
  beforeUnmount() {
    if (
      this.rankRoom.readyCnt == 0 ||
      this.rankRoom.readyCnt == '' ||
      this.rankRoom.readyCnt == null
    ) {
      apiClient
        .delete(`${this.backURL}/rankroom/out/${this.rankRoom.roomNo}`)
        .then(() => {})
        .catch(() => {
          location.href = '/'
        })
    }
    clearInterval(this.intervalId)
  }
}
</script>
<style scoped>
* {
  color: var(--main1-color);
}

#header {
  margin-top: 30px;
  text-align: center;
  padding-right: 10px;
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
  margin-top: 50px;
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
