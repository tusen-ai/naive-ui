<template>
  <div class="demo">
    <div class="section">
      <router-link to="/home">
        home
      </router-link>
      <br>
      <router-link to="/sidemenu">
        service
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.demo {
  width: 1080px;
  margin: auto;
}

.section.title {
  margin: 14px 0;
}
</style>
