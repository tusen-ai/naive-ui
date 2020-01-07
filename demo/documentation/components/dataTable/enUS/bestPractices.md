# Best Practices

> filter,sorter,pagination should use `custom`,query map to router url

```html
<n-button @click='sortName'>sort name</n-button>
<n-button @click='clearFilters'>clear filters</n-button>
<n-button @click='clearFiltersAndSorters'>clear filters and sorters</n-button>

<n-data-table
  ref='table'
  :columns='columns'
  :data='data'
  :loading='loading'
  :pagination='pagination'
  :max-height='300'
  :scroll-x='1500'
  @page-change="handlePageChange"
  @sorter-change="handleSorterChange"
  @filters-change="handleFiltersChange"
/>
```

```js
const toolTip = (h, activator, content) => {
  const scopedSlots = {
    activator: () => activator
  }
  return (
    <n-tooltip delay={100} maxWidth={200} arrow scopedSlots={scopedSlots}>
      {content}
    </n-tooltip>
  )
}

const createColumns = instance => {
  return [
    {
      title: 'User',
      key: 'name',
      width: 180,
      fixed: 'left',
      sortable: true,
      sorter: 'custom',
      render (h, params) {
        return (
          <div class='user-base-info'>
            <img src={params.picture.thumbnail} class='avatar' />
            <div
              title={params.name.first + ' ' + params.name.last}
              style='max-width:100px'
              class='text-overflow'
            >
              {params.name.first} {params.name.last}
            </div>
          </div>
        )
      }
    },
    {
      title: 'Age',
      key: 'age',
      width: 80,
      fixed: 'left',
      align: 'center',
      render (h, params) {
        return <span>{params.dob.age}</span>
      }
    },
    {
      title: 'Gender',
      key: 'gender',
      width: 100,
      filterable: true,
      filterOptions: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' }
      ]
    },
    {
      title: 'Phone',
      key: 'phone'
    },
    {
      title: 'RegisterTime',
      key: 'registerTime',
      render (h, params) {
        return <n-time time={new Date(params.registered.date)} />
      }
    },
    {
      title: 'Address',
      key: 'address',
      width: 170,
      render (h, params) {
        const loc = params.location
        const address = `${loc.country} ${loc.state} ${loc.city} ${loc.street
          .name +
          ' ' +
          loc.street.number}`
        return toolTip(
          h,
          <div style='max-width:130px' class='text-overflow'>
            {address}
          </div>,
          address
        )
      }
    },
    {
      title: 'Email',
      key: 'email',
      render (h, params) {
        return (
          <a class='mail-link' href={'mailto:' + params.email}>
            {' '}
            {params.email}{' '}
          </a>
        )
      }
    },
    {
      title: 'Action',
      key: 'action',
      width: 150,
      fixed: 'right',
      render (h, params) {
        return [
          <a
            onClick={() => instance.invite(params)}
            style='color:pinkcursor:pointermargin-right:10px'
          >
            Goto
          </a>
        ]
      }
    }
  ]
}

export default {
  data () {
    return {
      data: [],
      columns: createColumns(this),
      loading: false,
      pageCount: 0
    }
  },
  watch: {
    '$route.query': {
      handler(query) {
        this.$nextTick(() => {
          this.setTableByURLQuery()
        })
      },
      immediate: true
    }
  },
  computed: {
    pagination () {
      return {
        pageCount: this.pageCount,
        showQuickJumper: true
      }
    }
  },
  methods: {
    handlePageChange (page) {
      this.setRouteQuery({
        page
      })
    },
    handleFiltersChange (filters) {
      this.setRouteQuery({
        filters: JSON.stringify(filters)
      })
    },
    handleSorterChange (sorter) {
      this.setRouteQuery({
        sorter: JSON.stringify(sorter)
      })
    },
    setTableByURLQuery () {
      const query = this.$route.query
      const page = query.page ? +query.page : 1
      const sorter = query.sorter ? JSON.parse(query.sorter) : null
      const filters = query.filters ? JSON.parse(query.filters) : []
      this.fetchData(page, sorter, filters)
      this.$refs.table.page(page)
      this.$refs.table.filters(filters)
      sorter && this.$refs.table.sort(sorter.columnKey, sorter.order)
    },
    getRandomUsers (params = {}) {
      this.loading = true
      if (!params.results) {
        params.results = 6
      }
      if (!params.page) {
        params.page = 1
      } else if (params.page === 10) {
        params.results = 2
      }
      let URL = 'https://randomuser.me/api'
      const querys = []
      Object.keys(params).forEach(key => {
        querys.push(`${key}=${JSON.stringify(params[key])}`)
      })
      if (querys.length) {
        URL = URL + '?' + querys.join('&')
      }
      return fetch(URL)
        .then(res => res.json())
        .finally(() => {
          this.loading = false
        })
    },
    fetchData (page, sorter, filter) {
      const params = {
        page
      }
      sorter && Object.assign(params, sorter)
      filter && Object.assign(params, filter)
      this.pageCount = 92
      this.getRandomUsers(params).then(data => {
        this.data = data.results
      })
    },
    invite (personData) {
      const coordinates = personData.location.coordinates
      window.open(`http://maps.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`)
    },
    setRouteQuery (query) {
      const prevQuery = this.$route.query || {}
      this.$router.push({
        ...this.$route,
        query: {
          ...prevQuery,
          ...query
        }
      }).catch(err => {})
    },
    sortName() {
      this.$refs.table.sort('name', 'ascend')
    },
    clearFilters() {
      this.$refs.table.clearFilters()
    },
    clearFiltersAndSorters() {
      this.$refs.table.clearFilters()
      this.$refs.table.clearSorter()
    }
  }
}
```

```css
.n-button {
  margin: 0 8px 12px 0;
}

/deep/ .user-base-info {
  display: flex;
  align-items: center;
}
/deep/ .avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}
/deep/ .mail-link {
  color: blue;
}
/deep/ .text-overflow {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```
