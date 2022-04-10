<markdown>
# 相对时间

时间组件使用 `date-fns` 的 [`formatDistanceStrict`](https://date-fns.org/v2.28.0/docs/formatDistanceStrict) 格式化相对时间。

如果你对于显示没有很多定制化的要求，这个一般够用了。
</markdown>

<template>
  <n-time :time="0" :to="86400000" type="relative" />
  <br>
  <n-time :time="0" :to="864000000" type="relative" />
  <br>
  <n-time :time="0" :to="8640000000" type="relative" />
</template>
