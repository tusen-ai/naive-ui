# BubbleList

`BubbleList` is a dialogue Bubble list component that depends on the `bubble` component, Often used when chatting.

## Demos

```demo
basic.vue
slots.vue
autoScroll.vue
```

## API

| Name | Type | default | Description | Version |
| --- | --- | --- | --- | --- |
| data | `BubbleListData[]` | `[]` | Bubble data list. | NEXT_VERSION |
| roles | `Record<LLMRoleType, RoleType>` | `{}` | Set the default properties of the bubble. The `role` in `data` will be automatically matched. | NEXT_VERSION |
| autoScroll | `boolean` | `true` | When the content is updated, scroll to the latest position automatically. If the user scrolls, the automatic scrolling will be paused. | NEXT_VERSION |
| scrollbar-props | `ScrollbarProps` | `undefined` | See [Scrollbar props](scrollbar#Scrollbar-Props). | NEXT_VERSION |

### BubbleList Slots

| Name | Param | Type Alias | Description | Version |
| --- | --- | --- | --- | --- |
| avatar | `(props: { item: BubbleListData, index：number )` | `BubbleAvatarSlot` | Customize the avatar display content. | NEXT_VERSION |
| header | `(props: { item: BubbleListData, index：number )` | `BubbleHeaderSlot` | Customize the top display content. | NEXT_VERSION |
| footer | `(props: { item: BubbleListData, index：number )` | `BubbleFooterSlot` | Customize the bottom display content. | NEXT_VERSION |
| loading | `(props: { item: BubbleListData, index：number )` | `BubbleLoadingSlot` | Customize the loading state display content. | NEXT_VERSION |
| content | `(props: { item: BubbleListData, index：number )` | `BubbleContentSlot` | Customize the content display content. | NEXT_VERSION |

### BubbleList Methods

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| scrollTo | `(options: { top?: number, position?: 'top' \| 'bottom', silent?: boolean })` | Callback function for scroll event. | NEXT_VERSION |
