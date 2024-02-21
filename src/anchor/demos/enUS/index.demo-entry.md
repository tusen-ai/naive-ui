# Anchor

<!--single-column-->

Tell you where you are.

## Demos

```demo
basic.vue
ignore-gap.vue
affix.vue
custom-active-anchor.vue
scrollto.vue
```

## API

### Anchor Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| affix | `boolean` | `false` | If it works like an affix. If set to `true`, it will receive props from [affix](affix#Affix-Props). |
| bound | `number` | `12` | The height of the border when scrolling. |
| ignore-gap | `boolean` | `false` | If set to `true`, it will be displayed on the exact href. |
| get-current-anchor | `(activeHref: string \| null) => string \| null` | `undefined` | get current active anchor. | NEXT_VERSION |
| offset-target | `string \| HTMLElement \| Window \| Document \| (() => HTMLElement)` | `document` | The element or selector used to calc offset of link elements. If you are not scrolling the entire document but only a part of it, you may need to set this. |
| show-rail | `boolean` | `true` | Whether to show the sider rail. |
| show-background | `boolean` | `true` | Whether to show background of links. |
| type | `'rail' \| 'block'` | `'rail'` | The type to use. |

### Anchor Methods

| Name | Type | Description |
| --- | --- | --- |
| scrollTo | `(href: string) => void` | Manually scroll to the specific position. |
