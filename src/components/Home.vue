<script>
  export default{
    name:"home",
  }
</script>

<template>
  <div class="basic_layout">
      <div class="nav_left">11</div>
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
