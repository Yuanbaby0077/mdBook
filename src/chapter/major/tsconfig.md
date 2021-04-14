# tsconfig

## tsc命令

安装`typescript`后就能在终端使用`tsc`命令来编译`ts`文件

例如：
```
tsc hello.ts
tsc hello.ts -w
tsc hellot.ts --outDir dist
```
## tsConfig.json 使用

### 生成`tsconfig.json`方式

* 手动创建一个空的 `tsconfig.json`, 默认所有`ts`文件都会被编译
* 执行`tsc --init`命令，自动生成`tsconfig.json`文件

生成了`tsconfig.json`后，执行`tsc`相关命令

```
  tsc
  tsc -w
  tsc --outDir dist
```

为了方便使用，命令可以直接配置到`package.json`中

```
"scripts": {
  "tsc": "tsc --outDir dist"
}
```

### 配置属性详解

在命令行上指定的编译选项会覆盖在tsconfig.json文件里的相应选项 

例如：执行 `tsc src/config/demo1.ts -t es5`

`files`|`include`|`exclude` 属性权重

* 都没有指定,则编译的文件包含当前目录和子目录下所有的`ts`文件
* `files`中指定的文件，`exclude`设置过滤无效
* `include`中指定的文件，可以被`exclude`设置过滤掉
* `exlude`不设置，默认会排除`node_modules`、`outDir`
* 被`files`和`include`的指定的文件中引用的文件也会被包含


`compileOptions`配置

* `--target | -t`,用于生成指定javascript版本的代码
* `--module | -m`,用于生成指定模块系统的代码
* `--allowJs`,允许编译`.js`文件
* `--removeComments`,删除除`/!*`开头以外的所有注释
* `--sourceMap`，生成相应的`.map`文件
* `--noImplicitAny`,是否允许隐含的`Any`类型的参数

更多参见[编译选项](https://www.tslang.cn/docs/handbook/compiler-options.html)

### 结合webpack配置使用

`ts-loader`结合`babel-loader`使用，效果更好

`npm i -D typescript @babel/core @babel/preset-env babel-loader ts-loader`

为了浏览器的兼容性，需要安装`corejs`，`@babel/polyfill`已经不再维护了

`npm i -S core-js`

#### `@babel/polyfill`使用

[@babel/polyfill](https://babeljs.io/docs/en/babel-polyfill)
不再维护

> @babel/polyfill支持在低版本的浏览器中，可以正常使用es6+的内置语法，例如`Promise`、`WeakMap`，静态方法例如`Array.from`或者`Object.assign`等等

使用方法

* 可以直接在入口文件的起始位置`import "@babel/polyfill";`
* webpack中未使用`@babel/preset-env`配置

```
module.exports = {
  entry: ["@babel/polyfill", "./src/main.js"],
}
```
* webpack中使用`@babel/preset-env`配置,按需加载

```
use: [
  {
    loader: "babel-loader", // Loads ES2015+ code and transpiles to ES5 using Babel
    options: {
      presets: [
        [
          "@babel/preset-env", // 环境预设
          {
            useBuiltIns: "usage",
            targets: {
              chrome: "87",
              ie: "11" 
            },
            "corejs": 3
          }
        ]
      ]
    }
  }
]
```

#### `corejs`是什么

> Modular standard library for JavaScript. Includes polyfills for ECMAScript up to 2021: promises, symbols, collections, iterators, typed arrays, many other features, ECMAScript proposals, some cross-platform WHATWG / W3C features and proposals like URL. You can load only required features or use it without global namespace pollution.


#### `output`的`environment`配置

```
module.exports = {
  output: {
    environment: {
      // 是否支持箭头函数 functions ('() => { ... }')
      arrowFunction: true
    }
  }
}
```

参见[environment](https://webpack.js.org/configuration/output/#outputenvironment)

参见[coreJS](https://github.com/zloirock/core-js)