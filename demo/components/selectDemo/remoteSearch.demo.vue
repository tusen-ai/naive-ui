<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Remote Search
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-select
        v-model="selectedValues"
        multiple
        filterable
        placeholder="Search Songs"
        :items="items"
        :on-search="handleSearch"
        remote
        :no-data-content="noDataContent"
        :loading="loading"
        style="flex-grow: 1; margin-right: 12px; width: 300px;"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">v-model(multiple): {{ JSON.stringify(selectedValues) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
const items = [
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
    label: 'Think For Yourself',
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

export default {
  data () {
    return {
      selectedValues: null,
      loading: false,
      items: [],
      noDataContent: 'please search',
      handleSearch: (query) => {
        if (!query.length) {
          this.items = []
          this.noDataContent = 'please search'
          return
        }
        this.loading = true
        window.setTimeout(() => {
          this.items = items.filter(item => ~item.label.search(query))
          if (!this.items.length) this.noDataContent = 'no result found'
          this.loading = false
        }, 1000)
      }
    }
  }
}
</script>
