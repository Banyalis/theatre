<template>
    <div class="Visit">
        <CommonHero
            ref="hero"
            :type="type"
            :title="title"
            :is-red="true"
            :is-fixed="true"
        />
        <div ref="visitWrapper" class="Visit-wrapper">
            <VisitAd
                v-if="announcement.text"
                ref="ad"
                :announcement="announcement"
                @close-ad="checkClose"
            />
            <div class="Visit-inner">
                <VisitSidebar
                    :categories="categories"
                    :current-slug="content.slug"
                    :is-close-ad="isCloseAd"
                    @change-section="getIndex"
                    @toggle-close-popup="toggleClosePopup"
                />
                <VisitContent
                    :content="content"
                    :current-section="index"
                    :is-close="isClosePopup"
                    @toggle-close-popup="toggleClosePopup"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { isDesktop, isLaptop } from '@/utils/utils';
import { HEADER_THEMES } from '../../utils/constants';
import CommonHero from '~/components/common/CommonHero';
import VisitAd from '~/components/visit/VisitAd';
import VisitSidebar from '~/components/visit/VisitSidebar';
import VisitContent from '~/components/visit/VisitContent';

export default {
    components: {
        CommonHero,
        VisitAd,
        VisitSidebar,
        VisitContent
    },

    beforeRouteUpdate(to, from, next) {
        this.scrollTo();

        setTimeout(() => {
            next();
        }, 100);
    },

    beforeRouteEnter(to, from, next) {
        if (to !== from) {
            try {
                window.scrollTo(0, 0);
            } catch {}
        }

        next();
    },

    scrollToTop: false,

    data() {
        return {
            type: 'visit',
            title: 'Визит в&nbsp;театр',
            index: 0,
            isCloseAd: false,
            isClosePopup: false,
            prevRoute: null
        };
    },

    async fetch({ $config: { baseURL }, $axios, params, store }) {
        let currentId = 0;

        store.state.visit.categories.forEach((category) => {
            category.items.forEach((item) => {
                if (item.slug === params.slug) currentId = item.id;
            });
        });

        const resPages = await $axios.get(
            `${baseURL}/cms/api/visit/pages/${currentId}`
        );
        const resAnnouncement = await $axios.get(
            `${baseURL}/cms/api/visit/announcement/`
        );

        if (resPages) store.commit('visit/setContent', resPages.data);
        if (resAnnouncement)
            store.commit('visit/setAnnouncement', resAnnouncement.data);
    },

    head() {
        return {
            title: 'Большой театр • Визит в театр'
        };
    },

    computed: {
        ...mapState(['footerDarkTheme', 'headerHeight']),
        ...mapState('visit', ['announcement', 'categories', 'content'])
    },

    mounted() {
        this.prevRoute = this.$route.name;

        this.setTheme();
        window.addEventListener('resize', this.onResize);
        this.onResize();

        if (this.announcement.text) {
            window.addEventListener('scroll', this.onScrollParallax);
        }
    },

    updated() {
        this.setTheme();
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    deactivated() {
        this.$destroy();
    },

    methods: {
        setTheme() {
            this.changeTheme({
                headerMod: HEADER_THEMES.default,
                isFooterDark: false
            });
        },

        onResize() {
            this.heroHeight = this.$refs.hero.$el.offsetHeight;

            if (this.announcement.text) {
                this.adHeight = this.$refs.ad.$el.offsetHeight;
            }

            this.setWrapperIndent();
        },

        setWrapperIndent() {
            if (this.$refs.visitWrapper && !isLaptop()) {
                this.$refs.visitWrapper.style.paddingTop = `${this.heroHeight}px`;
            } else {
                this.$refs.visitWrapper.removeAttribute('style');
            }
        },

        scrollTo() {
            if (this.prevRoute === this.$route.name && isDesktop()) {
                const options = {
                    offset: -this.headerHeight
                };
                this.$scrollTo(
                    document.querySelector('.Visit-inner'),
                    500,
                    options
                );
            }
        },

        onScrollParallax() {
            if (!this.$refs.ad.$el.classList.contains('isClose')) {
                const currentPosition = window.pageYOffset - this.heroHeight;
                const speed = this.heroHeight / 9;
                let movement = 0;

                if (currentPosition >= 0)
                    movement = (currentPosition / speed) * this.adHeight;

                this.$refs.ad.$el.style.transform = `translate3d(0, ${movement}px, 0)`;
            }
        },

        getIndex(index) {
            this.index = index;
        },

        checkClose(isClose) {
            this.isCloseAd = isClose;
        },

        toggleClosePopup(isClose) {
            this.isClosePopup = isClose;
        },

        ...mapMutations({
            changeTheme: 'changeTheme'
        })
    }
};
</script>

<style lang="scss" scoped>
.Visit {
    $component: &;

    margin-top: -1px;

    &-wrapper {
        @include tablet {
            margin-top: -1px;
        }

        @include mobile {
            margin-top: -1px;
        }
    }

    &-inner {
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-end;
        margin-bottom: -1px;
        border-top: 1px solid $c-black;
        position: relative;
    }

    &::v-deep .CommonHero-title {
        @include tablet {
            width: 45%;
        }

        @include mobile {
            width: 55%;
        }
    }
}
</style>
