// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  },
  globals: {
    'PROXYURL': true,
    'apiBaseUrl': true,
    'baseMapUrl': true,
    'proCapitalUrl': true,
    'disasterUrl': true,
    'FirstgradeRiverUrl': true,
    'GPServerUrl': true,
    'StatisticDataUrl': true,
    'HighwayUrl': true,
    'RiversUrl': true,
    'ProvincialBoundaryUrl': true,
    'GetMenuBarUrl': true,
    'tableinitdataUrl': true,
    'legendImageDataUrl': true,
    'southSeaImageDataUrl': true,
    'GetMapElementInfoUrl': true,
    'ImageDataUrl': true,
    'GeometryServiceUrl': true,
    'mapElementUrl': true,
    'GetWeaWordInfoUrl': true
  }
}
