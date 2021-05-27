# Anchor

<!--single-column-->

These demos used to use some charactor names from _Hard-Boiled Wonderland and the End of the World_ as anchor links, but if so there will be too wired in this page compared with other pages. So I rewrite them. What a pity.

## Demos

```demo
basic
ignore-gap
affix
scrollto
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| affix | `boolean` | `false` | If it works like a affix. If set to `true`, it will recieve props from [affix](affix#Props) |
| bound | `number` | `12` |  |
| ignore-gap | `boolean` | `false` | If set to `true`, it will be displayed on the exact href |
| offset-target | `string \| HTMLElement \| Window \| Document \| (() => HTMLElement)` | `document` | The element or selector used to calc offset of link elements. If you are not scrolling the entire document but only a part of it, you may need to set this. |
| show-rail | `boolean` | `true` | Whether to show the sider rail. |
| show-background | `boolean` | `true` | Whether to show background of links. |

## Methods

| Name     | Type                     | Description |
| -------- | ------------------------ | ----------- |
| scrollTo | `(href: string) => void` |             |
