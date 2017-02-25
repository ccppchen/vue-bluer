// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // 可以再rules中继续添加规则，0 - 关闭，1 - 警告，2 - 错误
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // standard规范不使用的在下面添加
    // 尾逗号不允许
    'comma-dangle': 0,
    // function前需要空格
    'space-before-function-paren': 0,
    // {}后面加分号
    'semi': 0,
    // 必须使用单引号
    'quotes': 0,
    // 定义字符串穿插正则
    'no-useless-escape': 0
  }
}
