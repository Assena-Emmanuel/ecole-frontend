// store.js
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    email: null,
  }),
  actions: {
    setEmail(newEmail) {
      this.email = newEmail
    },
  },
})
