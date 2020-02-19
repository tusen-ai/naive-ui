# 忽略间隔
```html
<div style="height:200px">
  <n-row :gutter="12">
    <n-col :span="6">
      <div></div>
    </n-col>
    <n-col :span="6">
      <div></div>
    </n-col>
    <n-col :span="6">
      <div style="width:160px;float:right;">
        <n-anchor  affix :offset-top="24" :top="88" style="z-index: 1;" ignore-gap>
          <n-anchor-link title="演示" href="#演示">
            <n-anchor-link title="忽略间隔" href="#ignore-gap"/>
            <n-anchor-link title="固定" href="#affix"/>
            <n-anchor-link title="滚动到" href="#scrollto"/>
          </n-anchor-link>
          <n-anchor-link title="Props" href="#Props" />
        </n-anchor>
      </div>
    </n-col>
    <n-col :span="6">
      <div style="width:160px;float:right;">
        <n-anchor  affix :offset-top="24" :top="88" style="z-index: 1;">
        <n-anchor-link title="演示" href="#演示">
            <n-anchor-link title="忽略间隔" href="#ignore-gap"/>
            <n-anchor-link title="固定" href="#affix"/>
            <n-anchor-link title="滚动到" href="#scrollto"/>
          </n-anchor-link>
          <n-anchor-link title="Props" href="#Props" />
        </n-anchor>
      </div>
    </n-col>
  </n-row>
</div>
```