import Card from './Card'
import Icon from './Icon'
import GradientText from './GradientText'
import Table from './Table'
import DataTable from './DataTable'
import CheckBox from './Checkbox'
import Button from './button'
import ButtonGroup from './button-group'
import Switch from './Switch'
import Select from './Select'
import Cascader from './Cascader'
import DynamicInput from './DynamicInput'
import Modal from './Modal'
import Input from './input'
import Message from './Message'
import Notification from './Notification'
import Pagination from './Pagination'
import Progress from './progress'
import Tooltip from './Tooltip'
import Popup from './Popover'
import Alert from './Alert'
import DatePicker from './DatePicker'
import InputNumber from './input-number'
import Radio from './Radio'
import Form from './Form'
import Tabs from './Tabs'
import TimePicker from './TimePicker'
import Layout from './Layout'
import Scrollbar from './Scrollbar'
import Steps from './Steps'
import ConfirmPlugin from './Confirm'
import Badge from './badge'
import Tag from './tag'
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
import Upload from './Upload'
import InputGroup from './input-group'
import InputGroupLabel from './input-group-label'

import zhCN from './locale/zhCN'
import enUS from './locale/enUS'

import lightScheme from './_styles-in-js/lightStyleScheme.scss'
import darkScheme from './_styles-in-js/darkStyleScheme.scss'

import lightBaseStyle from './styles/base/light' // Done
import darkBaseStyle from './styles/base/dark' // Done
import lightButtonStyle from './button/styles/light' // Done
import darkButtonStyle from './button/styles/dark' // Done
import lightBadgeStyle from './badge/styles/light' // Done
import darkBadgeStyle from './badge/styles/dark' // Done
import lightProgressStyle from './progress/styles/light' // Done
import darkProgressStyle from './progress/styles/dark' // Done
import lightInputStyle from './input/styles/light' // Done
import darkInputStyle from './input/styles/dark' // Done

// import lightBaseSelectionStyle from './styles/_base/selection/light'
// import darkBaseSelectionStyle from './styles/_base/selection/dark'
// import lightBaseSuffixStyle from './styles/_base/suffix/light'
// import darkBaseSuffixStyle from './styles/_base/suffix/dark'

import lightInputGroupLabel from './styles/input-group-label/light'
import darkInputGroupLabel from './styles/input-group-label/dark'
import lightInputNumber from './styles/input-number/light'
import darkInputNumber from './styles/input-number/dark'

// Deprecated Components
import NimbusFormCard from './_deprecated/NimbusFormCard'
import NimbusConfirmCard from './_deprecated/NimbusConfirmCard'
import NimbusServiceLayout from './_deprecated/NimbusServiceLayout'
import NimbusIcon from './_deprecated/NimbusIcon'

import create from './create'

export default create({
  locales: [zhCN, enUS],
  fallbackLocale: enUS,
  fallbackTheme: 'light',
  components: [
    Card,
    Icon,
    Layout,
    GradientText,
    Table,
    DataTable,
    CheckBox,
    Button,
    ButtonGroup,
    Switch,
    Select,
    Modal,
    Input,
    Message,
    Notification,
    Pagination,
    Tooltip,
    Popup,
    Alert,
    DatePicker,
    InputNumber,
    Radio,
    Cascader,
    DynamicInput,
    Form,
    Tabs,
    TimePicker,
    Scrollbar,
    Steps,
    ConfirmPlugin,
    Progress,
    Badge,
    Tag,
    BackTop,
    Divider,
    Collapse,
    Timeline,
    Popconfirm,
    Anchor,
    Dropdown,
    Popselect,
    ConfigProvider,
    Transfer,
    Spin,
    Drawer,
    LoadingBar,
    Time,
    Slider,
    Tree,
    Grid,
    Affix,
    Statistic,
    Breadcrumb,
    ConfigConsumer,
    Descriptions,
    List,
    Menu,
    Avatar,
    Result,
    Thing,
    AutoComplete,
    Empty,
    Element,
    Log,
    Code,
    Typography,
    Upload,
    InputGroup,
    InputGroupLabel,
    // Deprecated
    NimbusServiceLayout,
    NimbusConfirmCard,
    NimbusFormCard,
    NimbusIcon
  ],
  styles: [
    lightButtonStyle,
    darkButtonStyle
  ],
  // API to be refined
  _themes: {
    light: {
      base: lightBaseStyle,
      NButton: lightButtonStyle,
      NBadge: lightBadgeStyle,
      NProgress: lightProgressStyle,
      NBaseSelection: lightBaseSelectionStyle,
      NBaseSuffix: lightBaseSuffixStyle,
      NInput: lightInputStyle,
      NInputGroupLabel: lightInputGroupLabel,
      NInputNumber: lightInputNumber
    },
    dark: {
      base: darkBaseStyle,
      NButton: darkButtonStyle,
      NBadge: darkBadgeStyle,
      NProgress: darkProgressStyle,
      NBaseSelection: darkBaseSelectionStyle,
      NBaseSuffix: darkBaseSuffixStyle,
      NInput: darkInputStyle,
      NInputGroupLabel: darkInputGroupLabel,
      NInputNumber: darkInputNumber
    }
  },
  // deprecated
  styleSchemes: {
    light: lightScheme,
    dark: darkScheme
  }
})
