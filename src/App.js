import React, { Component } from 'react';
import Task from './Task/Task';
import TaskForm from './TaskForm/TaskForm';
import { DB_CONFIG } from './Config/config';
import firebase from '@firebase/app';
import '@firebase/database'; 
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('tasks');

    //Setup del React state del componente
    this.state = {
      tasks: [],
    }
  }

  componentWillMount(){
    const previousTasks = this.state.tasks;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousTasks.push({
        id: snap.key,
        taskDesc: snap.val().taskDesc,
      })

      this.setState({
        tasks: previousTasks,
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i<previousTasks.length; i++){
        if(previousTasks[i].id === snap.key){
          previousTasks.splice(i, 1);
        }
      }

      this.setState({
        tasks: previousTasks,
      })
    })
  }

  addTask(task){
    this.database.push().set({ taskDesc: task })
  }

  removeTask(taskId){
    this.database.child(taskId).remove();
  }

  render() {
    return (
      <div className="taskWrapper">
        <div className="taskHeader">
          <div className="heading">2Do-App</div>
        </div>
        <div className="taskBody">
          {
            this.state.tasks.map((task) => {
              return(
                <Task taskDesc={task.taskDesc} 
                taskId={task.id} 
                key={task.id} 
                removeTask={this.removeTask} />
              )
            })
          }
        </div>
        <div className="taskFooter">
          <TaskForm addTask={this.addTask}/>
        </div>
      </div>
    );
  }
}

export default App;
