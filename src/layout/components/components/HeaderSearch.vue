<template>
  <!-- <div :class="{'show':show}" class="header-search" > -->
  <div>
    <el-popover v-model="visible" placement="left" width="564" trigger="hover">
      <div v-for="(item, index) in belldiv" :key="index">
        <p>
          <span style="color: #606266; font-weight: 700">{{ item.event }} </span><span
            style="color: #1890ff; font-weight: 800"
          >已经{{ item.date }}天没有处理该事件</span>
        </p>
      </div>
      <div slot="reference">
        <el-badge
          :value="bellcount"
          :max="99"
          class="item"
          style="margin-top: 10px; margin-right: 20px"
        >
          <svg t="1605773876948" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2960" width="28" height="28"><path d="M507.6 960c-75.8 0-147.3-33.3-196.1-91.4-11.4-13.5-9.6-33.7 3.9-45.1 13.5-11.4 33.7-9.6 45.1 3.9C397.1 871 450.7 896 507.6 896c56.9 0 110.5-25 147.1-68.6 11.4-13.5 31.6-15.3 45.1-3.9s15.3 31.6 3.9 45.1C654.9 926.7 583.4 960 507.6 960zM825.2 778.9H198.8c-45.3 0-83.7-27.6-97.7-70.4-13.8-42.3 0.6-86.8 36.7-113.2l44.1-32.2c9.7-7.1 15.5-18.4 15.5-30.2V375.1c0-83.2 32.8-161.3 92.3-220.1C349.1 96.3 428 64 512 64s162.9 32.3 222.3 91c59.5 58.8 92.3 136.9 92.3 220.1v157.7c0 11.8 5.8 23.1 15.5 30.2l44.1 32.2c36.1 26.4 50.5 70.9 36.7 113.2-14 42.9-52.3 70.5-97.7 70.5zM512 128c-138.2 0-250.6 110.8-250.6 247.1v157.7c0 32.2-15.6 62.8-41.7 81.9l-44.1 32.2c-20.4 15-15.6 35.7-13.7 41.7 4.2 12.7 16 26.3 36.8 26.3h626.4c20.8 0 32.7-13.6 36.8-26.3 2-6 6.8-26.8-13.7-41.7l-44.1-32.2c-26.1-19.1-41.7-49.7-41.7-81.9V375.1C762.6 238.8 650.2 128 512 128z" fill="#3688FF" p-id="2961" /></svg>
        </el-badge>
      </div>
      <div style="text-align: right; margin: 0">
        <el-button
          type="primary"
          size="mini"
          @click="eventbut"
        >查看所有</el-button>
      </div>
    </el-popover>
  </div>

  <!-- <svg-icon class-name="search-icon" icon-class="search" @click.stop="click" />

    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      filterable
      default-first-option
      remote
      placeholder="Search"
      class="header-search-select"
      @change="change"
    >
      <el-option v-for="item in options" :key="item.path" :value="item" :label="item.title.join(' > ')" />
    </el-select>
  </div> -->
</template>

<script>
// fuse is a lightweight fuzzy-search module
// make search results more in line with expectations
import Fuse from 'fuse.js'
import path from 'path'
import { findauth } from '@/api/floorbim'
export default {
  name: 'HeaderSearch',
  data() {
    return {
      search: '',
      options: [],
      searchPool: [],
      show: false,
      fuse: undefined,
      bellcount: '',
      belldiv: '',
      visible: false
    }
  },
  computed: {
    routes() {
      return this.$store.getters.permission_routes
    }
  },
  watch: {
    routes() {
      this.searchPool = this.generateRoutes(this.routes)
    },
    searchPool(list) {
      this.initFuse(list)
    },
    show(value) {
      if (value) {
        document.body.addEventListener('click', this.close)
      } else {
        document.body.removeEventListener('click', this.close)
      }
    }
  },
  mounted() {
    this.bell()
    this.searchPool = this.generateRoutes(this.routes)
  },
  methods: {
    async bell() {
      await findauth().then((res) => {
        this.bellcount = ''
        if (Number(res.data[0].count) > 0) {
          this.bellcount = Number(res.data[0].count)
        }
        console.log(this.bellcount)
        this.belldiv = res.data
        console.log(this.belldiv)
      })
    },
    eventbut() {
      this.visible = false
      this.$router.push('/AI-WorkOrder/event')
    },
    click() {
      this.show = !this.show
      if (this.show) {
        this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
      }
    },
    close() {
      this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
      this.options = []
      this.show = false
    },
    change(val) {
      this.$router.push(val.path)
      this.search = ''
      this.options = []
      this.$nextTick(() => {
        this.show = false
      })
    },
    initFuse(list) {
      this.fuse = new Fuse(list, {
        shouldSort: true,
        threshold: 0.4,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
          {
            name: 'title',
            weight: 0.7
          },
          {
            name: 'path',
            weight: 0.3
          }
        ]
      })
    },
    // Filter out the routes that can be displayed in the sidebar
    // And generate the internationalized title
    generateRoutes(routes, basePath = '/', prefixTitle = []) {
      let res = []

      for (const router of routes) {
        // skip hidden router
        if (router.hidden) {
          continue
        }

        const data = {
          path: path.resolve(basePath, router.path),
          title: [...prefixTitle]
        }

        if (router.meta && router.meta.title) {
          data.title = [...data.title, router.meta.title]

          if (router.redirect !== 'noRedirect') {
            // only push the routes with title
            // special case: need to exclude parent router without redirect
            res.push(data)
          }
        }

        // recursive child routes
        if (router.children) {
          const tempRoutes = this.generateRoutes(
            router.children,
            data.path,
            data.title
          )
          if (tempRoutes.length >= 1) {
            res = [...res, ...tempRoutes]
          }
        }
      }
      return res
    },
    querySearch(query) {
      if (query !== '') {
        this.options = this.fuse.search(query)
      } else {
        this.options = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;

  .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }

  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    /deep/ .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }

  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
