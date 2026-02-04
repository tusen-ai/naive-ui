<markdown>
# 预览属性测试
</markdown>

<template>
  <n-space>
    <div>
      <p>使用 n-image-group：</p>
      <n-image-group>
        <n-image
          width="100"
          src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
          :previewed-img-props="{ style: { border: '8px solid red' } }"
        />
        <n-image
          width="100"
          src="https://gw.alipayobjects.com/zos/antfincdn/aPkFc8Sj7n/method-draw-image.svg"
          :previewed-img-props="{ style: { border: '8px solid red' } }"
        />
      </n-image-group>
    </div>
    <div>
      <p>不使用 n-image-group：</p>
      <n-image
        width="100"
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        :previewed-img-props="{ style: { border: '8px solid blue' } }"
      />
    </div>
  </n-space>
</template>
