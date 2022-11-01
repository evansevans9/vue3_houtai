<script>
import utils from "../utils/utils"
export default {
  name: "menu",
  data() {
    return {
      queryFrom: {
        menuState: 1,
      },
      showModel: false,
      action: "add",
      menuList: [],
      menuFrom: {
        menuType: 1,
        menuState: 1,
        parentId: [null],
      },
      rules: {
        menuName: [{ required: true, message: "请输入", trigger: "blur" }],
        icon: [{ required: true, message: "请输入", trigger: "blur" }],
      },
      
      columns: [
        {
          label: "菜单名称",
          prop: "menuName",
        },
        {
          label: "图标",
          prop: "menuName",
        },
        {
          label: "权限标识",
          prop: "menuCode",
        },
        {
          label: "路由地址",
          prop: "path",
        },
        {
          label: "组件路径",
          prop: "component",
        },
        {
          label: "菜单状态",
          prop: "menuState",
          formatter(row, column, cellValue) {
            return {
              1: "正常",
              2: "停用",
            }[cellValue]
          },
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
    this.getmenuList()
  },
  methods: {
    async getmenuList() {
      const res = await this.$api.menulist(this.menuFrom)
      this.menuList = res
    },
    handlequery1() {
      this.menuFrom.menuName = this.queryFrom.menuName
      this.menuFrom.menuState = this.queryFrom.menuState
      this.getmenuList()
    },
    handlereset1(form) {
      this.$refs[form].resetFields()
    },
    handeleCreateMenu() {},
    handleAddmenu(type, row) {
      this.showModel = true
      this.action = "add"
      if (type == 2) {
        this.menuFrom.parentId = [...row.parentId, row._id].filter(
          (item) => item
        )
      }
    },
    handleEditmenu(row) {
      this.showModel = true
      this.action = "edit"
      // this.menuFrom  = row
      this.$nextTick(() => {
        Object.assign(this.menuFrom, row)
      })
    },
    async handleDeletemenu(_id) {
      await this.$api.menuSubmit({ _id, action: "delete" })
      this.$message.success("删除成功")
      this.getmenuList()
    },
    handleCancel() {
      this.handlereset1("formdialog")
      this.showModel = false
    },
    handelDetermine() {
      this.$refs.formdialog.validate(async (val) => {
        if (val) {
          let { action, menuFrom } = this
          let params = { ...menuFrom, action }
          await this.$api.menuSubmit(params)
          this.showModel = false
          this.$message.success("操作成功")
          this.handlereset1("formdialog")

          setTimeout(() => {
            this.getmenuList()
          }, 3000)
        }
      })
    },
    handleCloseDialog() {
      this.handlereset1("formdialog")
      this.showModel = false
    },
  },
}
</script>
<template>
  <div class="user-manager">
    <div class="query-from">
      <el-form :inline="true" class="from-list" :model="queryFrom" ref="from1">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="queryFrom.menuName" placeholder="输入菜单名称" />
        </el-form-item>

        <el-form-item label="菜单状态" prop="menuState">
          <el-select v-model="queryFrom.menuState" placeholder="Activity zone">
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
        <el-button type="primary" @click="handleAddmenu(1)">创建</el-button>
      </div>
      <!-- el table -->
      <el-table
        :data="menuList"
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
        <el-table-column label="操作" width="250">
          <template #default="scope">
            <el-button
              type="primary"
              size="mini"
              @click="handleAddmenu(2, scope.row)"
              >新增</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="handleEditmenu(scope.row)"
              >编辑</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="handleDeletemenu(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹出的dialog 对话框 -->

    <el-dialog
      v-model="showModel"
      title="新增菜单"
      :before-close="handleCloseDialog"
    >
      <el-form
        :model="menuFrom"
        ref="formdialog"
        label-width="120px"
        :rules="rules"
      >
        <el-form-item label="父级菜单" prop="parentId">
          <el-cascader
            :options="menuList"
            :props="{ value: '_id', label: 'menuName' }"
            clearable
            v-model="menuFrom.parentId"
          />
          <span>不选默认创建一级菜单</span>
        </el-form-item>
        <el-form-item label="菜单类型" prop="menuType">
          <el-radio-group v-model="menuFrom.menuType" class="ml-4">
            <el-radio :label="1" size="large">菜单</el-radio>
            <el-radio :label="2" size="large">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="menuFrom.menuName" placeholder="请输入菜单名称" />
        </el-form-item>
        <el-form-item
          label="菜单图标"
          prop="icon"
          v-show="menuFrom.menuType == 1"
        >
          <el-input v-model="menuFrom.icon" placeholder="请输入图标" />
        </el-form-item>
        <el-form-item
          label="菜单路径"
          prop="path"
          v-show="menuFrom.menuType == 1"
        >
          <el-input v-model="menuFrom.path" placeholder="请输入路径" />
        </el-form-item>

        <el-form-item
          label="权限标识"
          prop="menuCode"
          v-show="menuFrom.menuType == 2"
        >
          <el-input v-model="menuFrom.menuCode" placeholder="请输入权限标识" />
        </el-form-item>

        <el-form-item
          label="路由地址"
          prop="component"
          v-show="menuFrom.menuType == 1"
        >
          <el-input v-model="menuFrom.component" placeholder="请输入路由地址" />
        </el-form-item>
        <el-form-item label="菜单状态" prop="menuState">
          <el-radio-group v-model="menuFrom.menuState" class="ml-4">
            <el-radio :label="1" size="large">正常</el-radio>
            <el-radio :label="2" size="large">停用</el-radio>
          </el-radio-group>
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
