<template>
  <main>
    <div class="header">
      <div class="header-text">마이페이지</div>
    </div>

    <div class="content-box">
      <div class="index-bar">
        <div class="index" id="profile-page" @click="movePage">내 정보 확인</div>
        <div class="index" id="profile-edit-page" @click="movePage">내 정보 수정</div>
        <div class="index" id="code-page" @click="movePage">제출한 코드</div>
        <div class="index" id="rank-history" @click="movePage">랭크 전적</div>
        <div id="etc-bt">
          <img src="../../../public/images/admin/home.png" class="home-bt" alt="home" @click="movePage" />
          <button id="unregister" @click="onRemoveModal">회원 탈퇴</button>
        </div>
      </div>
      <div class="content-area">
        <ProfileCheck v-if="this.myProfile"></ProfileCheck>
        <ProfileEdit v-if="this.profileEdit"></ProfileEdit>
        <MyCode v-if="this.myCode"></MyCode>
        <RankHistory v-if="this.rankHistory"></RankHistory>
      </div>
    </div>

    <div v-if="removeModal" id="back-off" @click="offRemoveModal"></div>
    <ProfileRemove v-if="removeModal" id="remove-popup" @close-modal="offRemoveModal" />
  </main>
</template>
<script>
import ProfileCheck from '../../components/profile/ProfileCheck.vue'
import ProfileEdit from '../../components/profile/ProfileEdit.vue'
import MyCode from '../../components/profile/MyCode.vue'
import RankHistory from '../../components/profile/RankHistory.vue'
import ProfileRemove from '../../components/profile/ProfileRemove.vue'

import { apiClient } from '@/axios-interceptor'
import sweetAlert from '../../util/modal.js'

export default {
  name: 'MyPage',
  components: { ProfileCheck, ProfileEdit, MyCode, RankHistory, ProfileRemove },
  data() {
    return {
      memberNo: '',
      myProfile: true,
      profileEdit: false,
      myCode: false,
      rankHistory: false,
      removeModal: false,
      loginMember: {
        memberNo: 0,
        authority: '',
      }

    }
  },
  methods: {
    movePage(e) {
      const viewName = e.target.id
      if (viewName == 'profile-page') location.href = '/profile/check/' + this.memberNo
      else if (viewName == 'profile-edit-page') location.href = '/profile/edit/' + this.memberNo
      else if (viewName == 'code-page') location.href = '/profile/code/' + this.memberNo
      else if (viewName == 'rank-history') location.href = '/profile/rank/' + this.memberNo
      else location.href = '/'
    },
    offRemoveModal() {
      this.removeModal = false
    },
    onRemoveModal() {
      this.removeModal = true
    },

    getLoginNo() {
      apiClient
        .get(`${this.backURL}/member/my`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((response) => {
          console.log('HTTP 응답:', response);
          this.loginMember = response.data

          this.memberNo = this.$route.params.memberNo;

          if (this.loginMember.authority == "ROLE_ADMIN") {
            console.log(this.loginMember.authority == "ROLE_ADMIN")
            return;
          }

          if (this.loginMember.memberNo !== this.memberNo) {
            sweetAlert.error("권한이 없습니다", '', '뒤로 가기').then(() => {
              window.history.back();
            });
          }
        })
        .catch((error) => {
          sweetAlert.error(error.response.data.errors[0], '', '닫기')
        });
    }
  },
  mounted() {
    this.getLoginNo();
    this.memberNo = this.$route.params.memberNo
    const viewName = this.$route.params.viewName
    this.myProfile = false
    this.profileEdit = false
    this.myCode = false
    this.rankHistory = false
    const pg1 = document.getElementById('profile-page')
    const pg2 = document.getElementById('profile-edit-page')
    const pg3 = document.getElementById('code-page')
    const pg4 = document.getElementById('rank-history')
    pg1.style.color = 'var(--main1-color)'
    pg1.style.backgroundColor = 'var(--main5-color)'
    pg2.style.color = 'var(--main1-color)'
    pg2.style.backgroundColor = 'var(--main5-color)'
    pg3.style.color = 'var(--main1-color)'
    pg3.style.backgroundColor = 'var(--main5-color)'
    pg4.style.color = 'var(--main1-color)'
    pg4.style.backgroundColor = 'var(--main5-color)'
    if (viewName == 'check') {
      this.myProfile = true
      pg1.style.color = 'var(--main5-color)'
      pg1.style.backgroundColor = 'var(--main1-color)'
    } else if (viewName == 'edit') {
      this.profileEdit = true
      pg2.style.color = 'var(--main5-color)'
      pg2.style.backgroundColor = 'var(--main1-color)'
    } else if (viewName == 'code') {
      this.myCode = true
      pg3.style.color = 'var(--main5-color)'
      pg3.style.backgroundColor = 'var(--main1-color)'
    } else if (viewName == 'rank') {
      this.rankHistory = true
      pg4.style.color = 'var(--main5-color)'
      pg4.style.backgroundColor = 'var(--main1-color)'
    }
  }
}
</script>
<style scoped>
* {
  color: var(--main5-color);
  width: 100%;
  height: 100%;
  cursor: default;
}

.header {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-text {
  font-size: 25px;
  text-align: right;
  width: 100%;
  margin-right: 20px;
  padding-top: 45px;
}

.content-box {
  display: flex;
  justify-content: space-between;
  border: 5px solid var(--main5-color);
  width: 98%;
  margin-left: 1%;
  margin-top: 20px;
  border-radius: 18px;
}

.index-bar {
  background-color: var(--main5-color);
  width: 20%;
  height: 650px;
  padding-right: 5px;
}

.index {
  color: var(--main1-color);
  font-size: 20px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  margin-top: 40px;
  cursor: pointer;

  &:hover {
    font-size: 21px;
  }
}

#profile-page {
  background-color: var(--main1-color);
  color: var(--main5-color);
}

#profile-edit-page,
#code-page,
#rank-history {
  margin-top: 20px;
}

.home-bt {
  width: 40px;
  height: 40px;
  margin-left: 20px;
  cursor: pointer;

  &:hover {
    width: 42px;
    height: 42px;
    margin-left: 19px;
    margin-top: -1px;
  }
}

.content-area {
  height: 650px;
  padding: 10px;
}

.view-area {
  padding: 2%;
}

#etc-bt {
  display: flex;
  justify-content: space-between;
  height: 40px;
  margin-top: 270px;
}

#unregister {
  width: 80px;
  font-size: 15px;
  margin-right: 5px;
  border: 1px solid var(--main5-color);
  background-color: var(--main5-color);
  color: var(--main2-color);

  &:hover {
    color: var(--white-color);
  }
}

#remove-popup {
  padding: 10px;
  position: fixed;
  background-color: var(--white-color);
  border: 8px solid var(--red-color);
  border-radius: 10px;
  width: 700px;
  height: 330px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 3;
}

#back-off {
  width: 100%;
  height: 100%;
  display: fixed;
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
