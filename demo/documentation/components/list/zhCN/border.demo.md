# 边框
List 可以控制边框。
```html
<n-list>
  <template v-slot:header>
    hhh
  </template>
  <template v-slot:footer>
    fff
  </template>
  <n-list-item>
    <template v-slot:prefix>
      <n-button>Prefix</n-button>
    </template>
    <template v-slot:suffix>
      <n-button>Suffix</n-button>
    </template>
    <n-thing title="Thing" title-extra="extra" description="description">
      Biu<br>
      Biu<br>
      Biu<br>
    </n-thing>
  </n-list-item>
  <n-list-item>
    <n-thing title="Thing" title-extra="extra" description="description">
      Biu<br>
      Biu<br>
      Biu<br>
    </n-thing>
    <template v-slot:suffix>
      <n-button>Suffix</n-button>
    </template>
  </n-list-item>
</n-list>
```