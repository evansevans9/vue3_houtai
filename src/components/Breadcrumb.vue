<script>
export default {
  name: "Breadcrumb",
  mounted() {
    console.log(this.$route.matched, "rrrrrrrr")
  },
  computed: {
    breadlist() {
      return this.$route.matched
    },
  },
}
</script>
<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="(item, index) in breadlist" :key="index">
      <router-link to='/welcome' v-if="index == 0">{{item.meta.title}}</router-link>
      <span v-else>{{item.meta.title}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>
<style lang="scss" scoped></style>
