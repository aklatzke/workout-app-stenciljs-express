import { Component, Event, EventEmitter } from '@stencil/core';
// Necessary to stop tslint from throwing errors
// for unknown property on Window
declare global {
  interface Window { 
    firebase: any;
    Plotly: any;
  }
}

@Component({
  tag: 'app-authentication',
  styleUrl: 'authentication.css'
})

export class Authentication {
  @Event() authenticationResponse: EventEmitter;
  auth = window.firebase.auth;

  componentDidLoad = () => {
    this.auth().onAuthStateChanged(res => {
      if( ! res ){
        this.auth().signInWithRedirect(new this.auth.GoogleAuthProvider());
      }
      else {
        let { email, displayName, uid } = res;

        this.authenticationResponse.emit({
          email, displayName, uid
        })
      }
    })
  }

  render() {
    return null;
  }
}
