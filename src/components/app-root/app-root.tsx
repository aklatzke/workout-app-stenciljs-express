import { Component, Listen, State } from '@stencil/core';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  isAuthenticated: boolean = false;
  @State() activeUser : Object;

  @Listen('authenticationResponse')
  handleAuthentication(event: CustomEvent){
      if( event.detail ){
        this.isAuthenticated = true;
        this.activeUser = { ...event.detail };
      }
  }

  renderApp(){
    return (
      <main>
        <stencil-router>
          <stencil-route-switch scrollTopOffset={0}>
            <stencil-route url='/' component='app-home' exact={true} />
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
          <h1>Gamification</h1>
        </header>

        { this.maybeRenderLogin() }
      </div>
    );
  }
}
