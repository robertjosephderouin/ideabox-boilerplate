var showButton = document.querySelector('#showBtn');
var inputTitle = document.querySelector('#titleInput');
var inputBody = document.querySelector('#bodyInput');
var saveButton = document.querySelector('#saveBtn');
var searchInput = document.querySelector('#searchInput');
var savedCardGrid = document.querySelector('#savedCardGrid');
var ifFiltering = false;
var ifSearching = false;

window.addEventListener('load', disableButton);
window.addEventListener('load', retrieveCards)
saveButton.addEventListener('click', createNewCard);
showButton.addEventListener('click', toggleIdeasFilter);
inputTitle.addEventListener('input', checkInputValues);
inputBody.addEventListener('input', checkInputValues);
searchInput.addEventListener('keyup', searchIdeas);
searchInput.addEventListener('click', clearField)


function retrieveCards() {
  var json = localStorage.getItem('ideasArray');
  var parsedCards = JSON.parse(json) || [];
  for (var i = 0; i < parsedCards.length; i++) {
    var parsedCard = parsedCards[i];
    var newIdea = new Idea(parsedCard.title, parsedCard.body, parsedCard.star, parsedCard.id);
    newCardArray.push(newIdea);
  }
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

function clearField(){
  searchInput.value = "";
}

function classListRemove(element) {
  saveButton.classList.remove(element);
}

function classListAdd(element){
  saveButton.classList.add(element);
}

function styleSaveActive() {
  classListRemove('input-missing');
  classListAdd('save-btn');
  classListAdd('form-style');
}

function styleSaveDisable() {
  classListRemove('save-btn');
  classListRemove('form-style');
  classListAdd('input-missing');
}

function updateArrayValue(){
  var newFilterArray = newCardArray;
  if(ifFiltering){
    newFilterArray = findFavorites();
  }
  if(ifSearching){
    newFilterArray = filterIdeasByText(event);
  }
  return newFilterArray;
}

function renderNewCard() {
  var newFilterArray = updateArrayValue();
  savedCardGrid.innerHTML = "";
  for (var i = 0; i < newFilterArray.length; i++) {
    savedCardGrid.insertAdjacentHTML('beforeend',
      `<article class="new-card" id=${newFilterArray[i].id}>
        <div class="article-top">
          <form class="star-form">
            <input
              ${newFilterArray[i].star ? 'checked="checked"' : ''};
              class="star"
              type="checkbox"
              name="star-${newFilterArray[i].id}"
              value="star-${newFilterArray[i].id}"
              id="star-${newFilterArray[i].id}"/>
            <label for="star-${newFilterArray[i].id}"></label>
          </form>
          <button class="x-btn"></button>
        </div>
        <h3>${newFilterArray[i].title}</h3>
        <p>${newFilterArray[i].body}</p>
        <div class="article-bottom">
          <button class="comment-btn"></button>
          <p>Comment</p>
        </div>
      </article>`);
      var newCardElement = document.getElementById(newFilterArray[i].id);
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
  Idea.saveToStorage();
  renderNewCard();
}

function deleteSavedCard(event) {
  var clickedSavedCard = event.target.closest('.new-card');
  for (i = 0; i < newCardArray.length; i++) {
    if (newCardArray[i].id === Number(clickedSavedCard.id)) {
      Idea.deleteFromStorage(i);
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
      Idea.saveToStorage();
      break
    }
  }
}

function showIdeas(buttonText, filtering) {
  showButton.innerText = buttonText;
  ifFiltering = filtering;
  renderNewCard();
}

function toggleIdeasFilter() {
  if(showButton.innerText === 'Show Starred Ideas'){
    showIdeas('Show All Ideas', true);
  } else {
    showIdeas('Show Starred Ideas', false);
  }
}

function findFavorites() {
  ifSearching = false;
  return searchFavorites();
}

function searchFavorites() {
 var filteredArray = [];
 for(var i = 0; i < newCardArray.length; i++) {
   if(newCardArray[i].star){
     filteredArray.push(newCardArray[i]);
   }
 }
 return filteredArray;
}

function searchIdeas() {
  filterIdeasByText(event);
  renderNewCard();
}

function filterIdeasByText(event) {
  ifSearching = true;
  ifFiltering = false;
  if(showButton.innerText === 'Show All Ideas'){
    favArray = searchFavorites()
    return searchArray(favArray)
  } else {
    return searchArray(newCardArray)
  }
}

function searchArray(array) {
  var letters = event.target.value
  var filteredArray = [];
  for (var i = 0; i < array.length; i++){
    if(array[i].title.includes(letters) || array[i].body.includes(letters)) {
      filteredArray.push(array[i])
    }
  }
  return filteredArray
}
