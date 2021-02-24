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


//*Functions Go Here*
function clearTitleText(){
  inputTitle.value = "";
}

function clearBodyText(){
  inputBody.value = "";
}

function renderNewCard() {
  savedCardGrid.innerHTML = "";
  for (var i = 0; i < newCardArray.length; i++) {
    savedCardGrid.innerHTML +=
      `<article id=${newCardArray[i].id}>
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
      </article>`;
  }
}

function createNewCard(){
  newCard = new Idea(inputTitle.value, inputBody.value);
  newCardArray.push(newCard);
  clearTitleText();
  clearBodyText();
  renderNewCard();
}
