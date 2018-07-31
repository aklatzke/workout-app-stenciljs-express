/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as get, b as post } from './chunk-b836f3a3.js';

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ActiveWorkout {
    componentWillLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.changeBack.emit("/");
            this.workout = yield get(`/user/${this.uid}/workout/active`);
            this.setContextMenu.emit(this.contextMenu());
        });
    }
    contextMenu() {
        return (h("stencil-route-link", { url: "/workout/active/add" },
            h("button", { class: 'btn btn-sm btn-primary btn-just-icon' },
                h("i", { class: 'fa fa-plus' }))));
    }
    renderExercises() {
        if (this.workout.exercises) {
            return (this.workout.exercises.map(item => h("exercise-single", { data: item })));
        }
        else {
            return (h("stencil-route-link", { url: "/workout/active/add" },
                h("button", { class: 'btn btn-block btn-outline-primary btn-primary mt-2' }, "Add an Exercise")));
        }
    }
    finishWorkout() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield post(`/workout/${this.workout._id}/finish`);
            this.activeWorkoutChange.emit();
            if (response) {
                this.history.push("/");
            }
        });
    }
    render() {
        return (h("div", { class: 'row' },
            h("div", { class: "col-12 pt-2 pl-4 pr-4" },
                h("div", { class: 'row' },
                    h("div", { class: 'col-12' },
                        h("button", { class: 'btn btn-block btn-outline-danger', onClick: () => this.finishWorkout() }, "Finish Workout"))),
                this.renderExercises())));
    }
    static get is() { return "active-workout"; }
    static get properties() { return {
        "history": {
            "type": "Any",
            "attr": "history"
        },
        "uid": {
            "type": String,
            "attr": "uid"
        },
        "workout": {
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
            "name": "setContextMenu",
            "method": "setContextMenu",
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
    static get style() { return "active-workout {\n    /* Component styles go here */\n}"; }
}

class ExerciseSingle {
    render() {
        return (h("div", null,
            h("p", null, JSON.stringify(this.data, null, 2))));
    }
    static get is() { return "exercise-single"; }
    static get properties() { return {
        "data": {
            "type": "Any",
            "attr": "data"
        }
    }; }
    static get style() { return "exercise-single {\n    /* Component styles go here */\n}"; }
}

export { ActiveWorkout, ExerciseSingle };
