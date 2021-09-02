# Config Consumer

Config Consumer is built for getting config (usually as global config) of Config Provider.

## Demos

```demo
basic
```

## Events

| Name | Parameters | Default | Description |
| --- | --- | --- | --- |
| on-namespace-change | `(namespace: string) => void` | `undefined` | Callback triggered when namespace is changed |

## Slots

| Name    | Parameters                         | Description |
| ------- | ---------------------------------- | ----------- |
| default | `(options: { namespace: string })` |             |
