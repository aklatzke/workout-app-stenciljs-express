import { Component, State, Event, EventEmitter, Prop } from '@stencil/core';
import { get } from '../../utils/fetch';


@Component({
    tag: 'add-exercise',
    styleUrl: 'add-exercise.css'
})
export class AddExercise {
    @Event() changeBack: EventEmitter;
    @Event() setContextMenu: EventEmitter;

    @State() exercises: Object;

    @Prop() activeWorkout: string;
    @Prop() activeExercises: [string];

    async componentWillLoad(){
        this.changeBack.emit("/workout/active");
        this.setContextMenu.emit("");

        let response = await get("/exercises/list");
        this.exercises = response;

        console.log(this.activeExercises);
    }

    renderGroups(){
        if( this.exercises ){
            return (
                <div class='row'>
                    {Object.keys(this.exercises).sort().map(key => {
                        return <exercise-group activeWorkout={this.activeWorkout} title={key} records={this.exercises[key]} existing={this.activeExercises} ></exercise-group>
                    })}
                </div>
            )
        }
    }

    render() {
        return this.renderGroups();
    }
}
