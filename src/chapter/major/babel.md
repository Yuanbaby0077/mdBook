# BABEL

## 概念
babel 是用来讲es6+的代码转换为向后兼容的js代码，使得代码能在新旧浏览器或者环境中运行。

[浏览器es6+兼容性](http://kangax.github.io/compat-table/es6/)



## 终端命令

为了方便以下命令正常运行，先install一下下
`@babel/cli`是babel内置的命令行工具

`npm i -D @babel/cli @babel/preset-env @babel/core`

`npm i -S @babel/polyfill` 

**@babel/polyfill 是实际代码需要依赖的，因此不能添加到开发依赖，而使用 --save**

执行命令，将目录所有下的`js`文件用`babel`编译到lib目录下

`./node_modules/.bin/babel src --out-dir lib`

或者使用`npm@5.2.0+`版本自带的`npx`命令来替代

`npx babel src --out-dir lib`

### 插件终端配置

babel提供的许多插件可以用来转换`es6+`代码转换为`es5`语法，比如`plugin-transform-arrow-functions`、`plugin-transform-function-name` 等等等

只需在项目根目录下执行

`./node_modules/.bin/babel src --out-dir lib --plugins=@babel/plugin-transform-arrow-functions` [1]

这样的写法是在是不太讨人喜欢，假如代码里有多种`es6+`的特性，就需要添加多个插件

当然，`preset`预设可以帮忙解决这些问题

执行

`./node_modules/.bin/babel src --out-dir lib --presets=@babel/env`

这个预设命令包含的所有的插件都支持 `es6+`代码。

上述是通过终端执行命令来转换代码

当然终端命令可以写成脚本来执行, 例如

```
"scripts": {
    "build:babel": "npx babel src -d dist",
    "build:babel:arrow": "npx babel src -d dist --plugins=@babel/plugin-transform-arrow-functions"
  },
```

实际开发中主要使用配置文件

## 配置文件

老版本的babel 使用配置文件 `babel.config.js` 或者 `.babelrc`

`babel.cofig.js` 配置

```
const presets = [
  [
    "@babel/env",
    {
      targets: {
        edge: "17",
        firefox: "60",
        chrome: "67",
        safari: "11.1",
      },
      useBuiltIns: "usage",
      corejs: "3.6.4",
    },
  ],
];

module.exports = { presets };
```

`babel.config.json`配置
```
{
  "presets": [
    [
      "@babel/env",
      {
        "targets": {
          "edge": "17",
          "firefox": "60",
          "chrome": "67",
          "safari": "11.1"
        },
        "useBuiltIns": "usage", // 只包含项目中所需要的polyfill
        "corejs": "3.6.5"
      }
    ]
  ],
  "plugins": ["@babel/plugin-transform-member-expression-literals"]
}
```

### 模块化插件

```
  "scripts": {
    "build:amd": "babel src/plugins/transform-module-code.js -d dist/amd.js --plugins @babel/plugin-transform-modules-amd",
    "build:umd": "babel src/plugins/transform-module-code.js -d dist/umd.js --plugins @babel/plugin-transform-modules-umd",
    "build:commonjs": "babel src/plugins/transform-module-code.js -d dist/commonjs.js --plugins @babel/plugin-transform-modules-commonjs",
    "build:systemjs": "babel src/plugins/transform-module-code.js -d dist/systemjs.js --plugins @babel/plugin-transform-modules-systemjs",
    "build:module": "npm run build:amd && npm run build:umd && npm run build:commonjs && npm run build:systemjs"
  }
```

## Node API配置

```
const code = `
  const data = {
    var: 'var',
    const: 'const',
    foo: 'foo',
    'class': 'class'
  }
`
const res = require("@babel/core").transformSync(code, {
  plugins: ["@babel/plugin-transform-property-literals"]
})
console.log(res)
```

## polyfill

上面我们已经安装了`@babel/polyfill`,在配置文件中添加`"useBuiltIns": "usage"` 让它生效

例如：周知`IE`不支持`Promise`语法

```
new Promise((resolve) => {
  resolve
}).then(res => res)
```

## babel存在问题
* babel-loader 很慢
  