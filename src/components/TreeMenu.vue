<script>
export default{
    name:'TreeMenu',
    props:{
        userMenu:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>
<template>
  <div class="waaa">
    <div v-for="(menu,index) in userMenu">
        <el-sub-menu :index="index" v-if="menu.children && menu.children.length > 0 && menu.children[0].menuType == 1" :key="menu._id">
      <template #title>
        <!-- <el-icon><setting class="menu_seting" /></el-icon> -->
        <!-- <i :class="menu.icon"></i> -->
        <span>{{menu.menuName}}</span>
      </template>
      <tree-menu :userMenu="menu.children"></tree-menu>
    </el-sub-menu>
    <el-menu-item v-else-if="menu.menuType ==1" :key="menu._id" :index="menu.path">{{menu.menuName}}</el-menu-item>
    </div>
  </div>
</template>
<style lang="scss" scoped>

</style>
