<markdown>
# 变体和形状

通过 variant 属性设置气泡的样式变体。通过 shape 属性设置气泡的形状。
</markdown>

<template>
    <n-space vertical>
        <n-space>
            <n-bubble variant="filled" content="filled" />
            <n-bubble variant="filled" shape="round" content="filled + round" />
            <n-bubble variant="filled" shape="corner" content="filled + corner" />
        </n-space>

        <n-space>
            <n-bubble variant="outlined" content="outlined" />
            <n-bubble variant="outlined" shape="round" content="outlined + round" />
            <n-bubble variant="outlined" shape="corner" content="outlined + corner" />
        </n-space>
        
        <n-space>
            <n-bubble variant="shadow" content="shadow" />
            <n-bubble variant="shadow" shape="round" content="shadow + round" />
            <n-bubble variant="shadow" shape="corner" content="shadow + corner" />
        </n-space>

        <n-space>
            <n-bubble variant="filled" shape="corner" placement="end" content="filled + corner" />
            <n-bubble variant="outlined" shape="corner" placement="end" content="outlined + corner" />
            <n-bubble variant="shadow" shape="corner" placement="end" content="shadow + corner" />
        </n-space>
    </n-space>
</template>