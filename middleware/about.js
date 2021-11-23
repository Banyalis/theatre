export default function (ctx) {
    if (ctx.route.fullPath === '/about') ctx.redirect(301, '/about/history');
}
