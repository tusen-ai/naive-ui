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

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| default-value | `Array<string \| number> \| null` | `null` | Default value in uncontrolled mode. |
| disabled | `boolean` | `true` | Whether to disable. |
| filterable | `boolean` | `false` | Whether to filterable. |
| filter | `function` | `(pattern: string, option: TransferOption, from: 'source' \| 'target') => boolean` | A basic label string match function. |
| options | `Array<TransferOption>` | `[]` | For details of configuration options, see TransferOption Type. |
| size | `'small' \| 'medium' \| 'large'` | `'medium'` | Size. |
| source-filter-placeholder | `string` | `undefined` | Placeholder in the source item search box. |
| source-title | `string` | `'Source'` | Source item title. |
| target-filter-placeholder | `string` | `undefined` | Placeholder in the target item search box. |
| target-title | `string` | `'Target'` | Target item title. |
| value | `Array<string \| number> \| null` | `undefined` | Value in controlled mode. |
| on-update:value | `(value: Array<string \| number>) => void` | `undefined` | Callback when the value changes. |
| virtual-scroll | `boolean` | `false` | Whether to enable virtual scrolling. |

### TransferOption Type

| Property | Type | Description |
| --- | --- | --- |
| label | `string` | The name used for the page display in the options. |
| value | `string \| number` | The only `value` among all options. |
| disabled | `boolean` | Whether to disable the option. |

## Events

| Name   | Parameters                  | Description                      |
| ------ | --------------------------- | -------------------------------- |
| change | `(Array<string \| number>)` | Callback when there is a change. |

<!-- ## Notes
When I heard from my colleague he's going to put more than a thousand items into the transfer, I was astonished. My poor imagination can't come up with a scene that must use a transfer with thousands of items. But I must admit, it's my mind that always not considerate enough.

Months earlier, I have built a interesting animation in transfer but it will cause reflow on many DOM elements. At that time, I hadn't think of people would insert so much data in it. Although I never compromise on styles, it's hard to surpass the limit of browser and hardware. It sounds like a kind of philosophy problem to build a car as comfort as a Rolls Royce and as fast as a Ferrari (or Porsche, etc) which is nearly impossible.

(Don't tell me the Bentley Continental GT, I don't like the car's appearance.)

Style can't be compromised on. However, the problem need to be solved. So finally I add a boost trigger on transfer to deal with large data (by the way turn off the animation). -->
