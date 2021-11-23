import axios from 'axios';
import { getProgramHash } from '@/utils/utils';
import { SCENE_API_IDS } from '@/utils/constants';

export const state = () => ({
    content: {},
    categories: {},
    calendarDates: {},
    searchFilter: '',
    datesStartFilter: null,
    datesEndFilter: null,
    sceneFilterId: undefined,
    sceneFilterName: '',
    avaibleFilter: false
});

function mapPrograms(programs) {
    const cards = [];
    let cardDate;

    // Sorting programs by datetime
    programs.sort((a, b) => {
        if (a.datetime < b.datetime) return -1;

        if (a.datetime > b.datetime) return 1;

        return 0;
    });

    for (const program of programs) {
        // Datetime has ISO format YYYY-MM-DDThh:mm, for unite items in cards by date, we can compare date before 'T'
        const programDate = program.datetime.split('T')[0];
        const item = {
            ...program,
            hash: getProgramHash(
                SCENE_API_IDS[program.scene?.type] || '',
                // Remove 'T' symbol because in luxon toFormat method 'T' is keyword
                program.datetime?.replace('T', '')
            )
        };
        if (programDate !== cardDate) {
            cardDate = programDate;

            cards.push({
                date: cardDate,
                items: [item]
            });
        } else {
            cards[cards.length - 1].items.push(item);
        }
    }

    return cards;
}

export const mutations = {
    setContent(state, content) {
        state.content = {
            cards: mapPrograms(content)
        };
    },

    setStaticContent(state, content) {
        state.content = content;
    },

    checkingCategories(state, payload) {
        state.categories = payload;
    },

    setDates(state, payload) {
        state.calendarDates = payload;
    },

    setSearchFilter(state, payload) {
        state.searchFilter = payload;
    },

    setDatesStartFilter(state, payload) {
        state.datesStartFilter = payload;
    },

    setDatesEndFilter(state, payload) {
        state.datesEndFilter = payload;
    },

    setSceneFilter(state, { sceneId, sceneName }) {
        state.sceneFilterId = sceneId;
        state.sceneFilterName = sceneName;
    },

    setAvaibleFilter(state, payload) {
        state.avaibleFilter = payload;
    }
};

export const getters = {
    getSearchFilter(state) {
        return state.searchFilter;
    },

    getDatesStartFilter(state) {
        return state.datesStartFilter;
    },

    getDatesEndFilter(state) {
        return state.datesEndFilter;
    },

    getSceneFilterName(state) {
        return state.sceneFilterName;
    },

    getAvaibleFilter(state) {
        return state.avaibleFilter;
    }
};

export const actions = {
    async getTimetableAction({ commit, state }, slug) {
        const baseURL = this.$config.baseURL;
        const params = {};

        let date;

        if (state.datesStartFilter) {
            const startDate = new Date(state.datesStartFilter);
            const monthS = startDate.getMonth() + 1;
            const dateS = startDate.getDate();
            const yearS = startDate.getFullYear();
            const dateStart = yearS + '-' + monthS + '-' + dateS;
            date = dateStart;
        }

        if (state.datesEndFilter) {
            const endDate = new Date(state.datesEndFilter);
            const monthE = endDate.getMonth() + 1;
            const dateE = endDate.getDate();
            const yearE = endDate.getFullYear();
            const dateEnd = yearE + '-' + monthE + '-' + dateE;
            date += ':' + dateEnd;
        }

        if (state.searchFilter) {
            params.q = state.searchFilter;
        }

        if (date) {
            params.d = date;
        }

        if (state.sceneFilterId) {
            params.s = state.sceneFilterId;
        }

        const resTimetable = await axios.get(
            `${baseURL}/cms/api/timetable/${slug}`,
            { params }
        );

        if (resTimetable) commit('setContent', resTimetable.data);
    }
};
