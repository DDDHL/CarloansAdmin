<script setup lang="ts">
const tableData = reactive(new Array(15).fill(
  {
    date: '2016-05-03',
    name: 'Tom',
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    tag: 'Home',
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
      <el-table :data="tableData" style="width: 100%" height="70vh" stripe border>
        <el-table-column fixed prop="date" label="Date" align="center" sortable />
        <el-table-column prop="name" label="Name" align="center" />
        <el-table-column prop="state" label="State" align="center" />
        <el-table-column prop="city" label="City" align="center" />
        <el-table-column prop="address" label="Address" align="center" />
        <el-table-column prop="tag" label="Tag" width="100" :filters="[
            { text: 'Home', value: 'Home' },
            { text: 'Office', value: 'Office' },
          ]" :filter-method="filterTag" filter-placement="bottom-end" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.tag === 'Home' ? '' : 'success'" disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="Operations" align="center">
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
  }

  .pagination {
    margin-top: 30px;
    width: 100%;
    display: flex;
    justify-content: center;
  }
}
</style>