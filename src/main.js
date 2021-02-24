//*Pseduo Code Go Here*
//Click button to add the contents of an idea card.
//Instansiate an Idea class
//Have it line up next to other cards.

//*Variables Go Here*
var saveButton = document.querySelector('#save-btn');
var inputTitle = document.querySelector('#title-input');
var inputBody = document.querySelector('#body-input');



//*Data Goes Here*



//*Event Listeners Go Here*
saveButton.addEventListener('click', createNewCard);


//*Functions Go Here*
function createNewCard(){
  var newCard = new Idea(inputTitle.value, inputBody.value);
  console.log(newCard);
}
