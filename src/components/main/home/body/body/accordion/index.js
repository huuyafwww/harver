import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import AccordionToggle from '@components/main/home/body/body/accordion/toggle';
import AccordionCollapse from '@components/main/home/body/body/accordion/collapse';

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
            <div>
                <AccordionToggle
                    eventKey={eventKey}
                    showDataLabel={showDataLabel}
                />
                <AccordionCollapse eventKey={eventKey} showData={showData} />
            </div>
        );
    }
}
