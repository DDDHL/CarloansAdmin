<script setup lang="ts">
let search = ref('')
let date = ref('')
const shortcuts = [
  {
    text: '上个星期',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
      return [start, end]
    },
  },
  {
    text: '上个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      return [start, end]
    },
  },
  {
    text: '上三个月',
    value: () => {
      const end = new Date()
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      return [start, end]
    },
  },
]
const tableData = reactive(new Array(15).fill(
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    tag: '待审核',
  }
))
interface User {
  date: string
  name: string
  address: string
  tag: string
}
const filterTag = (value: string, row: User) => {
  return row.tag === value
}
</script>

<template>
  <div class="addPageMain">
    <el-card class="card">
      <div class="inputArea">
        <div class="input">
          <el-popover placement="bottom" title="Tips" :width="200" trigger="hover" content="输入姓名、城市、地址">
            <template #reference>
              <el-input v-model="search" placeholder="搜索订单" prefix-icon="Search" />
            </template>
          </el-popover>
        </div>
        <div class="date">
          <el-date-picker v-model="date" type="daterange" unlink-panels range-separator="To"
            start-placeholder="Start date" end-placeholder="End date" :shortcuts="shortcuts" />
        </div>
        <div class="btn">
          <el-button>重置</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" height="70.5vh" stripe border :header-cell-style="{
          background: '#eef1f6', color: '#606266'
        }">
        <el-table-column fixed prop="date" label="日期" align="center" sortable />
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column prop="state" label="State" align="center" />
        <el-table-column prop="city" label="城市" align="center" />
        <el-table-column prop="address" label="地址" align="center" />
        <el-table-column prop="Tag" label="状态" width="100" :filters="[
            { text: '已完成', value: '已完成' },
            { text: '待审核', value: '待审核' },
          ]" :filter-method="filterTag" filter-placement="bottom-end" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.tag === '待审核' ? 'warning' : 'success'" disable-transitions>{{ scope.row.tag
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="列表操作" align="center">
          <template #default>
            <el-button link type="primary" size="small">Delete</el-button>
            <el-button link type="primary" size="small">Edit</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
    </el-card>
  </div>
</template>
<style scoped lang="scss">
.addPageMain {
  width: 100%;

  .card {
    height: 85vh;

    .inputArea {
      height: 5.5vh;
      display: flex;

      .input {
        width: 260px;
      }

      .date {
        margin-left: 40px;
      }

      .btn {
        margin-left: 40px;
      }
    }
  }

  .pagination {
    margin-top: 15px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>