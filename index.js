import Card from 'packages/common/Card'
import Icon from 'packages/common/Icon'
import Loader from 'packages/common/Loader'
import GradientHeader from 'packages/common/GradientHeader'
import ColumnGroup from 'packages/common/ColumnGroup'
import WithPadding from 'packages/common/WithPadding'
import WithMargin from 'packages/common/WithMargin'
import MasonryGroup from 'packages/common/MasonryGroup'
import Table from 'packages/common/Table'

import ServiceCard from 'packages/nimbus/ServiceCard'
import HomeLayout from 'packages/nimbus/HomeLayout'
import Navbar from 'packages/nimbus/Navbar'
import ServiceLayout from 'packages/nimbus/ServiceLayout'

function installUiToVue (Vue) {
  Card.install(Vue)
  Icon.install(Vue)
  ServiceLayout.install(Vue)
  Navbar.install(Vue)
  Loader.install(Vue)
  HomeLayout.install(Vue)
  GradientHeader.install(Vue)
  ColumnGroup.install(Vue)
  WithPadding.install(Vue)
  ServiceCard.install(Vue)
  MasonryGroup.install(Vue)
  Table.install(Vue)
  WithMargin.install(Vue)
}

export default installUiToVue
