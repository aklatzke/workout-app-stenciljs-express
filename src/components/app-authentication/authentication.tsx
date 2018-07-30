import { Component, Event, EventEmitter } from '@stencil/core';
// Necessary to stop tslint from throwing errors
// for unknown property on Window
declare global {
  interface Window { 
    firebase: any;
    Plotly: any;
  }
}

if( ! window.firebase ){
  window.firebase = {};
  window.firebase.auth = () => {
    return {
      onAuthStateChanged : () => {

      },
      signInWithRedirect : () => {
        
      }
    }
  };
  window.firebase.auth.GoogleAuthProvider = () => {};
}

@Component({
  tag: 'app-authentication',
  styleUrl: 'authentication.css'
})

export class Authentication {
  @Event() authenticationResponse: EventEmitter;

  componentDidLoad = () => {
    window.firebase.auth().onAuthStateChanged(res => {
      if( ! res ){
        window.firebase.auth().signInWithRedirect(new window.firebase.auth.GoogleAuthProvider());
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
