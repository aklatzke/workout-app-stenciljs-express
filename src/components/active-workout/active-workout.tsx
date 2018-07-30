import { Component, State, Prop, Event, EventEmitter } from '@stencil/core';
import { RouterHistory } from '@stencil/router';
import { get, post } from '../../utils/fetch';
import { WorkoutType } from '../../interfaces/WorkoutType';


@Component({
    tag: 'active-workout',
    styleUrl: 'active-workout.css'
})


export class ActiveWorkout {
    @Event() changeBack: EventEmitter;
    @Event() setContextMenu: EventEmitter;
    @Event() activeWorkoutChange: EventEmitter;
    @State() workout: WorkoutType;
    @Prop() uid : string;
    @Prop() history: RouterHistory;

    async componentWillLoad(){
        this.changeBack.emit("/");
        this.workout = await get(`/user/${this.uid}/workout/active`);
        this.setContextMenu.emit( this.contextMenu() )
    }

    contextMenu(){
        return (
            <stencil-route-link url="/workout/active/add">
                <button class='btn btn-sm btn-primary btn-just-icon'>
                    <i class='fa fa-plus'></i>
                </button>
            </stencil-route-link>
        )
    }

    renderExercises(){
        if( this.workout.exercises ){
            return (
                this.workout.exercises.map( item => <exercise-single data={item}></exercise-single> )
            )
        }
        else{
            return (
                <stencil-route-link url="/workout/active/add">
                    <button class='btn btn-block btn-outline-primary btn-primary mt-2'>
                        Add an Exercise
                    </button>
                </stencil-route-link>                
            )
        }
    }

    async finishWorkout(){
        let response = await post(`/workout/${this.workout._id}/finish`);

        this.activeWorkoutChange.emit();

        if( response ){
            this.history.push("/");
        }
    }

    render() {
        return (
            <div class='row'>
                <div class="col-12 pt-2 pl-4 pr-4">
                    <div class='row'>
                        <div class='col-12'>
                            <button class='btn btn-block btn-outline-danger' onClick={ () => this.finishWorkout() }>
                                Finish Workout
                            </button>
                        </div>
                    </div>
                    { this.renderExercises() }
                </div>
            </div>
        );
    }
}
