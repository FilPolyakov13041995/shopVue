import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

// import { db } from './firebase';
// import { collection, getDocs, updateDoc } from 'firebase/firestore'

const pinia = createPinia();
createApp(App).use(router).use(pinia).mount('#app');

// const addSaleToCollection = async () => {
//     const collectionRef = collection(db, 'books')
//     const querySnapshot = await getDocs(collectionRef)
//     querySnapshot.forEach(doc => {
//         updateDoc(doc.ref, {
//             sale: '0'
//         })
//     })
// }
// addSaleToCollection()






