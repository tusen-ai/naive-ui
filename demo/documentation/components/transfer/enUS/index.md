# Transfer
<!--single-column-->
Left, right, left, right... As a boring guy, I can play it all day.
## Demos
```demo
basic
large-data
```
## V-model
|Prop|Event|
|-|-|
|value|change|

## Props
|Name|Type|Default|Description|
|-|-|-|-|
|value|`Array<string \| number>`|`null`||
|options|`Array<TransferOption>`|`[]`||
|disabled|`boolean`|`true`||
|virtual-scroll|`boolean`|`false`|If use virtual scroll on transfer. If set to `true` it can handles large data (and turn transfer animation off)|

### TransferOption
|Property|Type|Description|
|-|-|-|
|label|`string`||
|value|`string \| number`|value of an option, should be unique in options|

## Events
|Name|Parameters|Description|
|-|-|-|
|change|`(Array<string \| number>)`||

## Notes
When I heared from my FE fellow he's going to put more than a thousand of items inside the transfer, I was astonished. My poor mind can't come up with a scene that must use a transfer with thousands of items. But I must admit, it's my mind that always not considerate enough.

Months earlier, I have built a interisting animation in transfer but it will cause reflow on many DOM elements. At that time, I hadn't think of people would insert too many data in it. Although I never compromise on style, it's hard to surpass the limit of browser and hardware. It sounds like a kind of philosophy problem to build a car as comfort as a Rolls Royce and as fast as a Ferrari (or Porsche, etc) which is nearly impossible.

(Don't tell me the Bentley Continental GT, I don't like the car looks.)

Style can't be compromised on. However, the problem need to be solved. So finally I add a boost trigger on transfer to deal with large data (by the way turn off the animation).