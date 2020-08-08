<template>
  <span class="n-breadcrumb-item">
    <span class="n-breadcrumb-item__link" @click="handleClick">
      <slot />
    </span>
    <span class="n-breadcrumb-item__separator">
      {{ separator }}
    </span>
  </span>
</template>

<script>
export default {
  name: 'BreadcrumbItem',
  inject: {
    NBreadcrumb: {
      default: null
    }
  },
  computed: {
    separator () {
      return this.NBreadcrumb.separator
    }
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>
