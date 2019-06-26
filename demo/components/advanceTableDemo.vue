<template>
  <div ref="doc" class="n-doc">
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        AdvanceTable
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-advance-table :columns="columns" :data="data" />
        </div>
        <div class="n-doc-section__source">
          <textarea>scaffold</textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import docCodeEditorMixin from './docCodeEditorMixin'
export default {
  mixins: [docCodeEditorMixin],
  data () {
    return {
      columns: [
        {
          title: 'Name',
          key: 'name',
          sortable: true
        },
        {
          title: 'Age',
          key: 'age',
          sortable: true,
          render: (h, params) => {
            return <b>{params.row.age}</b>
          }
        },
        {
          title: '',
          render: (h, params) => {
            return (
              <n-button
                style="margin:0;"
                size="small"
                onClick={() => this.handleClick()}
              >
                delete
              </n-button>
            )
          }
        }
      ],
      data: [
        {
          name: 'xiaobai',
          age: 10
        },
        {
          name: 'xiaobai2',
          age: 12
        }
      ]
    }
  },
  methods: {
    handleClick () {
      alert('delete')
    }
  }
}
</script>
