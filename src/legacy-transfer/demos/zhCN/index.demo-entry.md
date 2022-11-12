# 旧版穿梭框 Legacy Transfer

<!--single-column-->

<n-alert title="警告" type="warning" :bordered="false">
  这个穿梭框组件已经被废弃，不会迭代任何新的功能，并将在下一个大版本中彻底移除。推荐使用新的 <router-link to="transfer" custom v-slot="{ href, navigate }">
    <n-a :href="href" @click="navigate">穿梭框</n-a>
  </router-link>。
</n-alert>

左、右、左、右...像我这么无聊的人能玩一整天。

## 演示

```demo
basic.vue
large-data.vue
size.vue
filterable.vue
```

## API

### Transfer Props

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| default-value | `Array<string \| number> \| null` | `null` | 非受控模式下的默认值 |
| disabled | `boolean` | `true` | 是否禁用 |
| filterable | `boolean` | `false` | 是否可过滤 |
| filter | `(pattern: string, option: TransferOption, from: 'source' \| 'target') => boolean` | 一个简单的标签字符串匹配函数 | 搜索时使用的过滤函数 |
| options | `TransferOption[]` | `[]` | 配置选项内容，详情见 TransferOption Type |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | 尺寸 |
| source-filter-placeholder | `string` | `undefined` | 源项搜索框中的占位符 |
| source-title | `string` | `'源项'` | 源项标题 |
| target-filter-placeholder | `string` | `undefined` | 目标项搜索框中的占位符 |
| target-title | `string` | `'目标项'` | 目标项标题 |
| value | `Array<string \| number> \| null` | `undefined` | 受控模式下的值 |
| on-update:value | `(value: Array<string \| number>) => void` | `undefined` | 值发生改变时的回调 |
| virtual-scroll | `boolean` | `false` | 是否启用虚拟滚动 |

#### TransferOption Type

| 属性     | 类型               | 说明                     |
| -------- | ------------------ | ------------------------ |
| label    | `string`           | 选项中用以页面显示的名称 |
| value    | `string \| number` | 所有选项中唯一的 `value` |
| disabled | `boolean`          | 是否禁用这个选项         |
