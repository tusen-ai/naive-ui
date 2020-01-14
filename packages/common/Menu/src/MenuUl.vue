<template>
  <ul>
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'NMenuUl',
  provide () {
    return {
      NMenuUl: true
    }
  }
}
</script>
