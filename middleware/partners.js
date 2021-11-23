export default function (ctx) {
    if (ctx.route.fullPath === '/partners')
        ctx.redirect(301, '/partners/sponsors');
}
