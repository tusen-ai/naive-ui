<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Table / n-table
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Basic Usage
        </div>
        <div class="n-doc-section__view">
          <n-table>
            <n-thead>
              <n-tr>
                <n-th>ID</n-th>
                <n-th>Cluster</n-th>
                <n-th>Cluster Type</n-th>
                <n-th>Tags</n-th>
                <n-th>Network Type</n-th>
                <n-th>Cluster Status</n-th>
                <n-th>Nodes</n-th>
                <n-th>Location</n-th>
                <n-th>Version</n-th>
              </n-tr>
            </n-thead>
            <n-tbody>
              <n-tr
                v-for="i in [1,2,3,4,5]"
                :key="i"
              >
                <n-td>1</n-td>
                <n-td>Name1</n-td>
                <n-td>Type1</n-td>
                <n-td>bla</n-td>
                <n-td>blablabla</n-td>
                <n-td>Running</n-td>
                <n-td>6</n-td>
                <n-td>Beijing</n-td>
                <n-td>1.12.6-aliyun.1</n-td>
              </n-tr>
            </n-tbody>
          </n-table>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-table>
  <n-thead>
    <n-tr>
      <n-th>ID</n-th>
      <n-th>Cluster</n-th>
      <n-th>Cluster Type</n-th>
      <n-th>Tags</n-th>
      <n-th>Network Type</n-th>
      <n-th>Cluster Status</n-th>
      <n-th>Nodes</n-th>
      <n-th>Location</n-th>
      <n-th>Version</n-th>
    </n-tr>
  </n-thead>
  <n-tbody>
    <n-tr
      v-for="i in [1,2,3,4,5]"
      :key="i"
    >
      <n-td>1</n-td>
      <n-td>Name1</n-td>
      <n-td>Type1</n-td>
      <n-td>bla</n-td>
      <n-td>blablabla</n-td>
      <n-td>Running</n-td>
      <n-td>6</n-td>
      <n-td>Beijing</n-td>
      <n-td>1.12.6-aliyun.1</n-td>
    </n-tr>
  </n-tbody>
</n-table></textarea>
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

    }
  },
  methods: {
  }
}
</script>
