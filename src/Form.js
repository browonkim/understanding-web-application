import React from "react";

export class CheckBoxForm extends React.Component{
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

export class SelectForm extends React.Component{
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

export class TextAreaForm extends React.Component{

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

export class TextForm extends React.Component{

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
