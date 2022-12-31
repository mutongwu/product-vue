<template>
  <div class="swiper">
    <div class="add-button" @click="add" />
    <div
      ref="swiperBox"
      class="swiper__bd"
      :style="`transform: translateX(${boxTranslate}px)`"
    >
      <template v-for="i in [1,2]">
        <div
          v-for="(item, j) in food"
          :key="`${i}_${item}`"
          class="item"
          :class="item"
          :style="calItemLeft(i, j)"
        >
          <div v-if="item === 'fries'" class="item__bd">
            <div class="fries-main" :style="friesStyle" />
            <div class="fries-1" :style="friesStyle1" />
            <div class="fries-2" :style="friesStyle2" />
          </div>
          <div v-else-if="item === 'coffee'" class="item__bd">
            <div class="cup" :style="cupStyle" />
            <div class="water" :style="waterStyle" />
          </div>
          <div v-else class="item__bd">
            <div class="burger-bottom" />
            <div class="burger-up" :style="burgerUpStyle" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
// import throttle from 'lodash-es/throttle';
export default {
  data() {
    return {
      current: 0,
      food: [ 'fries', 'coffee', 'burger'],
      startX: 0,
      distance: 0,
      maxLength: 0,
      itemWidth: 0,
      validMoved: 0,
      moved: 0,
    }
  },
  computed: {
    boxTranslate() {
      let x = this.distance + this.moved;
      return  Math.max(Math.min(0, x), this.maxLength);
    },
    caclPercent() {
      return Math.min(Math.abs(this.moved) / this.validMoved / 2, 1);
    },
    friesStyle() {
      // 21 is the default deg value
      const deg = (1 - this.caclPercent) * 21;
      return `transform: rotate(${deg}deg)`;
    },
    friesStyle1() {
      const x = 10 * this.caclPercent;
      const y = 100 * this.caclPercent;
      return `transform: scale(0.5) translate(${x}px, ${y}px)`;
    },
    friesStyle2() {
      const x = 50 * this.caclPercent;
      const y = 100 * this.caclPercent;
      return `transform: scale(0.5) translate(${x}px, ${y}px)`;
    },
    cupStyle() {
      // 20 is the default deg value
      const deg = (1 - this.caclPercent) * 20;
      return `transform: rotate(${deg}deg)`;
    },
    waterStyle() {
      const scale = (1 - this.caclPercent) * 0.7;
      return `transform: scale(${scale}) rotateZ(20deg)`;
    },
    burgerUpStyle() {
      // 10 is the default distance value
      const y = (this.caclPercent - 1) * 30;
      return `transform: translateY(${y}px)`;
    },
  },
  watch: {
  },
  mounted() {
    this.init();
  },
  methods: {
    calItemLeft(i, j) {
      return `left: ${((i - 1)* this.food.length + j) * this.itemWidth}px`;
    },
    init() {
      this.initEvent();
      this.initSize();
    },
    initSize() {
      const box = this.$refs.swiperBox;
      this.itemWidth = box.clientWidth;
      this.maxLength = (this.food.length * 2 - 1) * box.clientWidth * -1 ;
      this.validMoved = this.itemWidth / 4;
    },
    initEvent() {
      const box = this.$refs.swiperBox;
      this.onMoveFn = this.onTouchMove;
      const onTouchEnd = (e) => {
        box.removeEventListener('touchmove', this.onMoveFn);
        box.removeEventListener('touchend', onTouchEnd);
        this.onTouchEnd(e);
      };
      const onTouchStart = (e) => {
        const evt = e.changedTouches[0];
        box.addEventListener('touchmove', this.onMoveFn, false);
        box.addEventListener('touchend', onTouchEnd, false);
      };
      // bind event
      box.addEventListener('touchstart', onTouchStart, false);
      // remove event listener
      this.$once('hook:beforeDestroy', () => {
        box.removeEventListener('touchstart', onTouchStart);
      });
    },
    onTouchMove(e) {
      e.preventDefault();
      const evt = e.changedTouches[0];
      if (!this.startX) {
        this.startX = evt.pageX;
      } else {
        this.moved = evt.pageX - this.startX;
      }
    },
    onTouchEnd(e) {
      // moved distance will been actived when larger than 25% of item width
      if (Math.abs(this.moved) >= this.validMoved) {
        this.current += (this.moved > 0 ? -1 : 1);
        console.log('this.current', this.current);
        if ((this.current) === this.food.length * 2) {
          this.current = 0;
        };
        console.log('this.current', this.current);
        this.distance = this.current * this.itemWidth * -1;
      }
      this.startX = 0;
      this.moved = 0;
    },
    add() {
      this.$emit('add', this.food[this.current]);
    }
  }
}
</script>

<style scoped lang="less">
.swiper {
  width: 100%;
  height: 260px;
  overflow: hidden;
  position: relative;
  z-index: 1;
  .add-button {
    position: absolute;
    bottom: 30px;
    right: 40px;
    width: 59px;
    height: 59px;
    background: url(../assets/img/icon-plus.png) 50% 50% no-repeat;
    background-size: contain;
    z-index: 10;
  }
  &__bd {
    position: absolute;
    width: 100%;
    height: 100%;
    transition: transform 100ms ease-in;
    .item {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
        background: grey;
      &:nth-of-type(2) {
        left: 100%;
        background: green;
      }
      &:nth-of-type(3) {
        left: 200%;
        background: yellow;
      }
      &__bd {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
    .fries {
      .fries-main {
        position: absolute;
        top: 20%;
        left: 10%;
        width: 172px;
        height: 172px;
        background: url('../assets/img/fries.png') 50% 50% no-repeat;
        transform: rotateZ(21deg);
      }

      .fries-1 {
        position: absolute;
        top: -15%;
        left: 20%;
        width: 172px;
        height: 172px;
        background: url('../assets/img/fries-1.png') 50% 50% no-repeat;
        transform: scale(0.5);
      }

      .fries-2 {
        position: absolute;    
        top: -24%;
        left: -8%;
        width: 172px;
        height: 172px;
        background: url('../assets/img/fries-2.png') 0% 0% no-repeat;
        transform: scale(0.5);
      }
    }
    .coffee {
      .cup {
        position: absolute;
        top: 20%;
        left: 10%;
        width: 200px;
        height: 200px;
        background: url('../assets/img/coffee.png') 50% 50% no-repeat;
        transform: rotateZ(20deg);
      }
      .water {
        position: absolute;
        top: -20%;
        left: 15%;
        width: 170px;
        height: 170px;
        background: url('../assets/img/water.png') 50% 50% no-repeat;
        transform: scale(0.7) rotateZ(20deg);
        transform-origin: 50% 100%;
      }
    }
    .burger {
      .burger-bottom {
        position: absolute;
        top: 20%;
        left: 10%;
        width: 200px;
        height: 200px;
        background: url('../assets/img/burger-bottom.png') 50% 50% no-repeat;
      }
      .burger-up {
        position: absolute;
        top: 0%;
        left: 16%;
        width: 170px;
        height: 170px;
        background: url('../assets/img/burger-up.png') 50% 50% no-repeat;
      }
    }
  }
}
</style>