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
          confirmPassword: '',
          errorMessage: ''
        }
    },
    actions: {
      // async signUp() {
      //   if (this.password !== this.confirmPassword) {
      //     this.errorMessage = 'Пароли не совпадают';
      //     return;
      //   }
      //   try {
      //     const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password)
      //     const user = userCredential.user
      //     await addDoc(collection(db, 'users'), {
      //       email: user.email,
      //       uid: user.uid,
      //       isAdmin: false
      //     })
      //   } 
      //   catch(error) {
      //     if(error.code === 'auth/invalid-email') {
      //       error.code = 'Некорректный формат электронной почты'
      //       this.errorMessage = error.code
      //     }
      //     if(error.code === 'auth/weak-password') {
      //       error.code = 'Пароль должен быть длиннее 6 символов'
      //       this.errorMessage = error.code
      //     }
      //     if(error.code === 'auth/email-already-in-use') {
      //       error.code = 'Уже есть пользователь с таким же адресом электронной почты'
      //       this.errorMessage = error.code
      //     }
      //   }
      // }
      async signUp() {
        if (this.password !== this.confirmPassword) {
          this.errorMessage = 'Пароли не совпадают';
          return;
        }
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
          const user = userCredential.user;
          await addDoc(collection(db, 'users'), {
            email: user.email,
            uid: user.uid,
            isAdmin: false
          });
        } catch(error) {
          switch(error.code) {
            case 'auth/invalid-email':
              this.errorMessage = 'Недопустимый адрес электронной почты';
              break;
            case 'auth/weak-password':
              this.errorMessage = 'Пароль должен быть длиннее 6 символов';
              break;
            case 'auth/email-already-in-use':
              this.errorMessage = 'Уже есть пользователь с таким же адресом электронной почты';
              break;
            default:
              this.errorMessage = 'Произошла ошибка при регистрации пользователя';
              console.error(error);
          }
        }
      }
    },
    getters: {
        
    },
});