import Card from './packages/common/Card'
import Icon from './packages/common/Icon'
import GradientText from './packages/common/GradientText'
import Table from './packages/common/Table'
import DataTable from './packages/common/DataTable'
import CheckBox from './packages/common/Checkbox'
import RoundButton from './packages/common/Button'
import Switch from './packages/common/Switch'
import Select from './packages/common/Select'
import Cascader from './packages/common/Cascader'
import CustomInput from './packages/common/CustomInput'
import Modal from './packages/common/Modal'
import Input from './packages/common/Input'
import Message from './packages/common/Message'
import Notification from './packages/common/Notification'
import Pagination from './packages/common/Pagination'
import Progress from './packages/common/Progress'
import Tooltip from './packages/common/Tooltip'
import Popup from './packages/common/Popover'
import Alert from './packages/common/Alert'
import DatePicker from './packages/common/DatePicker'
import InputNumber from './packages/common/InputNumber'
import Radio from './packages/common/Radio'
import Form from './packages/common/Form'
import Tabs from './packages/common/Tabs'
import TimePicker from './packages/common/TimePicker'
import Layout from './packages/common/Layout'
import Scrollbar from './packages/common/Scrollbar'
import Steps from './packages/common/Steps'
import ConfirmPlugin from './packages/common/Confirm'
import Badge from './packages/common/Badge'
import Tag from './packages/common/Tag'
import BackTop from './packages/common/BackTop'
import Divider from './packages/common/Divider'
import Collapse from './packages/common/Collapse'
import Timeline from './packages/common/Timeline'
import Popconfirm from './packages/common/Popconfirm'
import Anchor from './packages/common/Anchor'
import Dropdown from './packages/common/Dropdown'
import Popselect from './packages/common/Popselect'
import ConfigProvider from './packages/common/ConfigProvider'
import Transfer from './packages/common/Transfer'
import Spin from './packages/common/Spin'
import Drawer from './packages/common/Drawer'
import Time from './packages/common/Time'
import LoadingBar from './packages/common/LoadingBar'
import Slider from './packages/common/Slider'
import Tree from './packages/common/Tree'
import Grid from './packages/common/Grid'
import Affix from './packages/common/Affix'
import Statistic from './packages/common/Statistic'
import Breadcrumb from './packages/common/Breadcrumb'
import ConfigConsumer from './packages/common/ConfigConsumer'
import Descriptions from './packages/common/Descriptions'
import List from './packages/common/List'
import Menu from './packages/common/Menu'
import Avatar from './packages/common/Avator'
import Result from './packages/common/Result'
import Thing from './packages/common/Thing'
import AutoComplete from './packages/common/AutoComplete'
import Empty from './packages/common/Empty'
import Element from './packages/common/Element'
import Log from './packages/common/Log'
import Code from './packages/common/Code'
import Typography from './packages/common/Typography'

import zhCN from './packages/locale/zhCN'
import enUS from './packages/locale/enUS'

/**
 * Deprecated Components
 */
import NimbusFormCard from './packages/deprecated/NimbusFormCard'
import NimbusConfirmCard from './packages/deprecated/NimbusConfirmCard'
import NimbusServiceLayout from './packages/deprecated/NimbusServiceLayout'
import NimbusIcon from './packages/deprecated/NimbusIcon'

/**
 * debug usage
 * to be removed
 */
import Loader from './packages/base/Loading'
import CancelMark from './packages/base/CancelMark'
import IconTransition from './packages/transition/IconSwitchTransition'

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
