# 基础用法

```html
<n-list bordered>
  <template v-slot:header> hhh </template>
  <template v-slot:footer> fff </template>
  <n-list-item>
    <template v-slot:prefix>
      <n-button>Prefix</n-button>
    </template>
    <template v-slot:suffix>
      <n-button>Suffix</n-button>
    </template>
    <n-thing title="Thing" title-extra="extra" description="description">
      Biu<br />
      Biu<br />
      Biu<br />
    </n-thing>
  </n-list-item>
  <n-list-item>
    <n-thing title="Thing" title-extra="extra" description="description" />
  </n-list-item>
</n-list>
```
