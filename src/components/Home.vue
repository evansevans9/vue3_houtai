<script>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
  export default{
    name:"home",
    components:{
        setting:Setting
      },
    data(){
      return{
        isCollapse:false
      }

    }
  }
</script>

<template>
  <div class="basic_layout">
      <div class="nav_left">
          <div class="logo">
            <img src="../assets/images/welcome.png" alt="">
            <span>xx后台管理</span>
          </div>

          <!-- 菜单栏menu -->
          <el-menu
        active-text-color="#ffd04b"
        background-color="#001529"
        class="nav_menu"
        default-active="2"
        text-color="#fff"
        :collapse="isCollapse"
      >
        <el-sub-menu index="1">
          <template #title>
             <el-icon><setting class="menu_seting"/></el-icon>
            <span>系统管理</span>
          </template>
            <el-menu-item index="1-1">用户管理</el-menu-item>
            <el-menu-item index="1-2">菜单管理</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="2">
          <template #title>
            <el-icon><setting class="menu_seting"/></el-icon>
            <span>系统管理</span>
          </template>
            <el-menu-item index="2-1">用户管理</el-menu-item>
            <el-menu-item index="2-2">菜单管理</el-menu-item>
        </el-sub-menu>

        <el-sub-menu index="3">
          <template #title>
            <el-icon><setting class="menu_seting"/></el-icon>
            <span>系统管理</span>
          </template>
            <el-menu-item index="3-1">用户管理</el-menu-item>
            <el-menu-item index="3-2">菜单管理</el-menu-item>
        </el-sub-menu>
      </el-menu>


      </div>
      <div class="content_right">
        <div class="nav_top">
          <div class="bread">面包屑</div>
          <div class="user_info">admin</div>
        </div>
        <div class="nav_down">
          <div class="main_page">
            <router-view></router-view>
          </div>
        </div>
      </div>
  </div>

</template>

<style lang="scss" scoped>
.basic_layout{
  position: relative;
  .nav_left{
    position: fixed;
    width: 200px;
    height: 100vh;
    background-color: #001529;
    overflow-y: auto;
    color: #fff;
    // 
    transition: width 0.5s;;
    .logo{
        display: flex;
        height: 50px;
        line-height: 50px;
        text-align: center;
        img{
          width: 30px;
          height: 30px;
          background-size: 100%;
          margin: 10px 15px;
        }
    }

  }
  .content_right{
    margin-left: 200px;
    .nav_top{
      height: 50px;line-height: 50px;
      display: flex;
      justify-content: space-between;
      // background: red;
      border-bottom: 1px solid #ddd;
      padding: 0 20px;
    }
    .nav_down{
      background-color: #eef0f3;
      padding: 20px;
      height: calc(100vh - 50px);
      .main_page{
        height: 100%;
        background-color: #fff;
      }
    }
  }
}
</style>
