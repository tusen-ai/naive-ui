import Card from './Card'
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
import DynamicInput from './DynamicInput'
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
import InputNumberStyle from './input-number'
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
import Breadcrumb from './Breadcrumb'
import ConfigConsumer from './config-consumer'
import Descriptions from './Descriptions'
import List from './List'
import Menu from './Menu'
import Avatar from './avatar'
import Result from './Result'
import Thing from './Thing'
import AutoComplete from './AutoComplete'
import Empty from './Empty'
import Element from './element'
import Log from './Log'
import Code from './Code'
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
    InputNumberStyle,
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
    drawerDarkStyle,
    drawerLightStyle,
    dataTableLightStyle,
    dataTableDarkStyle,
    transferLightStyle,
    transferDarkStyle,
    typographyLightStyle,
    typographyDarkStyle,
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
