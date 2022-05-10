<markdown>
# Default expanded

It should be noted that even if only one panel you want to set to be expanded, `default-expanded-names` should also be passed in an array, unless `accordion` is set to `true`.
</markdown>

<template>
  <n-collapse :default-expanded-names="['2', '3']">
    <n-collapse-item title="green light" name="1">
      <n-collapse :default-expanded-names="['2']">
        <n-collapse-item title="on" name="1">
          <div>pass</div>
        </n-collapse-item>
        <n-collapse-item title="flashing" name="2">
          <div>pass fastly</div>
        </n-collapse-item>
      </n-collapse>
    </n-collapse-item>
    <n-collapse-item title="red light" name="2">
      <div>stop</div>
    </n-collapse-item>
    <n-collapse-item title="amber light" name="3">
      <div>warn</div>
    </n-collapse-item>
  </n-collapse>
</template>
