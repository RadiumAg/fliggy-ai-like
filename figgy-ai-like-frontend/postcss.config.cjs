module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px', // 需要转换的单位，默认是 px
      viewportWidth: 750, // 设计稿的视口宽度，如 375（iPhone 8）或 390
      unitPrecision: 5, // 转换后保留的小数位数
      propList: ['*'], // 要转换的属性，* 表示所有
      viewportUnit: 'vw', // 转换的目标单位
      fontViewportUnit: 'vw', // 字体使用的单位
      selectorBlackList: [], // 忽略的选择器，如 ['ignore', '.hairlines']
      minPixelValue: 1, // 小于此值的 px 不转换
      mediaQuery: false, // 是否在 media query 中转换 px
      replace: true, // 是否直接替换，而不是添加备用
      exclude: [], // 排除的文件或路径，如 /node_modules/
      landscape: false, // 是否添加横向模式支持
      landscapeUnit: 'vw', // 横向模式使用的单位
      landscapeWidth: 667, // 横向模式的视口宽度
    },
  },
};
