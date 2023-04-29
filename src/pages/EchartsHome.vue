<script setup lang="ts">
import { printLineChart } from "@/echarts/Line";
import { printPieChart } from "@/echarts/Pie";
import { printBarChart } from "@/echarts/Bar";
let lineChartRef = ref()
let pieChartRef = ref()
let barChartRef = ref()
onMounted(() => {
  printLineChart(lineChartRef.value)
  printPieChart(pieChartRef.value)
  printBarChart(barChartRef.value)
})
const topConfig = [
  { name: '访问量', icon: 'Monitor', nowNum: 987, lastNum: 801, color: '#2279f7' },
  { name: '周单量', icon: 'DataLine', nowNum: 66, lastNum: 166, color: '#bd9fdf' },
  { name: '月单量', icon: 'DataAnalysis', nowNum: 2680, lastNum: 1922, color: '#e29980' },
  { name: '总人数', icon: 'User', nowNum: 11, lastNum: 11, color: '#61bf9f' },
]
const rankConfig = [
  { name: 'Leander', num: 98 },
  { name: '张辛诚', num: 88 },
  { name: '藤小志', num: 76 },
  { name: '欧阳海路', num: 68 },
  { name: '蔡徐坤', num: 44 },
]
const rankIcon = new Map([
  [1, '#f8639a'],
  [2, '#ff914d'],
  [3, '#49bee4'],
])
</script>

<template>
  <div class="echartsMain">
    <div class="top">
      <el-row :gutter="20">
        <el-col :span="6" v-for="item in topConfig" :key="item.name">
          <el-card class="card">
            <div class="iconName">
              <div class="left">
                <el-icon size="40" :style="{ color: item.color }">
                  <component :is="item.icon" />
                </el-icon>
                <p>{{ item.name }}</p>
              </div>
              <el-icon size="30">
                <component is="Top" style="color:green" v-if="item.nowNum > item.lastNum" />
                <component is="SemiSelect" v-else-if="item.nowNum === item.lastNum" />
                <component is="Bottom" style="color:red" v-else />
              </el-icon>
            </div>
            <div class="num">
              <p class="text">{{ item.nowNum }}</p>
              <div>
                <el-tag
                  :type="(item.nowNum - item.lastNum) / item.lastNum > 0 ? 'success' : ((item.nowNum - item.lastNum) / item.lastNum === 0 ? 'info' : 'danger')"
                  effect="dark" round>
                  {{ `${Number(((item.nowNum - item.lastNum) / item.lastNum).toFixed(2)) * 100}%` }}
                </el-tag>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="contain">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="card">
            <template #header>
              <div class="card-header">
                <span>访问量</span>
              </div>
            </template>
            <div class="LineChart" ref="lineChartRef"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="card">
            <template #header>
              <div class="card-header">
                <span>单量排行</span>
              </div>
            </template>
            <div class="rankChart">
              <div class="item" v-for="item, index in rankConfig" :key="item.name">
                <div class="index" :style="{ background: rankIcon.get(index + 1) }">{{ index + 1 }}</div>
                <p>{{ item.name }}</p>
                <el-progress :percentage="item.num" :stroke-width="14" :color="rankIcon.get(index + 1)" />
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="contain">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="card">
            <template #header>
              <div class="card-header">
                <span>销售额</span>
              </div>
            </template>
            <div class="barChart" ref="barChartRef"></div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="card">
            <template #header>
              <div class="card-header">
                <span>访问来源</span>
              </div>
            </template>
            <div class="pieChart" ref="pieChartRef"></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<style scoped lang="scss">
.echartsMain {
  width: 100%;

  .top {
    .card {
      height: 17vh;

      .left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .iconName {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .num {
        margin-top: 2vh;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .text {
          font-size: 30px;
          font-weight: bold;
        }
      }
    }
  }

  .contain {
    margin-top: 1.5vh;

    .card {
      height: 33vh;

      :deep(.el-card__body) {
        padding: 0;
        margin: 0;
      }

      .LineChart,
      .pieChart,
      .rankChart,
      .barChart {
        height: 27vh;
      }

      .rankChart {
        display: flex;
        flex-direction: column;
        width: 96%;
        margin: 2% 2% 0 2%;

        .item {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          margin-top: 1vh;

          .index {
            width: 30px;
            height: 30px;
            line-height: 30px;
            border-radius: 1000px;
            text-align: center;
            font-size: 14px;
          }

          >p {
            width: 10%;
            overflow: hidden;
            margin-left: 3px;
          }

          >.el-progress {
            width: 90%;
          }
        }
      }
    }
  }

}
</style>