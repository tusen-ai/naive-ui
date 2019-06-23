<template>
  <div class="n-pagination">
    <div
      class="n-pagination__item n-pagination__item--backward"
      :class="{
        'n-pagination__item--disabled': currentPage === 1
      }"
      @click="backward"
    >
      <div>
        <n-icon type="ios-arrow-back" />
      </div>
    </div>
    <div
      v-for="pageItem in pageItems"
      :key="pageItem.label"
      class="n-pagination__item"
      :class="{
        'n-pagination__item--active': pageItem.active
      }"
      @click="dispatchPageChangeAction(pageItem)"
    >
      <div
        v-if="pageItem.type==='page'"
        class="n-pagination-item__label"
      >
        {{ pageItem.label }}
      </div>
      <div
        v-if="pageItem.type==='fastBackward'"
        class="n-pagination-item__fast-backward"
      >
        <div class="n-pagination-item__more-icon">
          <n-icon type="ios-more" />
        </div>
        <div class="n-pagination-item__fast-backward-icon">
          <n-icon type="ios-arrow-back" />
          <n-icon type="ios-arrow-back" />
        </div>
      </div>
      <div
        v-if="pageItem.type==='fastForward'"
        class="n-pagination-item__fast-forward"
      >
        <div class="n-pagination-item__more-icon">
          <n-icon type="ios-more" />
        </div>
        <div class="n-pagination-item__fast-forward-icon">
          <n-icon type="ios-arrow-forward" />
          <n-icon type="ios-arrow-forward" />
        </div>
      </div>
    </div>
    <div
      class="n-pagination__item n-pagination__item--forward"
      :class="{
        'n-pagination__item--disabled': currentPage === pageCount
      }"
      @click="forward"
    >
      <n-icon type="ios-arrow-forward" />
    </div>
  </div>
</template>

<script>
import { pageItems } from './utils'
import NIcon from '../../Icon/index'

export default {
  name: 'NPagination',
  components: {
    NIcon
  },
  model: {
    prop: 'currentPage',
    event: 'change-current-page'
  },
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    pageCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    pageItems () {
      return pageItems(this.currentPage, this.pageCount)
    }
  },
  methods: {
    dispatchPageChangeAction (pageItem) {
      switch (pageItem.type) {
        case 'page':
          this.setCurrentPage(pageItem.label)
          break
        case 'fastBackward':
          this.fastBackward()
          break
        case 'fastForward':
          this.fastForward()
          break
      }
    },
    setCurrentPage (page) {
      this.$emit('change-current-page', page)
    },
    forward () {
      const currentPage = Math.min(this.currentPage + 1, this.pageCount)
      this.$emit('change-current-page', currentPage)
    },
    backward () {
      const currentPage = Math.max(this.currentPage - 1, 1)
      this.$emit('change-current-page', currentPage)
    },
    fastForward () {
      const currentPage = Math.min(this.currentPage + 5, this.pageCount)
      this.$emit('change-current-page', currentPage)
    },
    fastBackward () {
      const currentPage = Math.max(this.currentPage - 5, 1)
      this.$emit('change-current-page', currentPage)
    }
  }
}
</script>

<style lang="scss">
.n-pagination {
  display: inline-flex;
  .n-pagination__item {
    cursor: pointer;
    user-select: none;
    color: #75819B;
    min-width:28px;
    height:28px;
    padding-left: 4px;
    padding-right: 4px;
    box-sizing: border-box;
    &:not(:last-child) {
      margin-right: 17px;
    }
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius:6px;
    border:1px solid transparent;
    &.n-pagination__item--active {
      color: red;
      background:rgba(99,226,183,0.3);
      color: #63E2B7;
      border:1px solid rgba(99,226,183,1);
    }
    &.n-pagination__item--backward, &.n-pagination__item--forward {
      border:1px solid rgba(117,129,155,1);
      &.n-pagination__item--disabled {
        i::before {
          color: rgba(44,55,78,1);
        }
        border:1px solid rgba(44,55,78,1);
        cursor: not-allowed;
      }
    }
    .n-pagination-item__fast-backward, .n-pagination-item__fast-forward {
      .n-pagination-item__fast-backward-icon, .n-pagination-item__fast-forward-icon {
        display: none;
      }
      .n-pagination-item__more-icon {
        display: block;
      }
    }
    &:hover {
      .n-pagination-item__fast-backward, .n-pagination-item__fast-forward {
        .n-pagination-item__more-icon {
          display: none;
        }
        .n-pagination-item__fast-backward-icon, .n-pagination-item__fast-forward-icon {
          display: block;
          i::before {
            color: #63E2B7;
          }
        }
      }
    }
  }
}
</style>
