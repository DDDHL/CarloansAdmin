<script setup lang="ts">
import { getUserList, getUserInfo, editUserInfo, aduitAccount, addUser } from '@/api'
import { message } from '@/utils/index'
let tableData = ref([])
let dialogVisible = ref(false)
let tableLoading = ref(false)
let saveLoading = ref(false)
let clickUserInfo: any = ref({})
let dialogConfig = ref({
  title: '编辑用户信息',
  btnText: '保存',
})
const options: any = new Map([
  [0, 'Female'],
  [1, 'Male'],
  [2, 'Pointer'],
  [3, 'Delete'],
])
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

const rowClick = async (id: string, type: 'add' | 'edit' = 'edit') => {
  if (type === 'edit') {
    // 打开编辑用户
    tableLoading.value = true
    let res: any = await getUserInfo(id)
    if (res.resultCode === 200) {
      clickUserInfo.value = res.result.data
      console.log(clickUserInfo.value)
      dialogVisible.value = true
    } else {
      message('获取用户信息失败!', 'error')
    }
    tableLoading.value = false
  } else {
    // 打开新增用户
    clickUserInfo.value = {}
    clickUserInfo.value.sex = 1
    dialogConfig.value.btnText = '新增'
    dialogConfig.value.btnText = '新增用户'
    dialogVisible.value = true
  }
}

const reset = () => {
  pageConfig.name = '';
  pageConfig.phone = '';
  pageConfig.identifier = '';
  getData()
}

const saveEditUser = async () => {
  saveLoading.value = true
  if (dialogConfig.value.btnText === '保存') {
    // 编辑用户信息
    let res: any = await editUserInfo(clickUserInfo.value)
    if (res.resultCode === 200) {
      message('保存成功!')
      getData()
      dialogVisible.value = false
    } else {
      message(res.message || '保存失败!', 'error')
    }
  } else {
    // 新增用户
    console.log(clickUserInfo.value)
  }
  saveLoading.value = false
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
      let res: any = await aduitAccount(row.id, type)
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
  let res: any = await getUserList(pageConfig)
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
          <el-button @click="rowClick('999', 'add')">新增用户</el-button>
          <el-button @click="reset">导出用户模板</el-button>
          <el-button @click="reset">模板导入用户</el-button>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" stripe border height="70.5vh" :header-cell-style="{
        background: '#eef1f6', color: '#606266'
      }" v-loading="tableLoading">
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

    <el-dialog v-model="dialogVisible" :title="dialogConfig.title" width="25vw" height="80vh" align-center center>
      <div class="editUserList">
        <div class="inputItem">
          <el-input v-model="clickUserInfo.name" placeholder="请输入姓名" prefix-icon="User" />
          <el-select clearable style="width: 18vw" v-model="clickUserInfo.sex" placeholder="请选择性别">
            <template #prefix>
              <el-icon size="16">
                <component :is="options.get(clickUserInfo.sex)" />
              </el-icon>
            </template>
            <el-option label="女" :value="0"></el-option>
            <el-option label="男" :value="1"></el-option>
            <el-option label="中" :value="2"></el-option>
            <el-option label="不知道" :value="3"></el-option>
          </el-select>
          <el-input v-model="clickUserInfo.age" placeholder="请输入年龄" prefix-icon="Calendar" />
          <el-input v-model="clickUserInfo.phone" placeholder="请输入手机号" prefix-icon="Iphone" />
          <el-input v-model="clickUserInfo.gradeLevel" placeholder="请输入学历" prefix-icon="School" />
          <el-input v-model="clickUserInfo.political" placeholder="请输入政治面貌" prefix-icon="InfoFilled" />
          <el-input v-model="clickUserInfo.nativePlace" placeholder="请输入地区" prefix-icon="MapLocation" />
          <el-input v-model="clickUserInfo.address" placeholder="请输入住址" prefix-icon="LocationInformation" />
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" :loading="saveLoading" @click="saveEditUser">
            {{ dialogConfig.btnText }}
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

  .btn {
    display: flex;
    justify-content: space-between;
    width: 22.5vw;
  }

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
    height: 50vh;
    display: flex;
    justify-content: center;

    .inputItem {
      height: 50vh;
      width: 18vw;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }

  }
}
</style>