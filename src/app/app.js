import React, { Component } from 'react';
import './app.css';

export default class AppDragDropDemo extends Component {
    state = {
        tasks: []
    };

    constructor() {
        super();
        let tasks = this.state.tasks;
        tasks.push({name:"New Item", category:"inits", bgcolor: "white"});
        this.setState({
            ...this.state,
            tasks
        });
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
        let tasks = this.state.tasks;
        let name = "New Item " + tasks.length;
        tasks.push({name:name, category: cat, bgcolor: "white"});
        this.setState({
            ...this.state,
            tasks
        });

    }

    render() {
        var tasks = {
            inits: [],
            complete: []
        }

        this.state.tasks.forEach ((t) => {
            if (t.category === "complete")
                tasks[t.category].push(
                    <div id="content" key={t.name}>
                        <textarea contentEditable="true" id="textarea"
                            key={t.name}
                            style = {{backgroundColor: t.bgcolor}}
                                  defaultValue={t.name}
                                  />
                        {/*>*/}
                        {/*    {t.name}*/}
                        {/*</textarea>*/}
                    </div>
                );
            else
                tasks[t.category].push(
                    <div id="content" key={t.name}>
                        <input type="text" id="inp" readOnly={true}
                            key={t.name}
                            onDragStart = {(e) => this.onDragStart(e, t.name)}
                            draggable
                            className="draggable"
                            style = {{backgroundColor: t.bgcolor}}
                            value = {t.name}
                        />
                    </div>
                );
        });


        return (
            <div className="container-drag">
                <h2 className="header">Danylov List Builder Demo</h2>
                <div className="inits"
                >
                    <span className="task-header">Generate new item</span>
                    {tasks.inits}
                </div>
                <div className="dropped"
                     onDragOver={(e)=>this.onDragOver(e)}
                     onDrop={(e)=>this.onDrop(e, "complete")}
                >
                    <span className="task-header">Drag here</span>
                    {tasks.complete}
                </div>
            </div>
        );
    }
}
