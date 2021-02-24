export class Idea {
  constructor(){
    this.id = new Date();
    this.title = "";
    this.body = "";
    this.star = false;
  }
  saveToStorage(){
    //To Be Implemented
  }
  deleteFromStorage(){
    //To Be Implemented
  }
  updateIdea(){
    //To Be Implemented
  }
}

//After adding build step
//module.exports = Idea;