<script>
export default {
  name: "Dept",
  data() {
    return {
      queryform: {
        deptName: "",
      },
        rules: {
        // parentId: [{ required: true, message: "请选择", trigger: "blur" }],
        deptName:  [{ required: true, message: "请输入", trigger: "blur" }],
        userName:  [{ required: true, message: "请选择", trigger: "blur" }],
      },
      columns: [
        {
          label: "部门名称",
          prop: "deptName",
        },
        {
          label: "负责人",
          prop: "userName",
        },
        {
          label: "更新时间",
          prop: "updateTime",
        },
        {
          label: "创建时间",
          prop: "CreateTime",
        },
      ],
      pager: {
        pageNum: 1,
        PageSize: 10,
        total: 10,
      },
      deptList: [],
      userList: [],
      deptform:{
        parentId:[null]
      },
      showModel:false,
      action:'create'
    }
  },
  mounted() {
    this.getDeptList()
    this.getuserAllList1()
  },
  methods: {
    async getDeptList() {
      let res = await this.$api.getdeptlist(this.queryform)
      console.log(res, "dsds")
      this.deptList = res
    },
    handleCreate(){
        this.action = 'create'
        this.showModel = true
    },
    async  getuserAllList1(){
       this.userList = await this.$api.userAllList()
    },
    handlereset4(form) {
      this.$refs[form].resetFields()
    },
    handleEdit(row){
        this.action = 'edit'
        this.showModel = true
        this.$nextTick(()=>{
            Object.assign(this.deptform,row,{userName:`${row.userId}/${row.userName}/${row.userEmail}`})
        })
    },
    async handleDelete(_id){
        this.action = 'delete'
       await this.$api.getDeptoperate({action:this.action,_id})
       this.$message.success('删除成功')
           this.getDeptList()
    },
    handleCancel(){
        this.handlereset4('deptform')
        this.showModel  = false
    },
    handelDetermine(){
        this.$refs.deptform.validate( async (vaild)=>{
            // console.log(vaild,'pppppppppppppppppppp')
            if(vaild){
                let params = { ...this.deptform, action : this.action }
                delete params.userEmail
                let res = await this.$api.getDeptoperate(params)
                if(res){
                    this.$message.success('创建成功')
                    this.handleCancel()
                     this.getDeptList()
                }
            }
        })
    },
    handleCloseDialog1(){
        this.handlereset4('deptform')
        this.showModel  = false
    },
    handleUser9(val){
            // console.log(val,'vcvcvcvcv')
        const [ userName, userId, userEmail ]  = val.split('/')
        // console.log(userName, userId, userEmail)
        Object.assign(this.deptform,{ userName, userId, userEmail })
    },
    handlequery1(){
        this.getDeptList()
    }
  },
}
</script>
<template>
  <div class="dept-manager">
    <div class="query-from">
      <el-form
        :inline="true"
        class="from-list"
        :model="queryform"
        ref="queryfrom2"
      >
        <el-form-item label="部门名称" prop="deptName">
          <el-input v-model="queryform.deptName" placeholder="输入部门名称" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handlequery1">查询</el-button>
          <el-button @click="handlereset4('queryfrom2')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handleCreate">创建</el-button>
      </div>

      <!-- el table -->
      <el-table
        :data="deptList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :tree-props="{ children: 'children' }"
        row-key="_id"
        stripe
      >
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
          :formatter="item.formatter"
        />
        <!-- 操作 -->
        <el-table-column label="操作" width="160">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
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
    </div>

    <el-dialog
      v-model="showModel"
      :title="action == 'create' ? '创建部门' : '编辑部门'"
      :before-close="handleCloseDialog1"
    >
      <el-form
        label-width="120px"
        ref="deptform"
        :rules="rules"
        :model="deptform"
      >
        <el-form-item label="上级部门" prop="parentId">
          <el-cascader
            :options="deptList"
            :props="{ value: '_id', label: 'deptName', checkStrictly: true }"
            clearable
            v-model="deptform.parentId"
            :show-all-levels="true"
          />
        </el-form-item>
        <el-form-item label="部门名称" prop="deptName">
          <el-input
            :rows="2"
            v-model="deptform.deptName"
            placeholder="请输入部门"
          />
        </el-form-item>
        <el-form-item label="负责人" prop="userName">
          <el-select placeholder="请选择负责人" v-model="deptform.userName" @change='handleUser9'>
            <el-option
              v-for="item in userList"
              :key="item.userId"
              :label="item.userName"
              :value="`${item.userName}/${item.userId}/${item.userEmail}`"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="邮箱" prop="userEmail">
          <el-input
            :rows="2"
            v-model="deptform.userEmail"
            placeholder="请输入邮箱"
            disabled
          />
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
<style lang="scss"></style>
