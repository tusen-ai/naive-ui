<template>
  <span class="n-breadcrumb-item">
    <span class="n-breadcrumb-item__link" @click="handleClick">
      <slot />
    </span>
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
  },
  methods: {
    handleClick (e) {
      this.$emit('click', e)
    }
  }
}
</script>
