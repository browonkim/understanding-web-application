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
                {unreadMessages.map((messages)=>
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

export class Page extends React.Component{
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