<template lang="">

<div id="code-layout" class="row">
    <body class="flex-container">

        <div id="code-side-layout" class="col-2">
            <div>문제설명</div>
            <div id="problem-description">asdfdddddddddddddddddddddddddddddddd</div>

            <div>테스트케이스</div>
            <div id="testcase-description">asdf</div>
            <button class="button">문제신고하기</button>
            
            <span>시간타이머</span>
            <span id="timer">59:00:00</span>

            <button class="button" id="exit">나가기</button>
        </div>


        <div class="monaco">
            <Monaco />
        </div>

        <div id="relative-code">
            상대코드
        </div>


    </body>

</div>


        

        
</template>
<script>
import Monaco from '../../components/code/Monaco.vue'
export default {
    name: 'normal',
    components: {Monaco}
    
}
</script>
<style scoped>


#code-layout {
  min-width: 1280px;
  height: max-content;

  display: flex;
  justify-content: space-around;

  overflow: visible;
  white-space: nowrap;

  color: var(--main5-color);
  border: 3px solid var(--main5-color);
}

body.flex-container{
    display: inline-flex;
    justify-content: center; 
    height: 792px;
    padding-bottom: 10px;
    
    /* align-items: center; */
}


#code-side-layout {
  width: 260px;
  padding: 10px;
  margin-top: 90px;
  margin-right: 10px;

  display: flex;
  flex-direction: column;
  align-items: left;

  border: 3px solid var(--main5-color);
  border-radius: 10px;
}
#problem-description{
    height: 250px;
    background-color: var(--white-color);
    border: 3px solid var(--main5-color);
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    white-space: pre-wrap;
}
#testcase-description{
    height: 250px;
    background-color: var(--white-color);
    border: 3px solid var(--main5-color);
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    overflow-y: scroll;

    white-space: pre-wrap;
}
.monaco {
    width: 760px;
    margin-top: 90px;
     margin-right: 10px;
    /* margin-left: 10px;  */
    border: 3px solid var(--main5-color);
    border-radius:10px;
    
}

#relative-code{
    width: 260px;
  padding: 10px;
  margin-top: 90px;
  margin-right: 10px;

  display: flex;
  flex-direction: column;
  align-items: left;

  border: 3px solid var(--main5-color);
  border-radius: 10px;
}

.button{
    padding: 8px;
    font-size: 1.5rem;

    color: var(--main1-color);
    background-color: var(--main4-color);
    border: none;
    border-radius: 6px;

    &:hover {
        background-color: var(--main4-hover-color);
    }
}

#exit{
    color: var(--main1-color);
    background-color: var(--red-color);
    border: none;
    border-radius: 6px;

    &:hover {
        background-color: var(--red-hover-color);
    }
}
</style>