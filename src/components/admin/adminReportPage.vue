<template>
    <main>
        <div id="layout">
            <div id="report-header">
                <div id="report-filter">
                    <button class="report-opt" id="report-all" @:click="allReport">전체</button>&nbsp;
                    <button class="report-opt" id="report-urk" @:click="urkReport">UNRANKED</button>
                </div>

                <div id="report-search-box">
                    <input id="search-text" type="number" placeholder="문제 번호 검색" @focus="searchReport" />
                    <font-awesome-icon id="search-icon" :icon="['fa', 'magnifying-glass']" @click="searchReport" />
                </div>
            </div>

            <div class="report-content" v-if="!popup">
                <div v-for="report in reportList" :key="report.reportNo" class="report-object">
                    <span class="report-no">{{ report.reportNo }}</span>
                    <span class="report-Type">{{ formatReportType(report.reportType) }}</span>
                    <span class="report-Date">{{ report.reportDate }}</span>
                    <!-- <span class="report-Date">{{ formatDate(report.reportDate) }}</span> -->
                    <span class="report-memberName">{{ report.memberName }}</span>
                    <button class="report-info-bt" :id="'' + report.reportNo" @click="reportView">조회</button>
                </div>
            </div>

            {{ totalPage }} : {{ startPage }} : {{ endPage }}
            <div v-if="!popup" id="report-page">
                <button v-if="startPage > 1" class="page-bt" id="prev" @click="pgPrevClick">◀</button>&nbsp;
                <button v-for="pg in endPage-startPage+1"
                    :key="pg"
                    :class="['page-bt-num', { 'current-page': startPage + pg -1 == currentPage }]"
                    :id="'pg' + (startPage + pg -1)" @click="pgClick">
                    {{ startPage + pg -1 }}
                </button>&nbsp;
                <button v-if="endPage < totalPages" class="page-bt" id="next" @click="pgNextClick">▶︎</button>
            </div>


        </div>
    </main>
</template>
<script>
import { apiClient } from '@/axios-interceptor'
export default {
    name: 'AdminReportPage',
    data() {
        return {
            popup: false,
            reportList: [],
            currentPage: 1,
            startPage: '',
            endPage: '',
            totalPage: '',
        }
    },
    mounted() {
        const filter = this.$route.params.filter
        if (filter == 'all') {
            const onBt = document.getElementById('report-all')
            onBt.style.opacity = '100%'
            const offBt = document.getElementById('report-urk')
            offBt.style.opacity = '50%'

            this.popup = false

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
                    this.totalPage = res.data.totalPages
                    this.startPage = Math.floor((this.currentPage - 1) / 5) * 5 + 1;
                    this.endPage = Math.ceil(res.data.totalElements / 10);
                })
                .catch((error) => {
                    console.error('Error fetching reports:', error.message);
                    // alert('신고목록을 조회할 수 없습니다')
                })
        } else if (filter == 'UNRANKED') {
            const onBt = document.getElementById('report-urk')
            onBt.style.opacity = '100%'
            const offBt = document.getElementById('report-all')
            offBt.style.opacity = '50%'

            this.popup = false

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
                    this.startPage = Math.floor((this.currentPage - 1) / 5) * 5 + 1;
                    this.endPage = Math.ceil(res.data.totalElements / 10);
                    this.totalPage = res.data.totalPages;

                })
                .catch(() => {
                    window.history.back()
                })
        }
    },
    methods: {
        allReport() {
            location.href = '/admin/report/all/1'
        },
        urkReport() {
            location.href = '/admin/report/UNRANKED/1'
        },
        searchReport(e) {
            if (this.popup) {
                if (e.target.id == 'search-icon') return
                const onBt = document.getElementById('quiz-all')
                onBt.style.opacity = '100%'
                this.popup = false
            } else {
                if (e.target.id == 'search-icon') {
                    const onBt = document.getElementById('quiz-all')
                    onBt.style.opacity = '50%'
                    const offBt = document.getElementById('quiz-urk')
                    offBt.style.opacity = '50%'
                    this.popup = true
                }
            }
        },
        pgClick(e) {
            const pg = parseInt(e.target.id.replace("pg", ""));
            this.currentPage = pg;
            const filter = this.$route.params.filter
            location.href = '/admin/report/' + filter + '/' + this.currentPage
        },
        pgPrevClick() {
            this.currentPage = Math.floor(((this.currentPage - 1) / 5)) * 5
            const filter = this.$route.params.filter
            location.href = '/admin/report/' + filter + '/' + this.currentPage
        },
        pgNextClick() {
            if (this.currentPage == 1) this.currentPage = 2
            this.currentPage = (Math.floor(((this.currentPage - 1) / 5)) + 1) * 5 + 1
            const filter = this.$route.params.filter
            location.href = '/admin/report/' + filter + '/' + this.currentPage
        },

        quizView(e) {
            location.href = '/admin/report/' + e.target.id
        },

        // formatDate(reportDate) {
        //     const date = new Date(reportDate);
        //     const formattedDate = date.toLocaleDateString('ko-KR', {
        //         year: 'numeric',
        //         month: '2-digit',
        //         day: '2-digit',
        //     });
        //     return formattedDate;
        // },
        formatReportType(reportType) {
            switch (reportType) {
                case 1:
                    return '테스트케이스 추가요청';
                case 2:
                    return '문제 오류 제보';
                case 3:
                    return '기타';
            }
        },
    }
};
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

#report-urk {
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
</style>