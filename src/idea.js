var newCardArray = [];
var newFilterArray = [];

class Idea {
  constructor(inputTitle, inputBody, inputStar, inputID){
    this.title = inputTitle;
    this.body = inputBody;
    this.star = Boolean(inputStar);
    this.id = inputID || new Date().getMilliseconds();
  }
  static saveToStorage(){
    var stringIdea = JSON.stringify(newCardArray);
    localStorage.setItem('ideasArray', stringIdea);
  }
  static deleteFromStorage(index){
    newCardArray.splice(index, 1);
    Idea.saveToStorage();
  }
}
