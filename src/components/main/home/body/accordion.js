import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';
import { getComponentName } from '@helpers';
import HomeCardBodyHeader from '@components/main/home/body/header';
import HomeCardBodyBody from '@components/main/home/body/body';
import ColumnPanel from '@components/main/home/body/body/column';
import FixedToggleMenu from '@components/main/home/body/body/fixedToggleMenu';

const ToggleTitleWrapper = styled.span`
    font-size: 1.3em;
`;

const ToggleIconWrapper = styled.span`
    font-size: 2em;
    margin-left: 4px;
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
        };
        this.onClick = this.onClick.bind(this);
        this.getAccordionToggle = this.getAccordionToggle.bind(this);
        this.getAccordionCollapse = this.getAccordionCollapse.bind(this);
        this.getModalInjectData = this.getModalInjectData.bind(this);
        this.changeColumnStatus = this.changeColumnStatus.bind(this);
        this.changeModalStatus = this.changeModalStatus.bind(this);
        this.toggleRightColumn = this.toggleRightColumn.bind(this);
        this.toggleLeftColumn = this.toggleLeftColumn.bind(this);
        this.resetStatus = this.resetStatus.bind(this);
    }

    componentDidUpdate() {
        const { onLoadNewHarFile } = this.props.store;
        onLoadNewHarFile && this.resetStatus();
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

    getAccordionToggle(eventKey, targetOption) {
        const { toggleVarName, title } = targetOption;
        const toggleVar = this.props.getOpenStatus(toggleVarName);
        return (
            <Card.Header>
                <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={eventKey}
                    onClick={this.onClick}
                    data-toggle-var-name={toggleVarName}
                >
                    <ToggleTitleWrapper>{title}</ToggleTitleWrapper>
                    <ToggleIconWrapper>
                        {(toggleVar && <BsCaretUp />) || <BsCaretDown />}
                    </ToggleIconWrapper>
                </Accordion.Toggle>
            </Card.Header>
        );
    }

    getModalInjectData(har) {
        const { isColumnDisplayRow } = this.props.store;
        const { changeColumnStatus, changeModalStatus } = this;
        const { RowData, isOpenModal } = this.state;
        const onChangeStatus = isColumnDisplayRow
            ? changeColumnStatus
            : changeModalStatus;
        return {
            har,
            RowData,
            isOpenModal,
            onChangeStatus,
        };
    }

    getAccordionCollapse(eventKey, targetOption, isResult) {
        const { data } = targetOption;
        const HarViewComponent = Components[eventKey];
        const injectData = isResult
            ? this.getModalInjectData(data)
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
        } = this;
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
                                            targetOption
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
