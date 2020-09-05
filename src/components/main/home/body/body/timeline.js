import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { binds, getBinds } from '@helpers';
import styled from 'styled-components';
import moment from 'moment';
import { timelineChartConfig } from '@config';

const bindMethods = getBinds(__filename);

const { barHeight } = timelineChartConfig;

const TimelineWrapper = styled.td`
    padding: 0;
`;

const TimelineLabel = styled.div`
    color: rgb(102, 102, 102);
    text-align: center;
    background-color: rgba(0, 0, 0, 0.04);
`;

const GraphWrapper = styled.svg`
    width: auto;
`;

@inject('store')
@observer
export default class HarResultTimeLine extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.event = binds(bindMethods, this);
    }

    getSvgRect(data, index) {
        const { graphStart, graphEnd, graphWidth } = this;
        const { start, end } = data;
        const x = start - graphStart;
        const y = barHeight * index;
        const width = end - start;
        return (
            <rect
                key={index}
                x={x / barHeight}
                y={y}
                width={width / barHeight}
                height={barHeight - 2}
                fill="#0099ff"
            />
        );
    }

    getGraphInfo(datas) {
        this.graphStart = datas[0].start;
        this.graphEnd = datas.pop().end;
        this.graphWidth = this.graphEnd - this.graphStart;
        this.graphHeight = barHeight * datas.length;
    }

    getGraphSvg(datas, dataCount) {
        this.event.getGraphInfo(datas);
        const { graphStart, graphEnd, graphWidth, graphHeight } = this;
        return (
            <GraphWrapper
                height={graphHeight}
                xmlns="http://www.w3.org/2000/svg"
            >
                {datas.map(this.event.getSvgRect)}
            </GraphWrapper>
        );
    }

    createGraphData(data) {
        const { startedDateTime, timings, time } = data;
        const { send, wait, receive } = timings;
        const start = moment(startedDateTime).valueOf();
        const end = moment(startedDateTime).add(time, 'milliseconds').valueOf();
        return { start, end };
    }

    render() {
        const { har } = this.props;
        const datas = har.map(this.event.createGraphData);
        const dataCount = datas.length;
        return (
            <td rowSpan={dataCount} id="waterfallGraph">
                {this.event.getGraphSvg(datas, dataCount)}
            </td>
        );
    }
}
