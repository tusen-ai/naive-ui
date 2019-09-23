<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Basic Usage
    </div>
    <div
      class="n-doc-section__view"
    >
      <!--EXAMPLE_START-->
      <n-select
        v-model="selectedValue"
        size="large"
        placeholder="Please Select Type"
        :options="options"
        style="flex-grow: 1; margin-bottom: 12px;"
      />
      <n-select
        v-model="selectedValue"
        placeholder="Please Select Type"
        :options="options"
        style="flex-grow: 1; margin-bottom: 12px;"
      />
      <n-select
        v-model="selectedValue"
        size="small"
        placeholder="Please Select Type"
        :options="options"
        style="flex-grow: 1;"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">selectedValue: {{ JSON.stringify(selectedValue) }}</pre>
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
      options: [
        {
          label: "Everybody's Got Something to Hide Except Me and My Monkey",
          value: 'song0',
          disabled: true
        },
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
          value: 'song3',
          disabled: true
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
          value: 'song7',
          disabled: true
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
