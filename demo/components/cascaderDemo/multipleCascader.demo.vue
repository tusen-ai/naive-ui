<template>
  <div class="n-doc-section">
    <div class="n-doc-section__header">
      Multiple Cascader
    </div>
    <div
      class="n-doc-section__view"
      style="flex-wrap: nowrap;"
    >
      <!--EXAMPLE_START-->
      <n-cascader
        v-model="selectedArray"
        placeholder="Please Select Type"
        :items="items"
        style="flex-grow: 1; margin-right: 12px;"
      />
      <!--EXAMPLE_END-->
    </div>
    <pre class="n-doc-section__inspect">v-model: {{ JSON.stringify(selectedArray) }}</pre>
    <n-doc-source-block>
      <!--SOURCE-->
    </n-doc-source-block>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selectedArray: null,
      items: [
        {
          label: 'Drive My Car lalalalalalalala',
          children: [
            {
              label: 'test1',
              value: 'test1'
            },
            {
              label: 'test2',
              value: 'test2'
            }
          ]
        },
        {
          label: '2',
          children: [
            {
              label: 'test3',
              children: [
                {
                  label: 'test3-1',
                  value: 'test3-1'
                },
                {
                  label: 'test3-2',
                  value: 'test3-2'
                }
              ]
            },
            {
              label: 'test4',
              value: 'test4'
            }
          ]
        },
        {
          label: '3',
          children: [
            {
              label: 'test3',
              value: 'test3'
            },
            {
              label: 'test4',
              value: 'test4'
            }
          ]
        },
        {
          label: '4',
          children: [
            {
              label: 'test3',
              value: 'test3'
            },
            {
              label: 'test4',
              value: 'test4'
            }
          ]
        },
        {
          label: '5',
          children: [
            {
              label: 'test3',
              value: 'test3'
            },
            {
              label: 'test4',
              value: 'test4'
            }
          ]
        },
        {
          label: '6',
          children: [
            {
              label: 'test3',
              value: 'test3'
            },
            {
              label: 'test4',
              value: 'test4'
            }
          ]
        },
        {
          label: '7',
          children: [
            {
              label: 'test3',
              value: 'test3'
            },
            {
              label: 'test4',
              value: 'test4'
            }
          ]
        }
      ]
    }
  }
}
</script>
