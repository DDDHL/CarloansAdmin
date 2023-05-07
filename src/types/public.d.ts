export interface publicStoreInterface {
  fullLoading: boolean
  fullScreen: boolean
  asideShow: boolean
  breadList: breadListType[]
  userInfo: userInfoType
  infoCount: number
}

type userInfoType = {
  name: string
  sex: number
  age: number
  avatarUrl: string
  password: string
  phone: string
  address: string
  gradeLevel: string
  id: number
  identifier: string
  marital: string
  nativePlace: string
  political: string
  status: number
  verifyStatus: string
  workingCondition: number
}

type breadListType = {
  name: string
  url: string
  selectType: boolean
}