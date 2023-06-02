<script setup lang="ts">
import router from "@/router";
import { usePublicStore } from "@/stores";
import { storeToRefs } from "pinia";
import { getUserInfo } from '@/api'
import { logOut } from '@/utils'
import avatar from '@/assets/picture/avatar.jpg'
import avatar2 from '@/assets/picture/avatar2.jpg'
const publicStore = usePublicStore()
const { fullLoading, asideShow, breadList } = storeToRefs(publicStore)
fullLoading.value = true
let timer: number[] = []
let ws: WebSocket | undefined = undefined

onMounted(() => {
  timer.forEach(item => clearTimeout(item))
  userInfo()
})

const userInfo = async () => {
  let userRes: any = await getUserInfo(localStorage.getItem('accountId')!)
  if (userRes.resultCode && userRes.resultCode === 200) {
    publicStore.userInfo = userRes.result.data
    publicStore.role = userRes.result.data.role
    if (publicStore.role === '管理员') {
      publicStore.userInfo.avatarUrl = avatar
    } else {
      publicStore.userInfo.avatarUrl = avatar2
    }
    publicStore.menuListFlash()
    router.push('/User')
    wsHandel()
    timer.push(window.setTimeout(() => {
      fullLoading.value = false
      ElNotification({
        title: '登录成功',
        message: '欢迎回来~',
        type: 'success',
      })
    }, 1500))
  } else {
    timer.push(window.setTimeout(() => {
      fullLoading.value = false
      logOut()
    }, 1500))
  }
}
let heartTimerReq = 0
let heartTimerRes = 0
const wsHandel = () => {
  ws && ws.close()
  ws = new WebSocket(`ws://${import.meta.env.VITE_WS_URL}/carLoan-api/information/websocket?accessToken=${localStorage.getItem('accessToken')}`)

  ws.onopen = () => {
    // 心跳
    heartTimerReq = window.setInterval(() => {
      ws?.send('ping')
      heartTimerRes = window.setTimeout(() => {
        // 55s没收到心跳，重启
        window.clearInterval(heartTimerReq)
        window.clearTimeout(heartTimerRes)
        wsHandel()
      }, 55 * 1000)
    }, 60 * 1000)
  }

  ws.onmessage = (e: any) => {
    if (e.data === 'pong') {
      // 收到回应，清除定时器
      window.clearTimeout(heartTimerRes)
      return
    }
    let data = JSON.parse(e.data)
    if (data.type === 'borrowStatus') {
      publicStore.menuList.forEach((item, index) => {
        if (item.name === '借款状态') {
          publicStore.menuList[index].msgNum += 1
        }
      })
    } else if (data.type === 'mortgage') {
      publicStore.menuList.forEach((item, index) => {
        if (item.name === '抵押列表') {
          publicStore.menuList[index].msgNum += 1
        }
      })
    }
  }
  ws.onclose = (e) => {
    if (e.code !== 1000) {
      // 非正常关闭，重连
      wsHandel()
    }
  }
}

const closeBread = (index: number, isSelect: boolean) => {
  let url = publicStore.breadSelect(index, 'close', isSelect)!
  if (isSelect && breadList.value.length >= 1) {
    router.push(url)
  }
}

const go = (index: number, url: string) => {
  publicStore.breadSelect(index)
  router.push(url)
}

onBeforeUnmount(() => {
  ws && ws.close()
  timer.forEach(item => clearTimeout(item))
})
</script>

<template>
  <div class="homeMain">
    <loading v-show="fullLoading" />
    <el-container>
      <el-aside :width="asideShow ? '60px' : '10%'" class="aside">
        <Aside />
      </el-aside>
      <el-container>
        <el-header class="header">
          <Header />
        </el-header>
        <el-main class="main">
          <div class="card">
            <div class="bread">
              <div v-for="item, index in breadList" :key="item.name" class="item"
                :style="item.selectType ? 'color:#2279f7' : 'color:#cdcdcd'" @click="go(index, item.url)">
                {{ item.name }}
                <el-icon size="14" @click.stop="closeBread(index, item.selectType)">
                  <component is="Close" />
                </el-icon>
              </div>
            </div>
          </div>
          <router-view v-slot="{ Component }">
            <transition enter-active-class="animate__animated animate__bounceInUp">
              <component :is="Component" />
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.homeMain {
  width: 100%;
  height: 100%;
  position: relative;


  .header {
    background-color: #fff;
    height: 60px;
  }

  .aside {
    background-color: #384548;
    height: 100vh;
    transition: width .3s;
  }

  .main {
    background-color: #f5f7f9;
    overflow: hidden;

    .card {
      height: 30px;
      margin: -10px 0 15px 0;
      width: 100%;

      .bread {
        display: flex;

        .item {
          line-height: 35px;
          height: 35px;
          margin: 0 5px;
          width: 100px;
          text-align: center;
          border-radius: 5px;
          cursor: pointer;
          box-shadow: 3px 3px 5px #dedede;
          background-color: #fff;
          display: flex;
          justify-content: center;
          align-items: center;

          .el-icon {
            margin-left: 5px;

            &:hover {
              color: rgb(231, 31, 31);
              font-weight: bold;
            }
          }

          &:active {
            background-color: #f1f1f1;
          }
        }
      }
    }
  }
}
</style>
