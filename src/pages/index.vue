<template>
  <div class="product-page">
    <NavTop />
    <FoodSwiper :list="list" @add="addFood" />
    <div class="line" />
    <Plate ref="plate" />
    <Contact />
    <Cart ref="cart" />
  </div>
</template>

<script>
import NavTop from './components/navTop.vue';
import Cart from './components/cart.vue';
import Contact from './components/contact.vue';
import FoodSwiper from './components/swiper.vue';
import Plate from './components/plate.vue';
export default {
  components: {
    NavTop,
    FoodSwiper,
    Plate,
    Cart,
    Contact,
  },
  data() {
    return {
      list: [
        {type: 'fries', price: 10},
        {type: 'coffee', price: 11},
        {type: 'burger', price: 12},
      ]
    }
  },
  methods: {
    addFood(item) {
      this.$refs.plate.addFood(item);
      this.$refs.cart.addFood(item);
    }
  }
}
</script>

<style lang="less" scoped>
.product-page {
  padding-bottom: 65px;
  .line {
    border: 3px solid #F2F1F1;
  }
}
</style>