export const KEY_CODES = {
    arrowUp: 38,
    arrowDown: 40,
    enter: 13,
    escape: 27
};

export const EVENTS = {
    onUpdateHeight: 'on-update-height'
};

export const MEDIA_SIZES = {
    desktopLarge: 1920,
    desktop: 1440,
    desktopSmall: 1200,
    laptop: 960,
    tablet: 768,
    mobile: 320
};

export const NAMES_BREAKPOINTS = {
    desktopLarge: 'desktopLarge',
    desktop: 'desktop',
    desktopSmall: 'desktopSmall',
    laptop: 'laptop',
    tablet: 'tablet',
    mobile: 'mobile'
};

export const BREAKPOINTS = {
    [NAMES_BREAKPOINTS.desktopLarge]: `(min-width: ${MEDIA_SIZES.desktopLarge}px)`,
    [NAMES_BREAKPOINTS.desktop]: `(min-width: ${
        MEDIA_SIZES.desktop
    }px) and (max-width: ${MEDIA_SIZES.desktopLarge - 1}px)`,
    [NAMES_BREAKPOINTS.desktopSmall]: `(min-width: ${
        MEDIA_SIZES.desktopSmall
    }px) and (max-width: ${MEDIA_SIZES.desktop - 1}px)`,
    [NAMES_BREAKPOINTS.laptop]: `(min-width: ${
        MEDIA_SIZES.laptop
    }px) and (max-width: ${MEDIA_SIZES.desktopSmall - 1}px)`,
    [NAMES_BREAKPOINTS.tablet]: `(min-width: ${
        MEDIA_SIZES.tablet
    }px) and (max-width: ${MEDIA_SIZES.laptop - 1}px)`,
    [NAMES_BREAKPOINTS.mobile]: `(max-width: ${MEDIA_SIZES.tablet - 1}px)`
};

export const PATH_PAGES_VUE = {
    index: './pages/index.vue'
};

export const VUE_CUSTOM_EVENTS = {
    onInputChange: 'on-input-change',
    onSearchInput: 'on-search-input',
    input: 'input'
};

/*
 *   CONFIG_POPUPS is info about popup for work custom popups on nuxt
 *   Syntax:
 *   CONFIG_POPUPS: {
 *       [type_of_the_popup]: { // it's type which will was returned from back end
 *          name: '<name_of_router>', // the name of the router would be unique
 *          componentName: '<name_of_component_of_popup>', // the name is the same as the component of popup name
 *          path: '<path_for_route_parent_page>', // !!! WITHOUT :popupSlug, only path for parent page !!!
 *          component: '<path_to_parent_page>' // path to .vue of parent page (it's page)
 *       }
 *   }
 *   If there are popup without URL, some parameters can be missed and some parameters can be added
 *
 * */
export const CONFIG_POPUPS = {
    scene: {
        componentName: 'SceneSelectPopup',
        header: {
            title: 'Выбрать сцену'
        }
    },
    calendar: {
        componentName: 'CalendarPopup',
        header: {
            title: 'Выбрать дату спектакля или концерта',
            titleMobile: 'Выбрать дату '
        }
    },
    characters: {
        componentName: 'CharactersPopup'
    },
    categoriesNews: {
        componentName: 'CategoriesNewsPopup'
    },
    yearsNews: {
        componentName: 'YearsNewsPopup'
    },
    performance: {
        componentName: 'PerformancePopup'
    },
    dates: {
        componentName: 'DatesPopup'
    }
};

export const HEADER_THEMES = {
    default: 'default',
    white: 'white',
    dark: 'dark',
    gold: 'gold',
    home: 'home'
};

export const HOME_ITEM_THEMES = {
    white: 'white',
    red: 'red',
    black: 'black'
};

export const HOME_BLOCK_TYPES = {
    news: 'news',
    events: 'events',
    announcements: 'announcements',
    group: 'group',
    item: 'item',
    partners: 'partners'
};

export const HOME_ITEM_TYPES = {
    preview: 'preview',
    performance: 'performance',
    broadcast: 'broadcast',
    notice: 'notice',
    model: 'model'
};

export const NEWS_ITEM_TYPES = {
    performance: 'performance',
    replacement: 'replacement',
    common: 'common',
    people: 'people'
};

export const SEASON_TYPES = {
    premieres: 'premieres',
    opera: 'opera',
    ballet: 'ballet'
};

export const SCENES_CHOICES = [
    {
        name: 'Историческая сцена',
        address: 'Театральная площадь, 1',
        img: 'scene-select.png',
        img2x: 'scene-select-2x.png',
        id: 1
    },
    {
        name: 'Новая сцена',
        address: 'Театральная площадь, 2',
        img: 'scene-select-2.png',
        img2x: 'scene-select-2-2x.png',
        id: 3
    },
    {
        name: 'Камерная сцена',
        address: 'Никольская, 17/1',
        img: 'scene-select-3.png',
        img2x: 'scene-select-3-2x.png',
        id: 2
    },
    {
        name: 'Бетховенский зал',
        address: 'Театральная площадь, 3',
        img: 'scene-select-4.png',
        img2x: 'scene-select-4-2x.png',
        id: 4
    }
];

// ID for scene in ticket API (Using it for hash generating)
export const SCENE_API_IDS = {
    historical: 1,
    new: 2,
    chamber: 4,
    beethoven: 5
};

export const WEEKDAY_NAMES = {
    1: {
        full: 'Понедельник',
        short: 'Пн'
    },
    2: {
        full: 'Вторник',
        short: 'Вт'
    },
    3: {
        full: 'Среда',
        short: 'Ср'
    },
    4: {
        full: 'Четверг',
        short: 'Чт'
    },
    5: {
        full: 'Пятница',
        short: 'Пт'
    },
    6: {
        full: 'Суббота',
        short: 'Сб'
    },
    7: {
        full: 'Воскресенье',
        short: 'Вс'
    }
};

export const WEEK_DAYS_NUMBER = 7;

export const WEEKDAY_FIRST = 1;
export const WEEKDAY_LAST = 7;

// Name of format is: parameter name (day, month, year) + type (if it's not Number) - Str - short name, String - full name
// For example: weekdayStrDayMonthString - is description for this format: "Mn, 31 May"
// For most common cases names can be time and date
export const DATE_TIME_FORMATS = {
    dayMonthString: 'dd MMMM',
    time: 'HH:mm'
};

export const CLASSES = {
    // popupOpen: 'b-popupOpen',
    basePopup: 'BasePopup'
};

export const ARTICLE_TYPES = {
    text: 'text',
    people: 'people',
    gallery: 'gallery',
    facts: 'facts'
};

export const BUTTON_TYPES = {
    link: 1,
    disabled: 2,
    uploaded: 3,
    white: 4
};

export const BUTTON_CLASSES = {
    [BUTTON_TYPES.link]: 'isRed',
    [BUTTON_TYPES.white]: 'isTransparentWhite',
    [BUTTON_TYPES.uploaded]: 'isTransparentBlack',
    [BUTTON_TYPES.disabled]: 'isDisabled'
};

export const TICKETS_BUTTONS = {
    buy: {
        text: 'Купить билет',
        type: BUTTON_TYPES.link
    },
    sold: {
        text: 'Билетов нет',
        type: BUTTON_TYPES.disabled
    },
    uploaded: {
        text: undefined,
        type: BUTTON_TYPES.uploaded
    },
    soon: {
        text: 'Скоро в продаже',
        type: BUTTON_TYPES.disabled
    }
};

export const cookieAgreementVar = 'dontLoad';
