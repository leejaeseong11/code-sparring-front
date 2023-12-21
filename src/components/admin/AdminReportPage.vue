<template>
  <main>
    <div id="layout">
      <div id="report-header">
        <div id="report-filter">
          <button class="report-opt" id="report-all" @click="allReport">전체</button>&nbsp;
          <button class="report-opt" id="report-upc" @click="unprocessed">미처리</button>
        </div>

        <div id="report-search-box">
          <input
            id="search-text"
            type="number"
            placeholder="신고 번호 검색"
            @focus="searchReport"
          />
          <font-awesome-icon
            id="search-icon"
            :icon="['fa', 'magnifying-glass']"
            @click="searchReport"
          />
        </div>
      </div>

      <div class="report-content">
        <div v-for="report in reportList" :key="report.reportNo" class="report-object">
          <span class="report-no">{{ report.reportNo }}</span>
          <span class="report-Type">{{ formatReportType(report.reportType) }}</span>
          <span class="report-Date">{{ report.reportDate }}</span>
          <span class="report-memberName">{{ report.memberName }}</span>
          <button class="report-info-bt" :id="'' + report.reportNo" @click="reportView(report)">
            조회
          </button>
        </div>
      </div>
      <div v-if="reportModal" id="back-off" @click="offReportModal"></div>
      <AddReportComment
        v-if="reportModal"
        id="report-popup"
        @close-modal="offReportModal"
        :reportNo="selectedReportNo"
        @report-deleted="handleReportDeleted"
      ></AddReportComment>

      <div v-if="!reportModal" id="report-page">
        <button v-if="startPage > 1" class="page-bt" id="prev" @click="pgPrevClick">◀</button
        >&nbsp;
        <button
          v-for="pg in endPage - startPage + 1"
          :key="pg"
          :class="['page-bt-num', { 'current-page': startPage + pg - 1 == currentPage }]"
          :id="'pg' + (startPage + pg - 1)"
          @click="pgClick"
        >
          {{ startPage + pg - 1 }}</button
        >&nbsp;
        <button v-if="endPage < totalPages" class="page-bt" id="next" @click="pgNextClick">
          ▶︎
        </button>
      </div>
    </div>
  </main>
</template>
<script>
import { apiClient } from '@/util/axios-interceptor'
import AddReportComment from '../report/AddReportComment.vue'

export default {
  name: 'AdminReportPage',
  components: { AddReportComment },
  data() {
    return {
      reportList: [],
      currentPage: 1,
      startPage: '',
      endPage: '',
      totalPages: '',
      reportModal: false
    }
  },
  mounted() {
    const filter = this.$route.params.filter
    if (filter == 'all') {
      const onBt = document.getElementById('report-all')
      onBt.style.opacity = '100%'
      const offBt = document.getElementById('report-upc')
      offBt.style.opacity = '50%'

      this.reportModal = false

      const text = document.getElementById('search-text')
      text.value = ''

      this.currentPage = this.$route.params.currentPage
      const url = `${this.backURL}/admin/report/all?page=${this.currentPage - 1}`
      apiClient
        .get(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          console.log(res.data)
          this.reportList = res.data.content
          this.totalPages = res.data.totalPages
          this.startPage = Math.floor((this.currentPage - 1) / 5) * 5 + 1
          this.endPage = Math.min(this.startPage + 4, this.totalPages)
        })
        .catch((error) => {
          console.error('Error fetching reports:', error.message)
          // alert('신고목록을 조회할 수 없습니다')
        })
    } else if (filter == 'unprocessed') {
      const onBt = document.getElementById('report-upc')
      onBt.style.opacity = '100%'
      const offBt = document.getElementById('report-all')
      offBt.style.opacity = '50%'

      this.reportModal = false

      const text = document.getElementById('search-text')
      text.value = ''

      this.currentPage = this.$route.params.currentPage
      const url = `${this.backURL}/admin/report/commentNull?page=${this.currentPage - 1}`
      apiClient
        .get(url, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then((res) => {
          this.reportList = res.data.content
          this.totalPages = res.data.totalPages
          this.startPage = Math.floor((this.currentPage - 1) / 5) * 5 + 1
          this.endPage = Math.min(this.startPage + 4, this.totalPages)
        })
        .catch(() => {
          console.error('Error fetching reports:', error.message)
        })
    }
  },
  methods: {
    handleReportDeleted() {
      const index = this.reportList.findIndex((report) => report.reportNo === this.selectedReportNo)
      if (index !== -1) {
        this.reportList.splice(index, 1)
      }
    },
    allReport() {
      location.href = '/admin/report/all/1'
    },
    unprocessed() {
      location.href = '/admin/report/unprocessed/1'
    },
    searchReport(e) {
      if (this.reportModal) {
        if (e.target.id == 'search-icon') return
        const onBt = document.getElementById('report-all')
        onBt.style.opacity = '100%'
        this.reportModal = false
      } else {
        if (e.target.id == 'search-icon') {
          const onBt = document.getElementById('report-all')
          onBt.style.opacity = '50%'
          const offBt = document.getElementById('report-upc')
          offBt.style.opacity = '50%'
          this.reportModal = false

          const searchText = document.getElementById('search-text').value
          const filteredReports = this.reportList.filter((report) => report.reportNo == searchText)
          this.reportList = filteredReports
        }
      }
    },

    pgClick(e) {
      const pg = parseInt(e.target.id.replace('pg', ''))
      this.currentPage = pg
      const filter = this.$route.params.filter
      location.href = '/admin/report/' + filter + '/' + this.currentPage
    },

    pgPrevClick() {
      this.currentPage = Math.floor((this.currentPage - 1) / 5) * 5
      const filter = this.$route.params.filter
      location.href = '/admin/report/' + filter + '/' + this.currentPage
    },
    pgNextClick() {
      if (this.currentPage == 1) this.currentPage = 2
      this.currentPage = (Math.floor((this.currentPage - 1) / 5) + 1) * 5 + 1
      const filter = this.$route.params.filter
      location.href = '/admin/report/' + filter + '/' + this.currentPage
    },
    formatReportType(reportType) {
      switch (reportType) {
        case 1:
          return '테스트케이스 추가요청'
        case 2:
          return '문제 오류 제보'
        case 3:
          return '기타'
      }
    },
    reportView(report) {
      console.log(report.reportNo)
      this.selectedReportNo = report.reportNo
      this.reportModal = true
    },
    offReportModal() {
      this.reportModal = false
    }
  }
}
</script>

<style scoped>
#layout {
  width: 100%;
  height: 100%;
  text-align: center;
}

#report-header {
  display: flex;
  justify-content: space-between;
}

#report-filter {
  margin-left: 10px;
  margin-top: 8px;
}

.report-opt {
  padding: 4px;
  border: none;
  background-color: var(--main1-color);
  color: var(--main5-color);

  &:hover {
    background-color: var(--main2-color);
    border-radius: 5px;
  }
}

#report-upc {
  opacity: 50%;
}

#report-search-box {
  margin-right: 8px;
  display: flex;
  align-items: center;
  border: 3px solid var(--main5-color);
  border-radius: 20px;
  width: 20%;
}

#search-text {
  width: 100%;
  height: 1.5rem;
  font-size: 0.9rem;
  text-indent: 14px;
  border: none;
  border-radius: 20px;
  background-color: var(--main1-color);
  color: var(--main5-color);

  &::placeholder {
    color: var(--main4-hover-color);
  }
}

#search-icon {
  padding: 8px 12px 8px 0;
  font-size: 1rem;
  cursor: pointer;
  color: var(--main5-color);
  border: none;
}

input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.report-content {
  width: 100%;
  height: 77%;
  margin-top: 25px;
}

.report-object {
  border: 3px solid var(--white-color);
  border-radius: 10px;
  padding: 5px;
  margin: 5px;
  height: 9%;
  background-color: var(--white-color);
  vertical-align: center;
}

.report-no {
  width: 5%;
  display: inline-block;
  color: var(--main5-color);
  font-size: 13px;
}

.report-Type {
  width: 50%;
  display: inline-block;
}

.report-memberName {
  width: 15%;
  display: inline-block;
  color: var(--main4-color);
}

.report-Date {
  width: 20%;
  display: inline-block;
}

.report-info-bt {
  width: 10%;
  background-color: var(--main4-color);
  border: 2px solid var(--main4-color);
  border-radius: 5px;
  color: var(--white-color);

  &:hover {
    background-color: var(--main4-hover-color);
    border-color: var(--main4-hover-color);
  }
}

#report-page {
  margin-top: 22px;
}

.page-bt,
.page-bt-num {
  padding: 5px;
  width: 35px;
  height: 35px;
  background-color: var(--main1-color);
  opacity: 50%;
  border: none;
  color: var(--main5-color);
  padding-bottom: 27px;

  &:hover {
    opacity: 100%;
  }
}

.page-bt-num.current-page {
  opacity: 100%;
  cursor: default;
}

#report-popup {
  padding: 10px;
  position: fixed;
  background-color: var(--main1-color);
  border: 8px solid var(--main5-color);
  border-radius: 10px;
  width: 700px;
  height: 420px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

#back-off {
  width: 100%;
  height: 100%;
  display: fixed;
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
