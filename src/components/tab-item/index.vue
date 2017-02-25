<template>
  <div class="tab-item"
    @click="$parent.$emit('input', id)"
    :class="{ 'is-selected': $parent.value === id }">
    <div class="tab-item-text hairline"><slot></slot></div>
  </div>
</template>

<script>
export default {

  name: 'tab-item',

  props: ['id']
};
</script>

<style lang="scss">
  @import "src/sass/tobe/function";
  .tab-item {
    color: #666666;
    height: rem(100);
    text-align: center;
    position: relative;
    @include flex(1);
    .tab-item-text {
      line-height: rem(100);
      display: inline-block;
      padding: 0 rem(10);
      color: #353535;
    }
    &.is-selected {
      color: #F13149;
      font-weight: bold;
      .tab-item-text{
        color: #263238;
      }
      &:after{
        content: '';
        position: absolute;
        left: rem(40);
        right: rem(40);
        bottom: 0;
        height: 3px;
        background-color: #263238;
      }
    }
  }

</style>
