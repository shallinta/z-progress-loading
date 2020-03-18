<template>
  <div>
    <div class="container">
      <div class="play">
        <div class="inner-circle">
          <div class="icon" :class="start ? '' : 'stop'" @click="handleClick"></div>
        </div>
      </div>
      <div class="progress">
        <ZProgreeeLoading :progress="progress" :start="start" :config="config"/>
      </div>
      <span class="text" v-if="start">{{ Math.round(currentTime / 1000) }}”</span>
      <span class="text" v-if="!start">{{ duration / 1000 }}”</span>
    </div>
    <hr>
    <button @click="handleClick">{{ start ? 'stop' : 'start' }}</button>
    进度：{{ progress.toFixed(0) }}%
    <br>
    <br>Time-Duration:
    <input type="number" v-model="duration"> ms
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
  </div>
</template>

<script>
import ZProgreeeLoading from "./index.vue";

export default {
  name: "container",
  components: {
    ZProgreeeLoading
  },
  data() {
    return {
      progress: 0,
      start: false,
      duration: 10000,
      currentTime: 0,
      config: {
        elemWidth: 3,
        elemMinHeight: null,
        elemMaxHeight: 24,
        elemDeltaHeight: null,
        spacing: 5,
        step: 1,
        bgColor: "blue",
        foreColor: "cyan"
      },
      timer: null
    };
  },
  watch: {
    duration(value) {
      this.duration = Number(value);
      if (this.currentTime > Number(value)) {
        this.currentTime = 0;
      }
      this.progress = (this.currentTime / Number(value)) * 100;
    }
  },
  methods: {
    startProgress() {
      if (this.currentTime > this.duration) {
        this.currentTime = 0;
        this.start = false;
        this.stopProgress();
        return;
      }
      this.progress = (this.currentTime / this.duration) * 100;
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
</style>
