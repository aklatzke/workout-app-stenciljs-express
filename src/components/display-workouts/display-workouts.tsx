import { Component, Prop } from '@stencil/core';
import { get } from '../../utils/fetch';

@Component({
  tag: 'display-workouts',
  styleUrl: 'display-workouts.css'
})

export class DisplayWorkouts {
  @Prop() uid: string;

  componentDidLoad = async () => {
    let response = await get(`http://localhost:8080/user/workouts?uid=${this.uid}`);

    console.log(response);
  }

  render() {
    return null;
  }
}
