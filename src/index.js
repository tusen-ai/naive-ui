import Card from './Card'
import Icon from './Icon'
import GradientText from './GradientText'
import Table from './Table'
import DataTable from './DataTable'
import CheckBox from './Checkbox'
import RoundButton from './Button'
import Switch from './Switch'
import Select from './Select'
import Cascader from './Cascader'
import CustomInput from './CustomInput'
import Modal from './Modal'
import Input from './Input'
import Message from './Message'
import Notification from './Notification'
import Pagination from './Pagination'
import Progress from './Progress'
import Tooltip from './Tooltip'
import Popup from './Popover'
import Alert from './Alert'
import DatePicker from './DatePicker'
import InputNumber from './InputNumber'
import Radio from './Radio'
import Form from './Form'
import Tabs from './Tabs'
import TimePicker from './TimePicker'
import Layout from './Layout'
import Scrollbar from './Scrollbar'
import Steps from './Steps'
import ConfirmPlugin from './Confirm'
import Badge from './Badge'
import Tag from './Tag'
import BackTop from './BackTop'
import Divider from './Divider'
import Collapse from './Collapse'
import Timeline from './Timeline'
import Popconfirm from './Popconfirm'
import Anchor from './Anchor'
import Dropdown from './Dropdown'
import Popselect from './Popselect'
import ConfigProvider from './ConfigProvider'
import Transfer from './Transfer'
import Spin from './Spin'
import Drawer from './Drawer'
import Time from './Time'
import LoadingBar from './LoadingBar'
import Slider from './Slider'
import Tree from './Tree'
import Grid from './Grid'
import Affix from './Affix'
import Statistic from './Statistic'
import Breadcrumb from './Breadcrumb'
import ConfigConsumer from './ConfigConsumer'
import Descriptions from './Descriptions'
import List from './List'
import Menu from './Menu'
import Avatar from './Avatar'
import Result from './Result'
import Thing from './Thing'
import AutoComplete from './AutoComplete'
import Empty from './Empty'
import Element from './Element'
import Log from './Log'
import Code from './Code'
import Typography from './Typography'

import zhCN from './_locale/zhCN'
import enUS from './_locale/enUS'

/**
 * Deprecated Components
 */
import NimbusFormCard from './_deprecated/NimbusFormCard'
import NimbusConfirmCard from './_deprecated/NimbusConfirmCard'
import NimbusServiceLayout from './_deprecated/NimbusServiceLayout'
import NimbusIcon from './_deprecated/NimbusIcon'

/**
 * debug usage
 * to be removed
 */
import Loader from './_base/Loading'
import CancelMark from './_base/CancelMark'
import IconTransition from './_transition/IconSwitchTransition'

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const NaiveUI = {
  install,
  setHljs,
  setHighlightjs: setHljs,
  locales: {
    'zh-CN': zhCN,
    'en-US': enUS
  },
  fallbackLocale: enUS,
  addLocale
}

function addLocale () {

}

function setHljs (hljs) {
  NaiveUI.hljs = hljs
}

function install (Vue) {
  Vue.prototype.$naive = NaiveUI
  Card.install(Vue)
  Icon.install(Vue)
  Loader.install(Vue)
  Layout.install(Vue)
  GradientText.install(Vue)
  Table.install(Vue)
  DataTable.install(Vue)
  CheckBox.install(Vue)
  RoundButton.install(Vue)
  Switch.install(Vue)
  Select.install(Vue)
  Modal.install(Vue)
  Input.install(Vue)
  Message.install(Vue)
  Notification.install(Vue)
  Pagination.install(Vue)
  Tooltip.install(Vue)
  Popup.install(Vue)
  Alert.install(Vue)
  DatePicker.install(Vue)
  InputNumber.install(Vue)
  Radio.install(Vue)
  Cascader.install(Vue)
  CustomInput.install(Vue)
  Form.install(Vue)
  Tabs.install(Vue)
  TimePicker.install(Vue)
  Scrollbar.install(Vue)
  Steps.install(Vue)
  ConfirmPlugin.install(Vue)
  Progress.install(Vue)
  Badge.install(Vue)
  Tag.install(Vue)
  BackTop.install(Vue)
  Divider.install(Vue)
  Collapse.install(Vue)
  Timeline.install(Vue)
  Popconfirm.install(Vue)
  Anchor.install(Vue)
  Dropdown.install(Vue)
  Popselect.install(Vue)
  ConfigProvider.install(Vue)
  CancelMark.install(Vue)
  Transfer.install(Vue)
  Spin.install(Vue)
  Drawer.install(Vue)
  LoadingBar.install(Vue)
  Time.install(Vue)
  Slider.install(Vue)
  Tree.install(Vue)
  Grid.install(Vue)
  Affix.install(Vue)
  Statistic.install(Vue)
  Breadcrumb.install(Vue)
  ConfigConsumer.install(Vue)
  Descriptions.install(Vue)
  List.install(Vue)
  Menu.install(Vue)
  Avatar.install(Vue)
  Result.install(Vue)
  Thing.install(Vue)
  AutoComplete.install(Vue)
  Empty.install(Vue)
  Element.install(Vue)
  IconTransition.install(Vue)
  Log.install(Vue)
  Code.install(Vue)
  Typography.install(Vue)
  /**
   * Deprecated
   */
  NimbusServiceLayout.install(Vue)
  NimbusConfirmCard.install(Vue)
  NimbusFormCard.install(Vue)
  NimbusIcon.install(Vue)
}

export default NaiveUI
