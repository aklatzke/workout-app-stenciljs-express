import { Component, Prop, Event, EventEmitter } from '@stencil/core';
import { get } from '../../utils/fetch';

class ResponseType{
  favWorkouts: Object;
  favExercises: Object;
}

@Component({
  tag: 'workouts-dashboard',
  styleUrl: 'workouts-dashboard.css'
})

export class WorkoutsDashboard {
  @Event() changeBack : EventEmitter;
  @Event() setContextMenu: EventEmitter;

  @Prop() uid: string;
  @Prop() hasActiveWorkout: boolean;
  
  plotly: any = window.Plotly;

  componentDidLoad = async () => {
    let response : ResponseType = await get(`http://localhost:8080/user/${this.uid}/workouts/overview`);
    
    let workoutXAxis = Object.keys(response.favWorkouts);
    let workoutYAxis = workoutXAxis.map( key => response.favWorkouts[key] );
    let workoutElement = document.querySelector("#favorite-workouts");
    
    let exerciseXAxis = Object.keys(response.favExercises).slice(0, 5);
    let exerciseYAxis = exerciseXAxis.map(key => response.favExercises[key]);
    let exerciseElement = document.querySelector("#favorite-exercises");    

    this.changeBack.emit(false);

    this.setContextMenu.emit(this.contextMenu())

    let layout = {
      margin: {
        l: 50,
        r: 50,
        t: 50,
        b: 70,
        pad: 0
      },
      plot_bgcolor: "#343434",
      paper_bgcolor: "#343434",      
      yaxis: {
        tickcolor: "#fff",
        tickfont: {
          color: "#fff"
        },
        line: {
          color: "#fff"
        }
      },
      xaxis: {
        tickcolor: "#fff",
        tickfont: {
          color: "#fff"
        }
      }      
    }

    let common = {
      type: "pie",
      labels: workoutXAxis,
      values: workoutYAxis
    }

    let traceOne = {
      ...common,
      textinfo: 'percent',
      textposition: 'outside',
      showlegend: false,
      textfont: {
        color: "#fff"
      }
    }

    let traceTwo = {
      ...common,
      textinfo: 'label',
      textposition: 'inside',
      showlegend: false,
      textfont: {
        color: "#fff"
      }      
    }

    this.plotly.plot(workoutElement, [traceOne, traceTwo], { ...layout, textposition: 'outside' })

    this.plotly.plot(exerciseElement, [{
      type: "bar",
      x: exerciseXAxis,
      y: exerciseYAxis     
    }], layout)    
  }

  contextMenu(){
    return (
      <stencil-route-link url="">
        <button class='btn btn-sm btn-primary btn-just-icon'>
          <i class='fa fa-user'></i>
        </button>
      </stencil-route-link>      
    )
  }

  renderWorkoutButton(){
    if( this.hasActiveWorkout ){
      return (
        <stencil-route-link url="/workout/active">
          <button class='btn btn-block btn-sm btn-outline-primary'>
            Active Workout
          </button>
        </stencil-route-link>
      )
    }
    else{
      return (
        <stencil-route-link url="/workout/new">
            <button class='btn btn-block btn-sm btn-outline-primary'>
              Start Workout
            </button>
        </stencil-route-link>
      )
    }
  }

  render() {
    return (
      <div class="graph-container pl-2 pr-2">
        <h3>Dashboard</h3>
        <hr />
        <div class='row'>
          <div class='col-12'>
            { this.renderWorkoutButton() }
          </div>
        </div>
        <hr />
        <div class="row">
          <div class='col-12 col-md-5 offset-md-1'>
            <h4>Most Performed Routines</h4>
            <div id="favorite-workouts">
            </div>
          </div>
          <div class='col-12 col-md-5 offset-md-1'>
            <h4>Most Performed Excercises</h4>
            <div id="favorite-exercises">

            </div>
          </div>          
        </div>

        <div class="row">
          <div class="col-12">
            <workout-list uid={this.uid}></workout-list>
          </div>
        </div>
      </div>

    )
  }
}
 