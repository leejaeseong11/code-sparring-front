<template>
    <main>
        <div id="layout">
            <div id="quiz-header">
                <div id="quiz-filter">
                    <button class="quiz-opt" id="quiz-all" @click="allquiz">전체</button>&nbsp;
                    <button class="quiz-opt" id="quiz-urk" @click="urkquiz">UNRANKED</button>
                </div>

                <div id="quiz-search-box">
                    <input id="search-text" type="number" placeholder="문제 번호 검색" @focus="searchQuiz" />
                    <font-awesome-icon id="search-icon" :icon="['fa', 'magnifying-glass']" @click="searchQuiz" />
                </div>
            </div>

            <div class="quiz-content" v-if="!popup">
                <div v-for="report in reportList" :key="report.reportNo" class="report-object">
                    <span class="report-no">{{ report.reportNo }}</span>
                    <span class="report-Type">{{ formatReportType(report.reportType) }}</span>
                    <span class="report-Date">{{ formatDate(report.reportDate) }}</span>
                    <span class="report-memberName">{{ report.memberName }}</span>
                    <button class="quiz-info-bt" :id="'' + report.reportNo" @click="quizView">조회</button>
                </div>
            </div>

            <div v-if="!popup" id="quiz-page">
                <button v-if="startPage > 1" class="page-bt" id="prev" @click="pgPrevClick">◀</button>&nbsp;
                <button v-for="pg in Math.min(endPage - startPage + 1, totalPage)" :key="pg"
                    :class="['page-bt-num', { 'current-page': startPage + pg === currentPage }]"
                    :id="'pg' + (startPage + pg)" @click="pgClick">
                    {{ startPage + pg }}
                </button>&nbsp;
                <button v-if="endPage < totalPage" class="page-bt" id="next" @click="pgNextClick">▶︎</button>
            </div>


        </div>
    </main>
</template>
<script>
import axios from 'axios'
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
            const onBt = document.getElementById('quiz-all')
            onBt.style.opacity = '100%'
            const offBt = document.getElementById('quiz-urk')
            offBt.style.opacity = '50%'

            this.popup = false

            const text = document.getElementById('search-text')
            text.value = ''

            this.currentPage = this.$route.params.currentPage

            const url = `${this.backURL}/report/date?page=${this.currentPage - 1}`
            axios
                .get(url)
                .then((res) => {
                    console.log(res.data.list)
                    console.log('Response Status:', res.status);
                    this.reportList = res.data.list
                    this.startPage = res.data.startPage
                    this.endPage = res.data.endPage
                    this.totalPage = res.data.totalPage
                })
                .catch((error) => {
                    console.error('Error fetching reports:', error.message);
                    alert('신고목록을 조회할 수 없습니다')
                })
        } else if (filter == 'UNRANKED') {
            const onBt = document.getElementById('quiz-urk')
            onBt.style.opacity = '100%'
            const offBt = document.getElementById('quiz-all')
            offBt.style.opacity = '50%'

            this.popup = false

            const text = document.getElementById('search-text')
            text.value = ''

            this.currentPage = this.$route.params.currentPage
            const url = `${this.backURL}/report/commentNull?page=${this.currentPage - 1}`
            axios
                .get(url)
                .then((res) => {
                    this.reportList = res.data.list
                    this.startPage = res.data.startPage
                    this.endPage = res.data.endPage
                    this.totalPage = res.data.totalPage
                })
                .catch(() => {
                    window.history.back()
                })
        }
    },
    methods: {
        allquiz() {
            location.href = '/admin/report/all/1'
        },
        urkquiz() {
            location.href = '/admin/report/UNRANKED/1'
        },
        searchQuiz(e) {
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
        // fetchReports() {
        //     console.log('리포트를 불러오는 중...');
        //     axios
        //         .get(`${this.backURL}/report/date?page=${this.currentPage - 1}`)
        //         .then((response) => {
        //             console.log('데이터를 받았습니다:', response.data);
        //             this.reportList = response.data;
        //             this.updatePagination();
        //         })
        //         .catch((error) => {
        //             console.error("Error fetching reports:", error);
        //         });
        // },
        pgClick(e) {
            const pg = parseInt(e.target.id.replace("pg", ""));
            this.currentPage = pg;
            // location.href = '/admin/report/all/' + this.currentPage
            const filter = this.$route.params.filter
            location.href = '/admin/report/' + filter + '/' + this.currentPage
        },
        pgPrevClick() {
            this.currentPage = Math.floor(((this.currentPage - 1) / 5)) * 5
            // location.href = '/admin/report/all/' + this.currentPage
            const filter = this.$route.params.filter
            location.href = '/admin/report/' + filter + '/' + this.currentPage
        },
        pgNextClick() {
            if (this.currentPage == 1) this.currentPage = 2
            this.currentPage = (Math.floor(((this.currentPage - 1) / 5)) + 1) * 5 + 1
            // location.href = '/admin/report/all/' + this.currentPage
            const filter = this.$route.params.filter
            location.href = '/admin/report/' + filter + '/' + this.currentPage
        },

        quizView(e) {
            location.href = '/report/' + e.target.id
        },

        // updatePagination() {
        //     this.startPage = Math.max(1, this.currentPage - 2);
        //     this.endPage = Math.min(this.totalPage, this.currentPage + 2);
        // },
        formatDate(reportDate) {
            const date = new Date(reportDate);
            const formattedDate = date.toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
            });
            return formattedDate;
        },
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

#quiz-header {
    display: flex;
    justify-content: space-between;
}

#quiz-filter {
    margin-left: 10px;
    margin-top: 8px;
}

.quiz-opt {
    padding: 4px;
    border: none;
    background-color: var(--main1-color);
    color: var(--main5-color);

    &:hover {
        background-color: var(--main2-color);
        border-radius: 5px;
    }
}

#quiz-urk {
    opacity: 50%;
}

#quiz-search-box {
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

.quiz-content {
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

.quiz-info-bt {
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

#quiz-page {
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