export default function (ctx) {
    if (ctx.route.fullPath === '/timetable')
        ctx.redirect(301, '/timetable/all');
}
