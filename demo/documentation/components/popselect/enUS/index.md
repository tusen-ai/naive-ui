# Popselect

If you want select some options but don't want a picker, you can use popselect instead.

## Demos
```demo
basic
cancelable
custom-width
multiple
```

## V-model
|Prop|Event|
|-|-|
|value|change|

## Props

|Name|Type|Default|Description|
|-|-|-|-|
|value|`string \| number`|||
|options|`Array`|||
|width|`number`|||
|multiple|`boolean`|||
|cancelable|`boolean`|||
|controller|`Object`|||
|arrow|`boolean`|||
|trigger|`'click' \| 'hover' \| 'manual'`|||

## Events
|Name|Parameters|Description|
|-|-|-|
|change|`string \| number \| Array<string \| number> \| null`||