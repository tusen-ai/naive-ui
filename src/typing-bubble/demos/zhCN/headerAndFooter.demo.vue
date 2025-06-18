<markdown>
# 头和尾

通过 `header` 和 `footer` 树形设置气泡的头部和底部。
</markdown>

<template>
    <n-bubble content="hello world  !">
        <template #avatar>
            <n-avatar 
                round 
                src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
            ></n-avatar>
        </template>
        <template #header>
            <span>Element Plus X</span>
        </template>
        <template #footer>
            <n-flex>
                <n-button type="info" :icon="Refresh" size="small" circle />
                <n-button type="success" :icon="Search" size="small" circle />
                <n-button type="warning" :icon="Star" size="small" circle />
                <n-button color="#626aef" :icon="DocumentCopy" size="small" circle />
            </n-flex>
        </template>
    </n-bubble>
</template>