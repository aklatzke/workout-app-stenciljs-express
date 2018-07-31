/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as get } from './chunk-b836f3a3.js';

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class WorkoutList {
    constructor() {
        this.list = [];
    }
    componentDidLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield get(`/user/exercises/all/?uid=${this.uid}`);
            this.list = [...response];
        });
    }
    render() {
        return (h("div", null,
            h("h4", null, "Graphs & Data"),
            h("hr", null),
            this.list.map(item => {
                return (h("stencil-route-link", { url: `/exercise/${item._id}` },
                    h("button", { class: 'btn btn-primary btn-sm mr-2 mb-2' }, item.name)));
            })));
    }
    static get is() { return "workout-list"; }
    static get properties() { return {
        "list": {
            "state": true
        },
        "uid": {
            "type": String,
            "attr": "uid"
        }
    }; }
    static get style() { return "workout-list {\n    /* Component styles go here */\n}"; }
}

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class WorkoutsDashboard {
    constructor() {
        this.plotly = window.Plotly;
        this.componentDidLoad = () => __awaiter$1(this, void 0, void 0, function* () {
            let response = yield get(`/user/${this.uid}/workouts/overview`);
            let workoutXAxis = Object.keys(response.favWorkouts);
            let workoutYAxis = workoutXAxis.map(key => response.favWorkouts[key]);
            let workoutElement = document.querySelector("#favorite-workouts");
            let exerciseXAxis = Object.keys(response.favExercises).slice(0, 5);
            let exerciseYAxis = exerciseXAxis.map(key => response.favExercises[key]);
            let exerciseElement = document.querySelector("#favorite-exercises");
            this.changeBack.emit(false);
            this.setContextMenu.emit(this.contextMenu());
            let layout = {
                margin: {
                    l: 50,
                    r: 50,
                    t: 50,
                    b: 70,
                    pad: 0
                },
                plot_bgcolor: "#343434",
                paper_bgcolor: "#343434",
                yaxis: {
                    tickcolor: "#fff",
                    tickfont: {
                        color: "#fff"
                    },
                    line: {
                        color: "#fff"
                    }
                },
                xaxis: {
                    tickcolor: "#fff",
                    tickfont: {
                        color: "#fff"
                    }
                }
            };
            let common = {
                type: "pie",
                labels: workoutXAxis,
                values: workoutYAxis
            };
            let traceOne = Object.assign({}, common, { textinfo: 'percent', textposition: 'outside', showlegend: false, textfont: {
                    color: "#fff"
                } });
            let traceTwo = Object.assign({}, common, { textinfo: 'label', textposition: 'inside', showlegend: false, textfont: {
                    color: "#fff"
                } });
            this.plotly.plot(workoutElement, [traceOne, traceTwo], Object.assign({}, layout, { textposition: 'outside' }));
            this.plotly.plot(exerciseElement, [{
                    type: "bar",
                    x: exerciseXAxis,
                    y: exerciseYAxis
                }], layout);
        });
    }
    contextMenu() {
        return (h("stencil-route-link", { url: "" },
            h("button", { class: 'btn btn-sm btn-primary btn-just-icon' },
                h("i", { class: 'fa fa-user' }))));
    }
    renderWorkoutButton() {
        if (this.hasActiveWorkout) {
            return (h("stencil-route-link", { url: "/workout/active" },
                h("button", { class: 'btn btn-block btn-sm btn-outline-primary' }, "Active Workout")));
        }
        else {
            return (h("stencil-route-link", { url: "/workout/new" },
                h("button", { class: 'btn btn-block btn-sm btn-outline-primary' }, "Start Workout")));
        }
    }
    render() {
        return (h("div", { class: "graph-container pl-2 pr-2" },
            h("h3", null, "Dashboard"),
            h("hr", null),
            h("div", { class: 'row' },
                h("div", { class: 'col-12' }, this.renderWorkoutButton())),
            h("hr", null),
            h("div", { class: "row" },
                h("div", { class: 'col-12 col-md-5 offset-md-1' },
                    h("h4", null, "Most Performed Routines"),
                    h("div", { id: "favorite-workouts" })),
                h("div", { class: 'col-12 col-md-5 offset-md-1' },
                    h("h4", null, "Most Performed Excercises"),
                    h("div", { id: "favorite-exercises" }))),
            h("div", { class: "row" },
                h("div", { class: "col-12" },
                    h("workout-list", { uid: this.uid })))));
    }
    static get is() { return "workouts-dashboard"; }
    static get properties() { return {
        "hasActiveWorkout": {
            "type": Boolean,
            "attr": "has-active-workout"
        },
        "uid": {
            "type": String,
            "attr": "uid"
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
        }]; }
    static get style() { return ""; }
}

export { WorkoutList, WorkoutsDashboard };
