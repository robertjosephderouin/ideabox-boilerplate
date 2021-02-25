//*Pseduo Code Go Here*
//Click button to add the contents of an idea card.
//Instansiate an Idea class
//Have it line up next to other cards.

//*Variables Go Here*
var saveButton = document.querySelector('#saveBtn');
var inputTitle = document.querySelector('#titleInput');
var inputBody = document.querySelector('#bodyInput');
var savedCardGrid = document.querySelector('#savedCardGrid');
var newCard

//*Data Goes Here*
var newCardArray = [];




//*Event Listeners Go Here*
saveButton.addEventListener('click', createNewCard);

inputTitle.addEventListener('input', checkforUserInput);
inputBody.addEventListener('input', checkforUserInput);

//*Functions Go Here*

function checkforUserInput() {
  
}


function clearTitleText(){
  inputTitle.value = "";
}

function clearBodyText(){
  inputBody.value = "";
}

function renderNewCard() {
  savedCardGrid.innerHTML = "";
  for (var i = 0; i < newCardArray.length; i++) {
    savedCardGrid.insertAdjacentHTML('beforeend',
      `<article class="new-card" id=${newCardArray[i].id}>
        <div class="article-top">
          <input type="checkbox" name="star" value="star" id="star"></input>
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
  clearTitleText();
  clearBodyText();
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
