<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Search(Only for single select)
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-select
        v-model="selectedValue"
        size="large"
        filterable
        placeholder="Please Select Type"
        :items="items"
        style="flex-grow: 1; margin-right: 12px;"
      />
      <n-select
        v-model="selectedValue"
        filterable
        placeholder="Please Select Type"
        :items="items"
        style="flex-grow: 1; margin-right: 12px;"
      />
      <n-select
        v-model="selectedValue"
        filterable
        size="small"
        placeholder="Please Select Type"
        :items="items"
        style="flex-grow: 1;"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">v-model: {{ JSON.stringify(selectedValue) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedValue: null,
      items: [
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
  }
}
</script>
