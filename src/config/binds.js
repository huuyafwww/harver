const binds = {
    src: {
        components: {
            index: ['onGetSettings', 'toggleMenu'],
            main: {
                index: ['SelectFile'],
                fixedToggleMenu: ['onClick'],
                settings: {
                    index: [
                        'onSave',
                        'onChange',
                        'saveResult',
                        'getTabItems',
                        'getTabContents',
                    ],
                    basic: {
                        index: ['getForms', 'getItems'],
                    },
                },
                home: {
                    body: {
                        index: [
                            'setHarFileData',
                            'getOpenStatus',
                            'setComponentOptions',
                            'toggleAccordionIcon',
                        ],
                        accordion: [],
                        body: {
                            index: ['getRow', 'onClick', 'closeModal'],
                            modal: [
                                'handleClose',
                                'getModalHeader',
                                'getModalBody',
                                'getModalFooter',
                            ],
                            timeline: [
                                'getSvgRect',
                                'getGraphInfo',
                                'getGraphSvg',
                                'createGraphData',
                            ],
                            fixedToggleMenu: ['onClick'],
                            accordion: {
                                collapse: [
                                    'getDataHeaderComponent',
                                    'getRequestComponent',
                                    'getResponseComponent',
                                ],
                                toggle: [
                                    'onClickAccordionToggle',
                                    'toggleAccordionIcon',
                                    'onCopyData',
                                ],
                            },
                        },
                    },
                },
            },
        },
    },
};
