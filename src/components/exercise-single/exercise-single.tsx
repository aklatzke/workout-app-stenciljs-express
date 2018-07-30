import { Component, Prop } from '@stencil/core';

@Component({
    tag: 'exercise-single',
    styleUrl: 'exercise-single.css'
})

export class ExerciseSingle {

    @Prop() data : any;

    render() {
        return (
            <div>
                <p>{ JSON.stringify(this.data, null, 2) }</p>
            </div>
        );
    }
}
