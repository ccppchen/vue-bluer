<template>
  <div class="navbar hairline flex-c-m" :class="{ 'is-fixed': fixed }">
    <slot></slot>
  </div>
</template>

<script>
export default {

  name: 'navbar',

  props: {
    fixed: Boolean,
    value: {}
  }
};
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .navbar{
    position: relative;
    background: #FAFAFA;
    height: rem(100);
    border-bottom: 1px solid #e9e9e9;
    &.is-fixed{
      position: fixed;
      top: rem(88);
      left: 0;
      right: 0;
      z-index: 1000;
    }
  }
</style>
