import { Component, Prop, State } from '@stencil/core';
import { WorkoutType } from '../../interfaces/WorkoutType';
import moment from 'moment';

@Component({
    tag: 'active-workout-bar',
    styleUrl: 'active-workout-bar.css'
})
export class ActiveWorkoutBar {
    @Prop() activeWorkout: WorkoutType;

    @State() timer: any;

    interval: any;

    componentWillLoad(){
        this.interval = setInterval(() => {
            let duration = moment.duration(moment().utc().diff(moment(this.activeWorkout.date)));
            this.timer = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
        }, 1000)
    }

    componentWillUnload(){
        clearInterval(this.interval);
    }
    
    render() {
        return (
            <stencil-route-link url="/workout/active">
                <div class='active-workout-bar'>
                    <div class="row">
                        <div class='col-7 text-center'>Active Routine: <strong>{this.activeWorkout.name}</strong></div>
                        <div class='col-5 text-center timer'>{this.timer}</div>
                    </div>
                </div>            
            </stencil-route-link>
        );
    }
}
