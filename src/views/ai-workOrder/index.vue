<template>
  <div class="container">
    <el-container class="main">
      <!-- <el-header> -->
      <!-- <div style="width:200px;margin-right:2%;">状态：</div> -->
      <!-- <el-select v-model="value" style="width:30%;" clearable placeholder="请选择" @change="changeInputSerachField">
            <el-option
              v-for="item in cOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select> -->
      <!-- <span class="left">事件</span> -->
      <el-row style="height: 50px;background-color:#221e2b;color:#1890FF">
        <el-col :span="19">
          <div style="margin: 20px 0 0 20px">
            <el-button
              :disabled="multipleSelection.length === 0"
              type="primary"
              @click="batchStart"
            >批量生成工单</el-button>
            <el-button
              :disabled="multipleSelection.length === 0"
              type="primary"
              @click="batchStop"
            >批量消除</el-button>
            <div style="margin: -36px 0 0 265px">
              日期：
              <el-date-picker
                v-model="value1"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                type="date"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
              <el-date-picker
                v-model="value2"
                value-format="yyyy-MM-dd"
                :picker-options="pickerOptions"
                type="date"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
              <el-button
                type="primary"
                icon="el-icon-search"
                @click="search"
              >查询</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="5">
          <div style="margin:20px 0 0 190px">
            <el-button
              type="primary"
              @click="handelExcel"
            >导出excel表格</el-button>
          </div>
        </el-col>
      </el-row>

      <!-- </el-header> -->
      <el-main v-loading="loading" style="margin-bottom: 60px;background-color:#221e2b">
        <el-table
          ref="multipleTable"
          height="100%"
          :data="tableData"
          :row-class-name="tableRowClassName"
          border
          :default-sort="{ prop: 'createDate', order: 'descending' }"
          :cell-style="{ 'text-align': 'center' }"
          :header-cell-style="{
            background: '#221e2b',
            color: '#1890FF',
            'text-align': 'center'
          }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column type="index" label="序号" :resizable="false" />
          <el-table-column prop="serviceTypeName" label="服务类型名称" />
          <el-table-column prop="organName" label="组织机构名称" />
          <el-table-column prop="houseName" label="位置" />
          <el-table-column prop="handler" label="处理人姓名" />
          <el-table-column prop="createDate" label="工单申请时间" />
          <el-table-column prop="content" label="报事内容" />
          <el-table-column label="工单状态">
            <template slot-scope="scope">
              <span>{{
                mapServiceOrderState(scope.row.serviceOrderState)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column label="工单详情">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handleDetailOrder(scope.row.serviceOrderId)"
              >详情</el-button>
            </template>
          </el-table-column>
          <el-table-column label="视频回放">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                :disabled="scope.row.url==''"
                @click="handlePlayBack(scope.row.url)"
              >回放</el-button>
            </template>
          </el-table-column>
          <el-table-column label="工单跟踪">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="text"
                @click="handletarckOrder(scope.row.serviceOrderId)"
              >详情</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="danger"
                :disabled="
                  mapServiceOrderState(scope.row.serviceOrderState) === '取消'
                    ? true
                    : false
                "
                @click="changeButton(scope.row.serviceOrderId)"
              >取消工单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>

      <el-footer class="elFooter" style="background-color:#221e2b;color:#1890FF">
        <el-pagination
          background
          :current-page="page.currentPage"
          :page-sizes="[10, 20, 30, 50]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-footer>
    </el-container>
    <el-dialog
      title="工单详情"
      :visible.sync="detailDialog.visible"
      style="width: 120%; left: -10%;background-color:red"
    >
      <el-table
        :data="gridDa"
        border
        :cell-style="cellStyle"
        size="medium"
        height="60vh"
        style="width: 120%"
        :header-cell-style="{
          background: '#221e2b',
          color: '#1890FF',
          'text-align': 'center'
        }"
      >
        <el-table-column property="serviceOrderId" label="服务工单id" />
        <el-table-column property="organName" label="服务项目" />
        <el-table-column property="contactName" label="提单人" />
        <el-table-column property="contactTel" label="提单人联系电话" />
        <el-table-column property="busiTypeName" label="业务类型名称" />
        <el-table-column property="dealAdvise" label="处理意见" />
      </el-table>
    </el-dialog>
    <el-dialog
      :visible.sync="playBackDialog.visible"
      style="width: 60%; height: 120%; margin-left: 25%"
    >
      <div style="min-width: 300px; min-height: 400px; margin-left: 20%">
        <!-- <ul class="play-list">
          <li class="play-list-item">回放列表</li>
          <li
            v-for="(item, index) in playBackDialog.list"
            :key="index + 'playBackDialog'"
            class="play-list-item-video"
            @click="
              handlePlayBackListItem(
                `http://101.132.169.245:90/${item.split('/file/')[1]}`
              )
            "
          >
            {{ index + 1 }}、 {{ item.split("/file/")[1] }}
          </li>
        </ul> -->
        <!-- <ul class="play-list">
          <li class="play-list-item">回放列表</li>
          <li
            v-for="(item, index) in playBackDialog.list"
            :key="index + 'playBackDialog'"
            class="play-list-item-video"
            @click="handlePlayBackListItem(`http://101.132.169.245:90/${item}`)"
          >
            {{ index + 1 }}、 {{ item }}
          </li>
        </ul> -->
        <ul class="play-list">
          <li class="play-list-item">回放列表</li>
          <li
            v-for="(item, index) in playBackDialog.list"
            :key="index + 'playBackDialog'"
            class="play-list-item-video"
            @click="handlePlayBackListItem(`http://101.132.169.245:90/${item}`)"
          >
            {{ index + 1 }}、 {{ item.split("/")[1] }}
          </li>
        </ul>
        <!-- <ul class="play-list">
          <li class="play-list-item">回放列表</li>
          <li
            class="play-list-item-video"
            @click="
              handlePlayBackListItem(
                `http://101.132.169.245:90/${
                  dataurls[Math.ceil(Math.random() * 3)]
                }`
              )
            "
          >
            3号楼17F客梯通道-2020年09月11日14时08分10秒.mp4
          </li>
        </ul> -->
      </div>
    </el-dialog>
    <el-dialog
      :visible.sync="playBackListDialog.visible"
      top="60px"
      @close="handleClose"
    >
      <video
        :src="playBackListDialog.url"
        controls
        style="object-fit: fill; width: 100%; height: 100%"
      />
    </el-dialog>
    <el-dialog
      title="工单跟踪"
      :visible.sync="trackDialog.visible"
      style="width: 120%; left: -10%"
    >
      <el-table
        :data="gridData"
        border
        :cell-style="cellStyleTrack"
        size="medium"
        height="60vh"
        style="width: 120%"
        :header-cell-style="{
          background: '#221e2b',
          color: '#1890FF',
          'text-align': 'center'
        }"
      >
        <el-table-column property="trackCode" label="轨迹编码">
          <template slot-scope="scope">
            <span>{{ scope.row.trackCode }}</span>
          </template>
        </el-table-column>
        <el-table-column property="trackName" label="轨迹名称" />
        <el-table-column property="createDate" label="创建时间" />
        <el-table-column property="trackInfo" label="轨迹信息" />
        <el-table-column property="dealAdvise" label="处理意见" />
      </el-table>
    </el-dialog>
    <el-dialog title="取消原因" :visible.sync="cancelDialog.visible">
      <el-input
        v-model="textarea"
        type="textarea"
        :rows="8"
        placeholder="取消原因不能为空"
        @change="orderInput"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancelDialogVisible">取 消</el-button>
        <el-button
          type="primary"
          @click="confirmDialogVisible"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import axios from 'axios'
import { getToken } from '@/utils/auth'
const { mapState, mapActions } = createNamespacedHelpers('aiWork')
export default {
  name: 'AIWorkOrder',
  components: {},
  data() {
    return {
      // dataurls: [
      //   '',
      //   '3号楼17F客梯通道-2020年09月11日14时08分10秒.mp4',
      //   '3号楼18F客梯通道-2020年09月02日12时08分54秒.mp4',
      //   '3号楼B4F穿梭电梯厅-2020年09月04日04时01分19秒.mp4'
      // ],
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() <= (Date.now()-(24 * 60 * 60 * 1000));//禁用今天和今天之前的日期
          return time && time.valueOf() >= new Date()// 禁用今天之后的日期不包含今天
        }
      },
      value1: new Date(new Date().getTime() - 30 * 86400 * 1000).format('yyyy-MM-dd'),
      value2: new Date().format('yyyy-MM-dd'),
      loading: false,
      backBoolean: true,
      textarea: '',
      value: 'NULL',
      inputSerachField: '',
      inputPhone: '一体化平台',
      gridDa: [],
      gridData: [],
      tableData: [],
      detailDialog: {
        loading: false,
        visible: false
      },
      playBackDialog: {
        loading: false,
        visible: false,
        title: '',
        list: []
      },
      playBackListDialog: {
        loading: false,
        visible: false,
        title: '',
        url: ''
      },
      trackDialog: {
        loading: false,
        visible: false,
        title: ''
      },
      cancelDialog: {
        loading: false,
        visible: false,
        id: ''
      },
      page: {
        // 当前页
        currentPage: 1,
        // 当前每页显示条数
        pageSize: 10,
        // 总条目数
        total: 0
      },
      searchData: {
        eventType: null,
        status: null
      },
      statusTypes: [
        {
          id: 1,
          status: '未结束'
        },
        {
          id: 2,
          status: '已结束'
        }
      ],
      eventTypes: [
        {
          id: 1,
          eventType: '消防报警'
        },
        {
          id: 2,
          eventType: '故障'
        },
        {
          id: 3,
          eventType: '事件'
        },
        {
          id: 4,
          eventType: '监控报警'
        }
      ],
      mockDate: [
        {
          serviceOrderId: '',
          serviceTypeName: '',
          createDate: '',
          handler: '',
          content: '',
          houseName: '',
          serviceOrderState: ''
        }
      ],
      // pickerOptions: {
      //   shortcuts: [
      //     {
      //       text: '本月',
      //       onClick(picker) {
      //         const start = new Date()
      //         start.setMonth(start.getMonth(), 1)
      //         picker.$emit('pick', [start, new Date()])
      //       }
      //     },
      //     {
      //       text: '今年至今',
      //       onClick(picker) {
      //         const end = new Date()
      //         const start = new Date(new Date().getFullYear(), 0)
      //         picker.$emit('pick', [start, end])
      //       }
      //     },
      //     {
      //       text: '最近六个月',
      //       onClick(picker) {
      //         const end = new Date()
      //         const start = new Date()
      //         start.setMonth(start.getMonth() - 6)
      //         picker.$emit('pick', [start, end])
      //       }
      //     }
      //   ]
      // },
      // checkedDate: [
      //   new Date(new Date().getTime() - 30 * 86400 * 1000).format('yyyy-MM-dd'),
      //   new Date().format('yyyy-MM-dd')
      // ],
      multipleSelection: [],
      exceldata: []
    }
  },
  computed: {
    ...mapState(['queryOrder', 'detailOrder', 'cancelOder', 'tarckOrder']),
    chouseOrAddress() {
      return this.queryOrder.orderList.map(item => {
        item.houseName ? item.houseName : item.address
      })
    },
    cOptions() {
      return [
        {
          value: 'NULL',
          label: '默认'
        },
        {
          value: 'NODE_DS_SUBMIT',
          label: '提单'
        },
        {
          value: 'NODE_DS_DISPATCH',
          label: '待派单'
        },
        {
          value: 'NODE_DS_TAKE',
          label: '处理'
        },
        {
          value: 'NODE_DS_CHECK',
          label: '审核'
        },
        {
          value: 'NODE_DS_PAID_NEW',
          label: '支付'
        },
        {
          value: 'NODE_DS_EVLUATE',
          label: '评价'
        },
        {
          value: 'NODE_DS_RECALL',
          label: '回访'
        },
        {
          value: 'NODE_DS_OVER',
          label: '结束'
        },
        {
          value: 'NODE_DS_CANCEL',
          label: '取消'
        }
      ]
    }
  },
  mounted() {
    const params = {
      contactTel: this.inputPhone,
      serviceOrderState: 'NULL',
      beginTime: this.value1,
      endTime: this.value2,
      currentPage: this.page.currentPage,
      pageSize: this.page.pageSize
    }
    this.queryServiceOrderByCust(params).then(() => {
      this.tableData = this.queryOrder.orderList.map(item => ({
        houseOrAddress: this.chouseOrAddress,
        ...item
      }))
      this.page.total = Number(this.queryOrder.paginator.totalCount)
      this.loading = false
    })
  },
  methods: {
    ...mapActions([
      'queryServiceOrderByCust',
      'serviceOrderDetailById',
      'discontinueOrder',
      'orderTrackInfoById'
    ]),
    changeInputSerachField(val) {
      this.inputSerachField = val
    },
    mapServiceOrderState(state) {
      switch (state) {
        case 'NODE_DS_CANCEL':
          return '取消'
        case 'NODE_DS_DISPATCH':
          return '待派单'
        case 'NODE_DS_SUBMIT':
          return '提单'
        case 'NODE_DS_TAKE':
          return '处理'
        case 'NODE_DS_CHECK':
          return '审核'
        case 'NODE_DS_PAID_NEW':
          return '支付'
        case 'NODE_DS_EVLUATE':
          return '评价'
        case 'NODE_DS_RECALL':
          return '回访'
        case 'NODE_DS_OVER':
          return '结束'
      }
    },
    // 工单跟踪
    handletarckOrder(id) {
      this.orderTrackInfoById(id).then(() => {
        this.gridData = this.tarckOrder.data
      })
      this.trackDialog.visible = true
    },
    //  电话
    phoneInput(val) {
      this.inputPhone = val
    },
    // 视频回放
    handlePlayBack(list) {
      // console.log(list)
      this.playBackDialog.visible = true
      this.playBackDialog.list = list
    },
    handlePlayBackListItem(url) {
      // console.log(url)
      this.playBackListDialog.visible = true
      this.playBackListDialog.url = url
    },
    // 取消视频回放
    handleClose() {
      this.playBackListDialog.url = ''
    },
    // 工单详情
    handleDetailOrder(id) {
      this.serviceOrderDetailById(id).then(() => {
        this.gridDa = this.detailOrder.data
      })
      this.detailDialog.visible = true
    },
    cellStyle({ rowIndex }) {
      if (rowIndex === 0) {
        return 'height:100px'
      }
    },
    cellStyleTrack({ rowIndex }) {
      if (rowIndex === 0) {
        return 'height:100px'
      }
    },
    load() {
      Object.assign(this.tableData, this.mockDate)
      this.page.total = this.tableData.length
    },
    _search() {
      if (!this.value1) {
        this.$message({
          message: '日期不能为空',
          type: 'warning'
        })
      } else {
        this.loading = true
        const params = {
          contactTel: this.inputPhone,
          serviceOrderState: this.inputSerachField || 'NULL',
          beginTime: this.value1,
          endTime: this.value2,
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize
        }
        console.log('this.inputSerachField', this.inputSerachField)
        this.queryServiceOrderByCust(params).then(() => {
          this.tableData = this.queryOrder.orderList.map(item => ({
            houseOrAddress: this.chouseOrAddress,
            ...item
          }))
          this.page.total = Number(this.queryOrder.paginator.totalCount)
          this.loading = false
        })
      }
    },
    // 搜索
    search() {
      this._search()
      // const phoneTest = /^1[3|4|5|7|8][0-9]{9}$/
      // this.checkedDate
      //   ? this.inputSerachField || this.inputPhone.length === 11 && phoneTest.test(this.inputPhone)
      //     ? this._search()
      //     : this.$message({ message: '房屋名称为空或电话不对', type: 'error' })
      //   : this.$message({
      //     message: '请选择日期',
      //     type: 'error'
      //   })
      // const { searchData: { eventType, status }, mockDate } = this
      // eventType ? this.tableData = mockDate.filter(item => item.eventType === eventType) : null
      // status ? this.tableData = mockDate.filter(item => item.status === status) : null
      // this.page.total = this.tableData.length
    },
    // 每页条数事件
    handleSizeChange(val) {
      this.page.pageSize = val
      this._search()
    },
    // 翻页事件
    handleCurrentChange(val) {
      this.page.currentPage = val
      this._search()
    },
    orderInput(val) {
      this.textarea = val
    },
    editButton(val) {
      this.tableData[val - 1].status = '已结束'
    },
    cancelDialogVisible() {
      this.cancelDialog.visible = false
      this.textarea = ''
    },
    confirmDialogVisible() {
      if (this.textarea.trim().length === 0) {
        this.$message({
          message: '内容不能为空',
          type: 'error'
        })
      } else {
        this.discontinueOrder({
          serviceOrderId: this.cancelDialog.id,
          cause: this.textarea
        }).then(res => {
          this.cancelDialog.visible = false
          this.$message({
            message: res,
            type: 'success'
          })
        })
      }
    },
    changeButton(id) {
      this.cancelDialog.visible = true
      this.cancelDialog.id = id
    },
    changeButtonStop(val) {
      const t = '已结束'
      const m = '未结束'
      this.tableData[val - 1].status = t ? m : t
      // this.page.total = this.tableData.length
    },
    // batchStart() {
    //   this.$refs.multipleTable.toggleAllSelection();
    // },
    async batchStart() {
      this.loading = true
      this.multipleSelection.forEach(i => {
        i.status = 0
        i.type = 0
      })
      const params = {
        url: '/auth/batchCreateOrder',
        params: this.multipleSelection
      }
      // console.log(params)
      const res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.$message({
          showClose: true,
          message: '批量生成工单成功',
          type: 'success'
        })
        this.searchEvent()
      } else {
        this.$message({
          showClose: true,
          message: '批量生成工单失败',
          type: 'error'
        })
      }
      this.loading = false
    },
    async batchStop() {
      const ids = this.multipleSelection.map(i => i.id)
      this.loading = true
      const params = {
        url: '/auth/batchCancelEvent',
        params: ids
      }
      const res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.$message({
          showClose: true,
          message: '批量消除成功',
          type: 'success'
        })
        this.searchEvent()
      } else {
        this.$message({
          showClose: true,
          message: '批量消除失败',
          type: 'error'
        })
      }
      this.loading = false
    },
    // batchStop() {},
    handleSelectionChange(val) {
      console.log(111, val)
      // this.multipleSelection = val;
      this.multipleSelection = val.filter(
        item => item.serviceOrderStateName === '待审核'
      )
    },

    exportMethod(data) {
      axios({
        method: data.method,
        url: data.url,
        data: data.data,
        headers: { token: data.token },
        responseType: 'blob'
      })
        .then(res => {
          console.dir(res)
          const link = document.createElement('a')
          const blob = new Blob([res.data], {
            type: 'application/vnd.ms-excel'
          })
          console.dir(blob)
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)

          // link.download = res.headers["Content-Disposition"]; //下载后文件名
          link.download = data.fileName // 下载的文件名
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        })
        .catch(error => {
          console.dir(error)
        })
    },
    async handelExcel() {
      const data = {
        method: 'post',
        data: {
          beginTime: this.value1,
          contactTel: this.inputPhone,
          currentPage: this.page.currentPage,
          endTime: this.value2,
          pageSize: this.page.pageSize,
          serviceOrderState: 'NULL'
        },
        url:
          'http://101.132.169.245:8071/public-gateway/manage/export_work_order',
        // url: "http://101.132.169.245:8071/public-gateway/auth/exportEventList",
        token: getToken(),
        fileName: '智慧工单.xlsx'
      }
      this.exportMethod(data)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table /deep/ tr{
  color: #1890FF;
  background-color: #221e2b;
}
.el-table /deep/ tbody tr:hover>td {
    background-color: #18111f!important;
}
.container {
  background-color: #18111f;
  height: calc(100vh - 84px);
  padding: 25px;
  // padding-bottom: 25px;
}
.main {
  // min-height: 70vh;
  font-size: 15px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  height: 100%;
  &:hover {
    box-shadow: 2px 2px 10px #888888;
  }
}
.el-pagination /deep/ .el-pagination__total{
    color: #1890FF;
}
.el-pagination /deep/ .el-pagination__jump{
  color: #1890FF;
}
.left {
  float: left;
  padding-left: 3px;
}
.play-list {
  width: 80%;
  border: 1px solid #000;
  list-style: none;
  text-align: center;
  padding: 0;
  margin: 0;
  font-size: 18px;
}
.play-list-item {
  padding: 12px 0;
  border: 1px solid #ccc;
  &-video {
    padding: 12px 0;
    border: 1px solid #ccc;
    cursor: pointer;
  }
}
</style>
