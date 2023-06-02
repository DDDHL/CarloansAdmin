<script setup lang="ts">
import { usePublicStore } from '@/stores'
import type { UploadProps } from 'element-plus'
import { message, logOut } from '@/utils'
import { updatePassword } from '@/api'
const serverUrl = import.meta.env.VITE_BASE_URL
const publicStore = usePublicStore()

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  res, uploadFile
) => {
  if (res.resultCode === 480) {
    logOut()
  }
  publicStore.userInfo.avatarUrl = URL.createObjectURL(uploadFile.raw!)
  //publicStore.userInfo.avatarUrl = res.result.data.url
}

let dialogVisible = ref(false)
let saveLoading = ref(false)
let firstPs = ref('')
let secondPs = ref('')
const updateConfirm = async () => {
  saveLoading.value = true
  if (!firstPs.value || !secondPs.value) {
    message('请输入密码!', 'warning')
    saveLoading.value = false
    return
  }
  if (firstPs.value === secondPs.value) {
    let res: any = await updatePassword(firstPs.value)
    if (res.resultCode === 200) {
      message('修改成功', 'success')
      dialogVisible.value = false
    } else {
      message(res.message || '新增失败!', 'error')
    }
  } else {
    message('两次密码不相同!', 'warning')
  }
  saveLoading.value = false
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
          <el-input :value="publicStore.userInfo.sex ? '男' : '女'" placeholder="请输入性别"
            :prefix-icon="publicStore.userInfo.sex ? 'Male' : 'Female'" disabled />
          <el-input v-model="publicStore.userInfo.age" placeholder="请输入年龄" prefix-icon="Calendar" disabled />
          <el-input v-model="publicStore.userInfo.phone" placeholder="请输入手机号" prefix-icon="Iphone" disabled />
          <el-input v-model="publicStore.userInfo.gradeLevel" placeholder="请输入学历" prefix-icon="School" disabled />
          <el-input v-model="publicStore.userInfo.political" placeholder="请输入政治面貌" prefix-icon="InfoFilled" disabled />
          <el-input v-model="publicStore.userInfo.nativePlace" placeholder="请输入地区" prefix-icon="MapLocation" disabled />
          <el-input v-model="publicStore.userInfo.address" placeholder="请输入住址" prefix-icon="LocationInformation"
            disabled />
          <el-button type="primary" round @click="dialogVisible = true">修改密码</el-button>
        </div>
      </div>
      <Wave />
    </el-card>

    <el-dialog v-model="dialogVisible" title="修改密码" width="25vw" height="30vh" align-center center>
      <div class="password">
        <el-input type="password" v-model="firstPs" placeholder="请输入密码" prefix-icon="Lock" />
        <el-input type="password" v-model="secondPs" placeholder="请再次输入密码" prefix-icon="Lock" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="saveLoading" @click="updateConfirm">
            修改密码
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style scoped lang="scss">
.userMain {
  width: 100%;
  position: relative;
  overflow: hidden;

  .password {
    height: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

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