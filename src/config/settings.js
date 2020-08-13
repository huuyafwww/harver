import Basic from '@components/main/settings/basic';

const Config = {
    types: ['Basic'],
    items: {
        Basic: [
            {
                form: {
                    groupControlId: 'formBasicDisplayRow',
                    labelValue: 'How to display to HTTP Archive Row.',
                },
                wrapper: {
                    className: 'selectgroup w-100',
                },
                label: {
                    className: 'selectgroup-item',
                },
                input: {
                    name: 'displayRow',
                    type: 'radio',
                    values: ['Modal', 'Column'],
                    onChange: 'onChange',
                    className: 'selectgroup-input',
                },
                span: {
                    values: ['Modal', 'Column'],
                    className: 'selectgroup-button',
                },
            },
        ],
    },
    inits: {
        Basic: {
            displayRow: '',
        },
    },
    components: [Basic],
    toast: {
        save: {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        },
    },
};

export { Config };
