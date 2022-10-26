<script>
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Switch,
  Bell,
  ArrowDown
} from '@element-plus/icons-vue'
  export default{
    name:"home",
    components:{
        setting:Setting,
        switch1:Switch,
        bell:Bell,
        ArrowDown
      },
    data(){
      return{
        isCollapse:false,
        userInfo:{
          name:'zhuming',
          email:1228838848,
          www:'退出'
        },
        noticCount:0,
        userMenu:[]
      }

    },
    mounted() {
      // this.getnoticCount()
      this.getmenulist()
    },
    methods: {
      handleCommand(val){
        console.log(val)
        if(val == 'a')return
        else{
          this.$store.commit('saveuserInfo','')
          this.userInfo =  {
            name:'',
          email:'',
          www:''
          };
          this.$router.push('/login')
        }
      },
      toggle(){
        this.isCollapse  = !this.isCollapse
      },

      //  getnoticCount(){
      //   this.$api.noticCount((res)=>{
      //       console.log(res)
      //   })
      //   console.log(res,'dsdsdsdsdsdsdss')
      //   console.log(res)
      // }
       async getmenulist(){
       const res =  await this.$api.menulist()
        this.userMenu = res
        console.log(res,'090')
      }
    },
  }
</script>

<template>
  <div class="basic_layout">
      <div :class='["nav_left",isCollapse ? "fold" : "unfold"]'>
          <div class="logo">
            <img src="../assets/images/welcome.png" alt="">
            <span>{{isCollapse ? '' : 'xx后台管理系统'}}</span>
          </div>

          <!-- 菜单栏menu -->
          <el-menu
        active-text-color="#ffd04b"
        background-color="#001529"
        class="nav_menu"
        default-active="2"
        text-color="#fff"
        :collapse="isCollapse"
        router
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
            <span>审批管理</span>
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
      <div :class='["content_right",isCollapse ? "fold" : "unfold"]'>
        <div class="nav_top">
          <div class="nav_top1">
            <el-icon><switch1 class="menu_seting" @click="toggle"/></el-icon>
            <div class="bread">面包屑</div>
          </div>
          
          <div class="user_info">
            <el-badge :is-dot='true' class="user_badge">
              <el-icon class="el_bell">
                <bell />
              </el-icon>
            </el-badge>
            <!-- 最右 -->
            <el-dropdown @command="handleCommand">
              <span class="el_dropdown1">
              {{userInfo.name}}
                <el-icon class="el_arrow">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="a">{{userInfo.email}}</el-dropdown-item>
                  <el-dropdown-item command="b">{{userInfo.www}}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
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
    // overflow-y: auto;
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
    .nav_menu{
      border-right: none;
      height: calc(100vh - 50px);
    }
    &.fold{
      width: 64px;
    }
    &unfold{
      width: 200px;
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
      .nav_top1{
        display: flex;
        width: 80px;
        align-items: center;
        justify-content: space-between;
      }
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
    .user_badge{
      line-height: 35px;
      margin-right: 15px;
    }
    .el_dropdown1{
      margin-top: 15px;
      cursor: pointer;
      color: #4091ff;
    }
    &.fold{
      margin-left: 64px;
    }
    &unfold{
      margin-left: 200px;
    }
  }
}
</style>
