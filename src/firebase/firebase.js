import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBt_qFKSZBxUcTD3QzLiIA9sjHe63zFjaY",
  authDomain: "login-blog-7d5f7.firebaseapp.com",
  projectId: "login-blog-7d5f7",
  storageBucket: "login-blog-7d5f7.appspot.com",
  messagingSenderId: "1050472971987",
  appId: "1:1050472971987:web:6dfe26f7e7f108c40b5e26",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
