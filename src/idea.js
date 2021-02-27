var newCardArray = [];


class Idea {
  constructor(inputTitle, inputBody, inputStar, inputID){
    this.title = inputTitle;
    this.body = inputBody;
    this.star = Boolean(inputStar);
    this.id = inputID || new Date().getMilliseconds();
  }
  saveToStorage(){

    var stringIdea = JSON.stringify(newCardArray);
    localStorage.setItem('ideasArray', stringIdea);
  }
  deleteFromStorage(){
    //To be Implemented
  }
  updateIdea(){
    //To be Implemented
  }
}
