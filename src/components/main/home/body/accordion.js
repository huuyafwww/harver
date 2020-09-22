import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { BsCaretDown, BsCaretUp, BsFillBarChartFill } from 'react-icons/bs';
import { harResultConfig } from '@config';
import { getComponentName, binds, getBinds } from '@helpers';
import HomeCardBodyHeader from '@components/main/home/body/header';
import HomeCardBodyBody from '@components/main/home/body/body';
import ColumnPanel from '@components/main/home/body/body/column';
import FixedToggleMenu from '@components/main/home/body/body/fixedToggleMenu';

const { isShow, toggleIcon } = harResultConfig;
const bindMethods = getBinds(__filename);

const ToggleTitleWrapper = styled.span`
    font-size: 1.3em;
`;

const ToggleIconWrapper = styled.span`
    font-size: 2em;
    margin-left: 4px;
`;

const CardHeaderStyle = {
    justifyContent: 'space-between',
};

const ChartIconWrapper = styled.div`
    cursor: pointer;
    display: flex;
`;

const ToggleButtonWrapper = styled.div`
    margin-right: 0.7em;
    span.badge.badge-primary {
        background-color: ${({ isShow }) => {
            return isShow ? '#6777ef' : '#6c757d';
        }};
    }
`;

const BsFillBarChartFillWrapper = styled.span`
    ${({ isShow }) => {
        if (isShow) return 'color: #6777ef;';
    }}
    font-size: 1.25em;
    :hover {
        color: #6777ef;
    }
`;

const CardBodyStyle = {
    padding: 0,
};

const Components = [HomeCardBodyHeader, HomeCardBodyBody];

@inject('store')
@observer
export default class Accordions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            RowData: {},
            isOpenLeftColumn: true,
            isOpenRightColumn: false,
            isOpenModal: false,
            ...isShow,
        };
        this.event = binds(bindMethods, this);
    }

    componentDidUpdate() {
        const { onLoadNewHarFile } = this.props.store;
        onLoadNewHarFile && this.event.resetStatus();
    }

    resetStatus(
        RowData = {},
        isOpenLeftColumn = true,
        isOpenRightColumn = false,
        isOpenModal = false
    ) {
        this.props.store.onLoadNewHarFile = false;
        this.setState({
            RowData,
            isOpenLeftColumn,
            isOpenRightColumn,
            isOpenModal,
        });
    }

    onClick(e) {
        const { toggleVarName } = e.currentTarget.dataset;
        this.props.toggleAccordionIcon(toggleVarName);
    }

    toggleItem(e) {
        const { toggleVarName } = e.currentTarget.dataset;
        this.setState({ [toggleVarName]: !this.state[toggleVarName] });
    }

    changeColumnStatus(RowData, isOpenRightColumn) {
        this.setState({ RowData, isOpenRightColumn });
    }

    toggleLeftColumn() {
        const isOpenLeftColumn = !this.state.isOpenLeftColumn;
        this.setState({ isOpenLeftColumn });
    }

    toggleRightColumn() {
        const isOpenRightColumn = !this.state.isOpenRightColumn;
        this.setState({ isOpenRightColumn });
    }

    changeModalStatus(RowData, isOpenModal) {
        this.setState({ RowData, isOpenModal });
    }

    getAccordionToggle(eventKey, targetOption, isColumn) {
        const { toggleVarName, title } = targetOption;
        const toggleVar = this.props.getOpenStatus(toggleVarName);
        return (
            <Card.Header style={CardHeaderStyle}>
                <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={eventKey}
                    onClick={this.event.onClick}
                    data-toggle-var-name={toggleVarName}
                >
                    <ToggleTitleWrapper>{title}</ToggleTitleWrapper>
                    <ToggleIconWrapper>
                        {(toggleVar && <BsCaretUp />) || <BsCaretDown />}
                    </ToggleIconWrapper>
                </Accordion.Toggle>
                {isColumn && toggleVar && this.event.getToggleButtons()}
            </Card.Header>
        );
    }

    getToggleButtons() {
        return (
            <ChartIconWrapper>
                {Object.keys(isShow).map((varName, key) => {
                    const isShowItem = this.state[varName];
                    const itemLabel = toggleIcon[varName].label;
                    const TargetWrapper =
                        varName !== 'Waterfall'
                            ? ToggleButtonWrapper
                            : BsFillBarChartFillWrapper;
                    return (
                        <TargetWrapper
                            key={key}
                            isShow={isShowItem}
                            onClick={this.event.toggleItem}
                            data-toggle-var-name={varName}
                        >
                            {varName !== 'Waterfall' ? (
                                <span className="badge badge-primary">
                                    {itemLabel}
                                </span>
                            ) : (
                                <BsFillBarChartFill />
                            )}
                        </TargetWrapper>
                    );
                })}
            </ChartIconWrapper>
        );
    }

    getModalInjectData(har) {
        const { isColumnDisplayRow } = this.props.store;
        const { changeColumnStatus, changeModalStatus } = this.event;
        const onChangeStatus = isColumnDisplayRow
            ? changeColumnStatus
            : changeModalStatus;
        return {
            har,
            onChangeStatus,
            ...this.state,
        };
    }

    getAccordionCollapse(eventKey, targetOption, isResult) {
        const { data } = targetOption;
        const HarViewComponent = Components[eventKey];
        const injectData = isResult
            ? this.event.getModalInjectData(data)
            : { har: data };
        return (
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body style={CardBodyStyle}>
                    <HarViewComponent {...injectData} />
                </Card.Body>
            </Accordion.Collapse>
        );
    }

    render() {
        const {
            getAccordionToggle,
            getAccordionCollapse,
            toggleRightColumn,
            toggleLeftColumn,
        } = this.event;
        const { ComponentOptions } = this.props;
        const { isColumnDisplayRow } = this.props.store;
        const { isOpenRightColumn, isOpenLeftColumn, RowData } = this.state;
        const isExistsRowData = Object.keys(RowData).length !== 0;
        return (
            <Accordion defaultActiveKey="0">
                {Components.map((Component, key) => {
                    const ComponentName = getComponentName(Component);
                    const targetOption = ComponentOptions[ComponentName];
                    const eventKey = String(key);
                    const isResult = ComponentName === 'HomeCardBodyBody';
                    const isColumn = isColumnDisplayRow && isResult;
                    const resultCol = isColumn && isOpenRightColumn ? 8 : 12;
                    const detailCol = isColumn && isOpenLeftColumn ? 4 : 12;
                    return (
                        <Row key={key}>
                            <Col md={resultCol}>
                                {((isColumn && isOpenLeftColumn) ||
                                    !isColumnDisplayRow ||
                                    !isResult) && (
                                    <Card>
                                        {getAccordionToggle(
                                            eventKey,
                                            targetOption,
                                            isColumn
                                        )}
                                        {getAccordionCollapse(
                                            eventKey,
                                            targetOption,
                                            isResult
                                        )}
                                    </Card>
                                )}
                                {isColumn && (
                                    <FixedToggleMenu
                                        position="Left"
                                        isOpenLeftColumn={isOpenLeftColumn}
                                        toggleLeftColumn={toggleLeftColumn}
                                    />
                                )}
                            </Col>
                            {isColumn && isOpenRightColumn && (
                                <Col md={detailCol}>
                                    <ColumnPanel RowData={RowData} />
                                    {isColumn && isExistsRowData && (
                                        <FixedToggleMenu
                                            position="Right"
                                            isOpenRightColumn={
                                                isOpenRightColumn
                                            }
                                            toggleRightColumn={
                                                toggleRightColumn
                                            }
                                        />
                                    )}
                                </Col>
                            )}
                        </Row>
                    );
                })}
            </Accordion>
        );
    }
}
