/*! Built with http://stenciljs.com */
const { h } = window.App;

class AppHome {
    render() {
        return (h("div", { class: 'app-home' },
            h("stencil-router", null,
                h("stencil-route-switch", { scrollTopOffset: 0 },
                    h("stencil-route", { url: '/history', component: 'display-workouts', componentProps: { uid: this.uid } }),
                    h("stencil-route", { url: '/', component: 'workouts-dashboard', exact: true, componentProps: { uid: this.uid } })))));
    }
    static get is() { return "app-home"; }
    static get properties() { return {
        "uid": {
            "type": String,
            "attr": "uid"
        }
    }; }
    static get style() { return ".app-home {\n  padding: 10px;\n}\n\nbutton {\n  background: #5851ff;\n  color: white;\n  margin: 8px;\n  border: none;\n  font-size: 13px;\n  font-weight: 700;\n  text-transform: uppercase;\n  padding: 16px 20px;\n  border-radius: 2px;\n  -webkit-box-shadow: 0 8px 16px rgba(0,0,0,.1), 0 3px 6px rgba(0,0,0,.08);\n  box-shadow: 0 8px 16px rgba(0,0,0,.1), 0 3px 6px rgba(0,0,0,.08);\n  outline: 0;\n  letter-spacing: .04em;\n  -webkit-transition: all .15s ease;\n  transition: all .15s ease;\n  cursor: pointer;\n}\n  \nbutton:hover {\n  -webkit-box-shadow: 0 3px 6px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.1);\n  box-shadow: 0 3px 6px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.1);\n  -webkit-transform: translateY(1px);\n  transform: translateY(1px);\n}"; }
}

export { AppHome };
