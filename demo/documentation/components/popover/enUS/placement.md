# Placement
```html
<div class="popover-grid">
  <n-popover placement="top-start" trigger="click">
    <template v-slot:activator>
      <n-button size="small" style="grid-area: 1 / 2 / 2 / 3;">
        Top Start
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover placement="top" trigger="click">
    <template v-slot:activator>
      <n-button size="small" style="grid-area: 1 / 3 / 2 / 4;">
        Top
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover placement="top-end" trigger="click">
    <template v-slot:activator>
      <n-button size="small" style="grid-area: 1 / 4/ 2 / 5;">
        Top End
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover placement="left-start" trigger="click">
    <template v-slot:activator>
      <n-button size="small" style="grid-area: 2 / 1 / 3 / 2;">
        Left Start
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover placement="left" trigger="click">
    <template v-slot:activator>
      <n-button size="small" style="grid-area: 3 / 1 / 4 / 2;">
        Left
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover placement="left-end" trigger="click">
    <template v-slot:activator>
      <n-button size="small" style="grid-area: 4 / 1 / 5 / 2;">
        Left End
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover placement="right-start" trigger="click">
    <template v-slot:activator>
      <n-button size="small" style="grid-area: 2 / 5 / 3 / 6;">
        Right Start
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover placement="right" trigger="click">
    <template v-slot:activator>
      <n-button size="small" style="grid-area: 3 / 5 / 4 / 6;">
        Right
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover placement="right-end" trigger="click">
    <template v-slot:activator>
      <n-button size="small" style="grid-area: 4 / 5 / 5 / 6;">
        Right End
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover placement="bottom-start" trigger="click">
    <template v-slot:activator>
      <n-button size="small" style="grid-area: 5 / 2 / 6 / 3;">
        Bottom Start
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover placement="bottom" trigger="click">
    <template v-slot:activator>
      <n-button size="small" style="grid-area: 5 / 3 / 6 / 4;">
        Bottom
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
  <n-popover placement="bottom-end" trigger="click">
    <template v-slot:activator>
      <n-button size="small" style="grid-area: 5 / 4 / 6 / 5;">
        Bottom End
      </n-button>
    </template>
    <div class="large-text">
      Oops!
    </div>
  </n-popover>
</div>
```

```css
.popover-grid {
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  grid-gap: 12px;
  justify-content: center;
  align-items: center;
}

.large-text {
  font-size: 48px;
}
```