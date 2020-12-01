<template>
  <div style="height:150vh;background:#18111f">
    <el-tabs
      v-model="activeName"
      type="border-card"
      style="height:150vh;background:#18111f"
      @tab-click="changedong"
    >
      <el-tab-pane name="1">
        <span slot="label">
          <i class="el-icon-s-data" />
          总用电量统计
        </span>

        <el-radio-group v-model="tabPosition">
          <el-radio-button label="0">日</el-radio-button>
          <el-radio-button label="1">月</el-radio-button>
          <el-radio-button label="3">年</el-radio-button>
        </el-radio-group>
        <div style="display: inline-block;">
          <el-date-picker
            v-model="value1"
            :value-format="
              tabPosition == 0
                ? 'yyyy-MM-dd'
                : '' || tabPosition == 1
                  ? 'yyyy-MM'
                  : '' || tabPosition == 3
                    ? 'yyyy'
                    : ''
            "
            :type="
              tabPosition == 0
                ? 'date'
                : '' || tabPosition == 1
                  ? 'month'
                  : '' || tabPosition == 3
                    ? 'year'
                    : ''
            "
            placeholder="选择日期"
          />
          <el-date-picker
            v-model="value2"
            :value-format="
              tabPosition == 0
                ? 'yyyy-MM-dd'
                : '' || tabPosition == 1
                  ? 'yyyy-MM'
                  : '' || tabPosition == 3
                    ? 'yyyy'
                    : ''
            "
            :type="
              tabPosition == 0
                ? 'date'
                : '' || tabPosition == 1
                  ? 'month'
                  : '' || tabPosition == 3
                    ? 'year'
                    : ''
            "
            placeholder="选择日期"
          />
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button @click="selectbtn">查询</el-button>
        </div>
        <!-- <el-table
          :data="listData"
          border
          style="margin-top:30px"
          :summary-method="getSummaries"
          show-summary
        > -->
        <el-table
          :data="listData"
          border
          style="margin-top:30px;background:#18111f;max-height:140vh"
          :row-class-name="tableRowClassName"
          :summary-method="getSummaries"
          show-summary
        >
          <el-table-column
            v-if="listData.length < 0 ? false : true"
            prop="time"
            label="时间"
          />
          <el-table-column
            v-for="(item, i) in header"
            :key="i"
            :label="item"
            prop="item"
          >
            <template slot-scope="scope">
              <!-- {{ item }} -->
              <span v-for="(val, k) in scope.row.values" :key="k">
                {{ val.meteringName === item ? val.value : "" }}
              </span>
              <span v-if="i === header.length - 1 ? true : false">{{
                changeState(scope.row.values, i)
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane
        name="2"
      ><span slot="label">
         <i class="el-icon-menu" />
         能耗统计
       </span>
        <el-radio-group v-model="tabPosition">
          <el-radio-button label="0">日</el-radio-button>
          <el-radio-button label="1">月</el-radio-button>
          <el-radio-button label="3">年</el-radio-button>
        </el-radio-group>
        <div style="display: inline-block;">
          <el-date-picker
            v-model="value1"
            :value-format="
              tabPosition == 0
                ? 'yyyy-MM-dd'
                : '' || tabPosition == 1
                  ? 'yyyy-MM'
                  : '' || tabPosition == 3
                    ? 'yyyy'
                    : ''
            "
            :type="
              tabPosition == 0
                ? 'date'
                : '' || tabPosition == 1
                  ? 'month'
                  : '' || tabPosition == 3
                    ? 'year'
                    : ''
            "
            placeholder="选择日期"
          />
          <el-date-picker
            v-model="value2"
            :value-format="
              tabPosition == 0
                ? 'yyyy-MM-dd'
                : '' || tabPosition == 1
                  ? 'yyyy-MM'
                  : '' || tabPosition == 3
                    ? 'yyyy'
                    : ''
            "
            :type="
              tabPosition == 0
                ? 'date'
                : '' || tabPosition == 1
                  ? 'month'
                  : '' || tabPosition == 3
                    ? 'year'
                    : ''
            "
            placeholder="选择日期"
          />
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-button @click="selectbtn">查询</el-button>
        </div>
        <el-table
          :data="listData"
          border
          style="margin-top:30px;background:#18111f"
          :row-class-name="tableRowClassName"
          :summary-method="getSummaries"
          show-summary
        >
          <el-table-column
            v-if="listData.length < 0 ? false : true"
            prop="time"
            label="时间"
          />
          <el-table-column
            v-for="(item, i) in header"
            :key="i"
            :label="item"
            prop="item"
          >
            <template slot-scope="scope">
              <!-- {{ item }} -->
              <span v-for="(val, k) in scope.row.values" :key="k">
                {{ val.meteringName === item ? val.value : "" }}
              </span>
              <span v-if="i === header.length - 1 ? true : false">{{
                changeState(scope.row.values, i)
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getuserABCD, getqualform, getsubentry } from '@/api/quantity'
export default {
  data() {
    return {
      options: [
        {
          value: 'AB',
          label: 'AB楼'
        },
        {
          value: 'CD',
          label: 'CD楼'
        }
      ],
      value: 'AB',
      tabPosition: 0,
      value1: new Date().format('yyyy-MM-dd'),
      value2: new Date().format('yyyy-MM-dd'),
      headers: '',
      headers1: '',
      listData: [],
      header: '',
      activeName: '1'
    }
  },
  mounted() {
    this.getuserabcd(this.value)
    this.$nextTick(() => {
      const s_table = document.getElementsByClassName(
        'el-table__footer-wrapper'
      )[0]
      s_table.setAttribute('style', 'font-weight:800')
    })
  },
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex % 2 === 0) {
        return 'warning-row'
      } else {
        return 'success-row'
      }
      // return false
    },
    changeState(e, i) {
      // console.log(e, i);
      const sums = []
      const values = e.map(item => {
        return item.value
      })
      if (!values.every(value => isNaN(value))) {
        sums[i] = values.reduce((prev, curr) => {
          // console.log(prev + curr);
          const value = Number(curr)
          if (!isNaN(value)) {
            return prev + curr
          } else {
            return Math.floor(prev * 100) / 100
          }
        }, 0)
        sums[i] += ''
      } else {
        sums[i] = '0'
      }
      // let arr = [];
      // arr.push(sums[i]);
      // console.log(arr);
      // return Math.floor(sums[i]);
      return Math.floor(sums[i] * 100) / 100
      // if (Number(e)) {
      //   this.list[$index].state += 1;
      // }
    },
    getSummaries(param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        // console.log(column, index);
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map(item => {
          return item.values
        })
        // console.log(111, values)
        sums[index] = values.reduce((prev, curr) => {
          // console.log(prev, curr)
          let arr = 0
          curr.map(item => {
            if (
              item.meteringName === column.label &&
              item.value !== undefined
            ) {
              arr = item.value
            }
          })
          const value = Number(arr)
          if (!isNaN(value)) {
            return Math.floor((prev + arr) * 100) / 100
          } else {
            return prev
          }
        }, 0)
        sums[index] += ''
      })
      sums[sums.length - 1] = sums.reduce((prev, curr) => {
        // console.log(prev + curr);
        const value = Number(curr)
        if (!isNaN(value)) {
          return Math.floor((prev + value) * 100) / 100
        } else {
          return Math.floor(prev * 100) / 100
        }
      }, 0)
      return sums
    },
    changedong() {
      // console.log(this.activeName)
      if (this.activeName === '1') {
        this.getuserabcd(this.value)
      }
      if (this.activeName === '2') {
        this.getuserabcd(this.value)
      }
    },
    async getdong(data) {
      this.listData = []
      this.header = []
      await getsubentry(data).then(res => {
        // console.log(res)
        if (res.code === 200) {
          //   let arr = [];
          this.header = res.data.meterNames
          this.listData = res.data.totalPowerDTOS
        }
      })
    },
    async getuserabcd(e) {
      if (e === 'AB' && this.activeName === '1') {
        // console.log(111)
        await getuserABCD(e).then(res => {
          //   console.log(res);
          this.headers = res
        })
        const data = {
          buildingId: this.headers.column01,
          dateType: this.tabPosition,
          endTime: this.value2,
          nums: [],
          sortType: 0,
          startTime: this.value1,
          token: this.headers.authorization
        }
        if (this.tabPosition === '1') {
          data.startTime = new Date(this.value1).format('yyyy-MM')
          data.endTime = new Date(this.value2).format('yyyy-MM')
          // console.log(data.sortType, this.tabPosition);
          return this.getdata(data)
        } else if (this.tabPosition === '3') {
          data.startTime = new Date(this.value1).format('yyyy')
          data.endTime = new Date(this.value2).format('yyyy')
          data.sortType = 1
          // console.log(data.sortType, this.tabPosition);
          return this.getdata(data)
        } else {
          data.startTime = new Date(this.value1).format('yyyy-MM-dd')
          data.endTime = new Date(this.value2).format('yyyy-MM-dd')
          return this.getdata(data)
        }
      }
      if (e === 'CD' && this.activeName === '1') {
        // console.log(222)
        await getuserABCD(e).then(res => {
          // console.log(res)
          this.headers1 = res
        })
        const data = {
          buildingId: this.headers1.column01,
          dateType: this.tabPosition,
          endTime: this.value2,
          nums: [],
          sortType: 0,
          startTime: this.value1,
          token: this.headers1.authorization
        }
        if (this.tabPosition === '3') {
          data.startTime = new Date(this.value1).format('yyyy')
          data.endTime = new Date(this.value2).format('yyyy')
          data.sortType = 1
          return this.getdata(data)
        } else {
          this.getdata(data)
        }
      }
      if (e === 'AB' && this.activeName === '2') {
        // console.log(333)
        await getuserABCD(e).then(res => {
          //   console.log(res);
          this.headers = res
        })
        const data = {
          buildingId: this.headers.column01,
          dateType: this.tabPosition,
          endTime: this.value2,
          nums: [],
          sortType: 0,
          startTime: this.value1,
          token: this.headers.authorization
        }
        if (this.tabPosition === '3') {
          data.startTime = new Date(this.value1).format('yyyy')
          data.endTime = new Date(this.value2).format('yyyy')
          data.sortType = 1
          return this.getdong(data)
        } else {
          this.getdong(data)
        }
      }
      if (e === 'CD' && this.activeName === '2') {
        // console.log(444)
        await getuserABCD(e).then(res => {
          // console.log(res)
          this.headers1 = res
        })
        const data = {
          buildingId: this.headers1.column01,
          dateType: this.tabPosition,
          endTime: this.value2,
          nums: [],
          sortType: 0,
          startTime: this.value1,
          token: this.headers1.authorization
        }
        if (this.tabPosition === '3') {
          data.startTime = new Date(this.value1).format('yyyy')
          data.endTime = new Date(this.value2).format('yyyy')
          data.sortType = 1
          return this.getdong(data)
        } else {
          this.getdong(data)
        }
      }
    },
    async getdata(data) {
      // console.log(this.value1, this.value2);
      this.listData = []
      this.header = []
      await getqualform(data).then(res => {
        // console.log(res);
        if (res.code === 200) {
          //   let arr = [];
          this.header = res.data.meterNames
          this.listData = res.data.totalPowerDTOS
        }
      })
    },
    selectbtn() {
      this.getuserabcd(this.value)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-table /deep/ thead {
  background: #154363;
}
.el-table /deep/ .warning-row {
  color: white;
  background: #154363;
}
.el-table /deep/ .success-row {
  color: white;
  background: #272c36;
}
.el-table /deep/ .warning-row:hover {
  color: #000;
  // background: #154363;
}
.el-table /deep/ .success-row:hover {
  color: #000;
  // background: #272c36;
}
</style>
