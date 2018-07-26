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

  @Listen('authenticationResponse')

  async handleAuthentication(event: CustomEvent){
      if( event.detail ){
        let userDetails = { ...event.detail };

        this.isAuthenticated = true;

        let response = await post("http://localhost:8080/user/findOrCreate", userDetails);

        this.activeUser = response;
      }
  }

  renderApp(){
    return (
      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url='/' component='app-home' exact={true} componentProps={{ uid: this.activeUser._id }}/>
            <stencil-route url='/profile/:name' component='app-profile' />
          </stencil-route-switch>
        </stencil-router>
      </main>      
    )
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
        <header>
          <div class='header-left'>
            <h1>Tracker</h1>
          </div>
          <div class='header-right'>
            {this.activeUser ? this.activeUser.displayName : null}
          </div>
        </header>

        { this.maybeRenderLogin() }
      </div>
    );
  }
}
