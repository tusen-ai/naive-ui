<markdown>
# Unix timestamp

Use Unix timestamp as time.
</markdown>

<template>
  <n-time :time="4320000000" :to="8640000000" />
  <br>
  <n-time :time="4320000" :to="8640000" unix />
  <br>
  <n-time :time="4320000000" format="yyyy-MM-dd hh:mm:ss" />
  <br>
  <n-time :time="4320000" format="yyyy-MM-dd hh:mm:ss" unix />
</template>
