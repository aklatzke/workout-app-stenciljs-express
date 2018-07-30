import { Component, State, Prop, Event, EventEmitter } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { get, post } from '../../utils/fetch';
import moment from 'moment';

class ResponseType{
    _id: string;
    name: string;
}

@Component({
    tag: 'new-workout',
    styleUrl: 'new-workout.css'
})
export class NewWorkout {
    @Event() changeBack: EventEmitter;
    @Event() activeWorkoutChange: EventEmitter;

    @State() workoutName: string;
    @State() selectedWorkout: string;
    @State() workouts: [ResponseType];

    @Prop() uid: string;
    @Prop() history : RouterHistory;

    async componentWillLoad(){
        this.changeBack.emit("/");

        let response = await get(`http://localhost:8080/user/${this.uid}/workouts/list`);

        this.workouts = response;
    }

    async handleSubmit(e){
        e.preventDefault();
        
        let data = await post(`http://localhost:8080/user/${this.uid}/workout/new`, {
            name: this.workoutName,
            timestamp: moment().utc().valueOf()
        })

        if( data ){
            this.activeWorkoutChange.emit();

            this.history.push("/workout/active");
        }
    }

    async handleSelectSubmit(e){
        e.preventDefault();
    }

    handleChange(e){
        this.workoutName = e.target.value;
    }

    handleSelectChange(e){
        this.selectedWorkout = e.target.value;
    }

    render() {
        return (
            <div class='row'>
                <div class='col-10 offset-1'>
                    <h3>New Workout</h3>
                </div>
                <div class="col-10 offset-1 pt-4">
                    <h4>Create a New Workout</h4>
                    <form class='form pt-3' onSubmit={ (e) => this.handleSubmit(e) }>
                        <div class='form-group'>
                            <input name="name" type='text' value={this.workoutName} onChange={ e => this.handleChange(e) } class='form-control underline-control' placeholder="Workout Name" />
                        </div>

                        <div>
                            <input type="submit" class='btn btn-outline-info float-right' value='Create New'/>
                        </div>
                    </form>
                </div>

                <div class="col-10 offset-1 pt-4">
                    <h4>Select a Previous Routine</h4>
                    <form class='form pt-3' onSubmit={(e) => this.handleSelectSubmit(e)}>
                        <div class='form-group'>
                            <select name="prev-workout" onChange={e => this.handleSelectChange(e)} class='form-control underline-control'>
                                { this.workouts.map( i => i.name !== "undefined" ? <option value={i._id}>{i.name}</option> : null ) }
                            </select>
                        </div>

                        <div>
                            <input type="submit" class='btn btn-outline-info float-right' value='Start Workout' />
                        </div>
                    </form>
                </div> 
            </div>
        );
    }
}
