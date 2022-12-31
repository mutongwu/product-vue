<template>
  <div class="plate" :class="plateCls">
    <div class="plate__bd">
      <div class="item coffee" />
      <div class="item burger">
        <span class="bottom" />
        <span class="up" />
      </div>
      <div class="item fries" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      food: {
        coffee: false,
        burger: false,
        fries: false,
      }
    }
  },
  computed: {
    plateCls() {
      return ['coffee', 'burger', 'fries'].map(key => {
        return this.food[key] ? 'add-' + key : ''
      }).filter(i => i);
    }
  },
  mounted() {
  },
  methods: {
    addFood(key) {
      this.food[key] = true;
    }
  }
}
</script>

<style scoped lang="less">
.plate {
  position: relative;
  height: 200px;
  background: url(../assets/img/plate.png) 50% 65% no-repeat;
  background-size: 260px auto;
  &__bd {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 15px;
  }
  .item {
    // opacity: 0;
    position: absolute;
    transition: all 300ms ease-in;
    transform: scale(0);
    &.coffee {
      top: -120px;
      left: 240px;
      width: 128px;
      height: 128px;
      background: url(../assets/img/coffee.png) 50% 50% no-repeat;
      background-size: contain;
    }
    &.fries {
      top: -100px;
      left: 250px;
      width: 94px;
      height: 94px;
      background: url(../assets/img/fries.png) 50% 50% no-repeat;
      background-size: contain;
    }
    &.burger {
      top: -100px;
      left: 250px;
      width: 80px;
      height: 80px;
      .up, .bottom {
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        width: 76px;
        height: 63px;
        background: url(../assets/img/burger-up.png) 50% 50% no-repeat;
        background-size: contain;
      }
      .bottom {
        top: -8px;
        width: 100%;
        height: 100%;
        background-image: url(../assets/img/burger-bottom.png);
      }
    }
  }
  &.add-coffee {
    .coffee {
      transform: scale(1);
      top: -36px;
      left: 120px;
    }
  }
  &.add-burger {
    .coffee {
      transform: translateX(10px);
    }
    .burger {
      transform: scale(1);
      top: 38px;
      left: 110px;
    }
  }
  &.add-fries {
    .item {
      &.coffee {
        transform: translateX(0px);
      }
      &.burger {
        transform: translateX(-10px);
      }
      &.fries {
        transform: scale(1);
        top: 28px;
        left: 170px;
      }
    }
  }
}
</style>