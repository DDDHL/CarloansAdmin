<script setup lang="ts">
import { usePublicStore } from '@/stores'
import type { UploadProps } from 'element-plus'
import { message, logOut } from '@/utils'
const serverUrl = import.meta.env.VITE_BASE_URL
const publicStore = usePublicStore()

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  res
) => {
  if (res.resultCode === 480) {
    logOut()
  }
  //publicStore.userInfo.avatarUrl = URL.createObjectURL(uploadFile.raw!)
  publicStore.userInfo.avatarUrl = res.result.data.url
}

let token = ref<string | null>('')
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  token.value = localStorage.getItem('accessToken')
  if (!['image/png', 'image/jpeg'].includes(rawFile.type)) {
    message('只能上传PNG或者JPG格式图片哦~', 'warning')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    message('图片大小不能超过4MB哦~', 'warning')
    return false
  }
  return true
}

</script>

<template>
  <div class="userMain">
    <el-card class="card">
      <div class="avatar">
        <el-upload class="avatar-uploader" :show-file-list="false" :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload" :action="`${serverUrl}/carLoan-api/sys/account/uploadAvatarUrl`" :data="{
            identifier: publicStore.userInfo.identifier
          }" :headers="{
  accessToken: token
}">
          <img v-if="publicStore.userInfo.avatarUrl" :src="publicStore.userInfo.avatarUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </div>
      <el-divider>
        <el-icon><star-filled /></el-icon>
      </el-divider>
      <div class="info">
        <Douyin />
        <div class="infoInput">
          <!-- <el-select clearable style="width: 30vw" v-model="publicStore.userInfo.sex" placeholder="性别">
            <template #prefix>
              <el-icon size="16">
                <component :is="options.get(publicStore.userInfo.sex)" />
              </el-icon>
            </template>
            <el-option label="女" :value="0"></el-option>
            <el-option label="男" :value="1"></el-option>
            <el-option label="中" :value="2"></el-option>
            <el-option label="不知道" :value="3"></el-option>
          </el-select> -->
          <el-input :value="publicStore.userInfo.sex ? '男' : '女'" placeholder="请输入性别"
            :prefix-icon="publicStore.userInfo.sex ? 'Male' : 'Female'" disabled />
          <el-input v-model="publicStore.userInfo.age" placeholder="请输入年龄" prefix-icon="Calendar" disabled />
          <el-input v-model="publicStore.userInfo.phone" placeholder="请输入手机号" prefix-icon="Iphone" disabled />
          <el-input v-model="publicStore.userInfo.gradeLevel" placeholder="请输入学历" prefix-icon="School" disabled />
          <el-input v-model="publicStore.userInfo.political" placeholder="请输入政治面貌" prefix-icon="InfoFilled" disabled />
          <el-input v-model="publicStore.userInfo.nativePlace" placeholder="请输入地区" prefix-icon="MapLocation" disabled />
          <el-input v-model="publicStore.userInfo.address" placeholder="请输入住址" prefix-icon="LocationInformation"
            disabled />
          <el-button type="primary" round>Primary</el-button>
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
      display: flex;
      justify-content: center;

      img {
        border: 1px solid #8c939d;
        border-radius: 10px;
        width: 80px;
        height: 80px;
        object-fit: contain;
      }
    }

    .info {
      .infoInput {
        margin-top: 1vh;
        height: 40vh;
        width: 30vw;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
      }
    }
  }
}
</style>