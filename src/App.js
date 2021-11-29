import './App.css';
import React from "react";
import {CheckBoxForm, SelectForm, TextAreaForm, TextForm} from "./Form.js";
import {Calculator, ClickHandler, MailBox, Page} from "./WebComponents";

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
                <footer className="sub-container">
                    <Calculator/>
                </footer>
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

