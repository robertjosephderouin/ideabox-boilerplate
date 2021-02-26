//*Pseduo Code Go Here*
//Click button to add the contents of an idea card.
//Instansiate an Idea class
//Have it line up next to other cards.

//*Variables Go Here*
var saveButton = document.querySelector('#saveBtn');
var inputTitle = document.querySelector('#titleInput');
var inputBody = document.querySelector('#bodyInput');
var savedCardGrid = document.querySelector('#savedCardGrid');
var favoriteStar = document.querySelector('#star');

var newCard

//*Data Goes Here*
var newCardArray = [];




//*Event Listeners Go Here*
saveButton.addEventListener('click', createNewCard);
inputTitle.addEventListener('input', checkInputValues);
inputBody.addEventListener('input', checkInputValues);
window.addEventListener('load', disableButton);
savedCardGrid.addEventListener('click', toggleFavorite);

//*Functions Go Here*
function favorite() {
  favoriteStar.classList.remove('unchecked');
  favoriteStar.classList.add('checked');
}

function unFavorite() {
  favoriteStar.classList.remove('checked');
  favoriteStar.classList.add('unchecked');
}

function toggleFavorite(event) {
  var newStar = event.target.closest('input');
  if (newStar.classList.contains('unchecked')){
    favorite()
  } else {
    return false;
  }
}

function disableButton() {
  saveButton.disabled = true;
}

function checkInputValues() {
  if(inputTitle.value != "" && inputBody.value != ""){
    saveButton.disabled = false;
    styleSaveActive();
    }
}

function clearText(){
  inputTitle.value = "";
  inputBody.value = "";
  saveButton.disabled = true;
  styleSaveDisable();
}

function styleSaveActive() {
  saveButton.classList.remove('input-missing');
  saveButton.classList.add('save-btn');
  saveButton.classList.add('form-style');
}

function styleSaveDisable() {
  saveButton.classList.remove('save-btn');
  saveButton.classList.remove('form-style');
  saveButton.classList.add('input-missing');
}

function renderNewCard() {
  savedCardGrid.innerHTML = "";
  for (var i = 0; i < newCardArray.length; i++) {
    savedCardGrid.insertAdjacentHTML('beforeend',
      `<article class="new-card" id=${newCardArray[i].id}>
        <div class="article-top">
          <input class="unchecked" type="checkbox" name="star" value="star" id="star"></input>
          <label for="star"></label>
          <button class="x-btn"></button>
        </div>
        <h3>${newCardArray[i].title}</h3>
        <p>${newCardArray[i].body}</p>
        <div class="article-bottom">
          <button class="comment-btn"></button>
          <p>Comment</p>
        </div>
      </article>`);
      var xButton = document.getElementById(newCardArray[i].id).querySelector('.x-btn');
      xButton.addEventListener('click', deleteSavedCard);
  }
}

function createNewCard(){
  newCard = new Idea(inputTitle.value, inputBody.value);
  newCardArray.push(newCard);
  clearText();
  renderNewCard();
}

function deleteSavedCard(event) {
  var clickedSavedCard = event.target.closest('.new-card');
  for (i = 0; i < newCardArray.length; i++) {
    if (newCardArray[i].id === Number(clickedSavedCard.id)) {
      newCardArray.splice(i, 1);
    };
  };
  renderNewCard();
}
