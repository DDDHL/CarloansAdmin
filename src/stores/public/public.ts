import { publicStoreInterface } from '@/types/public'
import { defineStore } from 'pinia'
export const usePublicStore = defineStore(
  'PublicStore', {
  state: (): publicStoreInterface => {
    return {
      test: 1
    }
  },
  persist: true
})
