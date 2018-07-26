import { Component, Prop } from '@stencil/core';


@Component({
  tag: 'app-home',
  styleUrl: 'app-home.css'
})

export class AppHome {
  @Prop() uid: string;

  render() {
    return (
      <div class='app-home'>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url='/history' component='display-workouts' componentProps={{ uid: this.uid }} />
            <stencil-route url='/' component='workouts-dashboard' exact={true} componentProps={{ uid: this.uid }} />
          </stencil-route-switch>
        </stencil-router>
      </div>
    );
  } 
}
