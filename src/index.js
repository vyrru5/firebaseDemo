// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, collection, getDocs, addDoc, doc, deleteDoc, onSnapshot } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpPaiY5mWxNJdwOTfTgcAV_oSa5ms6vho",
  authDomain: "fir-demo-9.firebaseapp.com",
  projectId: "fir-demo-9",
  storageBucket: "fir-demo-9.appspot.com",
  messagingSenderId: "379508315886",
  appId: "1:379508315886:web:814bf1f22eaeb3cf40c5ff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init
const db = getFirestore(app)

//collection reference
const booksRef = collection(db, 'books')

//get datas

/*
getDocs(booksRef).then( (snapshot) => {
   const books = []
   snapshot.docs.map(doc => {
      // doc.data()
          books.push({ ...doc.data(), id : doc.id})     
       })
  console.log('books',books)
  booksDiv.innerHTML=JSON.stringify(books)
}).catch(err => console.log(err))
*/

onSnapshot(booksRef, (snapshot) => {
   const books = []
   snapshot.docs.map(doc => {
      // doc.data()
          books.push({ ...doc.data(), id : doc.id})     
       })
  console.log('books',books)

         let div=""
       books.map(b =>{
          console.log(b)
            div+= `<p>${b.titre} ${b.auteur} ${b.id}</p>`
       })

  booksDiv.innerHTML=div
})

const booksDiv = document.getElementById('books')


const addForm = document.querySelector('.add')
addForm.addEventListener('submit', (e) => {
   e.preventDefault()

   console.log(addForm.titre.value)
   console.log(addForm.auteur.value)
   
   addDoc(booksRef , {titre:addForm.titre.value, auteur:addForm.auteur.value}).then(() => {
      addForm.reset()
   })


})

const delForm = document.querySelector('.delete')
delForm.addEventListener('submit', (e) => {
   e.preventDefault()
   const delRef = doc(db, 'books',delForm.id.value)
   deleteDoc(delRef).then(()=> {
      delForm.reset()
   })

})