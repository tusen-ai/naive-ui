<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Disabled
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: wrap;"
    >
      <!--EXAMPLE_START-->
      <n-select
        v-model="selectedValue"
        placeholder="Please Select Type"
        :items="items"
        style="width: 300px; margin-right: 12px;"
        disabled
      />
      <n-select
        v-model="selectedValue2"
        placeholder="Please Select Type"
        :items="items"
        style="width: 300px; margin-right: 12px;"
        disabled
      />
      <n-select
        v-model="selectedArray"
        multiple
        placeholder="Please Select Type"
        :items="items"
        style="width: 300px; margin-right: 12px;"
        disabled
      />
      <n-select
        v-model="selectedArray2"
        multiple
        placeholder="Please Select Type"
        :items="items"
        style="width: 300px;"
        disabled
      />
      <n-select
        v-model="selectedArray2"
        filterable
        placeholder="Please Select Type"
        :items="items"
        style="width: 300px;"
        disabled
      />
      <n-select
        v-model="selectedArray2"
        multiple
        filterable
        placeholder="Please Select Type"
        :items="items"
        style="width: 300px;"
        disabled
      />
      <!--EXAMPLE_END-->
    </div><n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedValue: 'song1',
      selectedArray: ['song1'],
      selectedValue2: null,
      selectedArray2: [],
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
