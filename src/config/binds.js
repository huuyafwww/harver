const bindMethods = {
    src: {
        components: {
            'index.js': ['onGetSettings', 'toggleMenu'],
            main: {
                'index.js': ['SelectFile'],
                'fixedToggleMenu.js': ['onClick'],
                settings: {
                    'index.js': [
                        'onSave',
                        'onChange',
                        'saveResult',
                        'getTabItems',
                        'getTabContents',
                    ],
                    basic: {
                        'index.js': ['getForms', 'getItems'],
                    },
                },
                home: {
                    body: {
                        'index.js': [
                            'onIpc',
                            'setHarFileData',
                            'getOpenStatus',
                            'setComponentOptions',
                            'toggleAccordionIcon',
                        ],
                        'accordion.js': [],
                        body: {
                            'index.js': ['getRow', 'onClick', 'closeModal'],
                            'modal.js': [
                                'handleClose',
                                'getModalHeader',
                                'getModalBody',
                                'getModalFooter',
                            ],
                            'timeline.js': [
                                'getSvgRect',
                                'getGraphInfo',
                                'getGraphSvg',
                                'createGraphData',
                            ],
                            'fixedToggleMenu.js': ['onClick'],
                            accordion: {
                                'collapse.js': [
                                    'getDataHeaderComponent',
                                    'getRequestComponent',
                                    'getResponseComponent',
                                ],
                                'toggle.js': [
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

export { bindMethods };
