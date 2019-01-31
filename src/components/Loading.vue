<template>
  <div class="loading-box">
    <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
    <span class="sr-only">Loading...</span>
  </div>

  
</template>

<script>

export default {
  name: 'loading'
}

</script>

<style scoped>

/*Loading Animation*/
.loading-box
{
  /*width: 500px;
  height: 100px;*/
  position: relative;
  margin: auto;
  margin-top: 10vh;
  display: table;
} 

</style>
