<template>
  <div class="contact">
    <div class="address">
      <span>Dongcheng District Metro Cultural Building</span>
    </div>
    <div class="phone">
      <span class="icon" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.contact {
  display: flex;
  height: 50px;
  align-items: center;
  padding: 0 20px;
  .address {
    padding-left: 50px;
    background: url('../assets/img/icon-location.svg') 0% 0% no-repeat;
    background-size: auto 32px;
  }
  .phone {
    width: 64px;
    height: 100%;
    background: url('../assets/img/icon-phone.svg') 50% 50% no-repeat;
    background-size: 32px auto;
  }
}
</style>