import React, { Component } from 'react';
import './Task.css';
import PropTypes from 'prop-types';

class Task extends Component{

    constructor(props){
        super(props);
        this.taskDesc = props.taskDesc;
        this.taskId = props.taskId;
        this.handleRemoveTask = this.handleRemoveTask.bind(this);
    }

    handleRemoveTask(id){
        this.props.removeTask(id);
    }

    render(props){
        return(
            <div className="task fade-in">
                <span className="closebtn"
                      onClick={() => this.handleRemoveTask(this.taskId)}>
                      &times;
                </span>
                <p className="taskDesc">{ this.taskDesc }</p>
            </div>
        )  
    }
}

Task.propTypes = {
    taskDesc: PropTypes.string
}

export default Task;