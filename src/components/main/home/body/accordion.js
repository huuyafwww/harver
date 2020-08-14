import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';
import { getComponentName } from '@helpers';
import HomeCardBodyHeader from '@components/main/home/body/header';
import HomeCardBodyBody from '@components/main/home/body/body';
import ColumnPanel from '@components/main/home/body/body/column';

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
            isOpenColumn: false,
            isOpenModal: false,
        };
        this.onClick = this.onClick.bind(this);
        this.getAccordionToggle = this.getAccordionToggle.bind(this);
        this.getAccordionCollapse = this.getAccordionCollapse.bind(this);
        this.getModalInjectData = this.getModalInjectData.bind(this);
        this.changeColumnStatus = this.changeColumnStatus.bind(this);
        this.changeModalStatus = this.changeModalStatus.bind(this);
    }

    onClick(e) {
        const { toggleVarName } = e.currentTarget.dataset;
        this.props.toggleAccordionIcon(toggleVarName);
    }

    changeColumnStatus(RowData, isOpenColumn) {
        this.setState({ RowData, isOpenColumn });
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
        const { getAccordionToggle, getAccordionCollapse } = this;
        const { ComponentOptions } = this.props;
        const { isColumnDisplayRow } = this.props.store;
        const { isOpenColumn, RowData } = this.state;
        return (
            <Accordion defaultActiveKey="0">
                {Components.map((Component, key) => {
                    const ComponentName = getComponentName(Component);
                    const targetOption = ComponentOptions[ComponentName];
                    const eventKey = String(key);
                    const isResult = ComponentName === 'HomeCardBodyBody';
                    const isColumn = isColumnDisplayRow && isResult;
                    const resultCol = isColumn ? 8 : 12;
                    return (
                        <Row key={key}>
                            <Col md={resultCol}>
                                <Card>
                                    {getAccordionToggle(eventKey, targetOption)}
                                    {getAccordionCollapse(
                                        eventKey,
                                        targetOption,
                                        isResult
                                    )}
                                </Card>
                            </Col>
                            {isColumn && isOpenColumn && (
                                <Col md={4}>
                                    <ColumnPanel RowData={RowData} />
                                </Col>
                            )}
                        </Row>
                    );
                })}
            </Accordion>
        );
    }
}
