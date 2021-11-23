import { DateTime } from 'luxon';
import { getProgramHash } from '@/utils/utils';
import { SCENE_API_IDS } from '@/utils/constants';

export const state = () => ({
    content: {},
    list: {},
    // Programs is currently active performances with specified date & scene
    programs: {},
    programsLoading: true
});

// Generate Object of programs:
// {
//  [hash of name + date]: {}
// }

function mapPrograms(programs) {
    const mappedPrograms = {};

    for (const program of programs) {
        // To unify date format, first load it to DateTime and then set format equal to Backend format
        const date = DateTime.fromISO(program.fullDate, {
            locale: 'ru',
            setZone: true
        })
            .setZone('Europe/Moscow')
            .toFormat('yyyy-MM-ddTT');

        mappedPrograms[getProgramHash(program.hallId, date)] = program;
    }

    return mappedPrograms;
}

export const mutations = {
    setList(state, { list, categoryName }) {
        const tempList = { ...state.list };

        tempList[categoryName] = [...list];
        state.list = { ...tempList };
    },

    setContent(state, content) {
        const sceneType =
            content.detail.information[0] &&
            content.detail.information[0].scene;
        const sceneId = SCENE_API_IDS[sceneType];

        state.content = {
            ...content,
            schedule: content.schedule.map((program) => ({
                ...program,
                // For each schedule item (program) generate hash for API data matching
                hash: getProgramHash(
                    sceneId,
                    // Remove 'T' symbol because in luxon toFormat method 'T' is keyword
                    program.datetime.replace('T', '')
                )
            })),

            team: content.team.map((item) => ({
                ...item,
                // For each team item (program) generate hash for API data matching
                hash: getProgramHash(
                    sceneId,
                    // Remove 'T' symbol because in luxon toFormat method 'T' is keyword
                    item.datetime.replace('T', '')
                )
            }))
        };
    },
    setProgramsLoading(state, payload) {
        state.programsLoading = payload;
    },
    setPrograms(state, payload) {
        state.programs = mapPrograms(payload);
    }
};

export const actions = {
    async getPrograms({ state, commit }) {
        commit('setProgramsLoading', true);
        const payload = await this.$axios.$get(
            `${this.$config.proxyApiURL}/ticket-api/shows/`
        );

        commit('setPrograms', payload);
        commit('setProgramsLoading', false);
    }
};
