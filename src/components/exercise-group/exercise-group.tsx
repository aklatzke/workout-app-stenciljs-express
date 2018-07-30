import { Component, Prop, State } from '@stencil/core';
import { get } from '../../utils/fetch';
import { ExerciseType } from '../../interfaces/ExerciseType';

@Component({
    tag: 'exercise-group',
    styleUrl: 'exercise-group.css'
})

export class ExerciseGroup {
    @Prop() records: [ExerciseType];
    @Prop() title: string;
    @Prop() activeWorkout: string;
    @State() expanded: boolean = false;

    async addExercise(id){
        console.log(this.activeWorkout)
        let response = await get(`/workout/${this.activeWorkout}/add/${id}`);

        console.log(response);
    }

    renderItems(){
        if( this.expanded ){
            return (
                <ul class="col-12 pl-4 pr-4 exercise-records mt-4">
                    {this.records.map(item => <li onClick={() => this.addExercise(item._id)}>{item.name} <i class='fa fa-plus float-right'></i></li> ) }
                </ul>
            )
        }
    }

    render() {
        return (
            <div class={'col-12 pt-2 pb-2 group ' + (this.expanded ? 'group-expanded' : '')}>
                <div class='row'>
                    <div class='col-10 offset-1' onClick={ () => this.expanded = !this.expanded }>
                        <h6>{this.title} { this.expanded ? <i class='fa fa-caret-up float-right'></i> : <i class='fa fa-caret-down float-right'></i> }</h6>
                    </div>
                    
                    { this.renderItems() }
                </div>
            </div>
        );
    }
}
