import { defineStore } from "pinia";
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

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
        try {
          const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password)
          const user = userCredential.user
        }
        catch(error) {
          if(error.code === 'auth/user-not-found') {
            error.code = 'Учетная запись не найдена'
            this.errorMessage = error.code
          }
          if(error.code === 'auth/wrong-password') {
            error.code = 'Неверный пароль'
            this.errorMessage = error.code
          }
        }
      },
    },

    getters: {
        
    }
});