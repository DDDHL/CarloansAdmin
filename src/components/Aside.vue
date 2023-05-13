<script setup lang="ts">
import { usePublicStore } from "@/stores";
import { storeToRefs } from "pinia";
const publicStore = usePublicStore()
const { asideShow, breadList, menuList } = storeToRefs(publicStore)

const handleOpen = (key: string) => {
  let now = menuList.value.find(item => item.url === key)!
  let breadIndex = breadList.value.findIndex(item => item.url === key)
  // 已有面包屑
  if (breadIndex !== -1) {
    publicStore.breadSelect(breadIndex)
    return
  }
  // 未有面包屑，新增
  let userSelectPath = {
    name: now.name,
    url: key,
    selectType: true,
  }
  breadList.value.push(userSelectPath)
  publicStore.breadSelect(breadList.value.length - 1)
}
</script>
<template>
  <div class="asideMain ">
    <div class="logo">
      <img src="/vite.svg" alt="logo">
      <div class="text animate__animated animate__bounceInLeft" v-if="!asideShow">CARCOLOANS</div>
    </div>
    <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :collapse="asideShow" @select="handleOpen"
      background-color="#384548" text-color="#fff" :collapse-transition="false" router>
      <el-menu-item v-for="item in menuList" :key="item.name" :index="item.url"
        :style="asideShow ? 'margin-left:-2px' : 'margin-left: -15px;'">
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <template #title>
          <el-badge v-show="item.msgNum" :value="item.msgNum" :max="99" class="badge">
            {{ item.name }}
          </el-badge>
          <div v-show="!item.msgNum">
            {{ item.name }}
          </div>
        </template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.asideMain {
  overflow: hidden;



  .badge {
    position: relative;

    :deep(.el-badge__content) {
      top: 28.5px;
      right: -9px;
    }
  }


  .logo {
    height: 60px;
    width: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    border-bottom: 1px solid #dedede;
    cursor: pointer;

    .text {
      font-size: 1.8vh;
      color: aquamarine;
    }
  }

  :deep(.el-menu) {
    border: none;
  }

  :deep(.el-menu-item) {
    justify-content: center;
  }
}
</style>