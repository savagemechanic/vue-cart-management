<template>
  <div class="banner-success">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'banner',
}
</script>

<style lang="scss">
 .banner-success {
    font-size: 12px;
    text-align: center;
    border-radius: 5px;
    box-sizing: border-box;
    font-family: "Whitney SSm A", "Whitney SSm B", "Avenir", "Segoe UI", "Ubuntu", "Helvetica Neue", Helvetica, Arial, sans-serif;
    padding: 10px 0;
    box-shadow: 0 1px 3px rgba(57,66,78,0.1);
    background: transparent;
    color: #2ecc71;
    margin: 10px;
  }
</style>
