import { h, renderSlot, defineComponent } from 'vue'

export default defineComponent({
  name: 'ListItem',
  render () {
    const { $slots } = this
    return (
      <li class="n-list-item">
        {$slots.prefix ? (
          <div class="n-list-item__prefix">{renderSlot($slots, 'prefix')}</div>
        ) : null}
        {$slots.default ? <div class="n-list-item__main">{$slots}</div> : null}
        {$slots.suffix ? (
          <div class="n-list-item__suffix">{renderSlot($slots, 'suffix')}</div>
        ) : null}
      </li>
    )
  }
})
