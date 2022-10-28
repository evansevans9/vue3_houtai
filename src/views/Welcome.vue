<script>
export default {
  name: "welcome",
}
</script>

<template>
  <div class="welcome">
    <div class="content">
      <div class="title1">欢迎体验</div>
      <div class="title2">公司内部管理系统</div>
      <div class="title3">aaaaaaaaaaaaaaaaaaaaaaaaa员工管理系统</div>
    </div>
    <div class="img1"></div>
  </div>
</template>

<style lang="scss" scoped>
.welcome{
  display: flex;
  // width: 100vw;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  .content{
    position: relative;
    bottom: 30px;
    .title1{
      font-size: 40px;
      color: #333;
      line-height: 50px;
    }
    .title2{
      font-size: 40px;
      color: #409eff;
      line-height: 62px;
    }
    .title3{
      text-align: right;
      font-size: 14px;
      color: #999;
    }
  }
  .img1{
    margin-left: 130px;
    background-image: url('../assets/images/welcome.png');
    width: 371px;
    height: 438px;

  }
}
</style>
