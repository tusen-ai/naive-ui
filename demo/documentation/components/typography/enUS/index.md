# Typography

Naive UI provides some basic styling for common HTML tags. It also provides some components to render text better.

Layout is a kind of art.

## Demos
```demo
header
tags
text
```

## Props

### Text Props
|Name|Type|Default|Description|
|-|-|-|-|
|type|`'default' \| 'success' \| 'info' \| 'warning' \| 'error'`|`'default'`||
|strong|`boolean`|`false`||
|italic|`boolean`|`false`||
|underline|`boolean`|`false`||
|delete|`boolean`|`false`||
|code|`boolean`|`false`||

### H1, H2, H3, H4, H5, H6 Props
|Name|Type|Default|Description|
|-|-|-|-|
|align-text|`boolean`|`false`||
|type|`'default' \| 'success' \| 'info' \| 'warning' \| 'error'`|`'default'`||
|prefix|`'bar'`|`null`||

### A Props
|Name|Type|Default|Description|
|-|-|-|-|
|to|`string`|`null`|If the prop is set, it will be rendered as a Vue Router router-link component. Make sure you don't want to use href.|

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