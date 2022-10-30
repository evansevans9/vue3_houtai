<script>
import utils from "../utils/utils"
export default{
    name:'menu',
    data(){
        return{
     menuFrom:{},
     menuList:[]
        }
    },
    methods: {
        handlequery1(){

        },
        handlereset1(){

        },
        handleEdit1(){

        },
        handleDelete1(){

        }
    },
}

</script>
<template>
  <div class="user-manager">
    <div class="query-from">
      <el-form :inline="true" class="from-list" :model="menuFrom" ref="from1">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuFrom.menuName" placeholder="输入菜单名称" />
        </el-form-item>

        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="menuFrom.menuState" placeholder="Activity zone">
            <el-option label="正常" :value="1" />
            <el-option label="禁用" :value="2" />
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handlequery1">查询</el-button>
          <el-button @click="handlereset1()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="base-table">
      <div class="action">
        <el-button type="primary" @click="handeleAddUser">创建</el-button>
       
        >
      </div>
      <!-- el table -->
      <el-table
        :data="menuList"
        style="width: 100%"
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
            <el-button type="primary" size="mini" @click="handleEdit1(scope.row)" 
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="handleDelete1(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹出的dialog 对话框 -->

    <el-dialog v-model="showModel" title="新增用户" :before-close="handleClose1">
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
