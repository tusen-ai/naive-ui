<template>
  <div
    ref="doc"
    class="n-doc"
  >
    <div class="n-doc-header">
      <n-gradient-text :font-size="20">
        Nimbus Service Layout / n-nimbus-service-layout
      </n-gradient-text>
    </div>
    <div class="n-doc-body">
      <div class="n-doc-section">
        <div class="n-doc-section__header">
          Usage
        </div>
        <div class="n-doc-section__view">
          <n-nimbus-service-layout
            name="Oasis"
            :items="items"
            :disable-menu="disableMenu"
          >
            <template v-slot:drawer-header-icon>
              <md-musical-notes />
            </template>
            Take me to the place where you go<br>
            Where nobody knows if it's night or day<br>
            But please don't put your life in the hands<br>
            Of a Rock n Roll band<br>
            Who'll throw it all away
            <n-button @click="disableMenu = !disableMenu">
              toggleDisableMenu
            </n-button>
          </n-nimbus-service-layout>
        </div>
        <div class="n-doc-section__inspect">
          <button @click="handleClick">
            change items
          </button>
        </div>
        <div class="n-doc-section__source">
          <textarea><n-nimbus-service-layout
  name="Oasis"
  :items="[
    {
      name: 'Definitely Maybe',
      path: '/n-nimbus-service-layout?param=666'
    },
    {
      name: `What's the Story(Morning Glory)`,
      childItems: [
        {
          name: 'Hello',
          path: '/n-nimbus-service-layout?param=777'
        },
        {
          name: 'Roll with It',
          path: '/n-nimbus-service-layout?param=888'
        },
        {
          name: 'Wonderwall',
          path: '/n-nimbus-service-layout?param=999'
        },
        {
          name: `Don't Look Back in Anger`,
          path: '/n-nimbus-service-layout?param=000'
        },
        {
          name: 'Some Might Say',
          path: '/n-nimbus-service-layout?param=111'
        }
      ]
    },
    {
      name: 'Be Here Now',
      path: '/n-nimbus-service-layout?param=222'
    }
  ]"
  :disable-menu="disableMenu"
>
  <template v-slot:drawer-header-icon>
    <md-musical-notes />
  </template>
  Take me to the place where you go<br>
  Where nobody knows if it's night or day<br>
  But please don't put your life in the hands<br>
  Of a Rock n Roll band<br>
  Who'll throw it all away
  <n-button @click="disableMenu = !disableMenu">toggleDisableMenu</n-button>
</n-nimbus-service-layout></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mdMusicalNotes from 'naive-ui/lib/icons/md-musical-notes'
export default {
  components: {
    mdMusicalNotes
  },
  data () {
    return {
      disableMenu: false,
      items: [
        {
          name: 'Definitely Maybe',
          path: '/n-nimbus-service-layout?param=666'
        },
        {
          name: `Morning Glory`,
          childItems: [
            {
              name: 'Hello',
              path: '/n-nimbus-service-layout?param=777'
            },
            {
              name: 'Roll with It',
              path: '/n-nimbus-service-layout?param=888'
            },
            {
              name: 'Wonderwall',
              path: '/n-nimbus-service-layout?param=999'
            },
            {
              name: `Don't Look Back in Anger`,
              path: '/n-nimbus-service-layout?param=000'
            },
            {
              name: 'Some Might Say',
              path: '/n-nimbus-service-layout?param=111'
            }
          ]
        },
        {
          name: 'Be Here Now',
          path: '/n-nimbus-service-layout?param=222'
        }
      ]
    }
  },
  methods: {
    handleClick () {
      this.items = [
        {
          name: 'Definitely Maybe',
          path: '/n-nimbus-service-layout?param=666'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.n-doc {
  width: 1080px;
  .n-doc-section__view {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 800px;
    overflow: hidden;
    border: 2px solid #5C657EFF;
  }
}
</style>
