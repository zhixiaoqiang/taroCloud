/* eslint-disable import/no-commonjs */
const path = require('path')

// const getOutputRoot = () => {
//   switch (process.env.TARO_ENV) {
//     case 'h5':
//       return 'dist'
//     case 'weapp':
//       return 'dist'
//     default:
//     case 'alipay':
//       return 'alipay'
//   }
// }

const config = {
  sourceRoot: 'src',
  projectName: 'myWXApp',
  date: '2019-3-9',
  designWidth: 750,
  deviceRatio: {
    '640': 2.34 / 2,
    '750': 1,
    '828': 1.81 / 2,
  },
  outputRoot: 'dist',
  babel: {
    presets: [['env', { modules: false }]],
    plugins: [
      'transform-decorators-legacy',
      'transform-class-properties',
      'transform-object-rest-spread',
      ['transform-runtime', {
        'helpers': false,
        'polyfill': false,
        'regenerator': true,
        'moduleName': 'babel-runtime',
      }],
    ],
  },
  defineConstants: {}, // 全局变量设置
  alias: {
    '@': path.resolve(__dirname, '..', 'src'),
  },
  mini: {
    webpackChain (chain, webpack) {},
    cssLoaderOption: {},
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 10240, // 设定转换尺寸上限
        },
      },
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    webpackChain (chain, webpack) {},
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
          browsers: [
            'last 3 versions',
            'Android >= 4.1',
            'ios >= 8',
          ],
        },
      },
    },
    esnextModules: ['taro-ui'],
  },
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
