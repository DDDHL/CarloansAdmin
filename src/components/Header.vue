<script setup lang="ts">
import { usePublicStore } from "@/stores";
import { storeToRefs } from "pinia";
import avatarUrl from '@/assets/picture/avatar.jpg'
import router from '@/router'
const publicStore = usePublicStore()
const { asideShow, fullLoading, fullScreen, breadList, userInfo } = storeToRefs(publicStore)

const reFresh = () => window.location.reload()

const loginOut = () => {
  fullLoading.value = true
  window.setTimeout(() => {
    router.push('/')
  }, 3000)
}

const info = () => {
  ElNotification({
    title: '查看消息',
    message: '没做，别点了别点了',
    type: 'info',
    position: 'bottom-right',
  })
}

const changeScreen = () => {
  switch (fullScreen.value) {
    case true:
      document.exitFullscreen();
      break;
    case false:
      document.documentElement.requestFullscreen()
      break;
  }
  fullScreen.value = !fullScreen.value
}
</script>

<template>
  <div class="headerMain">
    <el-row>
      <el-col :span="8">
        <div class="icon">
          <el-icon @click="asideShow = !asideShow" size="25">
            <component v-if="!asideShow" is="Fold" />
            <component v-else is="Expand" />
          </el-icon>
          <el-icon @click="reFresh" size="25" class="reFresh">
            <component is="RefreshRight" />
          </el-icon>
          <p>{{ `Dashboard / ${breadList.find(i => i.selectType)?.name}` }}</p>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="grid-content ep-bg-purple-light" />
      </el-col>
      <el-col :span="8">
        <div class="avatar">
          <div class="rightIcon">
            <el-badge :value="12" style="margin-top: 4px;">
              <el-icon size="28" @click="info">
                <component is="Message" />
              </el-icon>
            </el-badge>
            <el-icon @click="changeScreen" size="25">
              <component v-if="!fullScreen" is="FullScreen" />
              <component v-else is="Crop" />
            </el-icon>
          </div>
          <el-popover :width="200"
            popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
            placement="bottom-start">
            <template #reference>
              <el-avatar :size="40" :src="avatarUrl" />
            </template>
            <template #default>
              <div class="popoverAvatar">
                <div class="userName">
                  <p style="font-weight: bold;">{{ userInfo.name }}</p>
                  <p style="margin: 0; font-size: 14px; color: var(--el-color-info)">&nbsp;@管理员</p>
                </div>
                <el-button type="danger" size="small" @click="loginOut">退出登录</el-button>
              </div>
            </template>
          </el-popover>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<style scoped lang="scss">
$height: 58px;

.el-icon {
  cursor: pointer;
}

.headerMain {

  .icon {
    display: flex;
    align-items: center;
    height: $height;
    width: 300px;
    justify-content: space-around;

    >p {
      width: 200px;
    }

    .reFresh {
      &:hover {
        animation: iconRoate 3s linear infinite;
      }
    }
  }

  .rightIcon {
    height: $height;
    width: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 20px;
  }

  .avatar {
    height: $height;
    display: flex;
    align-items: center;
    justify-content: right;
    margin-right: 10px;

    >.el-avatar:hover {
      cursor: pointer;
    }
  }

  @keyframes iconRoate {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(365deg);
    }
  }
}

.popoverAvatar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .userName {
    display: flex;
    margin-bottom: 10px;
  }
}
</style>