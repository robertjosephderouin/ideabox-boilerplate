//*Pseduo Code Go Here*
//Click button to add the contents of an idea card.
//Instansiate an Idea class
//Have it line up next to other cards.

//*Variables Go Here*
var saveButton = document.querySelector('#save-btn');
var inputTitle = document.querySelector('#title-input');
var inputBody = document.querySelector('#body-input');
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

function createNewCard(){
  newCard = new Idea(inputTitle.value, inputBody.value);
  newCardArray.push(newCard);
  clearTitleText();
  clearBodyText();
}
