import { Component, Prop, State, Event, EventEmitter } from '@stencil/core';
import { MatchResults } from '@stencil/router';
import { get } from '../../utils/fetch';
import moment from 'moment';

class ResponseType{
    proper;
    data;
    rawArray;
}

@Component({
    tag: 'exercise-specific',
    styleUrl: 'exercise-specific.css'
})

export class ExerciseSpecific {
    @Event() changeBack: EventEmitter;
    
    @Prop() uid: string;
    @Prop() match: MatchResults;
    
    @State() excercise: ResponseType;
    @State() highest = 0;
    @State() lowest = 0;
    @State() percentChange = 0;
    @State() mostRecent = 0;
    @State() mostRecentVs = 0;

    plotly: any = window.Plotly;

    async componentWillLoad(){
        let results = await get(`http://localhost:8080/user/${this.uid}/excercise/${this.match.params.eid}/detail`);

        this.excercise = { ...results }     
    }

    componentDidLoad(){
        this.changeBack.emit("/");

        let graphElement = document.querySelector("#date-plot");
        let values = Object.keys(this.excercise.data).map(key => this.excercise.data[key].avgRep);
        let nums = this.excercise.rawArray.map(i => i.avgRep).sort( (a, b) => a - b );
        console.log(nums);
        let max = nums[nums.length - 1] + 50;
        let min = nums[0] - 50;

        this.highest = nums[nums.length - 1];
        this.lowest = nums[0];

        this.percentChange = Math.round(min/max * 100 * 100) / 100;

        let timestamps = Object.keys(this.excercise.data).map( timestamp => parseInt(timestamp) );

        this.mostRecent = values[values.length - 1];
        this.mostRecentVs = Math.round(this.mostRecent / max * 100 * 100) / 100;

        

        let minDate = timestamps[0];
        let maxDate = timestamps[ timestamps.length - 1 ];

        if( min < 0 ) min = 0;

        window.setTimeout(() => {
            let data = [{
                type: "line",
                x: Object.keys(this.excercise.data).map(timestamp => moment.unix(parseInt(timestamp)).format('MMM Do YYYY')),
                y: values,
                line: { color: "#fff" }
            }];

            let layout = {
                autosize: true,
                plot_bgcolor: "#343434",
                paper_bgcolor: "#343434",
                line: {
                    color: "#fff"
                },
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
                    line: {
                        color: "#fff"
                    }
                },
                xaxis: {
                    tickvals: [moment.unix(minDate).format('MMM Do YYYY'), moment.unix(maxDate).format('MMM Do YYYY')],
                    tickcolor: "#fff",
                    tickfont: {
                        color: "#fff"
                    }                    
                }
            }

            this.plotly.purge(graphElement);
            this.plotly.plot(graphElement, data, layout)               
        },500)
    }
    
    render() {
        return (
            <div class='row'>
                <div class='col-12 pl-4 pr-4'>
                    <h3>{this.excercise.proper}</h3>
                    <div class='row pt-3'>
                        <div class='col-12'>
                            <div id='date-plot'></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-12 pt-5">
                            <div class='tile'><div class='tile-inner'><strong>Highest Average Rep</strong> {this.highest}</div></div>
                            <div class='tile'><div class='tile-inner'><strong>Lowest Average Rep</strong> {this.lowest}</div></div>
                            <div class='tile tile-full'><div class='tile-inner'><strong>Percent Change</strong> {this.percentChange}%</div></div>
                        </div>
                        <div class="col-12 pt-3">
                            <div class='tile'><div class='tile-inner'><strong>Highest Ever</strong> {this.highest}</div></div>
                            <div class='tile'><div class='tile-inner'><strong>Most Recent</strong> {this.mostRecent}</div></div>
                            <div class='tile tile-full'><div class='tile-inner'><strong>Current vs. Max</strong> {this.mostRecentVs}% <small>of max</small></div></div>
                        </div>                        
                    </div>
                </div>
            </div>
        );
    }
}
