/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as moment } from './chunk-27ccbbe9.js';
import { a as get, b as post } from './chunk-b836f3a3.js';

class ActiveWorkoutBar {
    componentWillLoad() {
        this.interval = setInterval(() => {
            let duration = moment.duration(moment().utc().diff(moment(this.activeWorkout.date)));
            this.timer = moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
        }, 1000);
    }
    componentWillUnload() {
        clearInterval(this.interval);
    }
    render() {
        return (h("stencil-route-link", { url: "/workout/active" },
            h("div", { class: 'active-workout-bar' },
                h("div", { class: "row" },
                    h("div", { class: 'col-7 text-center' },
                        "Active Routine: ",
                        h("strong", null, this.activeWorkout.name)),
                    h("div", { class: 'col-5 text-center timer' }, this.timer)))));
    }
    static get is() { return "active-workout-bar"; }
    static get properties() { return {
        "activeWorkout": {
            "type": "Any",
            "attr": "active-workout"
        },
        "timer": {
            "state": true
        }
    }; }
    static get style() { return "active-workout-bar {\n    /* Component styles go here */\n}\n\n.active-workout-bar{\n    position: fixed;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background-color: #fff;\n    padding-top: 15px;\n    padding-bottom: 15px;\n    font-size: 14px;\n    border-top: 2px solid #000;\n    color: #444;\n}\n\n.timer{\n    color: #51cbce;\n    font-weight: bold;\n}"; }
}

if (!window.firebase) {
    window.firebase = {};
    window.firebase.auth = () => {
        return {
            onAuthStateChanged: () => {
            },
            signInWithRedirect: () => {
            }
        };
    };
    window.firebase.auth.GoogleAuthProvider = () => { };
}
class Authentication {
    constructor() {
        this.componentDidLoad = () => {
            window.firebase.auth().onAuthStateChanged(res => {
                if (!res) {
                    window.firebase.auth().signInWithRedirect(new window.firebase.auth.GoogleAuthProvider());
                }
                else {
                    let { email, displayName, uid } = res;
                    this.authenticationResponse.emit({
                        email, displayName, uid
                    });
                }
            });
        };
    }
    render() {
        return null;
    }
    static get is() { return "app-authentication"; }
    static get events() { return [{
            "name": "authenticationResponse",
            "method": "authenticationResponse",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ".app-home {\n  padding: 10px;\n}\n\nbutton {\n  background: #5851ff;\n  color: white;\n  margin: 8px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  text-transform: uppercase;\n  padding: 16px 20px;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 8px 16px rgba(0,0,0,.1), 0 3px 6px rgba(0,0,0,.08);\n  box-shadow: 0 8px 16px rgba(0,0,0,.1), 0 3px 6px rgba(0,0,0,.08);\n  outline: 0;\n  letter-spacing: .04em;\n  -webkit-transition: all .15s ease;\n  transition: all .15s ease;\n  cursor: pointer;\n}\n  \nbutton:hover {\n  -webkit-box-shadow: 0 3px 6px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.1);\n  box-shadow: 0 3px 6px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.1);\n  -webkit-transform: translateY(1px);\n  transform: translateY(1px);\n}"; }
}

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class AppRoot {
    constructor() {
        this.isAuthenticated = false;
        this.hasActiveWorkout = false;
    }
    handleAuthentication(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (event.detail) {
                let userDetails = Object.assign({}, event.detail);
                this.isAuthenticated = true;
                let response = yield post("/user/findOrCreate", userDetails);
                this.activeUser = response;
                this.activeWorkout = yield get(`/user/${this.activeUser._id}/workout/active`);
                if (this.activeWorkout)
                    this.hasActiveWorkout = true;
            }
        });
    }
    setContextMenu(event) {
        this.contextMenu = event.detail;
    }
    maybeRenderActiveBar() {
        if (this.hasActiveWorkout) {
            return h("active-workout-bar", { activeWorkout: this.activeWorkout });
        }
    }
    changeBack(event) {
        return __awaiter(this, void 0, void 0, function* () {
            if (event.detail) {
                this.backUrl = event.detail;
            }
            else {
                this.backUrl = "";
            }
        });
    }
    activeWorkoutChange() {
        return __awaiter(this, void 0, void 0, function* () {
            this.activeWorkout = yield get(`/user/${this.activeUser._id}/workout/active`);
            if (this.activeWorkout)
                this.hasActiveWorkout = true;
            else
                this.hasActiveWorkout = false;
        });
    }
    renderApp() {
        return (h("main", null,
            h("stencil-router", null,
                h("stencil-route-switch", { scrollTopOffset: 0 },
                    h("stencil-route", { url: '/', component: 'workouts-dashboard', exact: true, componentProps: { uid: this.activeUser._id, hasActiveWorkout: this.hasActiveWorkout } }),
                    h("stencil-route", { url: '/profile/:name', component: 'app-profile' }),
                    h("stencil-route", { url: '/exercise/:eid', component: 'exercise-specific', exact: true, componentProps: { uid: this.activeUser._id } }),
                    h("stencil-route", { url: '/workout/new', component: 'new-workout', exact: true, componentProps: { uid: this.activeUser._id } }),
                    h("stencil-route", { url: "/workout/active", component: 'active-workout', exact: true, componentProps: { uid: this.activeUser._id } }),
                    this.hasActiveWorkout ?
                        h("stencil-route", { url: "/workout/active/add", component: 'add-exercise', exact: true, componentProps: { uid: this.activeUser._id, activeWorkout: this.activeWorkout._id } }) :
                        null))));
    }
    maybeRenderBack() {
        if (this.backUrl) {
            return (h("stencil-route-link", { url: this.backUrl },
                h("button", { class: 'btn btn-outline-default btn-sm' },
                    h("small", null,
                        h("i", { class: "fa fa-chevron-left" })),
                    " Back")));
        }
    }
    maybeRenderLogin() {
        if (!this.isAuthenticated) {
            return h("app-authentication", null);
        }
        else {
            return this.renderApp();
        }
    }
    render() {
        return (h("div", null,
            h("header", { class: 'navbar' },
                h("div", { class: "col-4 header-right text-center" }, this.maybeRenderBack()),
                h("div", { class: 'col-4 text-center' },
                    h("h1", { class: 'navbar-brand text-center' }, "Tracker")),
                h("div", { class: 'col-4 header-right text-center' },
                    h("span", null, this.contextMenu))),
            this.maybeRenderLogin(),
            this.maybeRenderActiveBar()));
    }
    static get is() { return "app-root"; }
    static get properties() { return {
        "activeUser": {
            "state": true
        },
        "activeWorkout": {
            "state": true
        },
        "backUrl": {
            "state": true
        },
        "contextMenu": {
            "state": true
        },
        "hasActiveWorkout": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "authenticationResponse",
            "method": "handleAuthentication"
        }, {
            "name": "setContextMenu",
            "method": "setContextMenu"
        }, {
            "name": "changeBack",
            "method": "changeBack"
        }, {
            "name": "activeWorkoutChange",
            "method": "activeWorkoutChange"
        }]; }
    static get style() { return "header {\n  background: #5851ff;\n  color: white;\n  height: 56px;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n}\n\nh1 {\n  font-size: 2rem;\n  font-weight: 500;\n  color: #fff;\n  padding: 0 12px;\n}\n\n.header-right span{\n  color: #333;\n  font-size: 12px;\n}\n\n.navbar h1.navbar-brand{\n  font-size: 14px;\n}"; }
}

export { ActiveWorkoutBar, Authentication as AppAuthentication, AppRoot };
