<script setup>
import { reactive, onMounted, ref, getCurrentInstance, toRaw } from "vue"
onMounted((ww) => {
  console.log("---onMounted---")
  getuserlist1()
  getroleList1()
  getdeptlist1()
})
const user = reactive({
  state: 0,
})
const pager = reactive({
  pageNum: 1,
  PageSize: 10,
  total: 10,
})
const { proxy } = getCurrentInstance()
const userList = ref([])

const columns = reactive([
  {
    label: "用户id",
    prop: "userId",
  },
  {
    label: "用户名",
    prop: "userName",
  },
  {
    label: "用户角色",
    prop: "role",
    formatter(row, column, cellValue) {
      return {
        1: "普通用户",
        0: "管理员",
      }[cellValue]
    },
  },
  {
    label: "用户状态",
    prop: "state",
    formatter(row, column, cellValue) {
      return {
        1: "在职",
        2: "离职",
        3: "试用期",
      }[cellValue]
    },
  },
  {
    label: "注册时间",
    prop: "createTime",
  },
  {
    label: "登录时间",
    prop: "lastLoginTime",
  },
])
const getuserlist1 = async () => {
  let params = { ...user, ...pager }
  // console.log(await proxy.$api.getserList(), "vvvvvvvvvv")
  const { page, list } = await proxy.$api.getserList(params)
  pager.total = page.total
  userList.value = list
}
const handlequery = () => {
  getuserlist1()
  // console.log('sssssssssssssss')
}
const handlereset = (form) => {
  proxy.$refs[form].resetFields()
}
const handleCurrentChange = (val) => {
  pager.pageNum = val
  getuserlist1()
}
// 单个删除
const handleDelete = async (row) => {
  const res = await proxy.$api.userDelete({
    userId: [row.userId],
  })

  if (res.nModified > 0) {
    proxy.$message.success("删除成功")
    getuserlist1()
  } else {
    proxy.$message.success("删除失败")
  }
  //   console.log(row, "aaaaaaaaaaazzzzzzzzz")
}
// 批量删除
const checkuserid = ref([])
const handlePiLiangDelete = async () => {
  if (checkuserid.value.length == 0) {
    proxy.$message.error("請選擇要刪除的用戶")
    return
  }
  const res = await proxy.$api.userDelete({
    userId: checkuserid.value,
  })
  if (res.nModified > 0) {
    proxy.$message.success("删除成功")
    getuserlist1()
  } else {
    proxy.$message.success("删除失败")
  }
}

const handleSelectionChange = (val) => {
  let list = []
  val.forEach((element) => {
    list.push(element.userId)
  })
  checkuserid.value = list
}
// 新增
const showModel = ref(false)
const handeleAddUser = () => {
  action.value = 'add'
  showModel.value = true
}
const userform = reactive({})
const rules = ref(
   {
    userName: {
      required: true,
      message: "请输入用户名",
      trigger: "blur",
    },
    userEmail: {
      required: true,
      message: "请输入邮箱",
      trigger: "blur",
    },
    mobile: {
      required: true,
      message: "请输入手机号",
      trigger: "blur",
    },
     job: {
      required: true,
      message: "请输入工作",
      trigger: "blur",
    },
  },
)
// 
const role1 = ref([])
const getroleList1 = async()=>{
  const res = await proxy.$api.getrouleslist()
  role1.value = res
  // console.log(role1.value,'bbbbbbbbbbbbbbbbbb3')
}
// 
const deptlist1 = ref([])
const getdeptlist1 = async ()=>{
const res = await proxy.$api.getdeptlist()
deptlist1.value = res
console.log(res,'ddddddddddddddddddddddm')
}
const handleCancel = ()=>{
  showModel.value = false;
  handlereset('formdialog')

}
const action = ref("add")
const handelDetermineAdd = ()=>{
    proxy.$refs.formdialog.validate(async(val)=>{
      if(val){
        let params =  toRaw(userform)
        params.userEmail  += '@jason.com'
        params.action = action.value
         console.log(params,'ssssssssssssssssssssssssss')
        let res = await proxy.$api.getoperate(params);
        if(res){
           showModel.value = false;
           proxy.$message.success('添加成功')
           handlereset('formdialog')
           getuserlist1()
        }
      }
    })
}
const handleEdit = (row)=>{
  action.value = 'edit'
  showModel.value = true;
  proxy.$nextTick(()=>{
    Object.assign(userform,row)
  })
}
</script>
<template>
  <div class="user-manager">
    <div class="query-from">
      <el-form :inline="true" class="from-list" :model="user" ref="from1">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="user.userId" placeholder="输入id" />
        </el-form-item>

        <el-form-item label="用户名" prop="userName">
          <el-input v-model="user.userName" placeholder="输入用户名" />
        </el-form-item>

        <el-form-item label="状态" prop="state">
          <el-select v-model="user.state" placeholder="Activity zone">
            <el-option label="所有" :value="0" />
            <el-option label="在职" :value="1" />
            <el-option label="离职" :value="2" />
            <el-option label="试用期" :value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handlequery">查询</el-button>
          <el-button @click="handlereset('from1')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handeleAddUser">新增</el-button>
        <el-button type="danger" @click="handlePiLiangDelete"
          >批量删除</el-button
        >
      </div>
      <!-- el table -->
      <el-table
        :data="userList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
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
            <el-button type="primary" size="mini" @click="handleEdit(scope.row)" 
              >编辑</el-button
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

    <el-dialog v-model="showModel" title="新增用户">
      <el-form
        :model="userform"
        ref="formdialog"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="userName" prop="userName">
          <el-input v-model="userform.userName" placeholder="请输入用户名"  :disabled='action == "edit"'/>
        </el-form-item>
        <el-form-item label="userEmail" prop="userEmail">
          <el-input v-model="userform.userEmail" placeholder="请输入邮箱" :disabled='action == "edit"'>
            <template #append>@jason.com</template>
          </el-input>
        </el-form-item>
        <el-form-item label="mobile" prop="mobile">
          <el-input v-model="userform.mobile" placeholder="请输入手机号" />
        </el-form-item>
        <el-form-item label="job" prop="job">
          <el-input v-model="userform.job" placeholder="请输入岗位" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="userform.state" placeholder="请选择">
            <el-option :value="1" label="在职"></el-option>
            <el-option :value="2" label="离职"></el-option>
            <el-option :value="3" label="试用期"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="角色" prop="roleList">
          <el-select v-model="userform.roleList" placeholder="请选择" multiple>
            <el-option  :label="item.roleName" v-for="item in role1" :key="item._id" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门" prop="deptId">
          <el-cascader
            :options="deptlist1"
            v-model="userform.deptId"
            :props='{multiple: true,checkStrictly : true,label:"deptName",value:"_id"}'
            multiple
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">取消</el-button>
          <el-button type="primary" @click="handelDetermineAdd">
            确定
          </el-button>
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
