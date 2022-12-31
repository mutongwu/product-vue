<template>
  <div class="swiper">
    <div class="add-button" @click="add" />
    <div
      ref="swiperBox"
      class="swiper__bd"
      :style="`transform: translateX(${boxTranslate}px)`"
    >
      <div
        v-for="(item) in food"
        :key="item._key"
        :class="['item', item.type]"
      >
        <template v-if="item.type === 'fries'">
          <div class="fries-main" :style="friesStyle" />
          <div class="fries-1" :style="friesStyle1" />
          <div class="fries-2" :style="friesStyle2" />
          <div class="price-box" :style="priceStyle">
            <div class="name">
              {{ item.type.toUpperCase() }}
            </div>
            <div class="price">
              {{ item.price }}$
            </div>
          </div>
        </template>
        <template v-else-if="item.type === 'coffee'">
          <div class="cup" :style="cupStyle" />
          <div class="water" :style="waterStyle" />
          <div class="price-box" :style="priceStyle">
            <div class="name">
              {{ item.type.toUpperCase() }}
            </div>
            <div class="price">
              {{ item.price }}$
            </div>
          </div>
        </template>
        <template v-else>
          <div class="burger-bottom" />
          <div class="burger-up" :style="burgerUpStyle" />

          <div class="price-box" :style="priceStyle">
            <div class="name">
              {{ item.type.toUpperCase() }}
            </div>
            <div class="price">
              {{ item.price }}$
            </div>
          </div>
        </template>
      </div>
    </div>
    <div ref="starBox" class="star-box">
      <div class="star" />
      <div class="star star-1" />
      <div class="star star-2" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      current: 1,
      originIdx: 0,
      startX: 0,
      distance: 0,
      itemWidth: 0,
      minMoved: 0,
      moved: 0,
    }
  },
  computed: {
    food() {
      // copy items for loop needed
      const first = this.list.slice(0, 1);
      const last = this.list.slice(-1);
      const list = last.concat(this.list, first);
      return list.map((item, i) => {
        return {
          ...item,
          _key: i,
        }
      });
    },
    boxTranslate() {
      return this.distance + this.moved;
    },
    caclPercent() {
      return Math.min(Math.abs(this.moved) / this.minMoved / 2, 1);
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
      // 30 is the default distance value
      const y = (this.caclPercent - 1) * 30;
      return `transform: translateY(${y}px)`;
    },
    priceStyle() {
      // 20 is the default distance value
      const y = (this.caclPercent - 1) * 20;
      return `opacity:${ 1 - this.caclPercent}; transform: translateY(${y}px)`;
    },
  },
  watch: {
    boxTranslate(val) {
      const percentage = Math.abs(val + this.itemWidth) / (this.itemWidth * this.list.length)
      if (this.$refs.starBox) {
        this.$refs.starBox.style.setProperty('--moved', percentage);
      }
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.initEvent();
      this.initSize();
    },
    initSize() {
      const box = this.$refs.swiperBox;
      this.itemWidth = box.clientWidth;
      // moved distance will been actived when larger than 25% of item width.
      this.minMoved = this.itemWidth / 4;
      this.distance = this.current * this.itemWidth * -1;
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
      // moved distance will been actived when larger than minMoved
      if (Math.abs(this.moved) >= this.minMoved) {
        this.current += (this.moved > 0 ? -1 : 1);
        this.distance = this.current * this.itemWidth * -1;
        this.originIdx = this.current - 1;
        if (this.current === 0) {
          this.originIdx = this.list.length - 1;
          this.$nextTick(() => {
            this.current += this.list.length;
            this.distance = this.current * this.itemWidth * -1;
          })
        } else if (this.current === this.food.length - 1){
          this.originIdx = 0;
          this.$nextTick(() => {
            this.current -= this.list.length;
            this.distance = this.current * this.itemWidth * -1;
          })
        }
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
    background: url(@/assets/img/icon-plus.png) 50% 50% no-repeat;
    background-size: contain;
    z-index: 10;
  }
  &__bd {
    display: flex;
    flex-direction: row;
    position: relative;
    height: 100%;
    .item {
      position: relative;
      width: 100%;
      flex-shrink: 0;
    }
    .fries {
      .fries-main {
        position: absolute;
        top: 20%;
        left: 10%;
        width: 172px;
        height: 172px;
        background: url('@/assets/img/fries.png') 50% 50% no-repeat;
        transform: rotateZ(21deg);
      }

      .fries-1 {
        position: absolute;
        top: -15%;
        left: 20%;
        width: 172px;
        height: 172px;
        background: url('@/assets/img/fries-1.png') 50% 50% no-repeat;
        transform: scale(0.5);
      }

      .fries-2 {
        position: absolute;    
        top: -24%;
        left: -8%;
        width: 172px;
        height: 172px;
        background: url('@/assets/img/fries-2.png') 0% 0% no-repeat;
        transform: scale(0.5);
      }
    }
    .coffee {
      .cup {
        position: absolute;
        top: 20%;
        left: 5%;
        width: 200px;
        height: 200px;
        background: url('@/assets/img/coffee.png') 50% 50% no-repeat;
        transform: rotateZ(20deg);
      }
      .water {
        position: absolute;
        top: -15%;
        left: 10%;
        width: 170px;
        height: 170px;
        background: url('@/assets/img/water.png') 50% 50% no-repeat;
        transform: scale(0.7) rotateZ(20deg);
        transform-origin: 50% 100%;
      }
    }
    .burger {
      .burger-bottom {
        position: absolute;
        top: 20%;
        left: 10%;
        width: 180px;
        height: 180px;
        background: url('@/assets/img/burger-bottom.png') 50% 50% no-repeat;
        background-size: contain;
      }
      .burger-up {
        position: absolute;
        top: 10%;
        left: 14%;
        width: 150px;
        height: 150px;
        background: url('@/assets/img/burger-up.png') 50% 50% no-repeat;
        background-size: contain;
      }
    }
  }
  .price-box {
    position: absolute;
    right: 40px;
    top: 30%;
    width: 100px;
    text-align: right;
    transition: all 200ms ease;
    font-weight: 600;
    font-size: 32px;
    line-height: 16px;
    color: #EB5C77;
    .price {
      margin-top: 15px;
      font-weight: 300;
      font-size: 24px;
    }
  }
  .star-box {
    .star  {
      position: absolute;
      top: 10%;
      left: 50%;
      width: 25px;
      height: 27px;
      background: url('@/assets/img/star.png') 50% 50% no-repeat;
      background-size: contain;
      // transition: transform 200ms ease;
      animation: starAnim 1s linear;
      animation-play-state: paused;
      /* Bind the animation to scroll */
      animation-delay: calc(var(--moved) * -1s);
      animation-iteration-count: 1;
      animation-fill-mode: both;
      &.star-1 {
        width: 14px;
        height: 14px;
        top: 25%;
        left: 55%;
        animation-name: star1Anim;
      }
      &.star-2 {
        width: 10px;
        height: 10px;
        top: 45%;
        left: 5%;
        animation-name: star2Anim;
      }
    }
  }
  @keyframes starAnim {
    0% {
      transform: translate(0, 0);
    }
    33% {
      transform: translate(0, 150px);
    }
    66% {
      transform: translate(-160px, 150px);
    }
  }
  @keyframes star1Anim {
    0% {
      transform: translate(0, 0);
    }
    33% {
      transform: translate(-180px, 100px);
    }
    66% {
      transform: translate(-170px, -20px);
    }
  }
  @keyframes star2Anim {
    0% {
      transform: translate(0, 0);
    }
    33% {
      transform: translate(170px, -80px);
    }
    66% {
      transform: translate(180px, 80px);
    }
  }
}
</style>