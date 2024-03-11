# Infinite Scroll

Snowball, roll and roll, more and more content, can not stop.

Available since `NEXT_VERSION`.

## Demos

```demo
basic.vue
delay.vue
chat.vue
```

## API

### Infinite Scroll Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| delay | `Number` | `undefined` | Delay display, in milliseconds. | NEXT_VERSION |
| distance | `Number` | `0` | Distance threshold that triggers loading. | NEXT_VERSION |
| on-load | `() => Promise<void>` | `undefined` | The callback function when scrolling to the bottom. | NEXT_VERSION |
| scrollbar-props | `Object` | `undefined` | Attribute reference [Scrollbar props](scrollbar#Scrollbar-Props). | NEXT_VERSION |
