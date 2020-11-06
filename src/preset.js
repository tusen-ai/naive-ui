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
import Cascader from './cascader'
import CheckBox from './checkbox'
import Code from './code'
import Collapse from './collapse'
import ConfigConsumer from './config-consumer'
import ConfigProvider from './config-provider'
import Dialog from './dialog'
import DataTable from './data-table'
import DatePicker from './date-picker'
import Descriptions from './descriptions'
import Divider from './divider'
import Drawer from './drawer'
import Dropdown from './dropdown'
import DynamicInput from './dynamic-input'
import DynamicTags from './dynamic-tags'
import Element from './element'
import Empty from './empty'
import Form from './form'
import GradientText from './gradient-text'
import Grid from './grid'
import Icon from './icon'
import Input from './input'
import InputGroup from './input-group'
import InputGroupLabelStyle from './input-group-label'
import InputNumber from './input-number'
import Layout from './layout'
import List from './list'
import LoadingBar from './loading-bar'
import Log from './log'
import Menu from './menu'
import Message from './message'
import Modal from './modal'
import Notification from './notification'
import Pagination from './pagination'
import Popconfirm from './popconfirm'
import Popselect from './popselect'
import Popup from './popover'
import Progress from './progress'
import Radio from './radio'
import Rate from './rate'
import Result from './result'
import Select from './select'
import Scrollbar from './scrollbar'
import Slider from './slider'
import Space from './space'
import Spin from './spin'
import Statistic from './statistic'
import Steps from './steps'
import Switch from './switch'
import Tabs from './tabs'
import Table from './table'
import Tag from './tag'
import Thing from './thing'
import Time from './time'
import TimePicker from './time-picker'
import Timeline from './timeline'
import Tooltip from './tooltip'
import Transfer from './transfer'
import Tree from './tree'
import Typography from './typography'
import Upload from './upload'
import zhCN from './locale/zhCN'
import enUS from './locale/enUS'

import * as styles from './styles'

// deprecated
import NimbusServiceLayout from './_deprecated/nimbus-service-layout/index'
import styleScheme from './_deprecated/style-scheme'

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
    Dialog,
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
    Space,
    Rate,
    // Deprecated
    NimbusServiceLayout
  ],
  styles: Object.keys(styles).map(key => styles[key]),
  // deprecated
  styleSchemes: styleScheme
})
