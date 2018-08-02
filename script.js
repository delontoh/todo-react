class List extends React.Component {
  constructor(){
    super()
    this.changeHandler = this.changeHandler.bind( this );
    this.clickHandler = this.clickHandler.bind( this );
    this.deleteHandler = this.deleteHandler.bind( this );
    this.doneList = this.doneList.bind( this );
  }

  state = {
    list : [],
    done: [],
    word : "",
  }

  changeHandler(event) {
    this.setState({word: event.target.value});    // state.word changes when onChange method triggers, via input value
    console.log("change", event.target.value);
  }

  clickHandler(event) {
    var typedWord = this.state.word;

    if(typedWord.length > 20) {
      alert("words must be lesser than 20 characters!");
      this.setState({word: ""});
      return
    }
    
    else{  
      var listArr = this.state.list;

      listArr.push(this.state.word);   //push state.word into array

      this.setState({list: listArr});
      this.setState({word: ""});
    }
  }

  deleteHandler(event) {
    var listArr = this.state.list;
    var index = event.target.className;
    listArr.splice(index, 1);  

    this.setState({list: listArr}); 
  }

  doneList(event) {
    var listArr = this.state.list;
    var doneArr = this.state.done;
    var index = event.target.className;

    listArr.slice(index, index+1);    // slice from list array to remove item base on index
    doneArr.push(listArr);

    listArr.splice(index, 1);         // thereafter, do splice to remove item from list array

    this.setState({done: doneArr});
    this.setState({list: listArr});
    
  } 
 
  render() {
      const todo = this.state.list.map((item, index) => {
        return(

          <li className= {index}>{item}  
          <button className= {index} onClick= {this.deleteHandler}>Delete</button>
          <button className= {index} onClick= {this.doneList}>Done</button>
          </li>
        )
      });

      const completed = this.state.done.map(item => {
        return(
          <li>{item}</li>
        )
      });
    
      console.log("rendering");
      return (
        <div className="list">

          <input 
            onChange={this.changeHandler}
            value={this.state.word}
          /><br/>

          <button id= 'new'
            onClick= {this.clickHandler}
          >Add item
          </button><br/>

          <h3>To Do List: </h3>
            <ul>
              {todo} 
            </ul>

          <h3>Completed: </h3>
            <ul>
              {completed}
            </ul>
        </div>
      );
  }
}

ReactDOM.render(
    <List/>,
    document.getElementById('root')
);

