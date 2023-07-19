import { defineStore } from "pinia";
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const useLoginStore = defineStore('LoginStore', {
    state: () => {
        return {
            email: '',
            password: '',
            errorMessage: '',
            isAdmin: 'ZVRe26obPJOO1qw00mCXEC0RNJG3',
            adminMsg: ''
        }
    },
    actions: {
      async login() {
        if (!emailRegex.test(this.email)) {
          this.errorMessage = 'Недопустимый адрес электронной почты'
          return
        }
        try {
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password)
          const user = userCredential.user
        }
        catch(error) {
          switch(error.code) {
            case 'auth/user-not-found':
              this.errorMessage = 'Учетная запись не найдена'
              break
            case 'auth/wrong-password':
              this.errorMessage = 'Неверный пароль'
              break
            default:
              this.errorMessage = 'Произошла ошибка при входе'
              console.error(error)
          }
        }
      }
    },

    getters: {
        
    }
});