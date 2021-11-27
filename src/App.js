import './App.css';
import React from "react";

class CheckBoxForm extends React.Component{
    constructor(props) {
        super(props);
        this.isGoing = "isGoing";
        this.birthday = "birthday";
        this.numberOfGuest = "numberOfGuest";
        this.state = {
            [this.isGoing] : true,
            [this.birthday] : true,
            [this.numberOfGuest] : 1
        };
        this.inputChangeHandle = this.inputChangeHandle.bind(this);
        this.submitHandle = this.submitHandle.bind(this);
    }
    inputChangeHandle(event){
        const target = event.target;
        const value = (target.type === 'checkbox' ? target.checked : target.value);
        const name = target.name;
        this.setState({
            [name] : value
        });
    }

    submitHandle(event){

    }

    render(){
        return(
          <form>
              <label>
                  Is going:
                  <input name={this.isGoing} type="checkbox" checked={this.state.isGoing}
                         onChange={this.inputChangeHandle}/>
              </label>
              <br/>
              <label>
                  Is Birthday:
                  <input name={this.birthday} type="checkbox" checked={this.state[this.birthday]}
                         onChange={this.inputChangeHandle}/>
              </label>
              <br/>
              <label>
                  Number of guests:
                  <input
                      name="numberOfGuest" type="number" value={this.state.numberOfGuest}
                      onChange={this.inputChangeHandle}/>
              </label>
          </form>
        );
    }
}

class SelectForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {value: 'CherryCoke'};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        alert("you selected the " + this.state.value);
        event.preventDefault();
    }
    render(){
        return(
          <form onSubmit={this.handleSubmit}>
              <label>
                  Pick your favorite flavor:
                  <select value={this.state.value} onChange={this.handleChange}>
                      <option value="CherryCoke">CherryCoke</option>
                      <option value="Lemonade">Lemonade</option>
                      <option value="MintChocolate">MintChocolate</option>
                      <option value="Coffee">Coffee</option>
                      <option value="SourCandy">SourCandy</option>
                  </select>
              </label>
              <input type="submit" value="Select"/>
          </form>
        );
    }
}

class TextAreaForm extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        alert('An essay was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
                <label>
                    Essay:
                    <textarea value={this.state.value} onChange={this.handleChange} placeholder="텍스트 에이리어입니다!"/>
                </label>
                <input type="submit" value="send"/>
            </form>
        )
    }
}

class TextForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event){
        this.setState({value: event.target.value});
    }

    handleSubmit(event){
        alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
    }

    render(){
        return (<form onSubmit={this.handleSubmit}>
            <label>
                Name:
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
            </label>
            <input type="submit" value="submit"/>
        </form>);
    }

}

function MailBox(props) {
    const unreadMessages = props.unreadMessages;
    /*const listItems = unreadMessages.map((messages, index)=>
        <li key={messages.id}>{index.toString()+" ) "+messages}</li>
    )*/
    // 인라인으로 삽입한 경우 가독성이 좋지 않을 수 있음!
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &&
            <h2>you have {unreadMessages.length} unread messages</h2>}
            <ul>
                {unreadMessages.map((messages)=>
                    <li key={messages.id}>{messages}</li>)
                }
            </ul>
        </div>
    );
}

function WarningBanner(props) {
    if (!props.warn) {
        // null 을 반환하면
        return null;
    }
    return (
        <div className="warning">
            Warning!
        </div>
    );
}

class Page extends React.Component{
    constructor(props) {
        super(props);
        this.state = {showWarning: true};
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick(){
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }) );
    }

    render(){
        return(
          <div>
              <WarningBanner warn={this.state.showWarning}/>
              <button onClick={this.handleToggleClick}>
                  {this.state.showWarning ? 'Hide' : 'Show'}
              </button>
          </div>
        );
    }
}

class ClickHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isOnOff: false};
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.setState(prevState => ({
            isOnOff: !prevState.isOnOff
        }));
    }

    render() {
        return (
            <button onClick={this.clickHandler}>
                {this.state.isOnOff ? 'On' : 'Off'}
            </button>

        )
    }
}

function App() {
    const messages = ['React', 'Re: react', 'Re:Re:React'];
    return (
        <div className="App">
            <div className="container">
                <header className="App-header">
                    <p> I made a Button! </p>
                    <ClickHandler/>
                    <p> return null makes hiding component!</p>
                    <Page/>
                    <MailBox unreadMessages={messages}/>
                </header>
            </div>
            <div className="container">
                <main className="sub-container">
                    <TextForm/>
                </main>
                <aside className="sub-container">
                    <ul>
                        {messages.map((m) =>
                        <li>{m}</li>)}
                    </ul>
                </aside>
            </div>
            <div className="container">
                <aside className="sub-container">
                    <TextAreaForm/>
                </aside>
                <footer className="sub-container">
                    <SelectForm/>
                </footer>
                <main className="sub-container">
                    <form>
                        <input type="file"/>
                    </form>
                </main>
                <main className="sub-container">
                    <CheckBoxForm/>
                </main>
            </div>
        </div>
    );
}

export default App;

