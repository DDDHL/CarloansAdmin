<script setup lang="ts">
import { getBorrowList, aduitBorrow, addBorrow } from '@/api'
import { usePublicStore } from "@/stores";
import { message } from '@/utils/index'
const publicStore = usePublicStore()
let tableData = ref([])
let tableLoading = ref(false)
let clickUserInfo: any = ref({})

const pageConfig = reactive({
  pageNo: 1,
  pageSize: 15,
  pageCount: 1,
  name: '',
  phone: '',
  identifier: ''
})


onMounted(() => {
  publicStore.menuList.forEach((item, index) => {
    if (item.name === '借款列表') {
      publicStore.menuList[index].msgNum = 0
    }
  })
  getData()
})

let dialogVisibleAdd = ref(false)
let saveLoading = ref(false)
const createBill = async () => {
  tableLoading.value = true
  saveLoading.value = true
  let res: any = await addBorrow(clickUserInfo.value.mortgageId)
  if (res.resultCode === 200) {
    message('新增借款单成功!')
    dialogVisibleAdd.value = false
    await getData()
  } else {
    message(res.message || '新增借款单失败!', 'error')
  }
  saveLoading.value = false
  tableLoading.value = false
}

const reset = () => {
  pageConfig.name = '';
  pageConfig.phone = '';
  pageConfig.identifier = '';
  getData()
}

const audit = async (row: any, type: number) => {
  let text = `确定通过此 "${row.name}" 的账号审核?`
  if (!type) text = `确定不通过此 "${row.name}" 的账号审核?`
  ElMessageBox.confirm(
    text,
    '账号审核操作',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      center: true
    }
  )
    .then(async () => {
      let res: any = await aduitBorrow(row.id, type)
      if (res.resultCode === 200) {
        message('审核完成', 'success', true)
        getData()
      } else {
        message('审核失败', 'error', true)
      }
    })
}

const getData = async () => {
  tableLoading.value = true
  let res: any = await getBorrowList(pageConfig)
  if (res.resultCode === 200) {
    tableData.value = res.result.rows
    pageConfig.pageCount = res.result.pageCount
    pageConfig.pageSize = res.result.pageSize
    pageConfig.pageNo = res.result.pageNo
  }
  tableLoading.value = false
}
</script>

<template>
  <div class="addPageMain">
    <el-card class="card">
      <div class="inputArea">
        <div class="btn">
          <el-button @click="reset">刷新列表</el-button>
          <!-- <el-button @click="dialogVisibleAdd = true">新增借款单</el-button> -->
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" stripe border height="70.5vh" :header-cell-style="{
        background: '#eef1f6', color: '#606266'
      }" v-loading="tableLoading">
        <el-table-column prop="name" label="借款人姓名" align="center" />
        <el-table-column prop="identifier" label="借款人身份证" align="center" />
        <el-table-column prop="phone" label="借款人手机号" align="center" />
        <el-table-column prop="motorcycleType" label="借款车型" align="center" />
        <el-table-column prop="loanAmount" label="借款总金额" align="center" />
        <el-table-column prop="monthlyLoanAmount" label="每月该还金额" align="center" />
        <el-table-column prop="totalInterest" label="总利息" align="center" />
        <el-table-column prop="deadline" label="借款期限" align="center">
          <template #default="scope">
            {{ scope.row.deadline + '年' }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="借款审核" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" @click="audit(scope.row, 1)">通过</el-button>
            <el-button type="danger" size="small" @click="audit(scope.row, 0)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.pageCount" />
      </div>
    </el-card>
    <el-dialog v-model="dialogVisibleAdd" title="新增借款单" width="25vw" height="25vh" align-center center>
      <div class="editUserListAdd">
        <el-input v-model="clickUserInfo.mortgageId" placeholder="请输入抵押单ID" prefix-icon="CollectionTag" />
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisibleAdd = false">取消</el-button>
          <el-button type="primary" :loading="saveLoading" @click="createBill">
            新增
          </el-button>
        </span>
      </template>
    </el-dialog>
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

  .editUserListAdd {
    height: 10vh;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
  }
}
</style>