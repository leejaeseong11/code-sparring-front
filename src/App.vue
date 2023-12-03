<template>
  <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      &nbsp;&nbsp;&nbsp; <!--문제 추가하기 임시 버튼 생성해놓은거임-->
      <RouterLink to="/quiz/add">
        <button class="addQuizBt">문제 추가하기</button>
      </RouterLink>
    </nav>
  </header> 
  <RouterView />
</template>

<style>
/* 임시 생성 */
.addQuizBt{
  width: 120px; 
  height: 45px; 
  background-color: #354c7c; 
  color: #eaebfe;
  border: 3px solid #354c7c;  
  border-radius: 5px;
}
</style>
