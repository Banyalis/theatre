import Vue from 'vue';

// import axios from 'axios';
import { HEADER_THEMES } from '../utils/constants';

export const state = () => ({
    headerMod: HEADER_THEMES.home,
    footerDarkTheme: false,
    whiteTheme: false,
    isScrollLocked: false,
    savedScrollPosition: 0,
    // Count how many popups was opened one by one
    blockedScrollCount: 0,
    headerHeight: 0,
    isOpenPopupMenu: false,
    currentLocaleCode: 'ru',
    isContentScrollLocked: false,
    savedScrollPositionPopup: 0
});

export const mutations = {
    changeTheme(state, { headerMod, isFooterDark }) {
        state.headerMod = headerMod;
        state.footerDarkTheme = isFooterDark;
    },

    setWhiteTheme(state, isWhite) {
        state.whiteTheme = isWhite;
    },

    blockScroll(state) {
        // document.documentElement.classList.add(CLASSES.popupOpen);

        const mainContent = document.getElementById('main-content');

        if (!state.isContentScrollLocked) {
            state.savedScrollPositionPopup = window.scrollY;
            mainContent.style.position = 'fixed';
            mainContent.style.width = '100%';
            mainContent.style.left = '0px';
            mainContent.style.top = `${-state.savedScrollPositionPopup}px`;
        }

        state.isContentScrollLocked = true;
        window.scrollTo(0, 0);
    },

    unblockScroll(state) {
        // document.documentElement.classList.remove(CLASSES.popupOpen);

        const mainContent = document.getElementById('main-content');

        if (state.isContentScrollLocked && !state.isOpenPopup) {
            mainContent.style.position = '';
            mainContent.style.width = '';
            mainContent.style.left = '';
            mainContent.style.top = '';
            state.isContentScrollLocked = false;
            window.scrollTo(0, state.savedScrollPositionPopup);
        }
    },

    updateHeaderHeight(state, height) {
        state.headerHeight = height;
    },

    togglePopupMenu(state, isOpen) {
        state.isOpenPopupMenu = isOpen;
    },

    setCurrentLocaleCode(s, v) {
        try {
            Vue.$cookies.set('locale', v);
        } catch {}
        s.currentLocaleCode = v;
    },
    setIsLanguageSwitch(s, v) {
        s.isLanguageSwitch = v;
    }
};

export const getters = {
    headerDarkTheme(state) {
        return state.headerMod === HEADER_THEMES.dark;
    },

    alternateLocaleCode(state) {
        return state.currentLocaleCode === 'en' ? 'ru' : 'en';
    }
};

// TODO: Uncomment before merge to master
// export const actions = {
//     async nuxtServerInit({ commit, state }, context) {
//         const { $config } = context;
//         const baseURL = $config.baseURL;

//         if (!state.visit.categories.length) {
//             const resCategories = await axios.get(
//                 `${baseURL}/cms/api/visit/pages`,
//                 {
//                     params: {
//                         locale: state.currentLocaleCode
//                     }
//                 }
//             );

//             if (resCategories)
//                 commit('visit/setCategories', resCategories.data);
//         }
//     }
// };
