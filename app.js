const livroList= document.querySelector('#book-list');

function renderBook(doc){

   //criação dos elementos html
   let li= document.createElement('li');
   let titulo= document.createElement('span');
   let autor = document.createElement('span');

   //carrega os dados dos elementos html
   li.setAttribute('data-id', doc.id);
   titulo.textContent= doc.data().titulo;
   autor.textContent= doc.data().autor;

   //adiciona os dados de autor e titulo na tag li;
   li.appendChild(titulo); 
   li.appendChild(autor);
   //adiciona o li na tag ul
   livroList.appendChild(li);

}

db.collection('libri-firestore')
.get()
.then(
    (snapshot)=>{
       // console.log(snapshot.docs)
       snapshot.docs.forEach(doc => {
        console.log(doc.data());
        renderBook(doc);
       });
    }
);

const form = document.querySelector('#add-book-form');

form.addEventListener('submit', (event)=>{

   event.preventDefault();
   
   db.collection('libri-firestore').add({
      autor: form.autor.value,
      titulo: form.titulo.value
   }).then(()=>{
      form.autor.value= '';
      form.titulo.value='';
      window.location.reload();
   });
   
});
