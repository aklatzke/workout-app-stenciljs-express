import { Component, Listen, State } from '@stencil/core';
import { get, post } from '../../utils/fetch';
import { WorkoutType } from '../../interfaces/WorkoutType';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})

export class AppRoot {
  isAuthenticated: boolean = false;

  @State() activeUser : {
    displayName: String,
    email: String,
    uid: String,
    _id: any
  };

  @State() backUrl: string;
  @State() activeWorkout: WorkoutType;
  @State() hasActiveWorkout: boolean = false;
  @State() contextMenu: any;

  @Listen('authenticationResponse')
  async handleAuthentication(event: CustomEvent){
      if( event.detail ){
        let userDetails = { ...event.detail };

        this.isAuthenticated = true;

        let response = await post("http://localhost:8080/user/findOrCreate", userDetails);

        this.activeUser = response;
        this.activeWorkout = await get(`http://localhost:8080/user/${this.activeUser._id}/workout/active`);        
        if( this.activeWorkout )
          this.hasActiveWorkout = true;
      }
  }

  @Listen('setContextMenu')
  setContextMenu(event){
    this.contextMenu = event.detail;
  }

  maybeRenderActiveBar(){
    if (this.hasActiveWorkout) {
      return <active-workout-bar activeWorkout={this.activeWorkout}></active-workout-bar>
    }
  }

  @Listen('changeBack')
  async changeBack(event: CustomEvent){
    if( event.detail ){
        this.backUrl = event.detail;
    }
    else{
      this.backUrl = "";
    }
  }

  @Listen('activeWorkoutChange')
  async activeWorkoutChange(){
    this.activeWorkout = await get(`http://localhost:8080/user/${this.activeUser._id}/workout/active`);
    if (this.activeWorkout)
      this.hasActiveWorkout = true;    
    else
      this.hasActiveWorkout = false;
  }

  renderApp(){
    return (
      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url='/' component='workouts-dashboard' exact={true} componentProps={{ uid: this.activeUser._id, hasActiveWorkout: this.hasActiveWorkout }} />
            <stencil-route url='/profile/:name' component='app-profile' />
            <stencil-route url='/exercise/:eid' component='exercise-specific' exact={true} componentProps={{ uid: this.activeUser._id }} />
            <stencil-route url='/workout/new' component='new-workout' exact={true} componentProps={{ uid: this.activeUser._id }} />
            <stencil-route url="/workout/active" component='active-workout' exact={true} componentProps={{uid: this.activeUser._id}} />
            { this.hasActiveWorkout ?
              <stencil-route url="/workout/active/add" component='add-exercise' exact={true} componentProps={{ uid: this.activeUser._id, activeWorkout: this.activeWorkout._id }} /> :
              null
            }
          </stencil-route-switch>
        </stencil-router>
      </main>      
    )
  }

  maybeRenderBack(){
    if( this.backUrl ){
      return (
        <stencil-route-link url={this.backUrl}>
          <button class='btn btn-outline-default btn-sm'><small><i class="fa fa-chevron-left"></i></small> Back</button>
        </stencil-route-link>
      )
    }
  }

  maybeRenderLogin(){
    if(! this.isAuthenticated ){
      return <app-authentication></app-authentication>
    }
    else{
      return this.renderApp();
    }
  }

  render() {
    return (
      <div>
        <header class='navbar'>
          <div class="col-4 header-right text-center">
            { this.maybeRenderBack() }
          </div>
          <div class='col-4 text-center'>
            <h1 class='navbar-brand text-center'>Tracker</h1>
          </div>
          <div class='col-4 header-right text-center'>
            <span>{this.contextMenu}</span>
          </div>
        </header>

        { this.maybeRenderLogin() }
        { this.maybeRenderActiveBar() }
      </div>
    );
  }
}
