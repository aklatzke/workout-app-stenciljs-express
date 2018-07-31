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
class AddExercise {
    componentWillLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            this.changeBack.emit("/workout/active");
            this.setContextMenu.emit("");
            let response = yield get("/exercises/list");
            this.exercises = response;
            console.log(this.activeExercises);
        });
    }
    renderGroups() {
        if (this.exercises) {
            return (h("div", { class: 'row' }, Object.keys(this.exercises).sort().map(key => {
                return h("exercise-group", { activeWorkout: this.activeWorkout, title: key, records: this.exercises[key], existing: this.activeExercises });
            })));
        }
    }
    render() {
        return this.renderGroups();
    }
    static get is() { return "add-exercise"; }
    static get properties() { return {
        "activeExercises": {
            "type": "Any",
            "attr": "active-exercises"
        },
        "activeWorkout": {
            "type": String,
            "attr": "active-workout"
        },
        "exercises": {
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
        }]; }
    static get style() { return "add-exercise {\n    /* Component styles go here */\n}"; }
}

var __awaiter$1 = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ExerciseGroup {
    constructor() {
        this.expanded = false;
        this.addedItems = [];
    }
    addExercise(id) {
        return __awaiter$1(this, void 0, void 0, function* () {
            let response = yield get(`/workout/${this.activeWorkout}/add/${id}`);
            if (response) {
                this.addedItems = [...this.addedItems, id];
            }
        });
    }
    removeExercise(id) {
        return __awaiter$1(this, void 0, void 0, function* () {
            let response = yield get(`/workout/${this.activeWorkout}/remove/${id}`);
            if (response) {
                this.addedItems = [...this.addedItems, id];
            }
        });
    }
    renderItems() {
        if (this.expanded) {
            console.log(this.records);
            return (h("ul", { class: "col-12 pl-4 pr-4 exercise-records mt-4" }, this.records.map(item => {
                if (this.existing.includes(item._id) || this.addedItems.includes(item._id)) {
                    return (h("li", { onClick: () => this.removeExercise(item._id) },
                        item.name,
                        " ",
                        h("i", { class: 'fa fa-check float-right' })));
                }
                else {
                    return (h("li", { onClick: () => this.addExercise(item._id) },
                        item.name,
                        " ",
                        h("i", { class: 'fa fa-plus float-right' })));
                }
            })));
        }
    }
    render() {
        return (h("div", { class: 'col-12 pt-2 pb-2 group ' + (this.expanded ? 'group-expanded' : '') },
            h("div", { class: 'row' },
                h("div", { class: 'col-10 offset-1', onClick: () => this.expanded = !this.expanded },
                    h("h6", null,
                        this.title,
                        " ",
                        this.expanded ? h("i", { class: 'fa fa-caret-up float-right' }) : h("i", { class: 'fa fa-caret-down float-right' }))),
                this.renderItems())));
    }
    static get is() { return "exercise-group"; }
    static get properties() { return {
        "activeWorkout": {
            "type": String,
            "attr": "active-workout"
        },
        "addedItems": {
            "state": true
        },
        "existing": {
            "type": "Any",
            "attr": "existing"
        },
        "expanded": {
            "state": true
        },
        "records": {
            "type": "Any",
            "attr": "records"
        },
        "title": {
            "type": String,
            "attr": "title"
        }
    }; }
    static get style() { return "exercise-group {\n    width: 100%;\n}\n\n.group{\n    background-color: #444;\n    border-bottom: 1px solid #222;\n}\n\n.group h6{\n    margin: 0;\n}\n\n.group i{\n    font-size: 18px;\n}\n\n.group-expanded{\n    background-color: white;\n}\n\n.group-expanded h6{\n    color: #444;\n}\n\n.exercise-records li{\n    list-style-type: none;\n    border-bottom: 1px solid #cdcdcd;\n    padding-top: 7px;\n    padding-bottom: 7px;\n    text-transform: capitalize;\n    font-weight: bold;\n}\n\n.exercise-records li i{\n    font-size: 12px;\n    position: relative;\n    top: 4px;\n}"; }
}

export { AddExercise, ExerciseGroup };
