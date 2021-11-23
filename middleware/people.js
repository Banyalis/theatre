export default function (ctx) {
    const fullPath = ctx.route.fullPath;

    if (fullPath === '/people' || fullPath === '/people/operatic')
        ctx.redirect(301, '/people/operatic/soloists');

    if (fullPath === '/people/ballet')
        ctx.redirect(301, '/people/ballet/soloists');

    if (fullPath === '/people/orchestra')
        ctx.redirect(301, '/people/orchestra/conductors');
}
