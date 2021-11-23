export default {
    [process.env.PROXY_API_TICKETS_ENDPOINT]: {
        target: process.env.TICKETS_API_URL,
        pathRewrite: {
            ['^' + process.env.PROXY_API_TICKETS_ENDPOINT]: process.env
                .TICKETS_API_ENDPOINT
        },
        secure: !!process.env.PROXY_SECURE,
        headers: {
            'X-API-token': process.env.X_API_TOKEN || ''
        }
    },
    '/cms': {
        target: process.env.CMS_URL,
        followRedirects: true,
        pathRewrite: {
            '^/cms': ''
        }
    }
};
