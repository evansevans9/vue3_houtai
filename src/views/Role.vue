<script>
import utils from "../utils/utils"
export default {
  name: "menu",
  data() {
    return {
      queryFrom: {
        roleName: "",
      },
      roleList: [],
      showModel: false,
      showPermission: false,
      curRoleName: "",
      curRoleID: "",
      menuList: [],
      pager: {
        // pageNum: 1,
        PageSize: 10,
        total: 0,
      },
      rules: {
        roleName: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      roleFrom: {},
      action: "",
      columns: [
        {
          label: "角色名称",
          prop: "roleName",
        },
        {
          label: "备注",
          prop: "remark",
        },
        {
          label: "权限列表",
          prop: "menuType",
        },
        {
          label: "创建时间",
          prop: "createTime",
          formatter(row, column, cellValue) {
            return utils.formateDate(new Date(cellValue))
          },
        },
      ],
    }
  },
  mounted() {
    this.getroleList()
    this.getmenuList1()
  },
  methods: {
    async getroleList() {
      const { list, page } = await this.$api.rolelist(this.queryFrom)
      this.pager = page
      this.roleList = list
    },
    // 创建
    handleAdd2() {
      this.action = "add"
      this.showModel = true
    },
    handlereset1(form) {
      this.$refs[form].resetFields()
    },
    // 取消
    handleClose() {
      this.showModel = false
      this.handlereset1("dialogForm")
    },
    handleCloseDialog() {
      this.showModel = false
      this.handlereset1("formdialog")
    },
    handelDetermine() {
      this.$refs.formdialog.validate(async (val) => {
        if (val) {
          let { action, roleFrom } = this

          let params = { ...roleFrom, action }
          let res = await this.$api.roleoperate(params)
          if (res) {
            this.$message.success("操作成功")
            this.showModel = false
            this.handlereset1("formdialog")
            this.getroleList()
          }
        }
      })
    },
    handleEdit(row) {
      this.action = "edit"
      this.showModel = true
      this.$nextTick(() => {
        this.roleFrom = row
      })
    },
    async handleDelete(_id) {
      await this.$api.roleoperate({ _id, action: "delete" })
      this.$message.success("删除成功")
      this.getroleList()
    },
    handleCloseDialog1() {
      // this.showPermission = false
      this.handleClose()
    },
    handleCloseDialog2() {
      this.showPermission = false
    },
    // 设置权限
    handelePermission(row) {
      this.showPermission = true
      this.curRoleName = row.roleName
      this.curRoleID = row._id
      const { checkedKeys } = row.permissionList
      setTimeout(()=>{
          this.$refs.permissionTree.setCheckedKeys(checkedKeys)
      },1000)
      
    },
    async getmenuList1() {
      let list = await this.$api.menulist()
      this.menuList = list
      this.getActionMap(list)
    },
    // 确定
    handleSubmit() {
      this.$refs.dialogForm.validate( async (val)=>{
        if(val){
          let { roleFrom,action } = this
          let params = { ...roleFrom,action }
          let res =  await this.$api.roleoperate(params)
          if(res){
            this.$message.success('创建成功')
            this.showModel = false
      this.handlereset1("dialogForm")
            this.getroleList()
          }
        }
      })
    },
   async handelDetermine1Submit(){
      let nodes = this.$refs.permissionTree.getCheckedNodes()
      let halfkeys =  this.$refs.permissionTree.getHalfCheckedKeys()
      let checkedKeys = []
      let parentKeys = []
      nodes.map(node=>{
        if(!node.children){
          checkedKeys.push(node._id)
        }else{
          parentKeys.push(node._id)
        }
      })
      let params = {
        _id:this.curRoleID,
        permissionList:{
          checkedKeys,
          halfCheckedKeys:parentKeys.concat(halfkeys)
        }
      }
     await this.$api.updatePermission(params)
     this.showPermission = false
     this.$message.success('设置成功')
      this.getroleList()
    },
    getActionMap(){
      
    }
  },
}
</script>
<template>
  <div class="role-manager">
    <div class="query-from">
      <el-form :inline="true" class="from-list" :model="queryFrom" ref="from1">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="queryFrom.roleName" placeholder="输入角色名称" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleAdd2">创建</el-button>
      </div>
      <!-- el table -->
      <el-table
        :data="roleList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        row-key="_id"
      >
        <!-- <el-table-column type="selection" width="55" /> -->
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        />
        <!-- 操作 -->
        <el-table-column label="操作" width="300">
          <template #default="scope">
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="handelePermission(scope.row)"
              >设置权限</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pager.total"
        class="pagination"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 弹出的dialog 对话框 -->

    <el-dialog
      v-model="showModel"
      title="新增角色"
      :before-close="handleCloseDialog1"
    >
      <el-form label-width="120px" :model="roleFrom" :rules="rules" ref="dialogForm">
        <el-form-item label="角色名字" prop="roleName">
          <el-input v-model="roleFrom.roleName" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="text-area"
            :rows="2"
            v-model="roleFrom.remark"
            placeholder="请输入备注"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>


<!--  -->
    <el-dialog
      v-model="showPermission"
      title="设置权限"
      :before-close="handleCloseDialog2"
    >
      <el-form
        :model="roleFrom1"
        ref="formdialog"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="角色名字" prop="roleName">
          {{ curRoleName }}
        </el-form-item>
        <el-form-item label="选择权限" prop="remark">
          <el-tree
            :data="menuList"
            :props="{ label: 'menuName' }"
            default-expand-all
            node-key="_id"
            show-checkbox
            ref="permissionTree"
          ></el-tree>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="showPermission = false">取消</el-button>
          <el-button type="primary" @click="handelDetermine1Submit"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss">
.from-list {
  padding: 20px 20px;
}
.pagination {
  margin-right: 10px;
}
</style>
