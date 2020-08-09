import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import styled from 'styled-components';
import { Accordion, Card, Button } from 'react-bootstrap';
import { BsCaretDown, BsCaretUp } from 'react-icons/bs';
import { getComponentName } from '@helpers';
import HomeCardBodyHeader from '@components/main/home/body/header';
import HomeCardBodyBody from '@components/main/home/body/body';

const ToggleTitleWrapper = styled.span`
    font-size: 1.3em;
`;

const ToggleIconWrapper = styled.span`
    font-size: 2em;
    vertical-align: bottom;
`;

const Components = [HomeCardBodyHeader, HomeCardBodyBody];

@inject('store')
@observer
export default class Accordions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getOpenStatus = this.props.getOpenStatus;
        this.onClick = this.onClick.bind(this);
        this.getAccordionToggle = this.getAccordionToggle.bind(this);
        this.getAccordionCollapse = this.getAccordionCollapse.bind(this);
    }

    onClick(e) {
        const target = e.currentTarget.dataset.toggleVarName;
        this.props.toggleAccordionIcon(target);
    }

    getAccordionToggle(eventKey, targetOption) {
        const { toggleVarName, title } = targetOption;
        const toggleVar = this.getOpenStatus(toggleVarName);
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

    getAccordionCollapse(eventKey, targetOption) {
        const { data } = targetOption;
        const HarViewComponent = Components[eventKey];
        return (
            <Accordion.Collapse eventKey={eventKey}>
                <Card.Body>
                    <HarViewComponent har={data} />
                </Card.Body>
            </Accordion.Collapse>
        );
    }

    render() {
        const { getAccordionToggle, getAccordionCollapse } = this;
        const { ComponentOptions } = this.props;
        return (
            <Accordion defaultActiveKey="0">
                {Components.map((Component, key) => {
                    const ComponentName = getComponentName(Component);
                    const targetOption = ComponentOptions[ComponentName];
                    const eventKey = String(key);
                    return (
                        <Card key={key}>
                            {getAccordionToggle(eventKey, targetOption)}
                            {getAccordionCollapse(eventKey, targetOption)}
                        </Card>
                    );
                })}
            </Accordion>
        );
    }
}
