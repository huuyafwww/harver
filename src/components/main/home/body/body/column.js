import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Accordion, Card } from 'react-bootstrap';
import { getMainHarViewAccordion } from '@helpers';

const AccordionStyle = {
    position: 'sticky',
    top: 0,
};

@inject('store')
@observer
export default class ColumnPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { request, response } = this.props.RowData;
        return (
            <Accordion style={AccordionStyle}>
                <Card>{getMainHarViewAccordion([request, response])}</Card>
            </Accordion>
        );
    }
}
