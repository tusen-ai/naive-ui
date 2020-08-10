import Card from './card'
import Icon from './Icon'
import GradientText from './GradientText'
import Table from './Table'
import DataTable from './data-table'
import CheckBox from './Checkbox'
import Button from './button'
import ButtonGroup from './button-group'
import Switch from './Switch'
import Select from './Select'
import Cascader from './Cascader'
import DynamicInput from './dynamicInput'
import Modal from './Modal'
import Input from './input'
import Message from './Message'
import Notification from './Notification'
import Pagination from './Pagination'
import Progress from './progress'
import Tooltip from './Tooltip'
import Popup from './Popover'
import Alert from './alert'
import DatePicker from './DatePicker'
import InputNumber from './input-number'
import Radio from './Radio'
import Form from './Form'
import Tabs from './Tabs'
import TimePicker from './TimePicker'
import Layout from './Layout'
import Scrollbar from './Scrollbar'
import Steps from './Steps'
import ConfirmPlugin from './confirm'
import Badge from './badge'
import Tag from './tag'
import BackTop from './back-top'
import Divider from './divider'
import Collapse from './collapse'
import Timeline from './Timeline'
import Popconfirm from './Popconfirm'
import Anchor from './anchor'
import Dropdown from './Dropdown'
import Popselect from './Popselect'
import ConfigProvider from './config-provider'
import Transfer from './transfer'
import Spin from './Spin'
import Drawer from './drawer'
import Time from './Time'
import LoadingBar from './LoadingBar'
import Slider from './Slider'
import Tree from './Tree'
import Grid from './Grid'
import Affix from './affix'
import Statistic from './Statistic'
import Breadcrumb from './breadcrumb'
import ConfigConsumer from './config-consumer'
import Descriptions from './Descriptions'
import List from './List'
import Menu from './Menu'
import Avatar from './avatar'
import Result from './Result'
import Thing from './Thing'
import AutoComplete from './auto-complete'
import Empty from './Empty'
import Element from './element'
import Log from './Log'
import Code from './code'
import Typography from './typography'
import Upload from './Upload'
import InputGroup from './input-group'
import InputGroupLabelStyle from './input-group-label'
import DynamicTags from './dynamic-tags'

import zhCN from './locale/zhCN'
import enUS from './locale/enUS'

import lightScheme from './_styles-in-js/lightStyleScheme.scss'
import darkScheme from './_styles-in-js/darkStyleScheme.scss'

import baseLightStyle from './styles/base/light'
import baseDarkStyle from './styles/base/dark'
import buttonLightStyle from './button/styles/light'
import buttonDarkStyle from './button/styles/dark'
import badgeLightStyle from './badge/styles/light'
import badgeDarkStyle from './badge/styles/dark'
import progressLightStyle from './progress/styles/light'
import progressDarkStyle from './progress/styles/dark'
import inputLightStyle from './input/styles/light'
import inputDarkStyle from './input/styles/dark'
import inputGroupLabelLightStyle from './input-group-label/styles/light'
import inputGroupLabelDarkStyle from './input-group-label/styles/dark'
import inputNumberLightStyle from './input-number/styles/light'
import inputNumberDarkStyle from './input-number/styles/dark'
import tagLightStyle from './tag/styles/light'
import tagDarkStyle from './tag/styles/dark'
import dynamicTagsLightStyle from './dynamic-tags/styles/light'
import dynamicTagsDarkStyle from './dynamic-tags/styles/dark'
import alertLightStyle from './alert/styles/light'
import alertDarkStyle from './alert/styles/dark'
import avatarLightStyle from './avatar/styles/light'
import avatarDarkStyle from './avatar/styles/dark'
import affixLightStyle from './affix/styles/light'
import affixDarkStyle from './affix/styles/dark'
import drawerLightStyle from './drawer/styles/light'
import drawerDarkStyle from './drawer/styles/dark'
import dataTableLightStyle from './data-table/styles/light'
import dataTableDarkStyle from './data-table/styles/dark'
import transferLightStyle from './transfer/styles/light'
import transferDarkStyle from './transfer/styles/dark'
import typographyDarkStyle from './typography/styles/light'
import typographyLightStyle from './typography/styles/dark'
import backTopLightStyle from './back-top/styles/light'
import backTopDarkStyle from './back-top/styles/dark'
import autoComplateLightStyle from './auto-complete/styles/light'
import autoComplateDarkStyle from './auto-complete/styles/dark'
import codeLightStyle from './code/styles/light'
import codeDarkStyle from './code/styles/dark'
import cardLightStyle from './card/styles/light'
import cardDarkStyle from './card/styles/dark'
import anchorLightStyle from './anchor/styles/light'
import anchorDarkStyle from './anchor/styles/dark'
import breadcrumbLightStyle from './breadcrumb/styles/light'
import breadcrumbDarkStyle from './breadcrumb/styles/dark'
import collapseLightStyle from './collapse/styles/light'
import collapseDarkStyle from './collapse/styles/dark'
import dividerLightStyle from './divider/styles/light'
import dividerDarkStyle from './divider/styles/dark'
import dynamicInputLightStyle from './dynamicInput/styles/light'
import dynamicInputDarkStyle from './dynamicInput/styles/dark'
import confirmLightStyle from './confirm/styles/light'
import confirmDarkStyle from './confirm/styles/dark'

// Can be remove after refactoring
import baseSelectionLightStyle from './_base/selection/styles/light'
import baseSelectionDarkStyle from './_base/selection/styles/dark'

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
    InputGroupLabelStyle,
    DynamicTags,
    // Deprecated
    NimbusServiceLayout,
    NimbusConfirmCard,
    NimbusFormCard,
    NimbusIcon
  ],
  styles: [
    // base style, essential
    baseLightStyle,
    baseDarkStyle,
    // components style
    buttonLightStyle,
    buttonDarkStyle,
    badgeLightStyle,
    badgeDarkStyle,
    progressLightStyle,
    progressDarkStyle,
    inputLightStyle,
    inputDarkStyle,
    inputGroupLabelLightStyle,
    inputGroupLabelDarkStyle,
    inputNumberLightStyle,
    inputNumberDarkStyle,
    tagLightStyle,
    tagDarkStyle,
    dynamicTagsLightStyle,
    dynamicTagsDarkStyle,
    alertLightStyle,
    alertDarkStyle,
    avatarLightStyle,
    avatarDarkStyle,
    affixLightStyle,
    affixDarkStyle,
    drawerLightStyle,
    drawerDarkStyle,
    dataTableLightStyle,
    dataTableDarkStyle,
    transferLightStyle,
    transferDarkStyle,
    typographyLightStyle,
    typographyDarkStyle,
    autoComplateLightStyle,
    autoComplateDarkStyle,
    backTopLightStyle,
    backTopDarkStyle,
    codeLightStyle,
    codeDarkStyle,
    cardLightStyle,
    cardDarkStyle,
    anchorLightStyle,
    anchorDarkStyle,
    breadcrumbLightStyle,
    breadcrumbDarkStyle,
    collapseLightStyle,
    collapseDarkStyle,
    dividerLightStyle,
    dividerDarkStyle,
    dynamicInputLightStyle,
    dynamicInputDarkStyle,
    confirmLightStyle,
    confirmDarkStyle,
    // Can be remove after refactoring
    baseSelectionLightStyle,
    baseSelectionDarkStyle
  ],
  // deprecated
  styleSchemes: {
    light: lightScheme,
    dark: darkScheme
  }
})
