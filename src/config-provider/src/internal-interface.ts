import { VNodeChild, Ref } from 'vue'
import { CNode } from 'css-render'
import type { AlertTheme } from '../../alert/styles'
import type { AnchorTheme } from '../../anchor/styles'
import type { AutoCompleteTheme } from '../../auto-complete/styles'
import type { AvatarTheme } from '../../avatar/styles'
import type { BackTopTheme } from '../../back-top/styles'
import type { BadgeTheme } from '../../badge/styles'
import type { BreadcrumbTheme } from '../../breadcrumb/styles'
import type { ButtonTheme } from '../../button/styles'
import type { CalendarTheme } from '../../calendar/styles'
import type { CardTheme } from '../../card/styles'
import type { CascaderTheme } from '../../cascader/styles'
import type { CheckboxTheme } from '../../checkbox/styles'
import type { CodeTheme } from '../../code/styles'
import type { CollapseTheme } from '../../collapse/styles'
import type { ColorPickerTheme } from '../../color-picker/styles'
import type { DataTableTheme } from '../../data-table/styles'
import type { DatePickerTheme } from '../../date-picker/styles'
import type { DescriptionsTheme } from '../../descriptions/styles'
import type { DialogTheme } from '../../dialog/styles'
import type { DividerTheme } from '../../divider/styles'
import type { DrawerTheme } from '../../drawer/styles'
import type { DropdownTheme } from '../../dropdown/styles'
import type { DynamicInputTheme } from '../../dynamic-input/styles'
import type { DynamicTagsTheme } from '../../dynamic-tags/styles'
import type { ElementTheme } from '../../element/styles'
import type { EllipsisTheme } from '../../ellipsis/styles'
import type { EmptyTheme } from '../../empty/styles'
import type { FormTheme } from '../../form/styles'
import type { GradientTextTheme } from '../../gradient-text/styles'
import type { IconTheme } from '../../icon/styles'
import type { ImageTheme } from '../../image/styles'
import type { InputTheme } from '../../input/styles'
import type { InputNumberTheme } from '../../input-number/styles'
import type { LayoutTheme } from '../../layout/styles'
import type { ListTheme } from '../../list/styles'
import type { LoadingBarTheme } from '../../loading-bar/styles'
import type { LogTheme } from '../../log/styles'
import type { MenuTheme } from '../../menu/styles'
import type { MentionTheme } from '../../mention/styles'
import type { MessageTheme } from '../../message/styles'
import type { ModalTheme } from '../../modal/styles'
import type { NotificationTheme } from '../../notification/styles'
import type { PageHeaderTheme } from '../../page-header/styles'
import type { PaginationTheme } from '../../pagination/styles'
import type { PopconfirmTheme } from '../../popconfirm/styles'
import type { PopoverTheme } from '../../popover/styles'
import type { PopselectTheme } from '../../popselect/styles'
import type { ProgressTheme } from '../../progress/styles'
import type { RadioTheme } from '../../radio/styles'
import type { RateTheme } from '../../rate/styles'
import type { ResultTheme } from '../../result/styles'
import type { ScrollbarTheme } from '../../scrollbar/styles'
import type { SelectTheme } from '../../select/styles'
import type { SkeletonTheme } from '../../skeleton/styles'
import type { SliderTheme } from '../../slider/styles'
import type { SpaceTheme } from '../../space/styles'
import type { SpinTheme } from '../../spin/styles'
import type { StatisticTheme } from '../../statistic/styles'
import type { StepsTheme } from '../../steps/styles'
import type { SwitchTheme } from '../../switch/styles'
import type { TableTheme } from '../../table/styles'
import type { TabsTheme } from '../../tabs/styles'
import type { TagTheme } from '../../tag/styles'
import type { ThingTheme } from '../../thing/styles'
import type { TimePickerTheme } from '../../time-picker/styles'
import type { TimelineTheme } from '../../timeline/styles'
import type { TooltipTheme } from '../../tooltip/styles'
import type { TransferTheme } from '../../transfer/styles'
import type { TypographyTheme } from '../../typography/styles'
import type { TreeTheme } from '../../tree/styles'
import type { UploadTheme } from '../../upload/styles'
import type { InternalSelectMenuTheme } from '../../_internal/select-menu/styles'
import type { InternalSelectionTheme } from '../../_internal/selection/styles'
import type { NDateLocale, NLocale } from '../../locales'
import type { Hljs } from '../../_mixins'
import { Size as TimePickerSize } from '../../time-picker/src/interface'
import { Size as InputSize } from '../../input/src/interface'
import { Size as SelectSize } from '../../select/src/interface'
import { Size as ButtonSize } from '../../button/src/interface'
import { DataTableRenderFilter, DataTableRenderSorter } from '../../data-table'
import { IconPlacement } from '../../dialog/src/interface'
import type { GlobalTheme, GlobalThemeOverrides } from './interface'

export interface GlobalThemeWithoutCommon {
  Alert?: AlertTheme
  Anchor?: AnchorTheme
  AutoComplete?: AutoCompleteTheme
  Avatar?: AvatarTheme
  BackTop?: BackTopTheme
  Badge?: BadgeTheme
  Breadcrumb?: BreadcrumbTheme
  Button?: ButtonTheme
  Calendar?: CalendarTheme
  Card?: CardTheme
  Cascader?: CascaderTheme
  Checkbox?: CheckboxTheme
  Code?: CodeTheme
  Collapse?: CollapseTheme
  ColorPicker?: ColorPickerTheme
  DataTable?: DataTableTheme
  DatePicker?: DatePickerTheme
  Descriptions?: DescriptionsTheme
  Dialog?: DialogTheme
  Divider?: DividerTheme
  Drawer?: DrawerTheme
  Dropdown?: DropdownTheme
  DynamicInput?: DynamicInputTheme
  DynamicTags?: DynamicTagsTheme
  Element?: ElementTheme
  Ellipsis?: EllipsisTheme
  Empty?: EmptyTheme
  Form?: FormTheme
  GradientText?: GradientTextTheme
  Icon?: IconTheme
  Image?: ImageTheme
  Input?: InputTheme
  InputNumber?: InputNumberTheme
  Layout?: LayoutTheme
  List?: ListTheme
  LoadingBar?: LoadingBarTheme
  Log?: LogTheme
  Menu?: MenuTheme
  Mention?: MentionTheme
  Message?: MessageTheme
  Modal?: ModalTheme
  Notification?: NotificationTheme
  PageHeader?: PageHeaderTheme
  Pagination?: PaginationTheme
  Popconfirm?: PopconfirmTheme
  Popover?: PopoverTheme
  Popselect?: PopselectTheme
  Progress?: ProgressTheme
  Radio?: RadioTheme
  Rate?: RateTheme
  Result?: ResultTheme
  Scrollbar?: ScrollbarTheme
  Select?: SelectTheme
  Skeleton?: SkeletonTheme
  Slider?: SliderTheme
  Space?: SpaceTheme
  Spin?: SpinTheme
  Statistic?: StatisticTheme
  Steps?: StepsTheme
  Switch?: SwitchTheme
  Table?: TableTheme
  Tabs?: TabsTheme
  Tag?: TagTheme
  Thing?: ThingTheme
  TimePicker?: TimePickerTheme
  Timeline?: TimelineTheme
  Tooltip?: TooltipTheme
  Transfer?: TransferTheme
  Typography?: TypographyTheme
  Tree?: TreeTheme
  Upload?: UploadTheme
  // internal
  InternalSelectMenu?: InternalSelectMenuTheme
  InternalSelection?: InternalSelectionTheme
}

export interface GlobalComponentConfig {
  Pagination?: {
    inputSize?: InputSize
    selectSize?: SelectSize
  }
  DatePicker?: {
    timePickerSize?: TimePickerSize
  }
  Dialog?: {
    iconPlacement?: IconPlacement
  }
  DataTable?: {
    renderFilter?: DataTableRenderFilter
    renderSorter?: DataTableRenderSorter
  }
  DynamicInput?: {
    buttonSize?: ButtonSize
  }
}

export interface GlobalIconConfig {
  attach?: () => VNodeChild
  cancel?: () => VNodeChild
  clear?: () => VNodeChild
  close?: () => VNodeChild
  date?: () => VNodeChild
  download?: () => VNodeChild
  error?: () => VNodeChild
  info?: () => VNodeChild
  retry?: () => VNodeChild
  success?: () => VNodeChild
  time?: () => VNodeChild
  to?: () => VNodeChild
  trash?: () => VNodeChild
  warning?: () => VNodeChild
  rotateClockwise?: () => VNodeChild
  rotateCounterclockwise?: () => VNodeChild
  zoomIn?: () => VNodeChild
  zoomOut?: () => VNodeChild
}

export interface RtlItem {
  name: keyof GlobalThemeWithoutCommon
  style: CNode
}
export type RtlProp = RtlItem[]

export type RtlEnabledState = Partial<
Record<keyof GlobalThemeWithoutCommon, RtlItem>
>

export interface ConfigProviderInjection {
  mergedClsPrefixRef: Ref<string | undefined>
  mergedBorderedRef: Ref<boolean | undefined>
  mergedNamespaceRef: Ref<string | undefined>
  mergedLocaleRef: Ref<NLocale | undefined>
  mergedDateLocaleRef: Ref<NDateLocale | undefined>
  mergedHljsRef: Ref<Hljs | undefined>
  mergedComponentPropsRef: Ref<GlobalComponentConfig | undefined>
  mergedIconsRef: Ref<GlobalIconConfig | undefined>
  mergedThemeRef: Ref<GlobalTheme | undefined>
  mergedThemeOverridesRef: Ref<GlobalThemeOverrides | undefined>
  mergedRtlRef: Ref<RtlEnabledState | undefined>
  // deprecated
  /** @deprecated */
  mergedLegacyThemeRef: Ref<string | undefined>
  /** @deprecated */
  mergedLanguageRef: Ref<string | undefined>
  /** @deprecated */
  mergedThemeEnvironmentsRef: Ref<any | undefined>
}
