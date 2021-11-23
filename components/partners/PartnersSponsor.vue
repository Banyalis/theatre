<template>
    <div class="PartnersSponsor">
        <div class="PartnersSponsor-content">
            <PartnersHead ref="head" :head="content.head" />
            <PartnersContent :content="content.content" :modifier="`sponsor`" />
        </div>
        <div ref="sidebar" class="PartnersSponsor-sidebar">
            <PartnersSponsorThanks />
            <PartnersContacts
                :contacts="content.contacts"
                :modifier="`sponsor`"
            />
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { isDesktopSmall } from '~/utils/utils';
import PartnersHead from '~/components/partners/PartnersHead';
import PartnersContent from '~/components/partners/PartnersContent';
import PartnersSponsorThanks from '~/components/partners/PartnersSponsorThanks';
import PartnersContacts from '~/components/partners/PartnersContacts';

export default {
    name: 'PartnersSponsor',

    components: {
        PartnersHead,
        PartnersContent,
        PartnersSponsorThanks,
        PartnersContacts
    },

    props: {
        content: {
            type: Object,
            required: true
        }
    },

    computed: {
        ...mapState(['headerHeight'])
    },

    mounted() {
        window.addEventListener('resize', this.onResize);
        this.$nextTick(this.onResize);
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        onResize() {
            this.sidebarHeight = this.$refs.sidebar.offsetHeight;
            this.getTopIndent = this.$refs.head.$el.offsetHeight;

            this.setTopIndentSidebar();
        },

        setTopIndentSidebar() {
            if (isDesktopSmall()) {
                this.$refs.head.$el.removeAttribute('style');
                this.$refs.sidebar.style.top = `${this.headerHeight}px`;
                this.$refs.sidebar.style.height =
                    window.innerHeight - this.headerHeight + 'px';
            } else {
                this.$refs.head.$el.style.marginBottom = `${this.sidebarHeight}px`;
                this.$refs.sidebar.style.top = `${this.getTopIndent}px`;
                this.$refs.sidebar.style.height = 'auto';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersSponsor {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    position: relative;

    &-content {
        width: 100%;

        @include desktop--large {
            width: (1280 * 100% / 1920);
            border-right: 1px solid $c-black;
        }

        @include desktop {
            width: (960 * 100% / 1440);
            border-right: 1px solid $c-black;
        }

        @include desktop--small {
            width: (800 * 100% / 1200);
            border-right: 1px solid $c-black;
        }
    }

    &-sidebar {
        position: absolute;
        display: flex;
        flex-direction: column-reverse;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }

        @include desktop--large {
            flex-direction: column;
            width: (640 * 100% / 1920);
            position: sticky;
            overflow-y: auto;
        }

        @include desktop {
            flex-direction: column;
            width: (480 * 100% / 1440);
            position: sticky;
            overflow-y: auto;
        }

        @include desktop--small {
            flex-direction: column;
            width: (400 * 100% / 1200);
            position: sticky;
            overflow-y: auto;
        }
    }
}
</style>
