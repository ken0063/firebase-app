import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB-zaqFXOLgDTsO7_Xmw89xzO8RJ4VcTlw',
  authDomain: 'fir-app-932da.firebaseapp.com',
  projectId: 'fir-app-932da',
  storageBucket: 'fir-app-932da.appspot.com',
  messagingSenderId: '926280741683',
  appId: '1:926280741683:web:88b9f841857e0435bfc446',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();
