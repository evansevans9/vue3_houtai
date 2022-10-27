<script>
  export default{
    name:'Breadcrumb',
    mounted() {
      console.log(this.$route,'rrrrrrrr')
    },

  }
</script>
<template>
    <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item
      ><a href="/">promotion management</a></el-breadcrumb-item
    >
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style lang="scss" scoped>

</style>