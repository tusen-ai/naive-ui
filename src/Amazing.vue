<template>
    <div>{{title}}</div>
</template>

<script>
export default {
    name: 'amazing',
    props: ['title'],
    methods: {
        hello () {
            console.log('amazing')
        }
    }
}
</script>

<style>

</style>

