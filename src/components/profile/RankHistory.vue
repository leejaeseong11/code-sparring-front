<template>
  <div id="layout">
    <div id="profile">
      <div>
        현재 <span id="member-name">{{ this.memberName }}</span> 님의 티어 :&nbsp;
        <span :id="'tier-' + this.memberTier">{{ this.memberTier }}</span>
        <img :src="'../../../public/images/rank/' + this.imgTier" class="tier-img" />&nbsp;
        <span id="tier-point">({{ this.memberPoint }}pt)</span>
        <div id="point">🔥 다음 티어까지 남은 포인트! {{ this.nextPoint }}pt 🔥</div>
      </div>
      <div>
        <div id="rank-cnt">총 랭크 게임 {{ this.win + this.lose + this.draw }}회</div>
        <div id="rank-result"><span style="color: var(--main4-color)">{{ this.win }}</span>승 <span style="color: var(--red-color)">{{ this.lose }}</span>패 <span style="color: var(--green-color);">{{ this.draw }}</span>무</div>
      </div>
    </div>

    <div id="rank-content" ref="scrollContainer" @scroll="handleScroll">
      <div v-for="rank in rankList" :key="rank" :class="'rank-obj-' + rank.gameResult">
        <span class="opposing-name">대결 상대 : {{ rank.opposingName }}</span>
        <span class="game-result">{{ rank.gameResult }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  name: 'RankHistory',
  data() {
    return {
      memberNo: '',
      memberName: '',
      memberTier: '',
      imgTier: '',
      memberPoint: '',
      nextPoint: '',
      win: 0,
      lose: 0,
      draw: 0,
      cnt: 0,
      rankList: [],
      tmpList: [],
      currentPage: 1,
      isScrolling: false
    }
  },
  methods: {
    handleScroll() {
      if (this.isScrolling) return
      const container = this.$refs.scrollContainer
      const scrollPosition = container.scrollTop + container.clientHeight
      const totalHeight = container.scrollHeight
      if (scrollPosition >= totalHeight) {
        this.isScrolling = true
        this.handleScrollEnd()
        this.isScrolling = false
      }
    },
    handleScrollEnd() {
      this.currentPage++
      const url = `${this.backURL}/rankgame/` + this.memberNo + `/` + this.currentPage
      axios.get(url).then((res) => {
        this.tmpList = res.data.list
        this.rankList.push(...this.tmpList)
        this.tmpList = []
      })
    }
  },
  mounted() {
    this.memberNo = this.$route.params.memberNo

    const url = `${this.backURL}/rankgame/` + this.memberNo + `/` + this.currentPage
    axios.get(url).then((res) => {
      this.rankList = res.data.list
      this.memberName = res.data.list[0].memberName
      this.memberTier = res.data.list[0].myTier
      this.memberPoint = res.data.list[0].myPoint
      this.nextPoint = res.data.list[0].nextPoint - this.memberPoint
      this.win = res.data.list[0].win
      this.lose = res.data.list[0].lose
      this.draw = res.data.list[0].draw

      if (this.memberTier == 'BRONZE') this.imgTier = 'bronze.png'
      else if (this.memberTier == 'SILVER') this.imgTier = 'silver.png'
      else if (this.memberTier == 'GOLD') this.imgTier = 'gold.png'
      else if (this.memberTier == 'PLATINUM') this.imgTier = 'platinum.png'
    })
  }
}
</script>
<style scoped>
#layout {
  /* border: 1px solid; */
  padding: 20px;
}

#profile {
  margin-bottom: 20px;
  font-size: 20px;
  display: flex;
  justify-content: space-between;
}

#point {
  margin-right: 10px;
  margin-top: 10px;
  font-size: 15px;
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

#rank-content {
  overflow: scroll;
  margin-top: 30px;
  height: 480px;
  margin-left: 5px;
}

.rank-obj-WIN,
.rank-obj-LOSE,
.rank-obj-DRAW {
  width: 99%;
  height: 55px;
  border: 1px solid var(--main1-color);
  border-radius: 10px;
}

.rank-obj-WIN {
  border: 5px double var(--main1-color);
  background: linear-gradient(
    40deg,
    var(--main4-hover-color) 5%,
    var(--main4-color) 5%,
    var(--main4-color) 20%,
    var(--main4-hover-color) 20%,
    var(--main4-hover-color) 40%,
    var(--main4-color) 40%,
    var(--main4-color) 60%,
    var(--main4-hover-color) 60%,
    var(--main4-hover-color) 80%,
    var(--main4-hover-color) 80%,
    var(--main4-color) 80%,
    var(--main4-color) 95%,
    var(--main4-hover-color) 95%
  );
}

.rank-obj-LOSE {
  border: 5px double var(--main1-color);
  background: linear-gradient(
    40deg,
    var(--red-hover-color) 5%,
    var(--red-color) 5%,
    var(--red-color) 20%,
    var(--red-hover-color) 20%,
    var(--red-hover-color) 40%,
    var(--red-color) 40%,
    var(--red-color) 60%,
    var(--red-hover-color) 60%,
    var(--red-hover-color) 80%,
    var(--red-hover-color) 80%,
    var(--red-color) 80%,
    var(--red-color) 95%,
    var(--red-hover-color) 95%
  );
}

.rank-obj-DRAW {
  border: 5px double var(--main1-color);
  background: linear-gradient(
    40deg,
    var(--green-hover-color) 5%,
    var(--green-color) 5%,
    var(--green-color) 20%,
    var(--green-hover-color) 20%,
    var(--green-hover-color) 40%,
    var(--green-color) 40%,
    var(--green-color) 60%,
    var(--green-hover-color) 60%,
    var(--green-hover-color) 80%,
    var(--green-hover-color) 80%,
    var(--green-color) 80%,
    var(--green-color) 95%,
    var(--green-hover-color) 95%
  );
}

.opposing-name {
  width: 50%;
  display: inline-block;
  color: var(--main5-color);
  line-height: 45px;
  color: var(--main1-color);
  padding-left: 10px;
}

.game-result {
  color: var(--main1-color);
  width: 50%;
  font-size: 20px;
}

#member-name {
  padding-left: 5px;
  padding-right: 5px;
}

#tier-point {
  font-size: 17px;
}

.tier-img {
  width: 30px;
  height: 30px;
}

::-webkit-scrollbar {
  width: 0;
}

#rank-cnt {
    margin-right: 15px;
}

#rank-result {
    margin-left: 45px;
    font-size: 18px;
}
</style>
