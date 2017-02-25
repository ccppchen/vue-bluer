<template>
  <div class="scroll"
    :class="{
      'pull-down': (state === 0),
      'pull-up': (state === 1),
      refreshing: (state === 2),
      touching: touching
    }"
    ref="wrapper"
    :style="{ height: wrapperHeight + 'px' }"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
    <div class="scroll-inner" :class="{ postop: !enableRefresh }" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)' }">
      <div class="pull-to-refresh-layer" v-if="!!onRefresh">
        <slot name="refresh">
          <div class="preloader"></div>
          <div class="pull-to-refresh-arrow"></div>
          <span class="label-down">下拉即可刷新...</span>
          <span class="label-up">释放即可刷新...</span>
          <span class="label-refresh">加载中...</span>
        </slot>
      </div>
      <slot></slot>
      <div class="infinite-layer" v-if="enableInfinite">
        <slot name="infinite">
          <div class="infinite-preloader"></div>
          <div>加载中...</div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scroll',
  props: {
    offset: {
      type: Number,
      default: 44
    },
    enableInfinite: {
      type: Boolean,
      default: true
    },
    enableRefresh: {
      type: Boolean,
      default: true
    },
    onRefresh: {
      type: Function,
      default: undefined,
      required: false
    },
    onInfinite: {
      type: Function,
      default: undefined,
      require: false
    }
  },
  data () {
    return {
      top: 0,
      state: 0, // 0:down, 1: up, 2: refreshing
      startY: 0,
      touching: false,

      infiniteLoading: false,
      wrapperHeight: 0
    }
  },
  methods: {
    touchStart (e) {
      this.startY = e.targetTouches[0].pageY
      this.startScroll = this.$el.scrollTop || 0
      this.touching = true
    },
    touchMove (e) {
      if (!this.enableRefresh || this.$el.scrollTop > 0 || !this.touching) {
        return
      }
      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
      if (diff > 0) e.preventDefault()
      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)

      if (this.state === 2) { // in refreshing
        return
      }
      if (this.top >= this.offset) {
        this.state = 1
      } else {
        this.state = 0
      }
    },
    touchEnd (e) {
      if (!this.enableRefresh) return
      this.touching = false
      if (this.state === 2) { // in refreshing
        this.state = 2
        this.top = this.offset
        return
      }
      if (this.top >= this.offset) { // do refresh
        this.refresh()
      } else {  // cancel refresh
        this.state = 0
        this.top = 0
      }
    },
    refresh () {
      this.state = 2
      this.top = this.offset
      this.onRefresh(this.refreshDone)
    },
    refreshDone () {
      this.state = 0
      this.top = 0
    },

    infinite () {
      this.infiniteLoading = true
      this.onInfinite(this.infiniteDone)
    },

    infiniteDone () {
      this.infiniteLoading = false
    },

    onScroll (e) {
      if (!this.enableInfinite || this.infiniteLoading) {
        return
      }
      let outerHeight = this.$el.clientHeight
      let innerHeight = this.$el.querySelector('.scroll-inner').clientHeight
      let scrollTop = this.$el.scrollTop
      let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-to-refresh-layer').clientHeight : 0
      let infiniteHeight = this.$el.querySelector('.infinite-layer').clientHeight
      let bottom = innerHeight - outerHeight - scrollTop - ptrHeight

      if (bottom < infiniteHeight) this.infinite()
    }
  },
  mounted() {
    this.wrapperHeight = (document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top) || document.documentElement.clientHeight
  }
}
</script>
<style lang="scss">
/* === Pull To Refresh === */

@import "../sass/tobe/function";
@mixin encoded-svg-background($svg) {
  background-image: url("data:image/svg+xml;charset=utf-8,#{$svg}");
}

@-webkit-keyframes preloader-spin {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

@keyframes preloader-spin {
  100% {
    -webkit-transform: rotate(360deg);
            transform: rotate(360deg);
  }
}

$layerHeight: 2.2*0.4rem;
.pull-to-refresh-layer {
  position: relative;
  left: 0;
  top: 0;
  width: 100%;
  height: $layerHeight;
  color: #ccc;
  .preloader {
    visibility: hidden;
  }
  .pull-to-refresh-arrow {
    width: 0.65*0.4rem;
    height: 1*0.4rem;
    background: no-repeat center;
    @include encoded-svg-background("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 26 40'><polygon points='9,22 9,0 17,0 17,22 26,22 13.5,40 0,22' fill='#8c8c8c'/></svg>");
    background-size: 0.65*0.4rem 1*0.4rem;
    z-index: 10;
    transform: rotate(0deg) translate3d(0, 0, 0);
    transition-duration: 300ms;
  }
}

.scroll {
  position: relative;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  &.content {
    position: absolute;
  }
  &.touching .scroll-inner {
    transition-duration: 0ms;
  }
  &:not(.refreshing) {
    .pull-to-refresh-layer .preloader {
      animation: none;
    }
  }
  &.refreshing {
    .pull-to-refresh-arrow {
      visibility: hidden;
      transition-duration: 0ms;
    }
    .preloader {
      visibility: visible;
    }
  }
  &.pull-up {
    .pull-to-refresh-arrow {
      transform: rotate(180deg) translate3d(0, 0, 0);
    }
  }
}

.scroll-inner {
  position: absolute;
  top: -$layerHeight;
  width: 100%;
  left: 0;
  transition-duration: 300ms;
  &.postop{
    top: 0;
  }
}

.label-down,
.label-up,
.label-refresh {
  display: none;
  // width: 9*0.4rem;
  text-align: center;
}

.label-refresh {
  // width: 5*0.4rem;
}

.pull-down .label-down,
.pull-up .label-up,
.refreshing .label-refresh {
  display: block;
  padding-left: .5*0.4rem;
}

.pull-to-refresh-layer {
  @extend %comm-flex;
  @include justify-content(center);
}

.infinite-layer {
  width: 100%;
  height: 2.2*0.4rem;
  @extend %comm-flex;
  @include justify-content(center);
  color: #ccc;
}

.infinite-preloader {
  margin-right: .5*0.4rem;
}

</style>
