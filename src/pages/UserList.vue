<script setup lang="ts">
import { getUserList } from '@/api'
let tableData = ref([])
const pageConfig = reactive({
  pageNo: 1,
  pageSize: 15,
  pageCount: 1,
  name: '',
  phone: '',
  identifier: ''
})

onMounted(() => {
  getData()
})

const getData = async () => {
  let res: any = await getUserList(pageConfig)
  if (res.resultCode === 200) {
    tableData.value = res.result.rows
    pageConfig.pageCount = res.result.pageCount
    pageConfig.pageSize = res.result.pageSize
    pageConfig.pageNo = res.result.pageNo
  }
}
</script>

<template>
  <div class="addPageMain">
    <el-card class="card">
      <div class="inputArea">
        <div class="input">
          <el-popover placement="bottom" title="Tips" :width="200" trigger="hover" content="输入姓名">
            <template #reference>
              <el-input v-model="pageConfig.name" placeholder="搜索名字" prefix-icon="Search" />
            </template>
          </el-popover>
        </div>
        <div class="input">
          <el-popover placement="bottom" title="Tips" :width="200" trigger="hover" content="输入身份证">
            <template #reference>
              <el-input v-model="pageConfig.name" placeholder="搜索身份证" prefix-icon="Search" />
            </template>
          </el-popover>
        </div>
        <div class="input">
          <el-popover placement="bottom" title="Tips" :width="200" trigger="hover" content="输入手机号">
            <template #reference>
              <el-input v-model="pageConfig.phone" placeholder="搜索手机号" prefix-icon="Search" />
            </template>
          </el-popover>
        </div>
        <div class="btn">
          <el-button>重置</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" stripe border height="70.5vh" :header-cell-style="{
        background: '#eef1f6', color: '#606266'
      }">
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column prop="identifier" label="身份证" align="center" />
        <el-table-column prop="phone" label="手机号" align="center" />
        <el-table-column prop="sex" label="性别" align="center">
          <template #default="scope">
            <p>{{ scope.row.sex ? '男' : '女' }}</p>
          </template>
        </el-table-column>
        <el-table-column prop="verifyStatus" label="审核状态" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.tag === 'UN_VERIFIED' ? 'warning' : 'success'" disable-transitions>{{ scope.row.tag
              === 'UN_VERIFIED' ? '未审核' : '审核通过'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template #default>
            <el-button link type="primary" size="small">编辑信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.pageCount" />
      </div>
    </el-card>
  </div>
</template>
<style scoped lang="scss">
.addPageMain {
  width: 100%;
  width: 100%;

  .card {
    height: 85vh;

    .inputArea {
      height: 5.5vh;
      display: flex;

      .input {
        width: 260px;
        margin-right: 20px;
      }

      .date {
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