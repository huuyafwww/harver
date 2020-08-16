import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Chart } from 'react-google-charts';
import moment from 'moment';
import { timelineChartConfig } from '@config';

const TimelineWrapper = styled.div`
    width: 50%;
`;

const TimelineLabel = styled.div`
    color: rgb(102, 102, 102);
    text-align: center;
    background-color: rgba(0, 0, 0, 0.04);
    height: ${({ height }) => {
        return height;
    }}px;
`;

@inject('store')
@observer
export default class HarResultTimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            resultTableWrapperHeight: 0,
            resultTableTheadHeight: 0,
        };
        this.resultTableWrapperElement = this.props.resultTableWrapperElement;
        this.resultTableTheadElement = this.props.resultTableTheadElement;
        this.getWaterFall = this.getWaterFall.bind(this);
        this.setTargetHeight = this.setTargetHeight.bind(this);
    }

    componentDidMount() {
        this.setTargetHeight();
    }

    setTargetHeight() {
        const resultTableWrapperHeight = this.resultTableWrapperElement
            .clientHeight;
        const resultTableTheadHeight = this.resultTableTheadElement
            .clientHeight;
        this.setState({ resultTableWrapperHeight, resultTableTheadHeight });
    }

    getWaterFall(har) {
        const chartDatas = [timelineChartConfig];
        const { resultTableWrapperHeight, resultTableTheadHeight } = this.state;
        const chartHeight = `${
            resultTableWrapperHeight - resultTableTheadHeight + 60
        }px`;
        har.forEach((data, key) => {
            const { startedDateTime, timings, time } = data;
            const { send, wait, receive } = timings;
            const startTime = new Date(startedDateTime);
            const endTime = moment(startedDateTime)
                .add(time, 'milliseconds')
                .valueOf();
            const chartData = [
                `あああ-${key}`,
                data.request.method,
                data.request.url,
                startTime,
                endTime,
            ];
            chartDatas.push(chartData);
        });
        const options = {
            timeline: {
                rowLabelStyle: {
                    fontSize: 6.439,
                },
                barLabelStyle: {
                    fontSize: 6.439,
                },
            },
        };
        return (
            <TimelineWrapper id="harResultWaterfall">
                <TimelineLabel height={resultTableTheadHeight}>
                    Waterfall
                </TimelineLabel>
                <Chart
                    width={'100%'}
                    height={chartHeight}
                    chartType="Timeline"
                    loader={<div>Loading Chart</div>}
                    data={chartDatas}
                    options={options}
                    rootProps={{ 'data-date-field': 4 }}
                />
            </TimelineWrapper>
        );
    }

    render() {
        const { har } = this.props;
        return this.getWaterFall(har);
    }
}
