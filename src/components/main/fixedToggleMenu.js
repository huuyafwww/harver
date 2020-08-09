import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { BsChevronDoubleRight, BsChevronDoubleLeft } from 'react-icons/bs';

const FixedToggleMenuWrapper = styled.div`
    font-size: 1.5em;
    margin-left: 5px;
    position: absolute;
    left: ${({ isOpenMenu }) => (isOpenMenu && '250') || '0'}px;
    top: 0;
    z-index: 1;
    transition: all 400ms 0s ease;
`;

@inject('store')
@observer
export default class FixedToggleMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.store = this.props.store;
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        this.props.toggleMenu();
    }

    render() {
        const { isOpenMenu } = this.props;
        return (
            <FixedToggleMenuWrapper isOpenMenu={isOpenMenu}>
                {(isOpenMenu && (
                    <BsChevronDoubleLeft onClick={this.onClick} />
                )) || <BsChevronDoubleRight onClick={this.onClick} />}
            </FixedToggleMenuWrapper>
        );
    }
}
