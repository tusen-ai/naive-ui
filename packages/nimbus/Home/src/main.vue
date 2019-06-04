<template>
  <div class="home">
    <div class="columns">
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>
      <div class="column"></div>

    </div>
  </div>
</template>

<script>
export default {
  name: "NvHome",
  props: {},
  methods: {
    toggle () {
      this.collapse = !this.collapse
    },
    setActive (itemName) {
      this.activeItemName = itemName
    }
  },
  data () {
    return {
      collapse: false,
      activeItemName: 'Service Management',
      items: [
        {
          name: 'Service Management'
        }, 
        {
          name: 'Service Type Management'
        },
        {
          name: 'User Management'
        }
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  padding-top: 14px;
  .columns {
    margin: auto;
    display: flex;
    margin-left: 272px;
    margin-right: 272px;
    justify-content: space-between;
    .column {
      margin-right: 14px;
      &:last-child {
        margin-right: 0;
      }
      background-color: white;
      flex-grow: 1;
      height: 100px;
      
    }
  }
}
</style>

