# Transfer
<!--single-column-->
Left, right, left, right... As a boring guy, I can play it all day.
## Demos
```demo
basic
large-data
size
filterable
```
## V-model
|Prop|Event|
|-|-|
|value|change|

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| null`|`null`||
|value|`Array<string \| number>`|`null`||
|options|`Array<TransferOption>`|`[]`||
|disabled|`boolean`|`true`||
|virtual-scroll|`boolean`|`false`|If use virtual scroll on transfer. If set to `true` it can handles large data (and turn transfer animation off)|
|source-title|`string`|`'Source'`||
|target-title|`string`|`'Target'`||
|filterable|`boolean`|`false`||
|source-filter-placeholder|`string`|`null`||
|target-filter-placeholder|`string`|`null`||
|filter|`(pattern: string, option: TransferOption, from: 'source' \| 'target') => boolean`|A basic label string match function||
|size|`'small' \| 'medium' \| 'large'`|`'medium'`||


### TransferOption Type
|Property|Type|Description|
|-|-|-|
|label|`string`||
|value|`string \| number`|value of an option, should be unique in options|
|disabled|`boolean`||

## Events
|Name|Parameters|Description|
|-|-|-|
|change|`(Array<string \| number>)`||

## Notes
When I heared from my colleague he's going to put more than a thousand items into the transfer, I was astonished. My poor imagination can't come up with a scene that must use a transfer with thousands of items. But I must admit, it's my mind that always not considerate enough.

Months earlier, I have built a interesting animation in transfer but it will cause reflow on many DOM elements. At that time, I hadn't think of people would insert so much data in it. Although I never compromise on styles, it's hard to surpass the limit of browser and hardware. It sounds like a kind of philosophy problem to build a car as comfort as a Rolls Royce and as fast as a Ferrari (or Porsche, etc) which is nearly impossible.

(Don't tell me the Bentley Continental GT, I don't like the car's appearance.)

Style can't be compromised on. However, the problem need to be solved. So finally I add a boost trigger on transfer to deal with large data (by the way turn off the animation).