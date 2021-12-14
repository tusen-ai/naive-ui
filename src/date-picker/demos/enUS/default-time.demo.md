# Default time

```html
<n-space vertical>
  <n-date-picker type="datetime" clearable default-time="13:22:11" />
  <n-date-picker
    type="datetime"
    clearable
    :default-time="16 * 60 * 60 * 1000"
  />
  <n-date-picker type="datetimerange" clearable default-time="13:22:11" />
  <n-date-picker
    type="datetimerange"
    clearable
    :default-time="[16 * 60 * 60 * 1000]"
  />
  <n-date-picker
    type="datetimerange"
    clearable
    :default-time="['13:22:11', 16 * 60 * 60 * 1000]"
  />
</n-space>
```
