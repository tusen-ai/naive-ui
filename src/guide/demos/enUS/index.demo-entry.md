# Guide

Guide users through features step by step.

## Demos

```demo
basic.vue
controlled.vue
placement.vue
target-gap.vue
custom-action.vue
no-mask.vue
no-target.vue
```

## API

### Guide Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| animated | `boolean` | `true` | Whether to use transition animation. |  |
| block-scroll | `boolean` | `true` | Whether to lock page scroll when guide is shown. |  |
| close-on-esc | `boolean` | `true` | Whether pressing Esc closes guide. |  |
| current | `number` | `undefined` | Current step, 1-based. |  |
| default-current | `number` | `1` | Default current step in uncontrolled mode. |  |
| default-show | `boolean` | `false` | Whether guide is shown by default in uncontrolled mode. |  |
| finish-button-props | `ButtonProps` | `undefined` | Props of finish button. |  |
| finish-text | `string \| null` | `'Finish'` | Finish button text. Set to `null` to hide it. |  |
| mask-closable | `boolean` | `true` | Whether clicking mask closes guide. |  |
| next-button-props | `ButtonProps` | `undefined` | Props of next button. |  |
| next-text | `string \| null` | `'Next'` | Next button text. Set to `null` to hide it. |  |
| placement | `PopoverPlacement` | `'bottom'` | Default panel placement. |  |
| prev-button-props | `ButtonProps` | `undefined` | Props of previous button. |  |
| prev-text | `string \| null` | `'Previous'` | Previous button text. Set to `null` to hide it. |  |
| scroll-into-view | `boolean` | `true` | Whether to scroll target into view when step changes. |  |
| show | `boolean` | `undefined` | Whether guide is shown. |  |
| show-mask | `boolean` | `true` | Whether to show mask. |  |
| skip-button-props | `ButtonProps` | `undefined` | Props of skip button. |  |
| skip-text | `string \| null` | `'Skip'` | Skip button text. Set to `null` to hide it. |  |
| steps | `GuideStep[]` | `[]` | Guide steps. |  |
| target-border-radius | `number` | `4` | Border radius of highlighted target. |  |
| target-gap | `number` | `0` | Gap between highlighted box and target box. |  |
| to | `string \| HTMLElement \| false` | `'body'` | Container node of guide. `false` will keep it at current position. |  |
| z-index | `number` | `undefined` | Guide z-index. |  |
| on-close | `() => void` | `undefined` | Callback when guide is closed. |  |
| on-finish | `(current: number) => void` | `undefined` | Callback when guide is finished. |  |
| on-next | `(current: number) => void` | `undefined` | Callback when moving to next step. |  |
| on-prev | `(current: number) => void` | `undefined` | Callback when moving to previous step. |  |
| on-update:current | `(current: number) => void` | `undefined` | Callback when current step changes. |  |
| on-update:show | `(show: boolean) => void` | `undefined` | Callback when show status changes. |  |

### GuideStep Properties

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content | `string \| (() => VNodeChild)` | `undefined` | Step content. |
| placement | `PopoverPlacement` | `undefined` | Panel placement of current step. |
| showArrow | `boolean` | `true` | Whether to show arrow of current step. |
| target | `string \| HTMLElement \| (() => HTMLElement \| null)` | `undefined` | Target element. |
| title | `string` | `undefined` | Step title. |

### Guide Slots

| Name      | Parameters                 | Description          |
| --------- | -------------------------- | -------------------- |
| actions   | `{ step, current, total }` | Custom actions.      |
| default   | `{ step, current, total }` | Custom body content. |
| indicator | `{ step, current, total }` | Custom indicator.    |
| title     | `{ step, current, total }` | Custom title.        |

### Guide Methods

| Name         | Parameters | Description                                 |
| ------------ | ---------- | ------------------------------------------- |
| close        | `()`       | Close guide.                                |
| finish       | `()`       | Finish guide and close it.                  |
| next         | `()`       | Move to next step.                          |
| prev         | `()`       | Move to previous step.                      |
| syncPosition | `()`       | Sync panel and highlighted target position. |
