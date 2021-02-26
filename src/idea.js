class Idea {
  constructor(inputTitle, inputBody){
    this.id = new Date().getMilliseconds();
    this.title = inputTitle;
    this.body = inputBody;
    this.star = false;
  }
  saveToStorage(){
    var stringIdea = JSON.stringify(this);
    var stringID = this.id;
    localStorage.setItem(stringID, stringIdea);
    console.log(stringID);
  }
  deleteFromStorage(){
    //To Be Implemented
  }
  updateIdea(){
    //To be Implemented
  }
}
