import { defineStore } from "pinia";
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db } from '@/firebase'
import { collection, addDoc } from 'firebase/firestore';

export const useSignUpStore = defineStore('signUpStore', {
    state: () => {
        return {
          displayName: '',
          email: '',
          password: '',
          errorMessage: ''
        }
    },
    actions: {
      async signUp() {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password)
          const user = userCredential.user
          await addDoc(collection(db, 'users'), {
            email: user.email,
            uid: user.uid,
            isAdmin: false
          })
        } 
        catch(error) {
          if(error.code === 'auth/weak-password') {
            error.code = 'Пароль должен быть длиннее 6 символов'
            this.errorMessage = error.code
          }
          if(error.code === 'auth/email-already-in-use') {
            error.code = 'Уже есть пользователь с таким же адресом электронной почты'
            this.errorMessage = error.code
          }
          if(error.code === 'auth/invalid-email') {
            error.code = 'Недопустимый адрес электронной почты'
            this.errorMessage = error.code
          }
        }
      }
    },
    getters: {
        
    },
});