import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'



const firebaseConfig = {
    apiKey: 'AIzaSyAKAW7Kj8mkhlljOZO8I_MsLsW2RSdnidk',
    authDomain: 'vueshopbooks.firebaseapp.com',
    databaseURL: 'https://vueshopbooks-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'vueshopbooks',
    storageBucket: 'vueshopbooks.appspot.com',
    messagingSenderId: '850280903746',
    appId: '1:850280903746:web:996d3ff106eb15fadc29db',
    measurementId: 'G-H3W8YGNB8E'
};



const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)



export {
    db,
    auth,
    storage
}
