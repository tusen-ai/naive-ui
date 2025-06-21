<markdown>
# Inline

For example, JavaScript.
</markdown>

<script lang="ts" setup>
const code = 'console.log("Hello World")'
</script>

<template>
  <div>
    JavaScript
    <n-code :code="code" language="javascript" inline />
  </div>
</template>
