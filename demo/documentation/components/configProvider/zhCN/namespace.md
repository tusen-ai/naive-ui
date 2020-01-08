# 命名空间
组件的一部分是游离于 `document.body` 的。如需给这些游离的元素添加class，使用应用的 `namespace` 属性。打开开发者工具查看游离的内容。
```html
<n-config-provider :namespace="ns">
  <n-button
    @click="isActive = true"
  >
    激活含游离内容的组件
  </n-button>
  <n-modal v-model="isActive">
    <n-nimbus-form-card
      width="1032"
      title="Parklife"
      :deactivate="() => isActive = false"
    >
      <template v-slot:header>
        v-slot:header
      </template>
      <template v-slot:footer>
        v-slot:footer
      </template>
      <template v-slot:content>
        <n-date-picker
          v-model="time"
          type="datetime"
        />
        <n-select
          v-model="selectedValue"
          size="small"
          placeholder="请选择类型"
          :items="items"
          style="flex-grow: 1;"
        />
        <n-tooltip
          placement="bottom"
          trigger="click"
          style="margin-right: 12px;"
        >
          <template v-slot:activator>
            <n-button style="margin: 0;">
              超跑女神（点击）
            </n-button>
          </template>
          <span>
            我希望它们全都是超跑女神
          </span>
        </n-tooltip>
      </template>
    </n-nimbus-form-card>
  </n-modal>
</n-config-provider>
```
```js
export default {
  data () {
    return {
      ns: 'custom-app-namespace1',
      isActive: false,
      time: null,
      selectedValue: null,
      items: [
        {
          label: "不能说的秘密",
          value: 'song0'
        },
        {
          label: '一路向北',
          value: 'song1'
        },
        {
          label: '米兰的小铁匠',
          value: 'song2'
        },
        {
          label: "你听得到",
          value: 'song3'
        },
        {
          label: '阳光宅男',
          value: 'song4'
        },
        {
          label: '你好吗',
          value: 'song5'
        },
        {
          label: '简单爱',
          value: 'song6'
        },
        {
          label: '娘子',
          value: 'song7'
        },
        {
          label: '说好的幸福呢',
          value: 'song8'
        },
        {
          label: '可爱女人',
          value: 'song9'
        },
        {
          label: "那里都是你",
          value: 'song10'
        },
        {
          label: '无双',
          value: 'song11'
        },
        {
          label: '等你下课',
          value: 'song12'
        }
      ]
    }
  }
}
```
