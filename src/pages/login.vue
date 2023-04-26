<script setup lang="ts">
import anime from 'animejs';
// 定义一个anime对象
let an: anime.AnimeInstance;
const animeConfig = [
  {
    id: '#account',
    type: 'click',
    config: {
      targets: 'path',
      strokeDashoffset: {
        value: 0,
        duration: 700,
        easing: 'easeOutQuart'
      },
      strokeDasharray: {
        value: '240 1386',
        duration: 700,
        easing: 'easeOutQuart'
      }
    }
  },
  {
    id: '#password',
    type: 'click',
    config: {
      targets: 'path',
      strokeDashoffset: {
        value: -336,
        duration: 700,
        easing: 'easeOutQuart'
      },
      strokeDasharray: {
        value: '240 1386',
        duration: 700,
        easing: 'easeOutQuart'
      }
    }
  },
  {
    id: '#submit',
    type: 'mouseover',
    config: {
      targets: 'path',
      strokeDashoffset: {
        value: -730,
        duration: 700,
        easing: 'easeOutQuart'
      },
      strokeDasharray: {
        value: '530 1386',
        duration: 700,
        easing: 'easeOutQuart'
      }
    }
  },
  {
    id: '#account',
    type: 'focus',
    config: {
      targets: 'path',
      strokeDashoffset: {
        value: 0,
        duration: 700,
        easing: 'easeOutQuart'
      },
      strokeDasharray: {
        value: '240 1386',
        duration: 700,
        easing: 'easeOutQuart'
      }
    }
  },
  {
    id: '#password',
    type: 'focus',
    config: {
      targets: 'path',
      strokeDashoffset: {
        value: -336,
        duration: 700,
        easing: 'easeOutQuart'
      },
      strokeDasharray: {
        value: '240 1386',
        duration: 700,
        easing: 'easeOutQuart'
      }
    }
  },
  {
    id: '#submit',
    type: 'focus',
    config: {
      targets: 'path',
      strokeDashoffset: {
        value: -730,
        duration: 700,
        easing: 'easeOutQuart'
      },
      strokeDasharray: {
        value: '530 1386',
        duration: 700,
        easing: 'easeOutQuart'
      }
    }
  }
]

onMounted(() => {
  init();
})

// 绑定动画事件
const init = () => {
  // 绑定账号输入框的点击事件
  animeConfig.forEach(item => {
    document.querySelector(item.id)!.addEventListener(item.type, function () {
      // 如果已存在anime动画,先暂停正在运行的动画
      if (an) an.pause();
      // 构造一个动画对象
      an = anime(item.config);
    });
  })
}
</script>

<template>
  <div class="main">
    <div class="container">
      <div class="left">
        <h1>login</h1>
        <p>欢迎光临, 请登录!</p>
      </div>
      <div class="right">
        <!-- SVG提前准备好, 来自互联网 -->
        <svg viewBox="0 0 320 300">
          <defs>
            <!-- 定义线性渐变 -->
            <linearGradient inkscape:collect="always" id="linearGradient1" x1="13" y1="193.49992" x2="307" y2="193.49992"
              gradientUnits="userSpaceOnUse">
              <stop style="stop-color:#0ff;" offset="0" />
              <stop style="stop-color:#f0f;" offset="1" />
            </linearGradient>
          </defs>
          <path
            d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
        </svg>
        <div class="form">
          <label for="account" class="account">账号</label>
          <input type="text" id="account" autocomplete="off">
          <label for="password" class="password">密码</label>
          <input type="password" id="password">
          <button id="submit">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  height: 100vh;
  width: 100vw;
  /* 弹性布局 居中显示 */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e2e2e5;
}

.container {
  width: 640px;
  height: 320px;
  display: flex;
  margin-top: -4%;
}

.left {
  width: 50%;
  height: calc(100% - 40px);
  background-color: #fff;
  position: relative;
  top: 20px;
}

.left h1 {
  color: #222;
  font-size: 50px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin: 55px 40px 40px 40px;
}

.left p {
  color: #999;
  font-size: 14px;
  margin: 40px;
  line-height: 22px;
}

.right {
  width: 50%;
  height: 100%;
  background-color: #474a59;
  color: #f1f1f1;
  position: relative;
  box-shadow: 0 0 40px 16px rgba(0, 0, 0, 0.2);
}

.right svg {
  position: absolute;
  width: 320px;
  left: 3px;
  top: 23px;
}

.right path {
  /* 取消填充 */
  fill: none;
  /* 定义一条线,引用定义好的线性渐变 */
  stroke: url(#linearGradient1);
  /* 线的厚度 */
  stroke-width: 4;
  /* 设置虚线:虚线长度 间距 */
  stroke-dasharray: 240 1386;
}

.form {
  margin: 40px;
  position: absolute;
}

.account {
  margin-top: 35px !important;
}

.form label {
  color: #c2c2c2;
  display: block;
  font-size: 14px;
  margin-top: 20px;
  margin-bottom: 5px;
  text-align: left;
}

.password {
  margin-top: 15px !important;
}

.form input {
  width: 100%;
  height: 35px;
  line-height: 35px;
  font-size: 20px;
  color: #f2f2f2;
  background-color: transparent;
  border: none;
  outline: none;
  text-indent: 2px;
}

.form button {
  width: 100%;
  height: 30px;
  color: #d0d0d0;
  font-size: 18px;
  background-color: transparent;
  border: none;
  margin-top: 27px;
  cursor: pointer;
  outline: none;
}
</style>
