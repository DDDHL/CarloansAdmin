<script setup lang="ts">
import { getUserMortgageList } from '@/api'
import { usePublicStore } from "@/stores";
const publicStore = usePublicStore()
let tableData = ref([])
let tableLoading = ref(false)

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
  publicStore.menuList.forEach((item, index) => {
    if (item.name === '款后管理') {
      publicStore.menuList[index].msgNum = 0
    }
  })
})


const getData = async () => {
  tableLoading.value = true
  let res: any = await getUserMortgageList(pageConfig)
  if (res.resultCode === 200) {
    tableData.value = res.result.rows
    pageConfig.pageCount = res.result.pageCount
    pageConfig.pageSize = res.result.pageSize
    pageConfig.pageNo = res.result.pageNo
  }
  tableLoading.value = false
}

const reset = () => {
  pageConfig.name = '';
  pageConfig.phone = '';
  pageConfig.identifier = '';
  getData()
}

</script>

<template>
  <div class="addPageMain">
    <el-card class="card">
      <div class="inputArea">
        <div class="btn">
          <el-button @click="reset">刷新列表</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" stripe border height="70.5vh" :header-cell-style="{
        background: '#eef1f6', color: '#606266'
      }" v-loading="tableLoading">
        <el-table-column prop="name" label="借款人姓名" align="center" />
        <el-table-column prop="identifier" label="借款人身份证" align="center" />
        <el-table-column prop="loanAmount" label="借款金额" align="center" />
        <el-table-column prop="monthlyLoanAmount" label="每月该还金额" align="center" />
        <el-table-column prop="deadline" label="期限" align="center">
          <template #default="scope">
            {{ scope.row.deadline + '年' }}
          </template>
        </el-table-column>
        <el-table-column prop="totalInterest" label="总利息" align="center" />
        <el-table-column prop="totalLoanAmount" label="还款总金额" align="center" />
        <el-table-column prop="repaymentSituation" label="还款状态" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.repaymentSituation === '还款中' ? 'success' : 'danger'" disable-transitions>{{
              scope.row.repaymentSituation
            }}</el-tag>
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

  .editUserList {
    height: 20vh;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .editUserListAdd {
    height: 55vh;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
}
</style>