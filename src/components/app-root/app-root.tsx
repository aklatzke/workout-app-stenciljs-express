import { Component, Listen, State } from '@stencil/core';
import { post } from '../../utils/fetch';

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

  @Listen('authenticationResponse')

  async handleAuthentication(event: CustomEvent){
      if( event.detail ){
        let userDetails = { ...event.detail };

        this.isAuthenticated = true;

        let response = await post("http://localhost:8080/user/findOrCreate", userDetails);

        this.activeUser = response;
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

  renderApp(){
    return (
      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url='/' component='workouts-dashboard' exact={true} componentProps={{ uid: this.activeUser._id }}/>
            <stencil-route url='/profile/:name' component='app-profile' />
            <stencil-route url='/exercise/:eid' component='exercise-specific' exact={true} componentProps={{ uid: this.activeUser._id }} />
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
            <span>{this.activeUser ? this.activeUser.displayName : null}</span>
          </div>
        </header>

        { this.maybeRenderLogin() }
      </div>
    );
  }
}
