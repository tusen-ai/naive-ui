<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Tab / hahah
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-tab
            type="card"
            closable
            addable
            :add-panel="addPanel"
          >
            <n-tab-panel label="form">
              <n-form
                inline
                :label-width="80"
              >
                <n-form-item label="name">
                  <n-input placeholder="Input your name" />
                </n-form-item>
                <n-form-item label="age">
                  <n-input placeholder="Input your age" />
                </n-form-item>
                <n-form-item label="phone">
                  <n-input placeholder="Input your phone number" />
                </n-form-item>
              </n-form>
            </n-tab-panel>
            <n-tab-panel
              active
              label="table"
            >
              <n-advance-table
                :columns="columns0"
                :data="data"
              >
                <template #table-operation>
                  <n-button>custom operation by v-slot:table-operation</n-button>
                </template>
              </n-advance-table>
            </n-tab-panel>
            <n-tab-panel
              disabled
              label="input"
            >
              haha: <n-input />
            </n-tab-panel>
            <n-tab-panel label="icon">
              lala: <n-icon />
            </n-tab-panel>
            <n-tab-panel label="button">
              hehe: <n-button />
            </n-tab-panel>
            <n-tab-panel
              v-for="(item, i) in panels"
              :key="i"
              :label="item.label"
            >
              {{ item.content }}
            </n-tab-panel>
          </n-tab>
        </div>
        <div class="n-doc-section__source" />
      </div>
    </div>
  </div>
</template>
<script>
import docCodeEditorMixin from './docCodeEditorMixin'

export default {
  mixins: [docCodeEditorMixin],
  data () {
    let d = new Array(20).fill(0)
    d = d.map((item, idx) => {
      return {
        name: 'xiaobai' + idx,
        age: Math.ceil((Math.random() * 20))
      }
    })
    return {
      panels: [],
      data: d,
      columns0: [
        {
          title: 'Name',
          key: 'name',
          width: 300
        },
        {
          title: '#',
          render: (h, params) => {
            return (
              <n-button
                style="margin:0;"
                size="small"
                onClick={() => this.handleClick(params)}
              >
                delete
              </n-button>
            )
          }
        },
        {
          title: 'Age',
          key: 'age',
          render: (h, params) => {
            return <b>{params.row.age}</b>
          }
        },
        {
          title: '#',
          render: (h, params) => {
            return (
              <n-button
                style="margin:0;"
                size="small"
                onClick={() => this.handleClick(params)}
              >
                delete
              </n-button>
            )
          }
        }]
    }
  },
  methods: {
    addPanel () {
      this.panels.push({
        label: this.panels.length,
        content: 'i am number' + this.panels.length
      })
    }
  }
}
</script>
