import { Component, Prop, State } from '@stencil/core';
import { get } from '../../utils/fetch';

class WorkoutResponse{
    name;
    muscleGroup;
    _id;
}

@Component({
    tag: 'workout-list',
    styleUrl: 'workout-list.css'
})

export class WorkoutList {
    @Prop() uid: string;
    @State() list: WorkoutResponse[] = [];

    async componentDidLoad(){
        let response = await get(`/user/exercises/all/?uid=${this.uid}`);
        this.list = [...response];
    }

    render() {
        return (
            <div>
                <h4>Graphs & Data</h4>
                <hr />
                {this.list.map( item => {
                    return (
                        <stencil-route-link url={ `/exercise/${item._id}` }>
                            <button class='btn btn-primary btn-sm mr-2 mb-2'>{item.name}</button>
                        </stencil-route-link>
                    )
                })}
            </div>
        );
    }
}
