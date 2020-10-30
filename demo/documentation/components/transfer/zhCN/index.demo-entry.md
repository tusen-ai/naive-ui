# 穿梭框 Transfer
<!--single-column-->
左、右、左、右...像我这么无聊的人能玩一整天。
## 演示
```demo
basic
large-data
size
filterable
```

## Props
|名称|类型|默认值|说明|
|-|-|-|-|
|disabled|`boolean`|`true`||
|filterable|`boolean`|`false`||
|filter|`(pattern: string, option: TransferOption, from: 'source' \| 'target') => boolean`|一个简单的标签字符串匹配函数||
|options|`Array<TransferOption>`|`[]`||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||
|source-filter-placeholder|`string`|`undefined`||
|source-title|`string`|`'源项'`||
|target-filter-placeholder|`string`|`undefined`||
|target-title|`string`|`'目标项'`||
|theme|`'light' \| 'dark' \| string`|`undefined`||
|value|`Array<string \| number>`|`null`||
|on-update:value|`(value: Array<string \| number>) => any`|`undefined`||
|virtual-scroll|`boolean`|`false`|If use virtual scroll on transfer. If set to `true` it can handles large data (and turn transfer animation off)|

### TransferOption Type
|属性|类型|说明|
|-|-|-|
|label|`string`||
|value|`string \| number`|选项的 value，需要唯一|
|disabled|`boolean`||

<!-- ## 备注
当听到同事和我说他要往里面放上千条数据的时候，我是很蛋疼的。贫瘠的想象让我实在难想出为啥非得用这个东西装这么多数据。但是必须承认，大多数情况下还是我考虑得不太周全。

几个月之前，我给它弄了个好玩的动画，但是它会触发大量 DOM 的回流。那个时候我根本没考虑还会有人往这里怼这么多数据。虽然我的原则是绝不对样式妥协，但是还是很难跨过浏览器和硬件的限制。这感觉都成了个哲学问题，造一辆车和劳斯莱斯一样舒适，还要和法拉利(或者保时捷、其他什么的)一样快几乎不太可能。

（不要说宾利欧陆GT，我觉得那个车长得不太行，它出局了）

样式不能妥协，但问题还得解决，所以最后决定搞个加速开关处理大量数据，想快也可以，不放动画就完了。 -->