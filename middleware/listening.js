export default function (ctx) {
    if (ctx.route.fullPath === '/about/listening')
        ctx.redirect(301, '/about/listening/listening-0');
}
