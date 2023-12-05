<template>
  <div class="card ms-3 mb-3 room-container">
    <div class="row">
      <div class="col-2 ps-0 pe-0">
        <div class="room-no">No. <br />{{ roomNumber }}</div>
      </div>
      <div class="col-10 ps-0 pe-0">
        <div class="pb-2 room-info-container">
          <div class="col">
            <h5 class="ps-3 pb-2 card-title">
              아무나들어와도되지만이방의제목은매우길기때문에잘릴수있습니다
            </h5>
          </div>
          <div class="room-info">
            <div class="ps-3">WAITING</div>
            <div class="pe-3 room-enter">
              <font-awesome-icon :icon="['fa', 'user']" />
              <div class="room-member-number">3/4</div>
              <button class="btn btn-primary enter-button"><div>입장</div></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'MainHomeRoom',
  props: ['roomNumber', 'roomTitle', 'roomStatus', 'roomMember', 'roomPwd']
}
</script>
<style scoped>
.room-container {
  width: 48%;
  border: 1px solid var(--main3-color);
}
.room-no {
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;

  border-right: 1px solid var(--main3-color);
}
.room-info-container {
  padding: 8px 0;
}

.card-title {
  overflow: hidden;
  text-overflow: ellipsis;

  border-bottom: 2px dashed var(--main3-color);
}
.room-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.room-enter {
  display: flex;
  align-items: center;
}
.room-member-number {
  margin-right: 8px;
}
.enter-button {
  width: 55px;
}
</style>
