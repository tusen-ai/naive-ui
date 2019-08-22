<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Listen Scroll Event
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-select
        v-model="value"
        placeholder="Please Select Type"
        :options="options"
        style="flex-grow: 1; margin-right: 12px;"
        @scroll="handleScroll"
      />
      <n-select
        v-model="array"
        multiple
        placeholder="Please Select Type"
        :options="options"
        style="flex-grow: 1;"
        @scroll="handleScroll"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">scrollContainerScrollTop: {{ JSON.stringify(scrollContainerScrollTop) }},
scrollContainerHeight: {{ JSON.stringify(scrollContainerHeight) }},
scrollContentHeight: {{ JSON.stringify(scrollContentHeight) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: null,
      array: null,
      scrollContentHeight: null,
      scrollContainerHeight: null,
      scrollContainerScrollTop: null,
      options: [
        {
          label: 'Drive My Car',
          value: 'song1'
        },
        {
          label: 'Norwegian Wood',
          value: 'song2'
        },
        {
          label: 'You Won\'t See',
          value: 'song3'
        },
        {
          label: 'Nowhere Man',
          value: 'song4'
        },
        {
          label: 'Think For Yourseld',
          value: 'song5'
        },
        {
          label: 'The Word',
          value: 'song6'
        },
        {
          label: 'Michelle',
          value: 'song7'
        },
        {
          label: 'What goes on',
          value: 'song8'
        },
        {
          label: 'Girl',
          value: 'song9'
        },
        {
          label: 'I\'m looking through you',
          value: 'song10'
        },
        {
          label: 'In My Life',
          value: 'song11'
        },
        {
          label: 'Wait',
          value: 'song12'
        }
      ]
    }
  },
  methods: {
    handleScroll (e, scrollContainer, scrollContent) {
      this.scrollContentHeight = scrollContent.offsetHeight
      this.scrollContainerScrollTop = scrollContainer.scrollTop
      this.scrollContainerHeight = scrollContainer.offsetHeight
    }
  }
}
</script>
