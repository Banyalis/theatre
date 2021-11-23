<template>
    <div class="Poster">
        <CommonHero :type="type" :title="title" :tabs="tabs" />
        <component :is="contentComponent" :content="content" />
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { HEADER_THEMES } from '../../utils/constants';
import CommonHero from '~/components/common/CommonHero';
import PosterCatalog from '~/components/poster/PosterCatalog';
import PosterExcursions from '~/components/poster/PosterExcursions';
import PosterBroadcasts from '~/components/poster/PosterBroadcasts';

export default {
    components: {
        CommonHero,
        PosterCatalog,
        PosterExcursions,
        PosterBroadcasts
    },

    beforeRouteEnter(to, from, next) {
        if (to !== from) {
            try {
                window.scrollTo(0, 0);
            } catch {}
        }

        next();
    },

    middleware: 'timetable',
    scrollToTop: false,

    data() {
        return {
            type: 'poster',
            title: 'Афиша и билеты',
            tabs: [
                {
                    title: 'Вся афиша',
                    link: '/timetable/all'
                },
                {
                    title: 'Опера',
                    link: '/timetable/opera'
                },
                {
                    title: 'Балет',
                    link: '/timetable/ballet'
                },
                {
                    title: 'Концерты',
                    link: '/timetable/concerts'
                },
                {
                    title: 'Большой — молодым',
                    link: '/timetable/youth'
                },
                // {
                //     title: 'Экскурсии',
                //     link: '/timetable/excursions'
                // },
                {
                    title: 'Трансляции',
                    link: '/timetable/broadcasts'
                }
            ],
            mappedComponents: {
                all: 'PosterCatalog',
                excursions: 'PosterExcursions',
                broadcasts: 'PosterBroadcasts'
            }
        };
    },

    /* eslint-disable sonarjs/cognitive-complexity */
    async fetch({ $config: { baseURL }, $axios, params, store }) {
        const meta = await $axios.get(`${baseURL}/cms/api/timetable/meta/`);

        if (meta) store.commit('timetable/checkingCategories', meta.data);

        const dates = await $axios.get(`${baseURL}/cms/api/season/dates/`);

        if (dates) store.commit('timetable/setDates', dates.data);

        const patchSlugs = ['all', 'concerts'];

        const resData =
            params.slug !== 'concerts' &&
            params.slug !== 'youth' &&
            params.slug !== 'broadcasts' &&
            params.slug !== 'contests'
                ? await $axios.get(
                      `${baseURL}/cms/api/timetable/${params.slug}`
                  )
                : undefined;

        let data = [];

        if (resData) {
            data = resData.data;
        }

        if (patchSlugs.includes(params.slug)) {
            const patchDataConcerts = await $axios.get(
                `${baseURL}/api/timetable/get?slug=concerts`
            );
            let patchDataContests;

            if (params.slug === 'all') {
                patchDataContests = await $axios.get(
                    `${baseURL}/api/timetable/get?slug=contests`
                );
            }

            if (patchDataConcerts) {
                data = data.concat(patchDataConcerts.data);
            }

            if (patchDataContests) {
                data = data.concat(patchDataContests.data);
            }
        }

        const resDataYouth =
            params.slug === 'youth'
                ? await $axios.get(`${baseURL}/cms/api/timetable/all`)
                : undefined;

        if (resDataYouth) {
            const filteredYouth = resDataYouth.data.filter((item, index) => {
                return item.is_youth;
            });

            data = filteredYouth;
        }

        const resDataBroadcasts =
            params.slug === 'broadcasts'
                ? await $axios.get(
                      `${baseURL}/api/timetable/get?slug=broadcasts`
                  )
                : undefined;

        if (resDataBroadcasts) {
            data = resDataBroadcasts.data;
        }

        // Process combined performances

        if (params.slug !== 'broadcasts') {
            const rawConjugates = data
                .filter((program) => {
                    return program.conjugates && program.conjugates.length;
                })
                .map((program) => ({
                    id: program.id,
                    performance: program.performance,
                    datetime: program.datetime,
                    conjugates: program.conjugates
                }));
            const conjugatesParents = rawConjugates.reduce(
                (result, program) => {
                    result[program.id] = program.datetime;
                    return result;
                },
                {}
            );
            const conjugatesChildren = rawConjugates.reduce(
                (result, program) => {
                    const { conjugates, ...programData } = program;
                    conjugates.forEach((conjugate) => {
                        const conjugated = result[conjugate] || [];
                        conjugated.push(programData);
                        result[conjugate] = conjugated;
                    });
                    return result;
                },
                {}
            );

            // console.log(rawConjugates);
            // console.log(conjugatesParents);
            // console.log(conjugatesChildren);

            const conjugated = {};

            data = data.filter((performance) => {
                if (performance.conjugated) {
                    const parent = (
                        conjugatesChildren[performance.performance] || []
                    ).find((parent) => {
                        return (
                            performance.datetime ===
                            conjugatesParents[parent.id]
                        );
                    });
                    if (parent) {
                        conjugated[performance.performance] = performance;
                        return false;
                    }
                }
                return true;
            });

            if (Object.keys(conjugated).length) {
                data = data.map((performance) => {
                    if (
                        performance.conjugates &&
                        performance.conjugates.length
                    ) {
                        return {
                            oneAct: true,
                            datetime: performance.datetime,
                            description: performance.subtitle,
                            age: performance.age,
                            title:
                                performance.category === 'ballet'
                                    ? 'Программа одноактных балетов'
                                    : 'Программа одноактных опер',
                            list: [
                                {
                                    ...performance,
                                    oneAct: true,
                                    announced: true,
                                    modifier: 'all',
                                    button: undefined,
                                    age: undefined
                                },
                                ...performance.conjugates.map((conj, ind) => ({
                                    ...conjugated[conj],
                                    oneAct: true,
                                    announced: true,
                                    modifier: 'all',
                                    age: undefined,
                                    last:
                                        ind ===
                                        performance.conjugates.length - 1
                                }))
                            ]
                        };
                    }
                    return performance;
                });
            }
        }

        if (params.slug === 'broadcasts') {
            store.commit('timetable/setStaticContent', data);
        } else {
            store.commit('timetable/setContent', data);
        }
    },

    head() {
        return {
            title: 'Большой театр • Афиша'
        };
    },

    computed: {
        // If there are specific component for slug, return it, else return default component
        contentComponent() {
            return (
                this.mappedComponents[this.$route.params.slug] ||
                'PosterCatalog'
            );
        },

        ...mapState(['footerDarkTheme']),
        ...mapState('timetable', ['content', 'categories'])
    },

    mounted() {
        try {
            this.$store.dispatch('performances/getPrograms');
        } catch (error) {
            console.log(error);
        }

        this.setTheme();
    },

    deactivated() {
        this.$destroy();
    },

    updated() {
        this.setTheme();
    },

    methods: {
        setTheme() {
            this.changeTheme({
                headerMod: HEADER_THEMES.default,
                isFooterDark: false
            });
        },

        ...mapMutations({
            changeTheme: 'changeTheme'
        })
    }
};
</script>

<style lang="scss" scoped>
.Poster {
    $component: &;
}
</style>
