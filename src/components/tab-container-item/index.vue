<template>
  <div
    v-show="$parent.swiping || id === $parent.currentActive"
    class="bl-tab-container-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabContainerItem',

  props: ['id']
};
</script>

<style lang="css">
  .bl-tab-container-item{
    width: 100%;
    flex-shrink: 0;
  }
</style>
