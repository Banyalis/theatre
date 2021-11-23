export default function (ctx) {
    if (ctx.route.fullPath === '/season')
        ctx.redirect(301, '/season/premieres');
}
