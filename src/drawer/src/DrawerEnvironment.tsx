import type { PropType, VNodeChild } from 'vue'
import { defineComponent, h, ref } from 'vue'
import NDrawer, { drawerProps } from './Drawer'
import NDrawerContent from './DrawerContent'

export const NDrawerEnvironment = defineComponent({
  name: 'DrawerEnvironment',
  props: {
    ...drawerProps,
    internalKey: {
      type: String,
      required: true
    },
    // private
    onInternalAfterLeave: {
      type: Function as PropType<(key: string) => void>,
      required: true
    },
    // DrawerContent props for convenience
    title: String,
    closable: Boolean,
    headerClass: String,
    headerStyle: [String, Object] as PropType<string | Record<string, any>>,
    footerClass: String,
    footerStyle: [String, Object] as PropType<string | Record<string, any>>,
    bodyClass: String,
    bodyStyle: [String, Object] as PropType<string | Record<string, any>>,
    bodyContentClass: String,
    bodyContentStyle: [String, Object] as PropType<
      string | Record<string, any>
    >,
    // render function
    render: Function as PropType<() => VNodeChild>,
    footer: Function as PropType<() => VNodeChild>
  },
  setup(props) {
    const showRef = ref(true)
    function handleAfterLeave(): void {
      const { onInternalAfterLeave, internalKey, onAfterLeave } = props
      if (onInternalAfterLeave)
        onInternalAfterLeave(internalKey)
      if (onAfterLeave)
        onAfterLeave()
    }
    function handleMaskClick(e: MouseEvent): void {
      const { onMaskClick, maskClosable } = props
      if (onMaskClick) {
        onMaskClick(e)
        if (maskClosable) {
          hide()
        }
      }
    }
    function handleEsc(): void {
      const { onEsc } = props
      if (onEsc) {
        onEsc()
      }
    }
    function hide(): void {
      showRef.value = false
    }
    function handleUpdateShow(value: boolean): void {
      showRef.value = value
    }
    return {
      show: showRef,
      hide,
      handleUpdateShow,
      handleAfterLeave,
      handleMaskClick,
      handleEsc
    }
  },
  render() {
    const {
      handleUpdateShow,
      handleAfterLeave,
      handleMaskClick,
      handleEsc,
      show,
      title,
      closable,
      headerClass,
      headerStyle,
      footerClass,
      footerStyle,
      bodyClass,
      bodyStyle,
      bodyContentClass,
      bodyContentStyle,
      render,
      footer
    } = this

    // Determine if we should use DrawerContent
    const hasContentProps = title !== undefined || closable || render || footer

    return (
      <NDrawer
        {...this.$props}
        show={show}
        onUpdateShow={handleUpdateShow}
        onMaskClick={handleMaskClick}
        onEsc={handleEsc}
        onAfterLeave={handleAfterLeave}
        internalAppear
      >
        {{
          default: () => {
            if (hasContentProps) {
              return h(
                NDrawerContent,
                {
                  title,
                  closable,
                  headerClass,
                  headerStyle,
                  footerClass,
                  footerStyle,
                  bodyClass,
                  bodyStyle,
                  bodyContentClass,
                  bodyContentStyle
                },
                {
                  default: render,
                  footer
                }
              )
            }
            return this.$slots.default?.()
          }
        }}
      </NDrawer>
    )
  }
})
