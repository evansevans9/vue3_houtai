<script setup>
import { reactive, onMounted,ref,getCurrentInstance} from "vue"
onMounted((ww) => {
  console.log("---onMounted---")
  getuserlist1()
})
const user = reactive({
    state:0
})
const pager = reactive({
    pageNum:1,
    PageSize:10,
    total:10
})
const { proxy } = getCurrentInstance();
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
  },
  {
    label: "用户状态",
    prop: "state",
  },
  {
    label: "注册时间",
    prop: "createTime",
  },
  {
    label: "登录事件",
    prop: "lastLoginTime",
  },
])
const getuserlist1 = async ()=>{
    let params = {...user,...pager}
   console.log(await proxy.$api.getserList(),'vvvvvvvvvv') 
   const { page ,list}  =  await proxy.$api.getserList(params)
   pager.total = page.total
   userList.value = list
}
const handlequery = ()=>{
    getuserlist1()
    // console.log('sssssssssssssss')
}
const handlereset = ()=>{
    proxy.$refs.from1.resetFields()
}
const handleCurrentChange =(val)=>{
    pager.pageNum = val
    getuserlist1()
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
          <el-button @click="handlereset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
      <div class="action">
        <el-button type="primary">新增</el-button>
        <el-button type="danger">批量删除</el-button>
      </div>
      <el-table :data="userList" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column
          v-for="item in columns"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :width="item.width"
        />
        <!-- 操作 -->
        <el-table-column  label="操作" width="160">
      <template #default>
        <el-button type="primary" size="mini" @click="handleClick"
          >编辑</el-button
        >
        <el-button type="primary" size="mini">删除</el-button>
      </template>
    </el-table-column>
      </el-table>
      <el-pagination background layout="prev, pager, next" :total="pager.total"  class="pagination"  @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<style lang="scss">
.from-list {
  padding: 20px 20px;
}
.pagination{
    margin-right: 10px;
}
</style>
