// Selecionando el DOM:
let myLibrary = []; // aqui vamos a guardar todos nuestros libros.

// Selecionamos elementos del DOM
const addNewBookbutton = document.querySelector('.new-book-button');
const containerPopUp = document.querySelector('.container');
const formPopUp = document.querySelector('.popup-form');
const bookShelft = document.querySelector('.bookshelf');

// Funccion: Activa el PopUp lo hace visible.
addNewBookbutton.addEventListener('click', function() {
   containerPopUp.classList.add('active'); 
})

// Funcion al hacer submit:
/* 1. Prevengo el comportamiento por default.
  2. Obtenemos los valores de los input (con del DOM y el method value y check).// Valores ingresados por el usuario.
  3. Agregamo nuesvos datos/libros a myLibrary (funcion contenedora) (son los parametros que recolectamos)
  4. con mi funcion rendeLibrary borro primero todo lo que hay en el DOM y renderizo todos mi libros.


*/
formPopUp.addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.querySelector('#title').value
  const author = document.querySelector('#author').value
  const pages = document.querySelector('#pages').value
  const isRead = document.querySelector('#is-read').checked

  addBookToLibrary(title, author, pages, isRead)
  renderLibrary()
  containerPopUp.classList.remove('active'); 
})

// Funcion: Renderiza todos mis libros: 
function renderLibrary(){
  bookShelft.innerHTML = " "; // quiero borrar primero todo lo que hay en el DOM
  myLibrary.forEach(libro => { renderBook(libro) // rederizo todos mis libros

  })
};

// Esta funcion me filtra los book  de acuerdo all title.
function RemoveBook (title) {
  myLibrary = myLibrary.filter(book => book.title !== title)
  saveLocal();
  renderLibrary()
}

// si algunos de los titulos que tengo en cada uno de los libros es distinto al titulo al titiulo que le estoy pasando Parametro "title"
// me devueve true. y al devolver true me va filtrar todos menos ese titulo.


// Función Constructora prototipica.
function  Books(title, author, pages, isRead) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = isRead,
  this.info = function(){
  
 return `${this.title} ${this.author} ${this.pages} ${this.read}`
  
  }
}

// Funcion agrega mis datos/ libros a mi array myLibrary: una instancia de mi funcion constructora "Books".
function addBookToLibrary(title, author, pages, isRead){
  var book = new Books (title, author, pages, isRead)
  myLibrary.push(book); // con push me aseguro de agreguen al final de mi array.
  saveLocal();
}

  // Funcion Renderiza 1 solo book.
  function renderBook(libro) {

    const div = document.createElement('div');    // crear al padre
    div.classList.add('libro') // agregar clas al padre
    const h2 = document.createElement('h2')    //Crear elemento
    h2.textContent = libro.title;   // asignar valor al elemento.
    const p1 = document.createElement('p')
    p1.textContent = libro.author;
    const p2 = document.createElement('p')
    p2.textContent = `${libro.pages} pages`;
    const label = document.createElement('label')
    label.textContent = "is Read?";
    const input = document.createElement('input')
    input.type="checkbox";
    input.checked = libro.read;
    const removeButton = document.createElement('button')
    removeButton.addEventListener('click', function() {
      RemoveBook (libro.title)

    })
    removeButton.classList.add('button') // con esto le doy una clase a mi boton
    removeButton.textContent = "RemoveBook"; // con esto le doy un nombre a mi boton.
    
    div.appendChild(h2);
    div.appendChild(p1);
    div.appendChild(p2); // apendarChild
    div.appendChild(label);
    div.appendChild(input);
    div.appendChild(removeButton);
    bookShelft.appendChild(div);
    console.log(div, h2)

    // Apendar el hijo a un padre.
  }

localStorage.setItem("persona", JSON.stringify(myLibrary));
let persona = JSON.parse( localStorage.getItem("persona"));

//renderLibrary(); // para que cada vez que se recargue me renderize

// LOCAL STORAGE

function saveLocal() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
}

function restoreLocal() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  if (myLibrary === null) myLibrary = [];
  renderLibrary();
}

restoreLocal();