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
      showModel:false,
      pager: {
        pageNum: 1,
        PageSize: 10,
        total: 1,
      },
       rules: {
        roleName: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      roleFrom:{},
      action : "",
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
  },
  methods: {
    async getroleList() {
      const { list, page } = await this.$api.rolelist(this.queryFrom)
      this.pager = page
      this.roleList = list
    },
    handleAdd2(){
      this.action = 'add'
      this.showModel = true
    },
      handlereset1(form) {
      this.$refs[form].resetFields()
    },
    handleCancel(){
      this.showModel = false
      this.handlereset1('formdialog')
    },
    handleCloseDialog(){
      this.showModel = false
      this.handlereset1('formdialog')
    },
    handelDetermine(){
      this.$refs.formdialog.validate( async (val)=>{
          if(val){
            let { action , roleFrom } = this;
         
            let params = { ...roleFrom, action }
            let res =  await this.$api.roleoperate(params)
            if(res){
              this.$message.success('操作成功')
              this.showModel = false
              this.handlereset1('formdialog')
              this.getroleList()
            }
          }
      })
    },
    handleEdit(row){
      this.action =  "edit"
      this.showModel = true
      this.$nextTick(()=>{
        this.roleFrom = row
        this.$message.success('编辑成功')
      })
    },
    async handleDelete(_id){
      await this.$api.roleoperate({_id,action:'delete'})
       this.$message.success('删除成功')
       this.getroleList()
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
            <el-button
              type="primary"
              size="mini"
              @click="handleEdit( scope.row)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="mini"
              >设置权限</el-button
            >
            <el-button
              type="primary"
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
      :before-close="handleCloseDialog"
    >
      <el-form
        :model="roleFrom"
        ref="formdialog"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="角色名字" prop="roleName">
          <el-input v-model="roleFrom.roleName" placeholder="请输入名称" />
        </el-form-item>
        <el-form-item label="菜单类型" prop="remark">
          <el-input type="text-area" :rows="2" v-model="roleFrom.remark" placeholder="请输入备注" />
        </el-form-item>

      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handelDetermine"> 确定 </el-button>
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
