import { Component, Prop } from '@stencil/core';
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
  @Prop() uid: string;
  
  plotly: any = window.Plotly;

  componentDidLoad = async () => {
    let response : ResponseType = await get(`http://localhost:8080/user/workouts/overview?uid=${this.uid}`);
    
    let workoutXAxis = Object.keys(response.favWorkouts);
    let workoutYAxis = workoutXAxis.map( key => response.favWorkouts[key] );
    let workoutElement = document.querySelector("#favorite-workouts");
    console.log(response)
    let exerciseXAxis = Object.keys(response.favExercises).slice(0, 5);
    let exerciseYAxis = exerciseXAxis.map(key => response.favExercises[key]);
    let exerciseElement = document.querySelector("#favorite-exercises");    

    this.plotly.plot(workoutElement, [{
      type: "pie",
      labels: workoutXAxis,
      values: workoutYAxis,
    }])

    this.plotly.plot(exerciseElement, [{
      type: "bar",
      x: exerciseXAxis,
      y: exerciseYAxis,
    }])    
  }

  render() {
    return (
      <div class="graph-container">
        <div id="favorite-workouts">
        </div>

        <div id="favorite-exercises">

        </div>
      </div>

    )
  }
}
