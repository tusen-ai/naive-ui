# Avatar

On the Internet, nobody knows you're a dog.

## Demos

```demo
size.vue
shape.vue
color.vue
badge.vue
icon.vue
name-size.vue
fallback.vue
group.vue
lazy.vue
v-show-debug.vue
```

## API

### Avatar Props

| Name | Type | Default | Description | Version |
| --- | --- | --- | --- | --- |
| bordered | `boolean` | `false` | Whether to display a avatar with border. |  |
| color | `string` | `undefined` | The background color of the avatar. |  |
| fallback-src | `string` | `undefined` | Image URL to show when avatar fails to load. |  |
| img-props | `object` | `undefined` | The props of the img element inside the component. | 2.34.0 |
| intersection-observer-options | `{ root?: Element \| Document \| string \| null, rootMargin?: string, threshold?: number \| number[]; }` | `undefined` | Intersection observer's config to be applied when `lazy=true`. | 2.31.0 |
| lazy | `boolean` | `false` | Whether to show after it enters viewport configured by `intersection-observer-options` | 2.31.0 |
| object-fit | `'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down'` | `'fill'` | Object-fit type of the image in the container. |  |
| render-fallback | `() => VNodeChild` | `undefined` | Render function of fallback content. | 2.33.4 |
| render-placeholder | `() => VNodeChild` | `undefined` | Render function of placeholder. | 2.33.4 |
| round | `boolean` | `false` | Whether to display a rounded avatar. |  |
| size | `'small' \| 'medium' \| 'large' \| number` | `'medium'` | Avatar's size. |
| src | `string` | `undefined` | Avatar's image source. |  |
| on-error | `(e: Event) => void` | `undefined` | Callback executed when the avatar image fails to load. |  |

### AvatarGroup Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| max | `number` | `undefined` | Max avatar count in the group. |
| max-style | `Object \| string` | `undefined` | The style of the overflow placeholder. |
| options | `Array<AvatarOption>` | `[]` | Avatar group options. |
| vertical | `boolean` | `false` | Whether display a vertical avatar group. |

see [Avatar Props](avatar#Props)

### Avatar Slots

| Name | Parameters | Description | Version |
| --- | --- | --- | --- |
| default | `()` | The content of the avatar. |  |
| fallback | `()` | Content if avatar load fails. | 2.33.4 |
| placeholder | `()` | Placeholder shown when image is not loaded. | 2.31.0 |

### AvatarGroup Slots

| Name | Parameters | Description |
| --- | --- | --- |
| avatar | `(info: { option: { src: string } })` | Avatar of the avatar group. |
| default | `()` | The content of the avatar group. |
| rest | `(info: { options: Array<{ src: string }>, rest: number })` | Overflow indicator of the avatar group. |
