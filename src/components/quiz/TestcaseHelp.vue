<template>
    <div id="layout">
        <br>
        <div id="header">테스트케이스 생성 시 주의사항</div>
        <br>
        <div id="content">
            [1] 입력값 및 출력값 Enter 적용이 가능합니다.<br>
            [2] 10개 미만은 문제를 만들 수 없습니다.<br>
            [3] 오타 및 잘못된 값 생성 시 문제 오류 처리되어 삭제 조치될 수 있으니 주의하세요.
        </div>
    </div>
</template>
<script>
export default {
    name: 'TestcaseHelp',
    data() {
        return {}
    }
}
</script>
<style scoped>
*{
    cursor: default;
}
#header {
    text-align: center;
    font-size: 20px;
}

#content {
    font-size: 18px;
    line-height: 50px;
}
</style>