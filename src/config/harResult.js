const Config = {
    resultColumn: [
        {
            title: 'Url',
            params: ['request', 'url'],
            state: 'Url',
        },
        {
            title: 'Method',
            params: ['request', 'method'],
            state: 'Method',
        },
        {
            title: 'Status',
            params: ['response', 'status'],
            state: 'Status',
        },
        {
            title: 'MIME Type',
            params: ['response', 'content', 'mimeType'],
            state: 'MimeType',
        },
        {
            title: 'Resource Type',
            params: ['_resourceType'],
            state: 'ResourceType',
        },
        {
            title: 'Size',
            params: ['response', 'content', 'size'],
            state: 'Size',
        },
    ],
    isShow: {
        Url: true,
        Method: true,
        Status: true,
        MimeType: true,
        ResourceType: true,
        Size: true,
    },
};

export { Config };
