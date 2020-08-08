import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { date2time } from '@helpers';

@inject('store')
@observer
export default class HomeCardBodyHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.store = this.props.store;
    }

    componentDidMount() {}

    render() {
        const { harData } = this.store;
        return <div></div>;
    }
}
