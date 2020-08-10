import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Card } from 'react-bootstrap';
import AccordionToggle from '@components/main/home/body/body/modal/accordionToggle';
import AccordionCollapse from '@components/main/home/body/body/modal/accordionCollapse';

@inject('store')
@observer
export default class AccordionPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { eventKey, showDataLabel, showData } = this.props;
        return (
            <Card>
                <AccordionToggle
                    eventKey={eventKey}
                    showDataLabel={showDataLabel}
                />
                <AccordionCollapse eventKey={eventKey} showData={showData} />
            </Card>
        );
    }
}
