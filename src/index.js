import Affix from './affix'
import Alert from './alert'
import Anchor from './anchor'
import AutoComplete from './auto-complete'
import Avatar from './avatar'
import BackTop from './back-top'
import Badge from './badge'
import Breadcrumb from './breadcrumb'
import Button from './button'
import ButtonGroup from './button-group'
import Card from './card'
import Cascader from './Cascader'
import CheckBox from './Checkbox'
import Code from './code'
import Collapse from './collapse'
import ConfigConsumer from './config-consumer'
import ConfigProvider from './config-provider'
import ConfirmPlugin from './confirm'
import DataTable from './data-table'
import DatePicker from './date-picker'
import Descriptions from './Descriptions'
import Divider from './divider'
import Drawer from './drawer'
import Dropdown from './dropdown'
import DynamicInput from './dynamic-input'
import DynamicTags from './dynamic-tags'
import Element from './element'
import Empty from './empty'
import Form from './Form'
import GradientText from './gradient-text'
import Grid from './Grid'
import Icon from './icon'
import Input from './input'
import InputGroup from './input-group'
import InputGroupLabelStyle from './input-group-label'
import InputNumber from './input-number'
import Layout from './Layout'
import List from './list'
import LoadingBar from './loading-bar'
import Log from './log'
import Menu from './menu'
import Message from './Message'
import Modal from './modal'
import Notification from './Notification'
import Pagination from './Pagination'
import Popconfirm from './popconfirm'
import Popselect from './popselect'
import Popup from './Popover'
import Progress from './progress'
import Radio from './Radio'
import Result from './result'
import Scrollbar from './Scrollbar'
import Select from './Select'
import Slider from './Slider'
import Spin from './Spin'
import Statistic from './Statistic'
import Steps from './steps'
import Switch from './Switch'
import Table from './Table'
import Tabs from './Tabs'
import Tag from './tag'
import Thing from './Thing'
import Time from './Time'
import TimePicker from './TimePicker'
import Timeline from './Timeline'
import Tooltip from './Tooltip'
import Transfer from './transfer'
import Tree from './Tree'
import Typography from './typography'
import Upload from './Upload'
import zhCN from './locale/zhCN'
import enUS from './locale/enUS'

import baseDarkStyle from './styles/base/dark'
import baseLightStyle from './styles/base/light'

import affixDarkStyle from './affix/styles/dark'
import affixLightStyle from './affix/styles/light'
import alertDarkStyle from './alert/styles/dark'
import alertLightStyle from './alert/styles/light'
import anchorDarkStyle from './anchor/styles/dark'
import anchorLightStyle from './anchor/styles/light'
import autoComplateDarkStyle from './auto-complete/styles/dark'
import autoComplateLightStyle from './auto-complete/styles/light'
import avatarDarkStyle from './avatar/styles/dark'
import avatarLightStyle from './avatar/styles/light'
import backTopDarkStyle from './back-top/styles/dark'
import backTopLightStyle from './back-top/styles/light'
import badgeDarkStyle from './badge/styles/dark'
import badgeLightStyle from './badge/styles/light'
import breadcrumbDarkStyle from './breadcrumb/styles/dark'
import breadcrumbLightStyle from './breadcrumb/styles/light'
import buttonDarkStyle from './button/styles/dark'
import buttonLightStyle from './button/styles/light'
import cardDarkStyle from './card/styles/dark'
import cardLightStyle from './card/styles/light'
import codeDarkStyle from './code/styles/dark'
import codeLightStyle from './code/styles/light'
import collapseDarkStyle from './collapse/styles/dark'
import collapseLightStyle from './collapse/styles/light'
import confirmDarkStyle from './confirm/styles/dark'
import confirmLightStyle from './confirm/styles/light'
import dataTableDarkStyle from './data-table/styles/dark'
import dataTableLightStyle from './data-table/styles/light'
import datePickerDarkStyle from './date-picker/styles/dark'
import datePickerLightStyle from './date-picker/styles/light'
import dividerDarkStyle from './divider/styles/dark'
import dividerLightStyle from './divider/styles/light'
import drawerDarkStyle from './drawer/styles/dark'
import drawerLightStyle from './drawer/styles/light'
import dropdownDarkStyle from './dropdown/styles/dark'
import dropdownLightStyle from './dropdown/styles/light'
import dynamicInputDarkStyle from './dynamic-input/styles/dark'
import dynamicInputLightStyle from './dynamic-input/styles/light'
import dynamicTagsDarkStyle from './dynamic-tags/styles/dark'
import dynamicTagsLightStyle from './dynamic-tags/styles/light'
import emptyDarkStyle from './empty/styles/dark'
import emptyLightStyle from './empty/styles/light'
import gradientTextDarkStyle from './gradient-text/styles/dark'
import gradientTextLightStyle from './gradient-text/styles/light'
import inputDarkStyle from './input/styles/dark'
import inputGroupLabelDarkStyle from './input-group-label/styles/dark'
import inputGroupLabelLightStyle from './input-group-label/styles/light'
import inputLightStyle from './input/styles/light'
import inputNumberDarkStyle from './input-number/styles/dark'
import inputNumberLightStyle from './input-number/styles/light'
import progressDarkStyle from './progress/styles/dark'
import progressLightStyle from './progress/styles/light'
import tagDarkStyle from './tag/styles/dark'
import tagLightStyle from './tag/styles/light'
import transferDarkStyle from './transfer/styles/dark'
import transferLightStyle from './transfer/styles/light'
import typographyDarkStyle from './typography/styles/light'
import typographyLightStyle from './typography/styles/dark'
import listDarkStyle from './list/styles/dark'
import listLightStyle from './list/styles/light'
import logDarkStyle from './log/styles/dark'
import logLightStyle from './log/styles/light'
import iconDarkStyle from './icon/styles/dark'
import iconLightStyle from './icon/styles/light'
import loadingBarLightStyle from './loading-bar/styles/light'
import loadingBarDarkStyle from './loading-bar/styles/dark'
import menuDarkStyle from './menu/styles/dark'
import menuLightStyle from './menu/styles/light'
import modalDarkStyle from './modal/styles/dark'
import modalLightStyle from './modal/styles/light'
import popConfirmDarkStyle from './popconfirm/styles/dark'
import popConfirmLightStyle from './popconfirm/styles/light'
import popSelectLightStyle from './popselect/styles/light'
import popSelectDarkStyle from './popselect/styles/dark'
import resultDarkStyle from './result/styles/dark'
import resultLightStyle from './result/styles/light'
import stepsDarkStyle from './steps/styles/dark'
import stepsLightStyle from './steps/styles/light'

// Can be remove after refactoring
import baseSelectionLightStyle from './_base/selection/styles/light'
import baseSelectionDarkStyle from './_base/selection/styles/dark'

// Deprecated Components
import NimbusFormCard from './_deprecated/NimbusFormCard'
import NimbusConfirmCard from './_deprecated/NimbusConfirmCard'
import NimbusServiceLayout from './_deprecated/NimbusServiceLayout'
import NimbusIcon from './_deprecated/NimbusIcon'

// deprecated
import lightScheme from './_styles-in-js/lightStyleScheme.scss'
import darkScheme from './_styles-in-js/darkStyleScheme.scss'

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
    emptyLightStyle,
    emptyDarkStyle,
    dropdownLightStyle,
    dropdownDarkStyle,
    collapseLightStyle,
    collapseDarkStyle,
    dividerLightStyle,
    dividerDarkStyle,
    dynamicInputLightStyle,
    dynamicInputDarkStyle,
    confirmLightStyle,
    confirmDarkStyle,
    gradientTextLightStyle,
    gradientTextDarkStyle,
    listDarkStyle,
    listLightStyle,
    logDarkStyle,
    logLightStyle,
    iconDarkStyle,
    iconLightStyle,
    loadingBarDarkStyle,
    loadingBarLightStyle,
    modalDarkStyle,
    modalLightStyle,
    popConfirmDarkStyle,
    popConfirmLightStyle,
    popSelectLightStyle,
    popSelectDarkStyle,
    resultDarkStyle,
    resultLightStyle,
    menuDarkStyle,
    menuLightStyle,
    datePickerDarkStyle,
    datePickerLightStyle,
    stepsDarkStyle,
    stepsLightStyle,
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
