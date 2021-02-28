//*Variables Go Here*
var saveButton = document.querySelector('#saveBtn');
var inputTitle = document.querySelector('#titleInput');
var inputBody = document.querySelector('#bodyInput');
var savedCardGrid = document.querySelector('#savedCardGrid');
var showButton = document.querySelector('#showBtn');
var searchInput = document.querySelector('#searchInput');
var ifFiltering = false;
var ifSearching = false;

//*Data Goes Here*

//*Event Listeners Go Here*
saveButton.addEventListener('click', createNewCard);
showButton.addEventListener('click', toggleIdeasFilter);
inputTitle.addEventListener('input', checkInputValues);
inputBody.addEventListener('input', checkInputValues);
searchInput.addEventListener('keyup', searchIdeas);
searchInput.addEventListener('click', clearField)
window.addEventListener('load', disableButton);
window.addEventListener('load', retrieveCards)


function retrieveCards() {
  var json = localStorage.getItem('ideasArray');
  var parsedCards = JSON.parse(json) || [];
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

function clearField(){
  searchInput.value = "";
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
  debugger
  var newFilterArray = newCardArray;
  if(ifFiltering){
    newFilterArray = findFavorites();
  }
  if(ifSearching){
    newFilterArray = filterIdeasByText(event);
  }
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

function toggleIdeasFilter() {
  if(showButton.innerText === 'Show Starred Ideas'){
    showStarredIdeas();
  } else {
    showAllIdeas();
  }
}

function findFavorites() {
  ifSearching = false;
  var filteredArray = [];
  for(var i = 0; i < newCardArray.length; i++) {
    if(newCardArray[i].star){
      filteredArray.push(newCardArray[i]);
    }
  }
  return filteredArray;
}

function showStarredIdeas() {
  showButton.innerText = 'Show All Ideas';
  ifFiltering = true;
  renderNewCard();
  console.log(ifFiltering);
  // newCardArray = findFavorites();   breaks code
  // renderNewCard();
}

function showAllIdeas() {
  showButton.innerText = 'Show Starred Ideas';
  ifFiltering = false;
  renderNewCard();
  console.log(ifFiltering);
}

function filterIdeasByText(event) {
  ifSearching = true;
  ifFiltering = false;
  var letters = event.target.value
  var filteredArray = [];
  for (var i = 0; i < newCardArray.length; i++){
    if(newCardArray[i].title.includes(letters) || newCardArray[i].body.includes(letters)) {
      filteredArray.push(newCardArray[i])
    }
  }
  return filteredArray
}

function searchIdeas() {
  filterIdeasByText(event);
  renderNewCard();
}
