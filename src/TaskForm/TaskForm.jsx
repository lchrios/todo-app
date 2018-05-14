import React, { Component } from 'react';
import './TaskForm.css';

class TaskForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            newTaskDesc:"",
        };
        this.handleUserInput = this.handleUserInput.bind(this);
        this.writeTask = this.writeTask.bind(this);
    }
    
    // Cada vez que cambia el contenido del inputbotx, se actualiza
    // newTaskDesc con el valor del input
    handleUserInput(e){
        this.setState({
            newTaskDesc: e.target.value, //el valor del inputbox
        })
    }

    writeTask(){
        this.props.addTask(this.state.newTaskDesc)

        // Para borrar el string del input al clicar
        this.setState({
            newTaskDesc: '',
        })
    }

    render(){
        return(
            <div className="formWrapper">
                <input className="taskInput"
                placeholder="Descricpión de la nueva nota..."
                value={this.state.newTaskDesc}
                onChange={this.handleUserInput} />
                <button className="taskButton"
                onClick={this.writeTask}>Agregar</button>
            </div>
        )
    }

}

export default TaskForm;