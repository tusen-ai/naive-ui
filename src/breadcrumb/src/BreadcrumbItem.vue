<template>
  <span class="n-breadcrumb-item">
    <span class="n-breadcrumb-item__link" @click="handleClick">
      <slot />
    </span>
    <span class="n-breadcrumb-item__separator">
      {{ NBreadcrumb.separator }}
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
  }
}
</script>
