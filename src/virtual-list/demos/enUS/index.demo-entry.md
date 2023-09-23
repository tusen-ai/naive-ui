# Virtual List

When it comes to virtual lists, it can feel like a list is infinitely long, but in reality it is just secretly hiding the invisible elements

It's like a lazy programmer holding up a blank note and saying, "You can't see me, and I can't load myself!"

## Demos

```demo
basic.vue
dynamic-size.vue
scroll.vue
keep-alive.vue
```

## API

### Virtual List Props

| Name     | Type      | Default | Description                    | Version |
| -------- | --------- | ------- | ------------------------------ | ------- |
| animated | `boolean` | `true`  | Use animation when popping up. |         |

### Virtual List Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| trigger | `()` | The element or component that triggers popover. |  |

### Virtual List Methods

| Name    | Parameters        | Description                           |
| ------- | ----------------- | ------------------------------------- |
| setShow | `(show: boolean)` | Set show status in uncontrolled mode. |
