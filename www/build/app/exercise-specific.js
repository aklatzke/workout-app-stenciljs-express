/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as get } from './chunk-b836f3a3.js';
import { a as moment } from './chunk-27ccbbe9.js';

var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class ExerciseSpecific {
    constructor() {
        this.highest = 0;
        this.lowest = 0;
        this.percentChange = 0;
        this.mostRecent = 0;
        this.mostRecentVs = 0;
        this.plotly = window.Plotly;
    }
    componentWillLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            let results = yield get(`/user/${this.uid}/excercise/${this.match.params.eid}/detail`);
            this.excercise = Object.assign({}, results);
        });
    }
    componentDidLoad() {
        this.changeBack.emit("/");
        let graphElement = document.querySelector("#date-plot");
        let values = Object.keys(this.excercise.data).map(key => this.excercise.data[key].avgRep);
        let nums = this.excercise.rawArray.map(i => i.avgRep).sort((a, b) => a - b);
        let max = nums[nums.length - 1] + 50;
        let min = nums[0] - 50;
        this.highest = nums[nums.length - 1];
        this.lowest = nums[0];
        this.percentChange = Math.round(min / max * 100 * 100) / 100;
        let timestamps = Object.keys(this.excercise.data).map(timestamp => parseInt(timestamp));
        this.mostRecent = values[values.length - 1];
        this.mostRecentVs = Math.round(this.mostRecent / this.highest * 100);
        let minDate = timestamps[0];
        let maxDate = timestamps[timestamps.length - 1];
        if (min < 0)
            min = 0;
        window.setTimeout(() => {
            let data = [{
                    type: "line",
                    x: Object.keys(this.excercise.data).map(timestamp => moment.unix(parseInt(timestamp)).format('MMM Do YYYY')),
                    y: values,
                    line: { color: "#fff" }
                }];
            let layout = {
                autosize: true,
                plot_bgcolor: "#121212",
                paper_bgcolor: "#343434",
                linecolor: "#fff",
                margin: {
                    l: 30,
                    r: 30,
                    b: 25,
                    t: 10,
                    pad: 0
                },
                yaxis: {
                    range: [min, max],
                    tickcolor: "#fff",
                    tickfont: {
                        color: "#fff"
                    },
                    linecolor: "#fff",
                    gridcolor: "#444"
                },
                xaxis: {
                    tickvals: [moment.unix(minDate).format('MMM Do YYYY'), moment.unix(maxDate).format('MMM Do YYYY')],
                    tickcolor: "#fff",
                    tickfont: {
                        color: "#fff"
                    },
                    linecolor: "#fff"
                }
            };
            this.plotly.purge(graphElement);
            this.plotly.plot(graphElement, data, layout);
        }, 500);
    }
    render() {
        return (h("div", { class: 'row' },
            h("div", { class: 'col-12 pl-4 pr-4' },
                h("h3", null, this.excercise.proper),
                h("div", { class: 'row pt-3' },
                    h("div", { class: 'col-12' },
                        h("div", { id: 'date-plot' }))),
                h("div", { class: "row" },
                    h("div", { class: "col-12 pt-5" },
                        h("div", { class: 'tile' },
                            h("div", { class: 'tile-inner' },
                                h("strong", null, "Highest Avg. Rep"),
                                " ",
                                this.highest)),
                        h("div", { class: 'tile' },
                            h("div", { class: 'tile-inner' },
                                h("strong", null, "Lowest Avg. Rep"),
                                " ",
                                this.lowest)),
                        h("div", { class: 'tile tile-full' },
                            h("div", { class: 'tile-inner' },
                                h("strong", null, "Percent Change"),
                                " ",
                                this.percentChange,
                                "%"))),
                    h("div", { class: "col-12 pt-3" },
                        h("div", { class: 'tile' },
                            h("div", { class: 'tile-inner' },
                                h("strong", null, "Highest Ever"),
                                " ",
                                this.highest)),
                        h("div", { class: 'tile' },
                            h("div", { class: 'tile-inner' },
                                h("strong", null, "Most Recent"),
                                " ",
                                this.mostRecent)),
                        h("div", { class: 'tile tile-full' },
                            h("div", { class: 'tile-inner' },
                                h("strong", null, "Current vs. Max"),
                                " ",
                                this.mostRecentVs,
                                "% ",
                                h("small", null, "of max"))))))));
    }
    static get is() { return "exercise-specific"; }
    static get properties() { return {
        "excercise": {
            "state": true
        },
        "highest": {
            "state": true
        },
        "lowest": {
            "state": true
        },
        "match": {
            "type": "Any",
            "attr": "match"
        },
        "mostRecent": {
            "state": true
        },
        "mostRecentVs": {
            "state": true
        },
        "percentChange": {
            "state": true
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
        }]; }
    static get style() { return "#date-plot{\n    width: 100%;\n}\n\n.tile{\n    width: 50%;\n    float: left;\n    text-align: center;\n    padding-right: 5px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    margin-bottom: 10px;\n}\n\n.tile .tile-inner{\n    border: 2px solid #4f69ff;\n    border-radius: 6px;\n    padding-top: 20px;\n    padding-bottom: 20px;\n    text-transform: uppercase;\n    font-size: 32px;\n    background-color: #dfe3ff;\n}\n\n.tile + .tile .tile-inner{\n    border-color: #f76c6c;\n    padding-left: 5px;\n    background-color: #ffd7d7;\n}\n\n.tile strong{\n    display: block;\n    font-weight: bold;\n    font-size: 12px;\n    margin-bottom: 10px;\n}\n\n.tile + .tile.tile-full{\n    width: 100%;\n    border-color: #333;\n}\n\n.tile +.tile.tile-full .tile-inner{\n  width: 100%;\n  border-color: #222;\n  background-color: #555;\n  color: #89ffc2;\n}\n\n.tile + .tile-full strong{\n    font-size: 18px;\n    color: white;\n}\n\n.tile small{\n    text-transform: lowercase;\n    \n}\n\nh3{\n    text-transform: capitalize;\n}"; }
}

export { ExerciseSpecific };
