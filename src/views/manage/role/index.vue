<template>
  <div class="container">
    <el-container class="main">
      <el-header>
        <span class="left">角色基本信息</span>
        <div>
          <span>角色编码：</span>
          <el-input v-model="searchData.code" placeholder="请输角色编码" clearable style="width: 150px" @clear="loadRoleData"/>
          <span>角色名称：</span>
          <el-input v-model="searchData.name" placeholder="请输角色名称" clearable style="width: 150px" @clear="loadRoleData"/>
          <el-button type="primary" @click="loadRoleData">查询</el-button>
          <el-button type="success" icon="el-icon-plus" plain @click="addRole">添加</el-button>
        </div>
      </el-header>
      <el-main style="margin-bottom: 60px;">
        <el-table
          height="100%"
          :data="tableData"
          stripe
          border
          highlight-current-row
          :cell-style="{'text-align':'center'}"
          :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
        >
          <el-table-column label="序号" type="index" align="center" />
          <el-table-column label="角色编号" prop="code" align="center" />
          <el-table-column label="角色名称" prop="roleName" align="center" />
          <el-table-column label="是否有效" align="center">
            <template slot-scope="scope">
              {{ scope.row.isUsed === 1 ? "是" : "否" }}
            </template>
          </el-table-column>
          <el-table-column label="修改人" prop="modifierId" align="center" />
          <el-table-column label="修改时间" prop="modifyTime" align="center" />
          <el-table-column label="操作" align="center" fixed="right" width="340">
            <template slot-scope="scope">
              <el-button size="mini" type="info" plain @click="editRole(scope.row)">编辑</el-button>
              <el-button size="mini" type="primary" plain @click="assignMenus(scope.row.roleId)">分配菜单</el-button>
              <el-button size="mini" type="primary" plain @click="assignUsers(scope.row.roleId)">分配用户</el-button>
              <el-button size="mini" type="danger" plain @click="deleteRole(scope.row.roleId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-footer class="elFooter">
        <el-pagination
          background
          :current-page="page.currentPage"
          :page-sizes="[10,20,30,50]"
          :page-size="page.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="page.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-footer>
    </el-container>

    <el-dialog :title="roleDialog.title" :visible.sync="roleDialog.visible" @close="cancelRoleDialog">
      <el-form ref="roleDialogForm" :model="roleDialog.form" :rules="rules" status-icon label-width="100px">
        <el-form-item label="角色编码" prop="code">
          <el-input v-model="roleDialog.form.code" placeholder="请输入角色编码" clearable />
        </el-form-item>
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleDialog.form.roleName" placeholder="请输入角色名称" clearable />
        </el-form-item>
        <el-form-item label="启用">
          <el-switch v-model="roleDialog.form.isUsed === 1" :disabled="roleDialog.title === '添加角色'" active-color="#13ce66" inactive-color="#ff4949" @change="stopRole(roleDialog.form)" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelRoleDialog">取消</el-button>
        <el-button :disabled="roleDialog.editButton" :loading="roleDialog.loading" type="primary" @click.native.prevent="submitRole">保存</el-button>
      </div>
    </el-dialog>

    <el-dialog v-loading="menuDialog.loading.out" title="菜单信息" :visible.sync="menuDialog.visible" @close="cancelMenuDialog">
      <el-tree
        default-expand-all
        ref="roleTree"
        node-key="menuId"
        :default-checked-keys="menuDialog.checkedKeys"
        show-checkbox
        :data="menuDialog.data"
        highlight-current
        :props="menuDialog.defaultProps"
      />
      <div slot="footer" class="dialog-footer">
        <el-button :loading="menuDialog.loading.in" type="primary" @click.native.prevent="submitMenu">保存</el-button>
        <el-button @click="cancelMenuDialog">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="userDialog.visible" @close="cancelUserDialog">
      <div slot="title" class="header-title">
        <div class="left">人员列表</div>
        <div class="right">
          <el-input v-model="userDialog.searchData.name" maxlength="100" style="width:230px" clearable placeholder="名字" @clear="searchUser"/>
          <el-button type="primary" plain @click="searchUser">查询</el-button>
        </div>
      </div>
      <div>
        <el-table
          :data="userDialog.tableData"
          stripe
          border
          highlight-current-row
          :cell-style="{'text-align':'center'}"
          :header-cell-style="{background:'#eef1f6',color:'#606266','text-align':'center'}"
        >
          <el-table-column label="序号" type="index" width="50" />
          <el-table-column prop="userName" label="员工姓名" align="center" />
          <el-table-column prop="mobile" label="员工手机号" align="center" />
          <el-table-column prop="departmentId" label="部门" align="center" />
          <el-table-column label="操作" align="center" width="100">
            <template slot-scope="scope">
              <el-button :loading="userDialog.loading" size="mini" type="danger" plain @click="deleteRoleUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-footer class="roleUserFooter">
          <el-pagination
            background
            :current-page="userDialog.page.currentPage"
            :page-sizes="[10,20,30,50]"
            :page-size="userDialog.page.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="userDialog.page.total"
            @size-change="dialogSizeChange"
            @current-change="dialogCurrentChange"
          />
        </el-footer>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelUserDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Role',
  data() {
    return {
      cacheData: {},
      rules: {
        code: [{ required: true, validator: this.checkCode, trigger: 'blur' }],
        roleName: [{ required: true, validator: this.checkName, trigger: 'blur' }]
      },
      roleDialog: {
        saveMethod: null,
        visible: false,
        title: null,
        form: {
          roleId: null,
          code: null,
          roleName: null,
          isUsed: 1
        },
        loading: false,
        editButton: true
      },
      menuDialog: {
        visible: false,
        data: [],
        roleId: null,
        checkedKeys: [],
        loading: {
          out: false,
          in: false
        },
        defaultProps: {
          label: 'title',
          children: 'children'
        }
      },
      userDialog: {
        visible: false,
        loading: false,
        searchData: {
          roleId: null,
          name: null
        },
        tableData: [],
        page: {
          // 当前页
          currentPage: 1,
          // 当前每页显示条数
          pageSize: 10,
          // 总条目数
          total: 0
        }
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
      // 搜索对象
      searchData: {
        code: null,
        name: null
      }
    }
  },
  watch: {
    'roleDialog.form': {
      handler: function(newVal, oldVal) {
        this.roleDialog.editButton = (newVal.code === this.cacheData.code) && (newVal.roleName === this.cacheData.roleName)
      },
      deep: true,
      immediate: false
    }
  },
  created() {
    this.$nextTick(() => {
      this.loadRoleData()
    })
  },
  methods: {
    // 角色新增时校验角色编号是否已经存在
    async checkCode(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入角色编码'))
      } else {
        // 提交后台验证角色编码是否存在
        const params = {
          url: '/manage/checkRoleCodeOrName',
          params: {
            code: this.roleDialog.form.code,
            id: this.roleDialog.form.roleId
          }
        }
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          return callback()
        } else {
          return callback(new Error('角色编号已存在'))
        }
      }
    },
    // 角色新增时校验角色名称是否已经存在
    async checkName(rule, value, callback) {
      if (!value) {
        return callback(new Error('请输入角色名称'))
      } else {
        // 提交后台验证角色名称是否存在
        const params = {
          url: '/manage/checkRoleCodeOrName',
          params: {
            name: this.roleDialog.form.roleName,
            id: this.roleDialog.form.roleId
          }
        }
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          return callback()
        } else {
          return callback(new Error('角色名称已存在'))
        }
      }
    },
    // 加载角色 table
    async loadRoleData() {
      this.tableData = []
      const params = {
        url: '/manage/getRolesByPageByCodeOrName',
        params: {
          currentPage: this.page.currentPage,
          pageSize: this.page.pageSize,
          searchData: this.searchData
        }
      }
      const res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.tableData = res.data.dataList
        this.page.total = res.data.total
      }
    },
    // 新增角色
    addRole() {
      this.roleDialog.title = '添加角色'
      this.roleDialog.saveMethod = '/manage/addRole'
      this.roleDialog.visible = true
      this.roleDialog.editButton = false
      this.roleDialog.form.creatorId = this.$store.state.user.userInfo.userId
      this.roleDialog.form.modifierId = this.$store.state.user.userInfo.userId
    },
    // 关闭角色弹出框
    cancelRoleDialog() {
      Object.assign(this.roleDialog, this.$options.data().roleDialog)
      this.$refs.roleDialogForm.resetFields()
    },
    // 编辑角色
    editRole(val) {
      this.roleDialog.title = '修改角色'
      this.roleDialog.saveMethod = '/manage/updateRole'
      this.cacheData = val
      Object.assign(this.roleDialog.form, val)
      this.roleDialog.visible = true
      this.roleDialog.form.modifierId = this.$store.state.user.userInfo.userId
    },
    // 分配菜单
    assignMenus(val) {
      this.menuDialog.visible = true
      this.menuDialog.roleId = val
      this.loadChecked()
    },
    // 分配用户
    assignUsers(val) {
      this.userDialog.visible = true
      this.userDialog.searchData.roleId = val
      this.searchUser()
    },
    // 删除角色
    deleteRole(val) {
      this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(async() => {
        const params = {
          url: '/manage/deleteRole',
          params: val
        }
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          this.$message({ message: '删除成功', type: 'success' })
          // 重新加载页面数据
          this.loadRoleData()
        } else {
          this.$message({ message: res.msg, type: 'warning' })
        }
      }).catch(() => {
        this.$message({ message: '已取消删除', type: 'info' })
      })
    },
    // 每页条数事件
    handleSizeChange(val) {
      this.page.pageSize = val
      this.loadRoleData()
    },
    // 翻页事件
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.loadRoleData()
    },
    // 保存角色
    submitRole() {
      this.$refs.roleDialogForm.validate(async valid => {
        if (valid) {
          this.roleDialog.loading = true
          const params = {
            url: this.roleDialog.saveMethod,
            params: this.roleDialog.form
          }
          const res = await this.$store.dispatch('http/post', params)
          if (res.code === '200') {
            this.$message({ showClose: true, message: '保存成功', type: 'success' })
            this.cancelRoleDialog()
            this.loadRoleData()
          } else {
            this.$message({ showClose: true, message: res.msg, type: 'error' })
          }
        } else {
          return false
        }
      })
    },
    // 初始化菜单树
    async loadChecked() {
      this.menuDialog.loading.out = true
      let params = {
        url: '/manage/getMenuTreeById',
        params: ''
      }
      // 获取菜单树
      let res = await this.$store.dispatch('http/get', params)
      this.menuDialog.data = res.data
      params = {
        url: '/manage/getCheckedKeys',
        params: {
          roleId: this.menuDialog.roleId
        }
      }
      // 获取菜单树选中节点
      res = await this.$store.dispatch('http/post', params)
      this.menuDialog.checkedKeys = res.data
      this.menuDialog.loading.out = false
    },
    // 关闭菜单弹出框
    cancelMenuDialog() {
      Object.assign(this.menuDialog, this.$options.data().menuDialog)
    },
    // 保存菜单
    async submitMenu() {
      this.menuDialog.loading.in = true
      // 获取树的选中+半选中节点
      const checkedKeys = this.$refs.roleTree.getCheckedKeys()
      const halfCheckedKeys = this.$refs.roleTree.getHalfCheckedKeys()
      halfCheckedKeys.push(...checkedKeys)
      const ids = halfCheckedKeys.join(',')
      const params = {
        url: '/manage/saveMenuByRoleId',
        params: {
          roleId: this.menuDialog.roleId,
          userId: this.$store.state.user.userInfo.userId,
          menuIds: ids
        }
      }
      const res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.$message({ showClose: true, message: '保存成功', type: 'success' })
      } else {
        this.$message({ showClose: true, message: res.msg, type: 'error' })
      }
      this.cancelMenuDialog()
    },
    // 关闭人员弹出框
    cancelUserDialog() {
      Object.assign(this.userDialog, this.$options.data().userDialog)
    },
    // 初始化角色人员信息
    async searchUser() {
      const params = {
        url: '/manage/getUsersByRoleId',
        params: {
          currentPage: this.userDialog.page.currentPage,
          pageSize: this.userDialog.page.pageSize,
          searchData: this.userDialog.searchData
        }
      }
      const res = await this.$store.dispatch('http/post', params)
      this.userDialog.tableData = res.data.dataList
      this.userDialog.page.total = res.data.total
    },
    // 删除角色人员信息
    deleteRoleUser(val) {
      this.$confirm(`确定从该角色中移除${val.userName}用户？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const params = {
          url: '/manage/deleteRoleUser',
          params: {
            roleId: this.userDialog.searchData.roleId,
            userId: val.userId
          }
        }
        this.userDialog.loading = true
        const res = await this.$store.dispatch('http/post', params)
        if (res.code === '200') {
          this.$message({ showClose: true, message: '删除成功', type: 'success' })
          this.searchUser()
        } else {
          this.$message({ showClose: true, message: res.msg, type: 'error' })
        }
        this.userDialog.loading = false
      }).catch(() => {
        this.$message({ message: '已取消删除', type: 'info' })
      })
    },
    // 每页条数事件
    dialogSizeChange(val) {
      this.userDialog.page.pageSize = val
      this.searchUser()
    },
    // 翻页事件
    dialogCurrentChange(val) {
      this.userDialog.page.currentPage = val
      this.searchUser()
    },
    // 停用角色
    async stopRole(val) {
      const params = {
        url: '/manage/stopRole',
        params: {
          roleId: val.roleId,
          isUsed: val.isUsed
        }
      }
      const res = await this.$store.dispatch('http/post', params)
      if (res.code === '200') {
        this.roleDialog.form.isUsed = this.roleDialog.form.isUsed === 1 ? 0 : 1
        this.$message({ showClose: true, message: `${this.roleDialog.form.isUsed === 1 ? '启用' : '禁用'}成功`, type: 'success' })
        this.loadRoleData()
      } else {
        this.$message({ showClose: true, message: '该角色已经使用，禁止停用', type: 'warning' })
      }
    }
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .roleUserFooter{
    background-color: #f1f5f9;
  }
  .right{
    float: right;
    margin-right: 2rem;
  }
  .left{
    float: left;
    padding-left: 3px;
  }
  .container{
    background-color: #18111f;
    height: calc(100vh - 84px);
    padding: 25px;
  }
  .main{
    height: 100%;
    font-size: 15px;
    background: #fff;
    position: relative;
    border-radius: 5px;
    &:hover {
      box-shadow: 2px 2px 10px #888888;
    }
  }
</style>

