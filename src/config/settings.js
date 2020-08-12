import Basic from '@components/main/settings/basic';

const Config = {
    items: ['Basic'],
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
