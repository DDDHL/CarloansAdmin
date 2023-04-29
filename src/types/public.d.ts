export interface publicStoreInterface {
  fullLoading: boolean
  fullScreen: boolean
  asideShow: boolean
  breadList: breadListType[]
  userInfo: userInfoType
}

type userInfoType = {
  name: string
  sex: number
  age: number
}

type breadListType = {
  name: string
  url: string
  selectType: boolean
}