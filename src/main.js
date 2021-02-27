//*Variables Go Here*
var saveButton = document.querySelector('#saveBtn');
var inputTitle = document.querySelector('#titleInput');
var inputBody = document.querySelector('#bodyInput');
var savedCardGrid = document.querySelector('#savedCardGrid');

//*Data Goes Here*

//*Event Listeners Go Here*
saveButton.addEventListener('click', createNewCard);
inputTitle.addEventListener('input', checkInputValues);
inputBody.addEventListener('input', checkInputValues);
window.addEventListener('load', disableButton);
window.addEventListener('load', retrieveCards)


function retrieveCards() {
  var json = localStorage.getItem('ideasArray');
  var parsedCards = JSON.parse(json);
  for (var i = 0; i < parsedCards.length; i++) {
    var parsedCard = parsedCards[i];
    var newIdea = new Idea(parsedCard.title, parsedCard.body, parsedCard.star, parsedCard.id);
    newCardArray.push(newIdea);
  }
  console.log(newCardArray);
  renderNewCard();
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
          <form class="star-form">
            <input
              ${newCardArray[i].star ? 'checked="checked"' : ''};
              class="star"
              type="checkbox"
              name="star-${newCardArray[i].id}"
              value="star-${newCardArray[i].id}"
              id="star-${newCardArray[i].id}"/>
            <label for="star-${newCardArray[i].id}"></label>
          </form>
          <button class="x-btn"></button>
        </div>
        <h3>${newCardArray[i].title}</h3>
        <p>${newCardArray[i].body}</p>
        <div class="article-bottom">
          <button class="comment-btn"></button>
          <p>Comment</p>
        </div>
      </article>`);
      var newCardElement = document.getElementById(newCardArray[i].id);
      var xButton = newCardElement.querySelector('.x-btn');
      var starButton = newCardElement.querySelector('.star');
      xButton.addEventListener('click', deleteSavedCard);
      starButton.addEventListener('click', toggleFavorite);
  }
}

function createNewCard(){
  newCard = new Idea(inputTitle.value, inputBody.value);
  newCardArray.push(newCard);
  clearText();
  newCard.saveToStorage();
  renderNewCard();
}

function deleteSavedCard(event) {
  var clickedSavedCard = event.target.closest('.new-card');
  for (i = 0; i < newCardArray.length; i++) {
    if (newCardArray[i].id === Number(clickedSavedCard.id)) {
      newCardArray.splice(i, 1);
      break;
    }
  }
  renderNewCard();
}

function toggleFavorite(event) {
  var checkBoxElement = event.target;
  var clickedSavedCard = event.target.closest('.new-card');
  for (i = 0; i < newCardArray.length; i++) {
    if (newCardArray[i].id === Number(clickedSavedCard.id)){
      newCardArray[i].star = checkBoxElement.checked;
      newCardArray[i].saveToStorage();
      break
    }
  }
}
