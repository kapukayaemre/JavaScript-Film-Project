const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll('.card-body')[1];
const clear = document.getElementById('clear-films');


//! Start UI Object
const ui = new UI();


//! Storage Object
const storage = new Storage();


//! Load All Events

eventListeners();

function eventListeners() {
  form.addEventListener("submit", addFilm);

  document.addEventListener('DOMContentLoaded',function(){
    let films = storage.getFilmsFromStorage();
    ui.loadAllFilms(films);
  });

  cardBody.addEventListener('click',deleteFilm);
  clear.addEventListener('click', clearAllFilms);

}

function addFilm(e) {
  const title = titleElement.value;
  const director = directorElement.value;
  const url = urlElement.value;

  if (title === "" || director === "" || url === "") {
    //! Error
    ui.displayMessages('Tüm Alanları Doldurun','danger')

  } else {
    //! New Film
    const newFilm = new Film(title,director,url);
    ui.addFilmToUI(newFilm); //! New film sending to UI
    storage.addFilmToStorage(newFilm); //! Add film to storage
    ui.displayMessages('Film Başarıyla Eklendi','success')

  }
  

  ui.clearInputs(titleElement,directorElement,urlElement);
  e.preventDefault();
}

function deleteFilm(e){
  if(e.target.id === 'delete-film') {
    ui.deleteFilmFromUI(e.target);
    storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    ui.displayMessages('Silme İşlemi Başarılı','success');

  }
}

function clearAllFilms(){
  if (confirm('Emin misiniz ?')) {
    ui.clearAllFilmsFromUI();
    storage.clearAllFilmsFromStorage();
  }
  
}