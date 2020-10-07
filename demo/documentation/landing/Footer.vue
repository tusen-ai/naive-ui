<template>
  <div class="footer">
    <n-divider v-if="showDivider" style="margin: 0 0 16px 0;" />
    <n-text depth="tertiary">
      Made by Tusimple
    </n-text>
  </div>
</template>

<script>
export default {
  props: {
    showDivider: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped>
.footer {
  font-size: 15px;
  text-align: center;
  padding: 20px;
  padding-top: 0;
}

.link {
  text-decoration: none;
}
</style>
