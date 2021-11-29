import React from "react";

export function MailBox(props) {
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
                {unreadMessages.map((messages) =>
                    <li key={messages.id}>{messages}</li>)
                }
            </ul>
        </div>
    );
}

export function WarningBanner(props) {
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

export class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true};
        this.handleToggleClick = this.handleToggleClick.bind(this);
    }

    handleToggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning}/>
                <button onClick={this.handleToggleClick}>
                    {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

export class ClickHandler extends React.Component {
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

export function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>The water would boil!</p>
    } else {
        return <p>The water would not boil~</p>;
    }
}

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        //
    }

    handleChange(e) {
        //this.setState({temperature: e.target.value});
        this.props.onTemperatureChange(e.target.value);
    }

    render() {
        //const temperature = this.state.temperature;
        //React.Component 에는 props 라는 인스턴스 가 존재함!
        const temperature = this.props.temperature;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>Enter temperature in {scaleNames[scale]}:</legend>
                <input value={temperature} onChange={this.handleChange}/>
                <BoilingVerdict celsius={parseFloat(temperature)}/>
            </fieldset>
        );
    }
}

export class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
        this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
        this.state = {temperature: '', scale: 'c'};
    }

    handleCelsiusChange(temperature){
        this.setState({scale: 'c', temperature});
    }

    handleFahrenheitChange(temperature){
        this.setState({scale: 'f', temperature});
    }

    render() {
        const scale = this.state.scale;
        const temperature = this.state.temperature;
        const celsius = scale === 'f' ? tryConvert(temperature, toCelsius): temperature;
        const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit): temperature;
        return (
            <div>
                <TemperatureInput
                    scale="c"
                    temperature={celsius}
                    onTemperatureChange = {this.handleCelsiusChange}/>
                <TemperatureInput
                    scale="f"
                    temperature={fahrenheit}
                    onTemperatureChange={this.handleFahrenheitChange}/>
                <BoilingVerdict celsius={parseFloat(celsius)}/>

            </div>
        )
    }
}

function toCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert){
    const input = parseFloat(temperature);
    if (Number.isNaN(input)){
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return rounded.toString();
}