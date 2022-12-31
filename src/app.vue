<template>
  <div id="app" class="app">
    <ProductPage />
  </div>
</template>

<script>
import throttle from 'lodash-es/throttle';
import ProductPage from './pages/product.vue';
export default {
  components: {
    ProductPage,
  },
  created() {
    const setRemUnit = throttle(this.resizeFn, 100);
    window.addEventListener('resize', setRemUnit, false);
    this.$once('hook:beforeDestroy', () => {
      window.removeEventListener('resize', setRemUnit);
    });
    setRemUnit();
  },
  methods: {
    init() {

    },
    resizeFn() {
      // 设计稿宽度。
      // const DesignWidth = 375;
      // 默认为1rem = 100px，需要跟postcss.config.js保持一致
      const BaseSize = 100;
      // 比例限制：最小为 1， 最大为2;
      const scale = 1;// Math.min(Math.max(window.innerWidth / DesignWidth, 1), 2);
      document.documentElement.style.fontSize = `${BaseSize * Number(scale).toFixed(2)}px`;
    },
  },
};
</script>
<style scoped>
.app {
  background: linear-gradient(180deg, #F5F5F5 0%, #FFEDED 178.57%);
}
</style>
