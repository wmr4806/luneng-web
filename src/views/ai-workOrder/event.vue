<template>
  <div v-loading="loading" class="container">
    <el-container class="main">
      <el-header  style="background-color:#221e2b;color:#1890FF">
        <span v-if="downloadexcel" class="left">事件</span>
        <div style="float: left;margin-left:20px">
          <el-button
            v-if="downloadexcel"
            :disabled="multipleSelection.length === 0"
            type="primary"
            @click="batchStart"
            >批量生成工单</el-button
          >
          <el-button
            v-if="downloadexcel"
            :disabled="multipleSelection.length === 0"
            type="primary"
            @click="batchStop"
            >批量消除</el-button
          >
          <el-button
            v-if="downloadexcel"
            type="primary"
            @click="downloadexcel = false"
            >导出excel表格</el-button
          >
          <span v-if="downloadexcel == true ? false : true"
            >请选择导出时间区间:</span
          >
          <el-date-picker
            v-if="downloadexcel == true ? false : true"
            v-model="value1"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            type="date"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-date-picker
            v-if="downloadexcel == true ? false : true"
            v-model="value2"
            value-format="yyyy-MM-dd"
            :picker-options="pickerOptions"
            type="date"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
          <el-button
            v-if="downloadexcel == true ? false : true"
            type="info"
            @click="downloadexcel = true"
            >取消</el-button
          >
          <el-button
            v-if="downloadexcel == true ? false : true"
            type="primary"
            @click="batchExcel"
            >确定</el-button
          >
        </div>
        <div>
          <span>关键字：</span>
          <el-input
            v-model="searchData.fulltext"
            maxlength="50"
            style="width:230px"
            clearable
            placeholder="请输入关键字"
            @clear="searchEvent"
          />
          <span>类别：</span>
          <el-select
            v-model="searchData.type"
            placeholder="请选择类别"
            clearable
            @change="searchEvent"
            @clear="searchEvent"
          >
            <el-option
              v-for="item in typeOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <span>状态：</span>
          <el-select
            v-model="searchData.status"
            placeholder="请选择状态"
            clearable
            @change="searchEvent"
            @clear="searchEvent"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
          <el-button type="primary" @click="searchEvent">查询</el-button>
        </div>
      </el-header>
      <el-main  style="background-color:#221e2b">
        <el-table
          ref="multipleTable"
          :data="tableData"
          border
          height="100%"
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
          <el-table-column prop="event" label="事件" :resizable="false" />
          <el-table-column prop="type" label="类别" :resizable="false" />
          <el-table-column prop="status" label="状态" :resizable="false" />
          <el-table-column prop="time" label="发生时间" :resizable="false" />
          <el-table-column
            label="操作"
            :resizable="false"
            min-width="100"
          >
            <template slot-scope="scope">
              <el-button
                :disabled="
                  scope.row.status === '未知' || scope.row.status === '已处理'
                "
                size="small"
                type="info"
                plain
                @click="createOrder(scope.row)"
                >生成工单</el-button
              >
              <!-- <el-button :disabled="true" size="small" type="info" plain @click="createOrder(scope.row)">生成工单</el-button> -->
              <el-button
                :disabled="
                  scope.row.status === '未知' || scope.row.status === '已处理'
                "
                size="small"
                type="danger"
                @click="stopEvent(scope.row.id)"
                >手动消除</el-button
              >
            </template>
          </el-table-column>
          <el-table-column
            label="BIM"
            :resizable="false"
            min-width="100"
          >
            <template slot-scope="scope">
              <el-button
                size="small"
                type="info"
                plain
                @click="clickBIM(scope.row.address, scope.row.deviceId)"
                :disabled="!scope.row.area || !getShow(scope.row.address)"
                >{{
                  scope.row.address === null || !getShow(scope.row.address)
                    ? "无对应点位"
                    : scope.row.address
                }}</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer  style="background-color:#221e2b">
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
      :title="title"
      :visible.sync="bim.visible"
      top="-20px"
      custom-class="dialog"
      style="width:100vw;height: 100vh; background-color: #031424"
      :fullscreen="true"
      @close="closedBIM"
    >
      <!-- <iframe id="mainFrame" ref="mainFrame" name="mainFrame" class="mainFrame" src="http://localhost:8080/#/bim" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="true" /> -->
      <!-- <iframe id="mainFrame" ref="mainFrame" name="mainFrame" class="mainFrame" :src="BIMSrc" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="true" /> -->
      <BimComponent
        :floor="bim.floor"
        :building="bim.building"
        :bimId="bim.bimId"
        class="bim"
      />
    </el-dialog>
  </div>
</template>

<script>
import BimComponent from "@/views/bimEmpty/bimComponent";
import { getToken } from "@/utils/auth";
import axios from "axios";
export default {
  name: "Event",
  components: {
    BimComponent
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() <= (Date.now()-(24 * 60 * 60 * 1000));//禁用今天和今天之前的日期
          return time && time.valueOf() >= new Date();//禁用今天之后的日期不包含今天
        }
      },
      downloadexcel: true,
      value1: "",
      value2: "",
      loading: false,
      searchData: {
        type: "",
        status: "",
        fulltext: ""
      },
      params: {},
      bim: {
        visible: false,
        floor: "",
        building: "",
        none: "",
        bimId: ""
      },
      page: {
        // 当前页
        currentPage: 1,
        // 当前每页显示条数
        pageSize: 10,
        // 总条目数
        total: 0
      },
      tableData: [],
      typeOptions: [
        {
          id: "0",
          name: "故障警报"
        },
        {
          id: "1",
          name: "消防警报"
        },
        {
          id: "2",
          name: "摄像机故障"
        },
        {
          id: "3",
          name: "阈值警报"
        }
      ],
      statusOptions: [
        {
          id: "0",
          name: "未处理"
        },
        {
          id: "1",
          name: "已处理"
        }
      ],
      multipleSelection: [],
      exceldata: []
    };
  },
  created() {
    this.$nextTick(async () => {
      this.searchEvent();
    });
  },
  computed: {
    BIMSrc() {
      return process.env.NODE_ENV === "development"
        ? "http://localhost:9090/#/bimLink"
        : "http://101.132.169.245/#/bimLink";
    },
    title() {
      return `${this.params.building}号楼${this.params.floor}层`;
    }
  },
  methods: {
    clickBIM(address, deviceId) {
      const building = address.substring(0, 1);
      let floor = address.substring(3, 4);
      // console.log(deviceId)
      // localStorage.setItem('eventParams', JSON.stringify({building: 4, floor: -1, id: 'CP4#-1-ALM_CV', none: 0}))
      //   this.bim.visible = true
      if (building === "4" || building === "3") {
        if (floor !== "B") {
          floor = address.substring(3, 4);
        } else {
          floor = -address.substring(4, 5);
        }
        // localStorage.setItem('eventParams', JSON.stringify({building, floor, id: deviceId, none: 0}))
        this.params = { building, floor, id: deviceId };
        this.bim.floor = floor;
        this.bim.building = Number(building);
        this.bim.none = 0;
        this.bim.bimId = deviceId;
        this.bim.visible = true;
      }
    },
    getShow(address) {
      const building = address.substring(0, 1);
      let floor = address.substring(3, 4);
      if (building === "4" || building === "3") {
        if (floor !== "B") {
          return floor;
        } else {
          floor = -address.substring(4, 5);
          if (floor === -1 || floor === -2) {
            return floor;
          }
        }
      }
    },
    closedBIM() {
      localStorage.removeItem("eventParams");
      location.reload();
    },
    async searchEvent() {
      const params = {
        url: "/auth/getEventsByPageByWhere",
        params: {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          searchData: this.searchData
        }
      };
      const res = await this.$store.dispatch("http/post", params);
      // console.log(res)
      this.page.total = res.data.total;
      this.tableData = res.data.dataList;
      for (const item of this.tableData) {
        switch (item.type) {
          case 0: {
            item.type = "故障警报";
            break;
          }
          case 1: {
            item.type = "消防警报";
            break;
          }
          case 2: {
            item.type = "摄像机故障";
            break;
          }
          case 3: {
            item.type = "阈值警报";
            break;
          }
          default: {
            item.type = "未知";
            break;
          }
        }
        switch (item.status) {
          case 0: {
            item.status = "未处理";
            break;
          }
          case 1: {
            item.status = "已处理";
            break;
          }
          default: {
            item.status = "未知";
            break;
          }
        }
      }
    },
    // 每页条数事件
    handleSizeChange(val) {
      this.page.pageSize = val;
      this.searchEvent();
    },
    // 翻页事件
    handleCurrentChange(val) {
      this.page.currentPage = val;
      this.searchEvent();
    },
    // 生成工单
    async createOrder(val) {
      const value = { ...val, status: 0, type: 1 };
      // console.log(value)
      this.loading = true;
      const params = {
        url: "/auth/createOrderByEvent",
        params: value
      };
      const res = await this.$store.dispatch("http/post", params);
      if (res.code === "200") {
        this.$message({
          showClose: true,
          message: "提交工单成功",
          type: "success"
        });
        this.searchEvent();
      } else {
        this.$message({
          showClose: true,
          message: "提交工单失败",
          type: "error"
        });
      }
      this.loading = false;
    },
    // 手动消除
    async stopEvent(val) {
      this.loading = true;
      const params = {
        url: "/auth/cancelEventById/" + val
      };
      const res = await this.$store.dispatch("http/get", params);
      if (res.code === "200") {
        this.$message({
          showClose: true,
          message: "手动消除成功",
          type: "success"
        });
        this.searchEvent();
      } else {
        this.$message({
          showClose: true,
          message: "手动消除失败",
          type: "error"
        });
      }
      this.loading = false;
    },
    handleSelectionChange(val) {
      console.log(val);
      this.exceldata = val;
      // this.multipleSelection = val;
      this.multipleSelection = val.filter(item => item.status === "未处理");
    },
    async batchStart() {
      this.loading = true;
      this.multipleSelection.forEach(i => {
        i.status = 0;
        i.type = 0;
      });
      const params = {
        url: "/auth/batchCreateOrder",
        params: this.multipleSelection
      };
      // console.log(params)
      const res = await this.$store.dispatch("http/post", params);
      if (res.code === "200") {
        this.$message({
          showClose: true,
          message: "批量生成工单成功",
          type: "success"
        });
        this.searchEvent();
      } else {
        this.$message({
          showClose: true,
          message: "批量生成工单失败",
          type: "error"
        });
      }
      this.loading = false;
    },
    async batchStop() {
      const ids = this.multipleSelection.map(i => i.id);
      this.loading = true;
      const params = {
        url: "/auth/batchCancelEvent",
        params: ids
      };
      const res = await this.$store.dispatch("http/post", params);
      if (res.code === "200") {
        this.$message({
          showClose: true,
          message: "批量消除成功",
          type: "success"
        });
        this.searchEvent();
      } else {
        this.$message({
          showClose: true,
          message: "批量消除失败",
          type: "error"
        });
      }
      this.loading = false;
    },
    exportMethod(data) {
      axios({
        method: data.method,
        url: data.url,
        data: data.data,
        headers: { token: data.token },
        responseType: "blob"
      })
        .then(res => {
          console.dir(res);
          const link = document.createElement("a");
          let blob = new Blob([res.data], { type: "application/vnd.ms-excel" });
          console.dir(blob);
          link.style.display = "none";
          link.href = URL.createObjectURL(blob);

          // link.download = res.headers["Content-Disposition"]; //下载后文件名
          link.download = data.fileName; //下载的文件名
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // 导出excel表
    async batchExcel() {
      const token = getToken();
      // console.log(token);
      if (this.value1 == "" && this.value2 == "") {
        return alert("请选择导出日期");
      } else {
        console.log(this.value1);
        let data = {
          beginTime: this.value1,
          endTime: this.value2
        };
        // console.log(aaa, bbb);
        let datas = {
          method: "post",
          url:
            "http://101.132.169.245:8071/public-gateway/auth/exportEventList",
          data,
          token,
          fileName: "智慧事件.xlsx"
        };
        this.exportMethod(datas);
        this.downloadexcel = true;
        this.value1 = "";
        this.value2 = "";
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-table /deep/ tr{
  color: #1890FF;
  background-color: #221e2b;
}
.el-table /deep/ tbody tr:hover>td {
    background-color: #18111f!important;
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
.container {
  background-color: #18111f;
  height: calc(100vh - 84px);
  padding: 25px;
}
.main {
  height: 100%;
  font-size: 15px;
  background: #fff;
  position: relative;
  border-radius: 5px;
  &:hover {
    box-shadow: 2px 2px 10px #888888;
  }
}

.mainFrame {
  width: 101%;
  height: 95vh;
  left: -20px;
  overflow: hidden;
  position: relative;
  top: -40px;
}
.dialog {
  background-color: chocolate;
}
.bim {
  position: relative;
  z-index: 999;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 290px;
}
</style>
