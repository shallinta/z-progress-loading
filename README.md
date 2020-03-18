# z-progress-loading

[![npm package](https://img.shields.io/npm/v/z-progress-loading.svg)](https://www.npmjs.org/package/z-progress-loading)
[![npm download](https://img.shields.io/npm/dt/z-progress-loading.svg)](https://www.npmjs.org/package/z-progress-loading)
[![github license](https://img.shields.io/github/license/shallinta/z-progress-loading.svg)](https://github.com/shallinta/z-progress-loading/blob/master/LICENSE)
![github language top](https://img.shields.io/github/languages/top/shallinta/z-progress-loading.svg)
[![github stars](https://img.shields.io/github/stars/shallinta/z-progress-loading.svg?style=social&label=Stars)](https://github.com/shallinta/z-progress-loading)  

[![NPM](https://nodei.co/npm/z-progress-loading.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/z-progress-loading)

> 基于 canvas 实现的加载进度条 vue 组件。

## Features

- 可作为 loading 组件使用
- 可作为 pregress-bar 组件使用
- 可作为音乐播放进度条使用

## Preview

> 对应 demo 代码在 examples 目录

- [预览 z-progress-loading](https://dy7q2.csb.app/)

- [在线试用](https://codesandbox.io/s/funny-perlman-dy7q2)

## How to use

```sh
npm install --save z-progress-loading
```

```vue
<template>
  <div #app>
    <ZProgressLoading :progress="progress" :start="start" :config="config" />
  </div>
</template>

<script>
import ZProgressLoading from 'z-progress-loading';
export default {
  components: {
    ZProgressLoading
  },
  // ...
}
</script>
```

## Start

```sh
# 本地调试 localhost:3000
npm start # 或 npm run serve

# 编译 产物位于 dist 目录
npm run build

# 发布
npm run release

```

## Params Config

- **progress**: 传入进度，取值 0 - 100 之间；若不需要可始终传入 0 或 100。

- **start**: 控制开始暂停。

- **config**: 样式配置；`elem` 的概念是每一个小矩形；

  - `elemWidth`: 单个小矩形宽度

  - `elemMinHeight`: 小矩形最小高度

  - `elemMaxHeight`: 小矩形最大高度；最小最大高度相同时，将不会跳动

  - `elemDeltaHeight`: 初始时不同小矩形的高度差值

  - `spacing`: 小矩形间距；间距为 0 时将连成不间断的进度条

  - `step`: 小矩形跳动时高度变化的步长；默认为 1；值越大跳动时变化越快

  - `bgColor`: 未达到进度的小矩形颜色

  - `foreColor`: 已达到进度的小矩形颜色

## Recently Updated

Changelog available [here](./CHANGELOG.md).

## License

The project is licensed under the terms of [MIT license](./LICENSE).
