<template>
  <div class="cart">
    <div class="cart__bd">
      <div class="total">
        <span class="money">{{ total }}</span>
        <span class="unit">$</span>
      </div>
      <div class="pay-button">
        PAY
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      total: 0
    }
  },
  methods: {
    /**
     * @public add food item
     * @param {Object} item 
     */
    addFood(item) {
      this.total += item.price;
    }
  }
}
</script>

<style lang="less">
.cart {
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  width: 375px;
  height: 65px;
  left: 50%;
  transform: translateX(-50%);
  &__bd {
    display: flex;
    align-items: center;
    align-content: space-between;
    background: #FFFFFF;
    height: 100%;

    font-family: 'PingFang SC';
    font-weight: 600;
    .total {
      flex-grow: 1;
      overflow: hidden;
      font-size: 32px;
      padding-left: 20px;
      .money {
        float: left;
        font-size: 42px;
        font-weight: 700;
      }
      .unit {
        float: left;
        font-size: 20px;
        position: relative;
        top: 20px;
        margin-left: 6px;
      }
    }
    .pay-button {
      width: 143px;
      height: 100%;
      line-height: 65px;
      color: #fff;
      text-align: center;
      font-size: 32px;
      background: linear-gradient(324.97deg, #FD003C -11%, #FF5D79 105.7%);
    }
  }
}
</style>