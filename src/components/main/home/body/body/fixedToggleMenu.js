import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';

const FixedToggleMenuWrapper = styled.div`
    font-size: 1.5em;
    margin-left: 5px;
    position: absolute;
    right: -10px;
    top: 0;
    z-index: 1;
`;

const ToggleIconStyle = {};

@inject('store')
@observer
export default class FixedToggleMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.toggleColumn();
    }

    render() {
        const { isOpenColumn } = this.props;
        const IconComponent = isOpenColumn
            ? BsChevronDoubleLeft
            : BsChevronDoubleRight;
        return (
            <FixedToggleMenuWrapper isOpenColumn={isOpenColumn}>
                <IconComponent onClick={this.onClick} />
            </FixedToggleMenuWrapper>
        );
    }
}
