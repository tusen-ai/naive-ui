<markdown>
# 支持位置和头像

通过 `avatar` 设置自定义头像，通过 `placement` 设置位置，提供了 `start`、`end` 两个选项。
</markdown>

<template>
    <n-flex vertical>
        <n-bubble 
            content="Good morning, how are you?"
            placement="start"
            avatar="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" 
        />

        <n-bubble 
            content="What a beautiful day!"
            placement="start"
            avatar=""
        />

        <n-bubble 
            content="Hi, good morning, I'm fine!"
            placement="end"
        >
            <template #avatar>
                <n-avatar src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"></n-avatar>
            </template>
        </n-bubble>

        <n-bubble 
            content="Thank you!"
            placement="end"
            avatar=""
        />
    </n-flex>
</template>