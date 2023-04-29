<script setup lang="ts">
import { usePublicStore } from '@/stores'
import avatarUrl from '@/assets/picture/avatar.jpg'
const publicStore = usePublicStore()
const options: any = new Map([
  [0, 'Female'],
  [1, 'Male'],
  [2, 'Pointer'],
  [3, 'Delete'],
])
</script>

<template>
  <div class="userMain">
    <el-card class="card">
      <div class="avatar">
        <el-avatar :size="200" :src="avatarUrl" />
      </div>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div class="info">
        <Douyin />
        <div class="infoInput">
          <el-input v-model="publicStore.userInfo.name" placeholder="请输入名字" prefix-icon="Avatar" />
          <el-select clearable style="width: 30vw" v-model="publicStore.userInfo.sex" placeholder="性别">
            <template #prefix>
              <el-icon size="16">
                <component :is="options.get(publicStore.userInfo.sex)" />
              </el-icon>
            </template>
            <el-option label="女" :value="0"></el-option>
            <el-option label="男" :value="1"></el-option>
            <el-option label="中" :value="2"></el-option>
            <el-option label="不知道" :value="3"></el-option>
          </el-select>
          <el-input v-model="publicStore.userInfo.age" placeholder="请输入年龄" prefix-icon="Calendar" />
        </div>
      </div>
      <Wave />
    </el-card>
  </div>
</template>
<style scoped lang="scss">
.userMain {
  width: 100%;
  position: relative;
  overflow: hidden;

  .card {
    height: 85vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .avatar {
      margin-top: 3vh;
      display: flex;
      justify-content: center;
    }

    .info {
      .infoInput {
        margin-top: 2vh;
        height: 18vh;
        width: 30vw;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
  }
}
</style>