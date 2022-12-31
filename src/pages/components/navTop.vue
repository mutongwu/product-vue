<template>
  <div class="nav-top">
    <div class="icon tag" />
    <div class="icon burger" />
    <div class="icon cup" />
    <div class="icon sweet" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less">
.nav-top {
  display: flex;
  height: 73px;
  align-items: center;
  justify-content: space-around;
  background: linear-gradient(324.97deg, #FD003C -11%, #FF5D79 105.7%);
  filter: drop-shadow(0px 15px 20px rgba(252, 14, 51, 0.265115));
  .icon {
    width: 32px;
    height: 32px;
    background: url(@/assets/img/icon-tag.svg) 50% 50% no-repeat;
    background-size: contain;
    &.burger {
      background-image: url(@/assets/img/icon-burger.svg);
    }
    &.cup {
      background-image: url(@/assets/img/icon-cup.svg);
    }
    &.sweet {
      background-image: url(@/assets/img/icon-sweet.svg);
    }
  }
}
</style>