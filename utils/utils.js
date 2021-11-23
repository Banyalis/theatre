import { BREAKPOINTS, MEDIA_SIZES } from '@/utils/constants';

export {
    isDesktop,
    isDesktopMedium,
    isDesktopSmall,
    isLaptop,
    isTablet,
    isMobile,
    getCurrentMediaSize,
    getProgramHash,
    formattedRange
};

/**
 * Is current media size is mobile
 *
 * @returns {boolean}
 */
function isDesktop() {
    return window?.matchMedia(`(min-width: ${MEDIA_SIZES.tablet}px)`).matches;
}

function isDesktopMedium() {
    return window?.matchMedia(`(min-width: ${MEDIA_SIZES.desktop}px)`).matches;
}

function isDesktopSmall() {
    return window?.matchMedia(`(min-width: ${MEDIA_SIZES.desktopSmall}px)`)
        .matches;
}

function isLaptop() {
    return window?.matchMedia(`(max-width: ${MEDIA_SIZES.laptop}px)`).matches;
}

function isTablet() {
    return window?.matchMedia(`(min-width: ${MEDIA_SIZES.tablet}px)`).matches;
}

function isMobile() {
    return window?.matchMedia(`(max-width: ${MEDIA_SIZES.tablet - 1}px)`)
        .matches;
}

function getCurrentMediaSize() {
    return Object.entries(
        Object.entries(BREAKPOINTS).filter(
            ([key, value]) => window.matchMedia(value).matches
        )[0]
    ).map(([key, value]) => value)[0];
}

function stringHash(str) {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        hash = (Math.imul(31, hash) + str.charCodeAt(i)) | 0;
    }

    return hash;
}

function getProgramHash(sceneId, date) {
    if (!sceneId) {
        return undefined;
    }

    const str = sceneId.toString() + date;

    return stringHash(str);
}

function formattedRange(beginAt, endAt) {
    let dates = null;
    let beginFormat = 'd MMMM yyyy';
    const endFormat = 'd MMMM yyyy';

    if (!beginAt) return;

    endAt = endAt || beginAt;

    if (beginAt.hasSame(endAt, 'year')) {
        if (beginAt.hasSame(endAt, 'month')) {
            beginFormat = 'd';
        } else {
            beginFormat = 'd MMMM';
        }
    }

    if (+beginAt === +endAt) dates = endAt.toFormat(endFormat);
    else {
        dates =
            beginAt.toFormat(beginFormat) +
            (endAt ? ' – ' + endAt.toFormat(endFormat) : '');
    }

    return dates;
}
