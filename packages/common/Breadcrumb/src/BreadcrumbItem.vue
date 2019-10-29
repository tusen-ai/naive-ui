<template>
  <span class="n-breadcrumb-item">
    <slot />
    <span class="n-breadcrumb-item__seperator">
      {{ seperator }}
    </span>
  </span>
</template>

<script>
export default {
  name: 'NBreadcrumbItem',
  inject: {
    NBreadcrumb: {
      default: null
    }
  },
  computed: {
    seperator () {
      return this.NBreadcrumb.seperator
    }
  }
}
</script>
