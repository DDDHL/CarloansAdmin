<script setup lang="ts">
import { getMortgageList, getMortgageInfo, aduitMortgage, addMortgage } from '@/api'
import { message } from '@/utils/index'
let tableData = ref([])
let dialogVisible = ref(false)
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
const size = ref('')
const iconStyle = computed(() => {
  const marginMap: any = {
    large: '8px',
    default: '6px',
    small: '4px',
  }
  return {
    marginRight: marginMap[size.value] || marginMap.default,
  }
})

onMounted(() => {
  getData()
})

let dialogVisibleAdd = ref(false)
let saveLoading = ref(false)
const createBill = async () => {
  tableLoading.value = true
  saveLoading.value = true
  let res: any = await addMortgage(clickUserInfo.value)
  if (res.resultCode === 200) {
    message('新增抵押单成功!')
    saveLoading.value = false
    dialogVisibleAdd.value = false
    await getData()
  } else {
    message(res.message || '新增抵押单失败!', 'error')
  }
  tableLoading.value = false
}

const rowClick = async (id: string) => {
  // 打开编辑用户
  tableLoading.value = true
  let res: any = await getMortgageInfo(id)
  if (res.resultCode === 200) {
    clickUserInfo.value = res.result.data
    console.log(clickUserInfo.value)
    dialogVisible.value = true
  } else {
    message('获取用户信息失败!', 'error')
  }
  tableLoading.value = false
}

const reset = () => {
  pageConfig.name = '';
  pageConfig.phone = '';
  pageConfig.identifier = '';
  getData()
}

const audit = async (row: any, type: 'VERIFIED' | 'UN_VERIFIED') => {
  let text = `确定通过此 "${row.name}" 的账号审核?`
  if (type === 'UN_VERIFIED') text = `确定不通过此 "${row.name}" 的账号审核?`
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
      let res: any = await aduitMortgage(row.id, type)
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
  let res: any = await getMortgageList(pageConfig)
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
        <div class="input">
          <el-popover placement="bottom" title="Tips" :width="200" trigger="contextmenu" hide-icon :auto-close="2000"
            content="输入姓名，回车搜索">
            <template #reference>
              <el-input v-model="pageConfig.name" placeholder="搜索名字" prefix-icon="Search" @keydown.enter="getData" />
            </template>
          </el-popover>
        </div>
        <div class="input">
          <el-popover placement="bottom" title="Tips" :width="200" trigger="contextmenu" hide-icon :auto-close="2000"
            content="输入身份证，回车搜索">
            <template #reference>
              <el-input v-model="pageConfig.identifier" placeholder="搜索身份证" prefix-icon="Search"
                @keydown.enter="getData" />
            </template>
          </el-popover>
        </div>
        <div class="input">
          <el-popover placement="bottom" title="Tips" :width="200" trigger="contextmenu" :auto-close="2000"
            content="输入手机号，回车搜索">
            <template #reference>
              <el-input v-model="pageConfig.phone" placeholder="搜索手机号" prefix-icon="Search" @keydown.enter="getData" />
            </template>
          </el-popover>
        </div>
        <div class="btn">
          <el-button @click="reset">重置</el-button>
          <el-button @click="dialogVisibleAdd = true">新增抵押单</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" stripe border height="70.5vh" :header-cell-style="{
        background: '#eef1f6', color: '#606266'
      }" v-loading="tableLoading">
        <el-table-column prop="id" label="抵押单ID" align="center" />
        <el-table-column prop="name" label="抵押人姓名" align="center" />
        <el-table-column prop="identifier" label="抵押人身份证" align="center" />
        <el-table-column prop="phone" label="抵押人手机号" align="center" />
        <el-table-column prop="motorcycleType" label="预购车型" align="center" />
        <el-table-column prop="loanAmount" label="借款金额" align="center" />
        <el-table-column prop="verifyStatus" label="抵押单评审状态" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.verifyStatus === 'UN_VERIFIED' ? 'warning' : 'success'" disable-transitions>{{
              scope.row.verifyStatus
              === 'UN_VERIFIED' ? '未审核' : '审核通过'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="账号审核" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" @click="audit(scope.row, 'VERIFIED')">通过</el-button>
            <el-button type="danger" size="small" @click="audit(scope.row, 'UN_VERIFIED')">不通过</el-button>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button link type="primary" size="small" @click="rowClick(scope.row.id)">编辑信息</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="pageConfig.pageCount" />
      </div>
    </el-card>

    <el-dialog v-model="dialogVisible" width="50vw" height="20vh" align-center center>
      <div class="editUserList">
        <el-descriptions title="抵押人信息" :column="7" size="large" direction="vertical" border>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <UserFilled />
                </el-icon>
                抵押人姓名
              </div>
            </template>
            {{ clickUserInfo.name }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <iphone />
                </el-icon>
                抵押人手机号
              </div>
            </template>
            {{ clickUserInfo.phone }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <Postcard />
                </el-icon>
                身份证
              </div>
            </template>
            {{ clickUserInfo.identifier }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <Van />
                </el-icon>
                预购车型
              </div>
            </template>
            {{ clickUserInfo.motorcycleType }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <Money />
                </el-icon>
                收入
              </div>
            </template>
            {{ clickUserInfo.income }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <Coin />
                </el-icon>
                借款金额
              </div>
            </template>
            {{ clickUserInfo.loanAmount }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <Timer />
                </el-icon>
                创建时间
              </div>
            </template>
            {{ clickUserInfo.createTime }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <Avatar />
                </el-icon>
                担保人姓名
              </div>
            </template>
            {{ clickUserInfo.guaranteeName }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <iphone />
                </el-icon>
                担保人手机号
              </div>
            </template>
            {{ clickUserInfo.guaranteePhone }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <Share />
                </el-icon>
                担保人关系
              </div>
            </template>
            {{ clickUserInfo.guaranteeRelationship }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <HomeFilled />
                </el-icon>
                名下资产
              </div>
            </template>
            {{ clickUserInfo.property }}
          </el-descriptions-item>
          <el-descriptions-item align="center">
            <template #label>
              <div class="cell-item">
                <el-icon :style="iconStyle">
                  <Timer />
                </el-icon>
                更新时间
              </div>
            </template>
            {{ clickUserInfo.updateTime }}
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>

    <el-dialog v-model="dialogVisibleAdd" title="新增抵押单" width="25vw" height="80vh" align-center center>
      <div class="editUserListAdd">
        <el-input v-model="clickUserInfo.name" placeholder="抵押人姓名" prefix-icon="User" />
        <el-input v-model="clickUserInfo.phone" placeholder="手机号" prefix-icon="Iphone" />
        <el-input v-model="clickUserInfo.age" placeholder="年龄" prefix-icon="Calendar" />
        <el-input v-model="clickUserInfo.identifier" placeholder="身份证" prefix-icon="Postcard" />
        <el-input v-model="clickUserInfo.guaranteeName" placeholder="担保人姓名" prefix-icon="Avatar" />
        <el-input v-model="clickUserInfo.guaranteePhone" placeholder="与担保人关系" prefix-icon="Share" />
        <el-input v-model="clickUserInfo.guaranteeRelationship" placeholder="担保人手机号" prefix-icon="Iphone" />
        <el-input v-model="clickUserInfo.motorcycleType" placeholder="预购车型" prefix-icon="Van" />
        <el-input v-model="clickUserInfo.deadLine" placeholder="期限" prefix-icon="Calendar" />
        <el-input v-model="clickUserInfo.income" placeholder="个人收入" prefix-icon="Money" />
        <el-input v-model="clickUserInfo.loanAmount" placeholder="借款金额" prefix-icon="Coin" />
        <el-input v-model="clickUserInfo.property" placeholder="名下资产" prefix-icon="HomeFilled" />
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