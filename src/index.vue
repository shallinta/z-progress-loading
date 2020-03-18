<template>
  <div id="z-progress-loading">
    <canvas id="z-progress-loading-canvas" :width="width" :height="height">
      <i>Not supported.</i>
    </canvas>
  </div>
</template>

<script>
const isNoValue = (value) => {
  return value === void 0 || value === null || value === '';
};

export default {
  name: 'z-progress-loading',
  props: ['progress', 'start', 'config'],
  watch: {
    start(value) {
      if (value) {
        this.startLoading();
      } else {
        this.stopLoading();
      }
    },
    config: {
      deep: true,
      handler() {
        this.init();
      },
    },
  },
  data() {
    return {
      width: 0,
      height: 0,
      elemWidth: 4,
      elemMinWidth: 2,
      elemMaxWidth: 8,
      elemMinHeight: 4,
      elemMaxHeight: 24,
      elemDeltaHeight: 3,
      spacing: 5,
      bgColor: 'blue',
      foreColor: 'cyan',
      step: 1,
      rects: [],
      rectCount: 0,
      raf: null,
    };
  },
  mounted() {
    this.init();
    setTimeout(() => {
      this.draw();
    }, 0);
  },
  methods: {
    init() {
      const container = document.getElementById('z-progress-loading');
      const { width, height } = container.getBoundingClientRect();
      this.width = width - (8 * 2);
      this.spacing = Math.floor(this.width * 0.035);
      this.height = height;
      this.elemWidth = Math.floor(this.width * 0.02);
      if (this.elemWidth < this.elemMinWidth) {
        this.elemWidth = this.elemMinWidth;
      }
      if (this.elemWidth > this.elemMaxWidth) {
        this.elemWidth = this.elemMaxWidth;
      }
      this.elemMinHeight = this.elemWidth;
      this.elemMaxHeight = Math.floor(this.height * 0.75);
      this.elemDeltaHeight = Math.floor((this.elemMaxHeight - this.elemMinHeight) / 6);
      // --start-- 个性化配置
      const config = this.config || {};
      this.elemWidth = Number(config.elemWidth) || this.elemWidth;
      this.elemMinHeight = Number(config.elemMinHeight) || this.elemMinHeight;
      this.elemMaxHeight = Number(config.elemMaxHeight) || this.elemMaxHeight;
      if (!isNoValue(config.elemDeltaHeight)) {
        const elemDeltaHeight = Number(config.elemDeltaHeight);
        this.elemDeltaHeight = !isNaN(elemDeltaHeight) ? elemDeltaHeight : this.elemDeltaHeight;
      }
      if (!isNoValue(config.spacing)) {
        const spacing = Number(config.spacing);
        this.spacing = !isNaN(spacing) ? spacing : this.spacing;
      }
      this.bgColor = config.bgColor || this.bgColor;
      this.foreColor = config.foreColor || this.foreColor;
      this.step = Number(config.step) || this.step;
      // --end--
      this.rects = [];
      this.rectCount = Math.floor(
        (this.width + this.spacing) / (this.elemWidth + this.spacing)
      );
      let curHeight = this.elemMinHeight;
      let delta = -this.elemDeltaHeight;
      for (let i = 0; i < this.rectCount; i += 1) {
        const x = i * (this.elemWidth + this.spacing);
        const y = this.height / 2 - curHeight / 2;
        const height = curHeight;
        if (
          curHeight + delta < this.elemMaxHeight &&
          curHeight + delta > this.elemMinHeight
        ) {
          curHeight += delta;
        } else {
          delta = -delta;
          curHeight += delta;
        }
        const fillStyle =
          i / this.rectCount < this.progress / 100
            ? this.foreColor
            : this.bgColor;
        this.rects.push({
          x,
          y,
          width: this.elemWidth,
          height,
          fillStyle,
          dir: delta,
        });
      }
    },
    updateRects() {
      this.rects = this.rects.map((rect, index) => {
        let { x, y, width, height, fillStyle, dir } = rect;
        let delta = dir > 0 ? this.step : -this.step;
        if (
          height + delta < this.elemMaxHeight &&
          height + delta > this.elemMinHeight
        ) {
          height += delta;
        } else {
          delta = -delta;
          height += delta;
        }
        y = this.height / 2 - height / 2;
        fillStyle =
          index / this.rectCount < this.progress / 100
            ? this.foreColor
            : this.bgColor;
        return { x, y, width, height, fillStyle, dir: delta };
      });
    },
    draw() {
      const ref = document.getElementById('z-progress-loading-canvas');
      const ctx = ref.getContext('2d');
      ctx.clearRect(0, 0, this.width, this.height);
      this.rects.forEach(rect => {
        const { x, y, width, height, fillStyle } = rect;
        ctx.fillStyle = fillStyle;
        ctx.fillRect(x, y, width, height);
      });
    },
    startLoading() {
      this.updateRects();
      this.draw();
      this.raf = requestAnimationFrame(this.startLoading.bind(this));
    },
    stopLoading() {
      if (this.raf) {
        cancelAnimationFrame(this.raf);
        this.raf = null;
      }
    },
  },
};
</script>

<style>
#z-progress-loading {
  width: 100%;
  height: 100%;
  padding: 0 8px;
  flex: 1;
  display: flex;
  align-items: center;
}
#z-progress-loading-canvas {
  flex: 1;
}
</style>
