<template>
  <div class="n-pagination">
    <div>prev</div>
    <div class="n-pagination__item" />
    <div>next</div>
  </div>
</template>

<script>
import { pagesToShow } from './utils'

export default {
  name: 'NPagination',
  model: {
    prop: 'page',
    event: 'changePage'
  },
  props: {
    page: {
      type: Number,
      required: true
    },
    totalPage: {
      type: Number,
      required: true
    }
  },
  computed: {
    pageItems () {
      return pagesToShow(this.page, this.totalPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.n-pagination {
  display: flex;
  .n-pagination__item {

  }
}
</style>
