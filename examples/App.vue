<template>
  <div>
    <div
      class="container"
      :style="{ width: progressWidth + 120 + 'px', height: progressHeight + 'px' }"
    >
      <div class="play">
        <div class="inner-circle">
          <div class="icon" :class="start ? '' : 'stop'" @click="handleClick"></div>
        </div>
      </div>
      <div class="progress" :style="{ width: progressWidth + 'px', height: progressHeight + 'px' }">
        <ZProgreeeLoading :progress="progress" :start="start" :config="config"/>
      </div>
      <span class="text" v-if="start">{{ Math.round(currentTime / 1000) }}"</span>
      <span class="text" v-if="!start">{{ duration / 1000 }}"</span>
    </div>
    <hr>
    <button class="btn" @click="handleClick">{{ start ? 'stop' : 'start' }}</button>
    进度：{{ progress.toFixed(0) }}%
    <br>
    <br>Time-Duration:
    <input type="number" v-model="duration"> ms
    <br>
    <br>
    <em>Renderer:</em>
    <label>
      <input
        type="radio"
        name="renderer"
        value="dom"
        v-model="config.renderer"
        @change="changeRenderer"
      >dom
    </label>
    <label>
      <input
        type="radio"
        name="renderer"
        value="canvas"
        v-model="config.renderer"
        @change="changeRenderer"
      >canvas
    </label>
    <button class="btn no-vertical-margin" @click="reload">点击刷新生效</button>
    <br>
    <br>
    <em>LineCap:</em>
    <label>
      <input
        type="radio"
        name="lineCap"
        value="square"
        v-model="config.lineCap"
        @change="changeLineCap"
      >square
    </label>
    <label>
      <input
        type="radio"
        name="lineCap"
        value="round"
        v-model="config.lineCap"
        @change="changeLineCap"
      >round
    </label>
    <br>
    <br>
    <br>Progress-Width:
    <input type="number" :value="progressWidth" @change="changeProgressWidth"> px
    <button class="btn no-vertical-margin" @click="reload">点击刷新生效</button>
    <br>
    <br>Progress-Height:
    <input type="number" :value="progressHeight" @change="changeProgressHeight"> px
    <button class="btn no-vertical-margin" @click="reload">点击刷新生效</button>
    <br>
    <br>Step:
    <input type="number" v-model="config.step">
    <br>
    <br>ElemWidth:
    <input type="number" v-model="config.elemWidth">
    <br>
    <br>ElemMinHeight:
    <input type="number" v-model="config.elemMinHeight">
    <br>
    <br>ElemMaxHeight:
    <input type="number" v-model="config.elemMaxHeight">
    <br>
    <br>ElemDeltaHeight:
    <input type="number" v-model="config.elemDeltaHeight">
    <br>
    <br>Spacing:
    <input type="number" v-model="config.spacing">
    <br>
    <br>BgColor:
    <input type="text" v-model="config.bgColor">
    <br>
    <br>ForeColor:
    <input type="text" v-model="config.foreColor">
    <br>
    <br>
    <h3>使用预设参数</h3>
    <h4>有进度和 loading</h4>
    <button class="btn" @click="usePreset(0)">还原（有进度和 loading ）</button>
    <h4>无 loadind 纯进度</h4>
    <button class="btn" @click="usePreset(1)">使用预设1（无 loadind 纯进度）</button>
    <button class="btn" @click="usePreset(2)">使用预设2（无 loadind 纯进度）</button>
    <button class="btn" @click="usePreset(3)">使用预设3（无 loadind 纯进度）</button>
    <h4>无进度纯 loading</h4>
    <button class="btn" @click="usePreset(4)">使用预设4（无进度纯 loading ）</button>
  </div>
</template>

<script>
import ZProgreeeLoading from "../src/index.vue";

export default {
  name: "container",
  components: {
    ZProgreeeLoading
  },
  data() {
    const renderer =
      localStorage.getItem("z-progress-loading-renderer") || "dom";
    const progressWidth =
      Number(localStorage.getItem("z-progress-loading-width")) || 140;
    const progressHeight =
      Number(localStorage.getItem("z-progress-loading-height")) || 36;
    return {
      progressWidth,
      progressHeight,
      progress: 0,
      start: false,
      duration: 10000,
      currentTime: 0,
      config: {
        renderer: renderer,
        elemWidth: 3,
        elemMinHeight: null,
        elemMaxHeight: 24,
        elemDeltaHeight: null,
        spacing: 5,
        step: 1,
        bgColor: "blue",
        foreColor: "cyan",
        lineCap: "round"
      },
      noProgress: false,
      timer: null
    };
  },
  watch: {
    duration(value) {
      this.duration = Number(value);
      if (this.currentTime > Number(value)) {
        this.currentTime = 0;
      }
      this.progress = this.noProgress
        ? 0
        : (this.currentTime / Number(value)) * 100;
    }
  },
  methods: {
    changeRenderer({ target: { value } }) {
      localStorage.setItem("z-progress-loading-renderer", value);
    },
    changeLineCap({ target: { value } }) {},
    changeProgressWidth({ target: { value } }) {
      const width = Number(value) || 140;
      localStorage.setItem("z-progress-loading-width", width);
    },
    changeProgressHeight({ target: { value } }) {
      const height = Number(value) || 36;
      localStorage.setItem("z-progress-loading-height", height);
    },
    reload() {
      window.location.reload();
    },
    startProgress() {
      if (this.currentTime > this.duration) {
        this.currentTime = 0;
        this.start = false;
        this.stopProgress();
        return;
      }
      this.progress = this.noProgress
        ? 0
        : (this.currentTime / this.duration) * 100;
      this.timer = setTimeout(() => {
        this.currentTime += 100;
        this.startProgress();
      }, 100);
    },
    stopProgress() {
      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      }
    },
    handleClick() {
      this.start = !this.start;
      if (this.start) {
        this.startProgress();
      } else {
        this.stopProgress();
      }
    },
    usePreset(type) {
      switch (Number(type)) {
        case 0:
          this.noProgress = false;
          this.progress = 0;
          this.config.elemWidth = 3;
          this.config.elemMinHeight = null;
          this.config.elemMaxHeight = 24;
          this.config.elemDeltaHeight = null;
          this.config.spacing = 5;
          break;
        case 1:
          this.noProgress = false;
          this.config.elemWidth = 1;
          this.config.elemMinHeight = 8;
          this.config.elemMaxHeight = 8;
          this.config.elemDeltaHeight = 0;
          this.config.spacing = 0;
          break;
        case 2:
          this.noProgress = false;
          this.config.elemWidth = 1;
          this.config.elemMinHeight = 6;
          this.config.elemMaxHeight = 6;
          this.config.elemDeltaHeight = 0;
          this.config.spacing = 1;
          break;
        case 3:
          this.noProgress = false;
          this.config.elemWidth = 2;
          this.config.elemMinHeight = 12;
          this.config.elemMaxHeight = 12;
          this.config.elemDeltaHeight = 0;
          this.config.spacing = 2;
          break;
        case 4:
          this.noProgress = true;
          this.progress = 0;
          this.config.elemWidth = 4;
          this.config.elemMinHeight = 4;
          this.config.elemMaxHeight = 24;
          this.config.elemDeltaHeight = 3;
          this.config.spacing = 12;
          break;
        default:
          this.noProgress = false;
          this.config.elemWidth = 3;
          this.config.elemMinHeight = null;
          this.config.elemMaxHeight = 24;
          this.config.elemDeltaHeight = null;
          this.config.spacing = 5;
      }
    }
  }
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
}

em {
  font-style: normal;
  color: #f11e64;
}

.container {
  margin: 15px;
  width: 260px;
  height: 36px;
  border-radius: 18px;
  background: #3cf;
  display: flex;
  align-items: center;
}

.play {
  margin-left: 16px;
  margin-right: 8px;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play .inner-circle {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background: #3cf;
  display: flex;
  align-items: center;
  justify-content: center;
}

.play .icon {
  width: 10px;
  height: 10px;
  background: #fff;
}

.play .icon.stop {
  border-radius: 5px;
}

.progress {
  width: 140px;
  height: 36px;
}

.text {
  margin-left: 20px;
  color: #fff;
}

.btn {
  margin: 15px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  color: #fff;
  background: #399;
  box-shadow: 1px 2px 6px 1px #999;
  outline: none;
}

.btn.no-vertical-margin {
  margin: 0 15px;
}
</style>
