<template>
  <header class="bar bar-header" :class="[ barStyle || 'bar-light' ]">
    <div class="bar-left">
      <slot name="left-button"></slot>
    </div>
    <h1 class="title flex-c-m">
        <slot name="title"></slot>
    </h1>
    <div class="bar-right">
      <slot name="right-button"></slot>
    </div>
  </header>
</template>

<style lang="scss">
  @import "../sass/tobe/function";
  .bar {
    @include user-select(none);
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 100;

    width: 100%;
    height: $bar-height;

    background-color: #ffffff;
    background-size: 0;
    @include hair(bottom, #dddddd);

    // bar light类型 后续继续添加
    &.bar-light {
      @include bar-style($bar-light-bg, $bar-light-border, $bar-light-text);
    }
    &.bar-dark {
      @include bar-style($dark, $dark, $white);
      .button{
        color: #fff;
      }
    }
    &.bar-dark-linear {
      background-image: linear-gradient(0deg, #263238 1%, #0F1012 100%);
      background-size: contain;
      .button, .title{
        color: #fff;
      }
    }

    // Title inside of a bar is centered
    .title {
      position: absolute;
      top: 0;
      left: 10%;
      right: 10%;
      height: 100%;
      color: #000000;

      min-width: 1.875rem;
      max-width: 80%;
      overflow: hidden;

      text-align: center;

      // Go into ellipsis if too small
      text-overflow: ellipsis;
      white-space: nowrap;

      font-size: $bar-title-font-size;
      font-weight: $bar-title-font-weight;
    }

    .title a {
      color: inherit;
    }

    .button {
      padding: 0 $bar-button-padding;
      min-width: initial;
      font-size: rem(32);
      border: 0;
      background-color: transparent;
      color: #000000;
      &.small-button{
        font-size: rem(28);
      }
      &:active{
        opacity: .6;
      }
      &.padding{
        padding: 0 5px;
      }
    }
  }

  .bar-header{
    @include justify-content(space-between);
    @include display(flex);
    .bar-left,.bar-right{
      font-size: 0;
      z-index: $z-index-bar-button;
    }
    .bar-left,.bar-right,.button{
      @include display(flex);
      @include align-items(center);
      height: 100%;
    }
    .bar-left,.bar-right{
      > .button + .button{
        padding-left: 0;
      }
    }
  }
</style>

<script lang="babel">

  export default {
    name: 'Bar',
    props: {
      barStyle: {
        type: String
      },
    },
    components: {
    }
  };
</script>
