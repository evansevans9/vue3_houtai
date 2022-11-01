<script>
export default{
    name:'Dept',
    data() {
        return {
            queryform:{
                deptName:''
            },
            columns:[
                {
                    label:'部门名称',
                    prop:'deptName'
                },
                {
                    label:'负责人',
                    prop:'userName'
                },
                {
                    label:'更新时间',
                    prop:'updateTime'
                },
                {
                    label:'创建时间',
                    prop:'CreateTime'
                }
            ],
            pager:{
                pageNum: 1,
                PageSize: 10,
                total: 10,
                },
                deptList:[]
            }
        }
    }

</script>
<template>
  <div class="dept-manager">
    <div class="query-from">
      <el-form :inline="true" class="from-list" :model="queryform" ref="queryfrom">
        <el-form-item label="部门名称" prop="">
          <el-input v-model="queryform.deptName" placeholder="输入id" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handlequery1">查询</el-button>
          <el-button @click="handlereset1('queryfrom')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="base-table">
        <div class="action">
        <el-button type="primary">创建</el-button>
      </div>

            <!-- el table -->
      <el-table
        :data="deptList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :tree-props="{children:'children'}"
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
            <el-button  size="mini" @click="handleEdit(scope.row)" 
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
  </div>
</template>
<style lang="scss"></style>
