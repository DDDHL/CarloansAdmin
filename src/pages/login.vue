<script setup lang="ts">
import $ from 'jquery'
import { message } from '@/utils'
import router from '@/router'
import { getPhoneCode, userLogin } from '@/api'
import { usePublicStore } from '@/stores'
const publicStore = usePublicStore()
let isIn = true
let isOut = false
let span: HTMLElement
let con = ref()
let codeText = ref<any>('获取验证码')
let timer: number[] = []
let account = ref('13411394401')
let password = ref('123456')
let code = ref('1234')
let sysCode: string | undefined
onMounted(() => {
  sysCode = undefined
  init()
  ElNotification({
    title: 'Tips',
    message: '获取验证码后，点击登录~',
    type: 'success',
  })
})

const getCode = async () => {
  if ((typeof codeText.value) === 'number') return
  if (!account.value) {
    message('请先输入手机号', 'warning')
    return
  }
  codeText.value = 60
  timer.push(window.setInterval(() => {
    if (codeText.value >= 1) {
      codeText.value = codeText.value - 1
    } else {
      codeText.value = '重新获取'
    }
  }, 1000))
  //let res: any = await getPhoneCode(account.value)
  //sysCode = res.result.data.code
  sysCode = '1234'
}

const login = async () => {
  let checkOk = true
  if (!account.value) {
    $('.accountInput').addClass('wrongInput')
    checkOk = false
  } else if (!password.value) {
    $('.passwordInput').addClass('wrongInput')
    checkOk = false
  } else if (!code.value) {
    $('.codeInput').addClass('wrongInput')
    checkOk = false
  }
  setTimeout(() => {
    $('.accountInput').removeClass('wrongInput')
    $('.passwordInput').removeClass('wrongInput')
    $('.codeInput').removeClass('wrongInput')
  }, 500);
  if (!checkOk) return
  // 进入登录流程
  con.value.classList.remove('fail')
  con.value.classList.add('success');

  if (sysCode === undefined) {
    con.value.classList.add('fail')
    message('请先获取验证码', 'warning')
    return
  }
  if (sysCode !== code.value) {
    con.value.classList.add('fail')
    message('验证码错误', 'error')
    return
  }

  // 先登录，后获取用户信息
  let loginRes: any = await userLogin(account.value, password.value, code.value)
  if (loginRes.resultCode && loginRes.resultCode === 200) {
    publicStore.infoCount = loginRes.result.newInformationVO.count
    publicStore.role = loginRes.result.role
    localStorage.setItem('accountId', loginRes.result.newInformationVO.accountId)
    timer.push(window.setTimeout(() => {
      router.push('/home')
      message('登录成功')
    }, 1500))
  } else {
    con.value.classList.add('fail')
    message(loginRes.message || '登录请求错误', 'error')
  }
}

const init = () => {
  con.value.onmouseenter = (e: any) => {
    // 如果进去的门是打开的，就可以执行这个函数
    if (isIn) {
      // 获取进入的鼠标位置
      // 生成元素的位置=进入点距离窗口的距离-父盒子距离窗口的距离
      let inX = e.clientX - e.target.offsetLeft;
      let inY = e.clientY - e.target.offsetTop;

      // 创建一个span元素，并且给它对应的出生坐标
      let el = document.createElement('span');
      el.style.left = inX + 'px';
      el.style.top = inY + 'px';
      // 添加到con对应的父元素，即container
      con.value.appendChild(el);

      $('.container span').removeClass('out');    // 移除出去的动画
      $('.container span').addClass('in');        // 添加进入的动画
      span = document.querySelector('.container span')!;
      isIn = false;     // 关闭进来的门（不能使用进入的方法）
      isOut = true;     // 打开出去的门（可以使用出去的方法）
    }
  }
  // 监听鼠标出去的事件
  con.value.onmouseleave = (e: any) => {
    if (isOut) {
      // 获取出去的鼠标位置
      // 生成元素的位置=出去点距离窗口的距离-父盒子距离窗口的距离
      let outX = e.clientX - e.target.offsetLeft;
      let outY = e.clientY - e.target.offsetTop;

      $('.container span').removeClass('in');     // 移除进入的动画
      $('.container span').addClass('out');       // 添加出去的动画
      // 添加出去的坐标
      $('.out').css('left', outX + 'px');
      $('.out').css('top', outY + 'px');

      isOut = false;    // 关闭出去的门
      // 当动画结束后再删除元素
      timer.push(window.setTimeout(() => {
        con.value.removeChild(span);      // 删除元素
        isIn = true;                  // 打开进入的门
      }, 500))
    }
  }
}

onBeforeUnmount(() => {
  timer.forEach(i => {
    window.clearTimeout(i)
    window.clearInterval(i)
  })
  con.value.onmouseenter = null
  con.value.onmouseleave = null
})
</script>

<template>
  <div class="main">
    <div class="container" ref="con">
      <h1>CarLoans</h1>
      <div class="form">
        <input type="text" class="accountInput" placeholder="您的手机号" v-model="account">
        <input type="password" class="passwordInput" placeholder="您的密码" v-model="password">
        <div class="code">
          <input type="text" class="codeInput" placeholder="验证码" v-model="code">
          <div class="num" @click="getCode">{{ (typeof codeText) === 'number' ? codeText + ' s' : codeText }}</div>
        </div>
        <button class="btn-login" @click="login">登录</button>
      </div>
    </div>
    <ul class="bg-squares">
      <li v-for="item in 10" :key="item"></li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.main {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);

  .code {
    display: flex;
    justify-content: center;
    align-items: center;

    .num {
      width: 98px;
      height: 39px;
      line-height: 39px;
      cursor: pointer;
    }

    input {
      width: 120px !important;
    }

    input:focus {
      width: 120px !important;
    }
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 350px;
    height: 450px;
    border-radius: 20px;
    background-color: #3c80ce;
    /* 盒子阴影 */
    box-shadow: 5px 5px 25px 8px rgba(33, 45, 58, 0.3);
    overflow: hidden;
    position: relative;
    z-index: 2200;
    text-align: center;
    color: #fff;

    h1 {
      font-size: 40px;
      font-weight: 100;
      letter-spacing: 2px;
      margin-bottom: 15px;
      /* 过渡效果 */
      transition: 1s ease-in-out;
      z-index: 2300;
    }

    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 2;
      opacity: 1;
      /* 不透明度改变时的过渡效果 */
      transition: opacity 0.5s;

      input {
        outline: none;
        border: 1px solid rgba(255, 255, 255, 0.4);
        background-color: rgba(255, 255, 255, 0.2);
        width: 218px;
        padding: 10px 15px;
        border-radius: 3px;
        margin: 10px auto 10px auto;
        text-align: center;
        color: #fff;
        font-size: 15px;
        transition: 0.25s;
      }

      input::placeholder {
        color: #fff;
        font-size: 14px;
        font-weight: 300;
      }

      input:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }

      input:focus {
        background-color: #fff;
        width: 270px;
        color: #ff719a;
      }
    }

    .btn-login {
      outline: none;
      background-color: #fff;
      color: #ff719a;
      border: none;
      width: 250px;
      padding: 10px 15px;
      border-radius: 3px;
      font-size: 15px;
      cursor: pointer;
      transition: 0.25s;
      margin-top: 10px;
    }

    .btn-login:hover {
      background-color: #f5f7f9;
    }
  }
}

/* 背景方块 */
.bg-squares {
  padding: 0;
  margin: 0;
  list-style: none;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  overflow: hidden;
}

.bg-squares li {
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  position: absolute;
  bottom: -160px;
  border-radius: 15px;
  /* 执行动画：动画名 时长 线性 无限次播放 */
  animation: square 20s linear infinite;
}

/* 为每一个方块设置不同的位置、大小、动画延迟时间、动画时长、背景色 */
.bg-squares li:nth-child(1) {
  left: 10%;
}

.bg-squares li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  /* 动画延迟时间 */
  animation-delay: 2s;
  /* 动画时长 */
  animation-duration: 17s;
}

.bg-squares li:nth-child(3) {
  left: 25%;
  animation-delay: 4s;
}

.bg-squares li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  background-color: rgba(255, 255, 255, 0.25);
  animation-duration: 22s;
}

.bg-squares li:nth-child(5) {
  left: 70%;
}

.bg-squares li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  background-color: rgba(255, 255, 255, 0.2);
  animation-delay: 3s;
}

.bg-squares li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  animation-delay: 7s;
}

.bg-squares li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  animation-delay: 15s;
  animation-duration: 40s;
}

.bg-squares li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  background-color: rgba(255, 255, 255, 0.3);
  animation-delay: 2s;
  animation-duration: 40s;
}

.bg-squares li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  animation-delay: 11s;
}

.container.success h1 {
  transform: translateY(100px);
}

.container.success .form {
  opacity: 0;
  visibility: hidden;
}

.container.fail h1 {
  transform: translateY(0);
}

.container.fail .form {
  opacity: 1;
  visibility: visible;
}

.container .wrongInput {
  animation: wrongInput 0.5s ease none;
}

/* 定义动画 */
@keyframes square {
  0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-120vh) rotate(600deg);
    opacity: 0.1;
  }
}

/* 动画 */
@keyframes wrongInput {
  0% {
    transform: translateX(-20px);
    border: 1px solid #fee082;
    color: #fee082;
  }

  50% {
    transform: translateX(20px);
    border: 1px solid #fee082;
    color: #fee082;
  }

  100% {
    transform: translateX(0);
    border: 1px solid #fee082;
    color: #fee082;
  }
}
</style>

<style lang="scss">
/* 设置鼠标进入的样式 */
.container {
  .in {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: #cf455f;
    transform: translate(-50%, -50%);
    /* 使用in动画，持续0.5秒，缓出的时间函数，停留在最后一帧 */
    animation: in 0.5s ease-out forwards;
  }

  /* 设置鼠标离开的样式 */
  .out {
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    width: 1200px;
    height: 1200px;
    border-radius: 50%;
    background: #cf455f;
    transform: translate(-50%, -50%);
    /* 使用out动画，持续0.5秒，缓出的时间函数，停留在最后一帧 */
    animation: out 0.5s ease-out forwards;
  }
}

/* 设置鼠标进入时，元素的动画 */
@keyframes in {

  /* 初始关键帧 */
  0% {
    width: 0;
    height: 0;
  }

  /* 结束关键帧 */
  100% {
    width: 1200px;
    height: 1200px;
  }
}

/* 设置鼠标离开时，元素的动画 */
@keyframes out {

  /* 初始关键帧 */
  0% {
    width: 1200px;
    height: 1200px;
  }

  /* 结束关键帧 */
  100% {
    width: 0;
    height: 0;
  }
}
</style>
