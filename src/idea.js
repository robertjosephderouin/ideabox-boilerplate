class Idea {
  constructor(inputTitle, inputBody){
    this.id = new Date().getMilliseconds();
    this.title = inputTitle;
    this.body = inputBody;
    this.star = false;
  }
  saveToStorage(){
    //To Be Implemented
  }
  deleteFromStorage(){
    //To Be Implemented
  }
  updateIdea(){
    //To be Implemented
  }
}
