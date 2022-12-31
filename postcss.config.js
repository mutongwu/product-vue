module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-plugin-px2rem')({
      rootValue: 100, // html 元素的默认字体大小,1rem === 100px
      unitPrecision: 5, // 允许REM单位增长到的十进制数字。
      // propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
      propBlackList: [], // 黑名单
      // 除了 pages\/main\/index.less 页面，其他都不做rem转换
      exclude: /node_modules/,
    }),
  ],
};
