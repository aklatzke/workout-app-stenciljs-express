/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as get, b as post } from './chunk-b836f3a3.js';
import { a as moment } from './chunk-27ccbbe9.js';

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class NewWorkout {
    componentWillLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.changeBack.emit("/");
            let response = yield get(`/user/${this.uid}/workouts/list`);
            this.workouts = response;
        });
    }
    handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            let data = yield post(`/user/${this.uid}/workout/new`, {
                name: this.workoutName,
                timestamp: moment().utc().valueOf()
            });
            if (data) {
                this.activeWorkoutChange.emit();
                this.history.push("/workout/active");
            }
        });
    }
    handleSelectSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
        });
    }
    handleChange(e) {
        this.workoutName = e.target.value;
    }
    handleSelectChange(e) {
        this.selectedWorkout = e.target.value;
    }
    render() {
        return (h("div", { class: 'row' },
            h("div", { class: 'col-10 offset-1' },
                h("h3", null, "New Workout")),
            h("div", { class: "col-10 offset-1 pt-4" },
                h("h4", null, "Create a New Workout"),
                h("form", { class: 'form pt-3', onSubmit: (e) => this.handleSubmit(e) },
                    h("div", { class: 'form-group' },
                        h("input", { name: "name", type: 'text', value: this.workoutName, onChange: e => this.handleChange(e), class: 'form-control underline-control', placeholder: "Workout Name" })),
                    h("div", null,
                        h("input", { type: "submit", class: 'btn btn-outline-info float-right', value: 'Create New' })))),
            h("div", { class: "col-10 offset-1 pt-4" },
                h("h4", null, "Select a Previous Routine"),
                h("form", { class: 'form pt-3', onSubmit: (e) => this.handleSelectSubmit(e) },
                    h("div", { class: 'form-group' },
                        h("select", { name: "prev-workout", onChange: e => this.handleSelectChange(e), class: 'form-control underline-control' }, this.workouts.map(i => i.name !== "undefined" ? h("option", { value: i._id }, i.name) : null))),
                    h("div", null,
                        h("input", { type: "submit", class: 'btn btn-outline-info float-right', value: 'Start Workout' }))))));
    }
    static get is() { return "new-workout"; }
    static get properties() { return {
        "history": {
            "type": "Any",
            "attr": "history"
        },
        "selectedWorkout": {
            "state": true
        },
        "uid": {
            "type": String,
            "attr": "uid"
        },
        "workoutName": {
            "state": true
        },
        "workouts": {
            "state": true
        }
    }; }
    static get events() { return [{
            "name": "changeBack",
            "method": "changeBack",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "activeWorkoutChange",
            "method": "activeWorkoutChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return "new-workout {\n \n}\n\n.form-control.underline-control {\n    border: 0;\n    border-bottom: 1px solid #51bcda;\n    background-color: transparent;\n    border-radius: 0;\n    font-size: 18px;\n}\n\n.form-control.underline-control:focus{\n    border-color: teal;\n    border: 0;\n    border-bottom: 1px solid #51bcda;\n    background-color: transparent;\n    color: #51bcda;\n}"; }
}

export { NewWorkout };
