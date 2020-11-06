# Typography

Naive UI provides some basic styling for common HTML tags. It also provides some components to render text better.

Typography is a kind of art.

## Demos
```demo
header
tags
text
```

## Props
### All Typography Components Props
|Name|Type|Default|Description|
|-|-|-|-|
|theme|`'light' \| 'dark' \| string`|`undefined`||


### Text Props
|Name|Type|Default|Description|
|-|-|-|-|
|type|`'default' \| 'success' \| 'info' \| 'warning' \| 'error'`|`'default'`||
|strong|`boolean`|`false`||
|italic|`boolean`|`false`||
|underline|`boolean`|`false`||
|delete|`boolean`|`false`||
|code|`boolean`|`false`||
|depth|`1 \| 2 \| 3 \| '1' \| '2' \| '3'`|`undefined`||
|tag|`string`|`undefined`|What tag should be this component be rendered as. Won't work when `code` or `del` is set.|

### P Props
|Name|Type|Default|Description|
|-|-|-|-|
|depth|`1 \| 2 \| 3 \| '1' \| '2' \| '3'`|`undefined`||


### H1, H2, H3, H4, H5, H6 Props
|Name|Type|Default|Description|
|-|-|-|-|
|align-text|`boolean`|`false`||
|type|`'default' \| 'success' \| 'info' \| 'warning' \| 'error'`|`'default'`||
|prefix|`'bar'`|`undefined`||

### A Props
|Name|Type|Default|Description|
|-|-|-|-|
|to|`string \| Object`|`undefined`|If the prop is set, it will be rendered as a Vue Router `router-link`s component. Make sure you don't want to use `href` attr.|

### Ul, Ol Props
|Name|Type|Default|Description|
|-|-|-|-|
|align-text|`boolean`|`false`||

### Blockquote Props
|Name|Type|Default|Description|
|-|-|-|-|
|align-text|`boolean`|`false`||

## Slots
### All Typography Components
|Name|Parameters|Description|
|-|-|-|
|default|`()`||