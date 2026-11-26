/**
 * Keeps the native attrs typed on each component in sync with what it forwards.
 * The tables are checked against the component types by `tsrs -p tsconfig.test.json`,
 * and against the rendered components at runtime.
 */
import type { Component } from 'vue'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { Fragment, h, nextTick } from 'vue'
import * as components from './index'

type Components = typeof components

type Name = Exclude<
  {
    [K in keyof Components]: Components[K] extends abstract new (
      ...args: never
    ) => { $props: object }
      ? K
      : never
  }[keyof Components],
  // NxButton only exists for TSX type checking
  'NxButton'
>

type PropName<N extends Name> = keyof InstanceType<Components[N]>['$props']

// Attributes unique to each element-specific attrs type, used to tell them apart.
// `li` has none, its `value` is a prop of other components.
interface ElementAttrs {
  a: 'download'
  blockquote: 'cite'
  // NButton also accepts anchor attributes
  button: 'formaction' | 'download'
  form: 'novalidate'
  label: 'for'
  ol: 'reversed'
  table: 'cellpadding'
  td: 'colspan' | 'valign'
  th: 'colspan'
  time: 'datetime'
}

type Tag = keyof HTMLElementTagNameMap

type ElementAttr<T extends Tag> = T extends keyof ElementAttrs
  ? ElementAttrs[T]
  : never

type TypedElementAttr<N extends Name> = Extract<
  PropName<N>,
  ElementAttrs[keyof ElementAttrs]
>

// The elements whose attrs type the component uses, `null` if it types none
type Root<N extends Name>
  = 'id' extends PropName<N>
    ? {
        [T in Tag]: [ElementAttr<T>, TypedElementAttr<N>] extends [
          TypedElementAttr<N>,
          ElementAttr<T>
        ]
          ? T
          : never
      }[Tag]
    : null

// The element each component forwards native attrs to, `null` if it doesn't.
// `null` and element-specific attrs types are checked by the types, the tag at runtime.
const roots: { [N in Name]: Root<N> } = {
  NA: 'a',
  NAffix: 'div',
  NAlert: 'div',
  NAnchor: 'div',
  NAnchorLink: 'div',
  NAutoComplete: 'div',
  NAvatar: 'span',
  NAvatarGroup: 'div',
  NBackTop: 'div',
  NBadge: 'div',
  NBlockquote: 'blockquote',
  NBreadcrumb: 'nav',
  NBreadcrumbItem: 'li',
  NButton: 'button',
  NButtonGroup: 'div',
  NCalendar: 'div',
  NCard: 'div',
  NCarousel: 'div',
  NCarouselItem: 'div',
  NCascader: 'div',
  NCheckbox: 'div',
  NCheckboxGroup: 'div',
  NCode: 'code',
  NCol: 'div',
  NCollapse: 'div',
  NCollapseItem: 'div',
  NCollapseTransition: 'div',
  NColorPicker: 'div',
  NConfigProvider: 'div',
  NCountdown: null,
  NDataTable: 'div',
  NDatePicker: 'div',
  NDescriptions: 'div',
  NDescriptionsItem: null,
  NDialog: 'div',
  NDialogProvider: null,
  NDivider: 'div',
  NDrawer: 'div',
  NDrawerContent: 'div',
  NDropdown: 'div',
  NDynamicInput: 'div',
  NDynamicTags: 'div',
  NEl: 'div',
  NElement: 'div',
  NEllipsis: 'span',
  NEmpty: 'div',
  NEquation: 'span',
  NFlex: 'div',
  NFloatButton: 'div',
  NFloatButtonGroup: 'div',
  NForm: 'form',
  NFormItem: 'div',
  NFormItemCol: 'div',
  NFormItemGi: 'div',
  NFormItemGridItem: 'div',
  NFormItemRow: 'div',
  NGi: 'div',
  NGlobalStyle: null,
  NGradientText: 'span',
  NGrid: 'div',
  NGridItem: 'div',
  NH1: 'h1',
  NH2: 'h2',
  NH3: 'h3',
  NH4: 'h4',
  NH5: 'h5',
  NH6: 'h6',
  NHeatmap: 'div',
  NHighlight: 'span',
  NHr: 'hr',
  NIcon: 'i',
  NIconWrapper: 'div',
  NImage: 'div',
  NImageGroup: null,
  NImagePreview: null,
  NInfiniteScroll: 'div',
  NInput: 'div',
  NInputGroup: 'div',
  NInputGroupLabel: 'div',
  NInputNumber: 'div',
  NInputOtp: 'div',
  NLayout: 'div',
  NLayoutContent: 'div',
  NLayoutFooter: 'div',
  NLayoutHeader: 'div',
  NLayoutSider: 'aside',
  NLegacyTransfer: 'div',
  NLi: 'li',
  NList: 'ul',
  NListItem: 'li',
  NLoadingBarProvider: null,
  NLog: 'div',
  NMarquee: 'div',
  NMention: 'div',
  NMenu: 'div',
  NMessageProvider: null,
  NModal: 'div',
  NModalProvider: null,
  NNotificationProvider: null,
  NNumberAnimation: null,
  NOl: 'ol',
  NP: 'p',
  NPageHeader: 'div',
  NPagination: 'div',
  NPerformantEllipsis: 'span',
  NPopconfirm: 'div',
  NPopover: 'div',
  NPopselect: 'div',
  NProgress: 'div',
  NQrCode: 'div',
  NRadio: 'label',
  NRadioButton: 'label',
  NRadioGroup: 'div',
  NRate: 'div',
  NResult: 'div',
  NRow: 'div',
  NScrollbar: 'div',
  NSelect: 'div',
  NSkeleton: 'div',
  NSlider: 'div',
  NSpace: 'div',
  NSpin: 'div',
  NSplit: 'div',
  NStatistic: 'div',
  NStep: 'div',
  NSteps: 'div',
  NSwitch: 'div',
  NTab: 'div',
  NTable: 'table',
  NTabPane: 'div',
  NTabs: 'div',
  NTag: 'div',
  NTbody: 'tbody',
  NTd: 'td',
  NText: 'span',
  NTh: 'th',
  NThead: 'thead',
  NThemeEditor: null,
  NThing: 'div',
  NTime: 'time',
  NTimeline: 'div',
  NTimelineItem: 'div',
  NTimePicker: 'div',
  NTooltip: 'div',
  NTr: 'tr',
  NTransfer: 'div',
  NTree: 'div',
  NTreeSelect: 'div',
  NUl: 'ul',
  NUpload: 'div',
  NUploadDragger: 'div',
  NUploadFileList: 'div',
  NUploadTrigger: 'div',
  NVirtualList: 'div',
  NWatermark: 'div'
}

// Components that always set their own `role`, so it is not typed
const ownRoles: Record<
  {
    [N in Name]: Root<N> extends null
      ? never
      : 'role' extends PropName<N>
        ? never
        : N
  }[Name],
  string
> = {
  NAlert: 'alert',
  NDrawer: 'dialog',
  NIcon: 'img',
  NImage: 'none',
  NInfiniteScroll: 'none',
  NMenu: 'menu',
  NScrollbar: 'none',
  NVirtualList: 'none'
}

// Components that always set their own `aria-modal`, so it is not typed
const ownAriaModal: {
  [
  N in Name as Root<N> extends null
    ? never
    : 'aria-modal' extends PropName<N>
      ? never
      : N
  ]: true
} = {
  NDrawer: true,
  NModal: true
}

type Listener = 'onClick' | 'onFocus' | 'onMouseenter' | 'onScroll'

// Probed listeners that an internal component consumes without native behaviour,
// so they are not typed
const ownListeners: {
  [
  N in Name as Root<N> extends null
    ? never
    : Exclude<Listener, PropName<N>> extends never
      ? never
      : N
  ]: Exclude<Listener, PropName<N>>[]
} = {
  NPopselect: ['onFocus', 'onScroll']
}

// Props needed for the element to render
const props: Partial<Record<Name, Record<string, unknown>>> = {
  NBackTop: { show: true },
  NDrawer: { show: true },
  NDropdown: { show: true, x: 0, y: 0, options: [{ key: 'key' }] },
  NImagePreview: { show: true },
  NModal: { show: true, preset: 'card' },
  NPopconfirm: { show: true, x: 0, y: 0 },
  NPopover: { show: true, x: 0, y: 0 },
  NPopselect: { show: true, x: 0, y: 0 },
  NTabPane: { name: 'name', tab: 'tab' },
  NTooltip: { show: true, x: 0, y: 0 }
}

// Components that only render inside a parent
const parents: Partial<Record<Name, [Name, Record<string, unknown>?]>> = {
  NAnchorLink: ['NAnchor'],
  NBreadcrumbItem: ['NBreadcrumb'],
  NCarouselItem: ['NCarousel'],
  NCol: ['NRow'],
  NCollapseItem: ['NCollapse'],
  NDescriptionsItem: ['NDescriptions'],
  NDrawerContent: ['NDrawer', { show: true }],
  NFormItemCol: ['NRow'],
  NFormItemGi: ['NGrid'],
  NFormItemGridItem: ['NGrid'],
  NGi: ['NGrid'],
  NGridItem: ['NGrid'],
  NListItem: ['NList'],
  NStep: ['NSteps'],
  NTab: ['NTabs', { value: 'name' }],
  NTabPane: ['NTabs', { value: 'name' }],
  NTimelineItem: ['NTimeline'],
  NUploadDragger: ['NUpload'],
  NUploadFileList: [
    'NUpload',
    {
      abstract: true,
      defaultFileList: [{ id: 'id', name: 'name', status: 'finished' }]
    }
  ],
  NUploadTrigger: ['NUpload']
}

function declaresProp(component: Component, prop: string): boolean {
  return (
    'props' in component
    && typeof component.props === 'object'
    && prop in component.props
  )
}

describe('native attrs', () => {
  const names = Object.keys(roots) as Name[]
  const {
    NBreadcrumbItem,
    NButton,
    NCard,
    NCountdown,
    NLi,
    NListItem,
    NTd,
    NUl
  } = components

  enableAutoUnmount(afterEach)

  beforeAll(() => {
    // Node 25+ hides jsdom's localStorage, which NThemeEditor reads
    if (!globalThis.localStorage)
      vi.stubGlobal('localStorage', {})
    // jsdom doesn't implement it, NBackTop calls it on click
    Element.prototype.scrollTo ??= () => {}
    vi.useFakeTimers({ toFake: ['Date'] })
  })

  afterEach(() => {
    document.body.innerHTML = ''
  })

  afterAll(() => {
    vi.unstubAllGlobals()
    vi.useRealTimers()
  })

  it('covers every component', () => {
    const exported = Object.keys(components).filter(name =>
      /^N[A-Z]/.test(name)
    )
    expect([...names].sort()).toEqual(exported.sort())
  })

  it('type checks in tsx', () => {
    void (() => (
      <>
        <NCard id="id" aria-label="label" onClick={(e: MouseEvent) => e} />
        <NButton tag="a" href="/" type="primary" />
        <NTd colspan={2} />
        <NLi value={1} />
        <NListItem value={1} />
        <NBreadcrumbItem value={1} />
        {/* @ts-expect-error own props keep their types */}
        <NButton type="unknown" />
        {/* @ts-expect-error not an attribute of the element */}
        <NCard href="/" />
        {/* @ts-expect-error not an attribute of the element */}
        <NUl value={1} />
        {/* @ts-expect-error doesn't forward attrs */}
        <NCountdown id="id" />
        {/* @ts-expect-error unknown attrs stay errors */}
        <NCard unknown="unknown" />
      </>
    ))
  })

  it.each(names)('%s forwards the native attrs it types', async (name) => {
    const component: Component = components[name]
    const [parentName, parentProps] = parents[name] ?? []
    const parent: Component | undefined = parentName && components[parentName]
    const errorHandler = vi.fn()
    const events: Record<Listener, Event> = {
      onMouseenter: new MouseEvent('mouseenter'),
      onClick: new MouseEvent('click'),
      onFocus: new FocusEvent('focus'),
      onScroll: new Event('scroll')
    }
    const listeners = Object.fromEntries(
      Object.keys(events).map(listener => [listener, vi.fn()])
    )
    const attrs = {
      ...props[name],
      id: 'native',
      role: 'note',
      'aria-label': 'native',
      'aria-modal': 'false',
      ...listeners
    }
    const slots = { default: () => h('span') }
    mount(
      () =>
        parent
          ? h(parent, parentProps, {
              default: () => h(component, attrs, slots)
            })
          : h(component, attrs, slots),
      { attachTo: document.body, global: { config: { errorHandler } } }
    )
    await nextTick()
    expect(errorHandler).not.toHaveBeenCalled()

    // Vue ignores events fired in the millisecond a listener was attached
    vi.advanceTimersByTime(1)
    for (const event of Object.values(events)) {
      // Queried each time, a listener may replace the element
      document.getElementById('native')?.dispatchEvent(event)
      await nextTick()
    }
    // The scroll container may be inside the element
    for (const child of document.querySelectorAll('#native *'))
      child.dispatchEvent(new Event('scroll'))
    await nextTick()
    expect(errorHandler).not.toHaveBeenCalled()
    const element = document.getElementById('native')
    const roles: Partial<Record<Name, string>> = ownRoles
    const untyped: Partial<Record<Name, string[]>> = ownListeners
    const modal: Partial<Record<Name, true>> = ownAriaModal
    const arrived: Record<string, boolean> = {
      'aria-label': element?.getAttribute('aria-label') === 'native',
      'aria-modal':
        element?.getAttribute('aria-modal')
        === (modal[name] ? 'true' : 'false'),
      role: element?.getAttribute('role') === (roles[name] ?? 'note'),
      ...Object.fromEntries(
        Object.entries(listeners).map(([listener, handler]) => [
          listener,
          handler.mock.calls.length > 0
          && handler.mock.calls.every(([event]) => event instanceof Event)
        ])
      )
    }
    for (const listener of untyped[name] ?? [])
      expect(arrived[listener]).toBe(false)
    // A declared prop of the same name is not a native attr
    const lost = Object.entries(arrived)
      .filter(
        ([attr, value]) =>
          !value
          && !declaresProp(component, attr)
          && !untyped[name]?.includes(attr)
      )
      .map(([attr]) => attr)

    if (roots[name] === null) {
      expect(element).toBeNull()
    }
    else {
      expect(lost).toEqual([])
      expect(element?.tagName.toLowerCase()).toBe(roots[name])
    }
  })
})
