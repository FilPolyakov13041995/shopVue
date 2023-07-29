import { defineStore } from "pinia";
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { db } from '@/firebase'
import { collection, addDoc } from 'firebase/firestore';

export const useSignUpStore = defineStore('signUpStore', {
    state: () => {
        return {
          email: '',
          password: '',
          confirmPassword: '',
          emailError: '',
          passwordError: '',
          passwordConfirmationError: '',
          errorMessage: '',
          buttonDisabled: false
        }
    },
    actions: {
      async signUp() {
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
            case 'auth/email-already-in-use':
              this.errorMessage = 'Такой пользователь уже существует';
              break;
            default:
              this.errorMessage = 'Произошла ошибка при регистрации';
              console.error(error);
          }
        }
      },
    },
});