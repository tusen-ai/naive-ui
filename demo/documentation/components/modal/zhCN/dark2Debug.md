# Dark Debug 2
```html
<n-button @click="modalActive = !modalActive">Toggle</n-button>
<n-modal
  title="Dark Modal Debug"
  preset="card"
  v-model="modalActive"
  :overlay-style="{ marginTop: '24px', marginBottom: '24px' }"
>
  <n-table :bordered="false" :single-line="false">
    <n-thead>
      <n-tr>
        <n-th>Abandon</n-th>
        <n-th>Abormal</n-th>
        <n-th>Abolish</n-th>
        <n-th>...</n-th>
        <n-th>It's hard to learn words</n-th>
      </n-tr>
    </n-thead>
    <n-tbody>
      <n-tr>
        <n-td>放弃</n-td>
        <n-td>反常的</n-td>
        <n-td>彻底废除</n-td>
        <n-td>...</n-td>
        <n-td>Damn it! I can't remember those words.</n-td>
      </n-tr>
      <n-tr>
        <n-td>...</n-td>
        <n-td>...</n-td>
        <n-td>...</n-td>
        <n-td>...</n-td>
        <n-td>...</n-td>
      </n-tr>
    </n-tbody>
  </n-table>
</n-modal>
```

```js
export default {
  data () {
    return {
      modalActive: false
    }
  },
}
```