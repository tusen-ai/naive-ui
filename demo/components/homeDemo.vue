<template>
  <div>
    <div class="service-container">
      <nv-home />
    </div>
    <div class="nav-container">
      <nv-navbar />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 50px;
  background-color: #1f263e;
}
.service-container {
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1f263e;
}
</style>
