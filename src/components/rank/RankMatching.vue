<template>
    <div id="layout">
        <div id="header">
            <img src="../../../public/images/rank/matching.gif" id="matching-icon" alt="rank-matching">&nbsp;
            <span id="timer-content" class="title" :class="{ 'timer-expired': timerRunning }">{{ formattedTime }}</span>
        </div>

        <div id="content">
            <img :src="'../../../public/images/icon/'+this.memberNo+'.png'" id="member-profile-img" alt="my-profile-img">
            <div id="member-profile">
                <div id="member-name">{{ this.memberName }}</div>
                <div id="rank-point">
                    <span :id="'tier-'+this.tier">{{ this.tier }}</span>&nbsp;&nbsp;
                    <span id="point">{{ this.point }}pt</span>
                </div>
                <div id="tier-icon-div">
                    <img :src="'../../../public/images/rank/'+this.tierImg+'.png'" id="tier-icon" alt="my-tier-icon">
                </div>
                <div id="member-score">{{ this.score }}</div>
            </div>
        </div>

        <div id="footer">
            <button id="cancle-button" @click="$emit('close-popup')">취소</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'RankMatching',
    data() {
        return {
            memberNo: 0,
            memberName: '내 닉네임이야',
            tier: 'GOLD',
            point: '12000',
            tierImg: 'gold',
            score: '88.28%',
            timerRunning: true,
            minutes: 0,
            seconds: 0,
        }
    },
    computed: {
        formattedTime() {
            return `${String(this.minutes).padStart(2, '0')}:${String(this.seconds).padStart(2, '0')}`;
        },
    },
    methods: {
        updateTimer() {
            if (this.seconds === 59) {
                this.minutes++;
                this.seconds = 0;
            } else {
                this.seconds++;
            }

            if (this.timerRunning) {
                setTimeout(this.updateTimer, 1000);
            }
        }
    },
    created(){
        //타이머 시작
        this.updateTimer();
    }
}
</script>
<style scoped>
*{
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
    margin-top: 70px;
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