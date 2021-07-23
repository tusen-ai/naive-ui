# Thing

When you want to describe a thing, use thing. If you find it doesn't fit you demand, write one by yourself.

I wish there is a way to build all kinds of frequently used layout inside a component. It takes me some time to figure out that the component already exist, the brower itself.

## Demos

```demo
basic
indent
```

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| content-indented | `boolean` | `false` | Whether to enable content indentation. |
| content | `string` | `undefined` | Content area. |
| description | `string` | `undefined` | Description information. |
| title-extra | `string` | `undefined` | Additional information for the title. |
| title | `string` | `undefined` | Title information. |

## Slots

| Name         | Parameters | Description                           |
| ------------ | ---------- | ------------------------------------- |
| action       | `()`       | Operating area slot.                  |
| default      | `()`       | Content information.                  |
| description  | `()`       | Description information.              |
| header-extra | `()`       | Additional information in the header. |
| header       | `()`       | Header information.                   |
