<template>
  <div class="product-page">
    <NavTop />
    <FoodSwiper @add="addFood" />
    <div class="line" />
    <Plate ref="plate" />
    <Contact />
    <Cart />
  </div>
</template>

<script>
import NavTop from './navTop.vue';
import Cart from './cart.vue';
import Contact from './contact.vue'
import FoodSwiper from './foodSwiper.vue'
import Plate from './plate.vue'
export default {
  components: {
    NavTop,
    FoodSwiper,
    Plate,
    Cart,
    Contact,
  },
  methods: {
    addFood(key) {
      this.$refs.plate.addFood(key);
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