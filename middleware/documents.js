export default function (ctx) {
    if (ctx.route.fullPath === '/about/documents')
        ctx.redirect(301, '/about/documents/anticorruption');
}
