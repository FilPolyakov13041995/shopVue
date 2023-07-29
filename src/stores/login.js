import { defineStore } from "pinia";
import { auth } from '@/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useLoginStore = defineStore('LoginStore', {
    state: () => {
        return {
            email: '',
            password: '',
            emailError: '',
            notRegistered: '',
            incorrectPassword: '',
            passwordError: '',
            errorMessage: '',
            isAdmin: 'ZVRe26obPJOO1qw00mCXEC0RNJG3',
            adminMsg: '',
        }
    },
    actions: {
      async login() {
        try {
          await signInWithEmailAndPassword(auth, this.email, this.password)
        }
        catch(error) {
          switch(error.code) {
            case 'auth/user-not-found':
              this.notRegistered = 'Учетная запись не найдена'
              break
            case 'auth/wrong-password':
              this.incorrectPassword = 'Неверный пароль'
              break
            default:
              this.errorMessage = 'Произошла ошибка при входе'
              console.error(error)
          }
        }
      },
    },
});