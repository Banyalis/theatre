<template>
    <div class="PartnersAdvice">
        <div class="PartnersAdvice-inner">
            <div class="PartnersAdvice-content">
                <PartnersHead :head="content.head" />
                <PartnersContent :content="content.content" />
            </div>
            <div ref="sidebar" class="PartnersAdvice-sidebar">
                <PartnersMembers :members="content.members" />
            </div>
        </div>
        <PartnersAdviceStructure :structure="content.structure" />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { isDesktopSmall } from '~/utils/utils';
import PartnersHead from '~/components/partners/PartnersHead';
import PartnersContent from '~/components/partners/PartnersContent';
import PartnersMembers from '~/components/partners/PartnersMembers';
import PartnersAdviceStructure from '~/components/partners/PartnersAdviceStructure';

export default {
    name: 'PartnersAdvice',

    components: {
        PartnersHead,
        PartnersContent,
        PartnersMembers,
        PartnersAdviceStructure
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

    methods: {
        onResize() {
            if (isDesktopSmall()) {
                this.$refs.sidebar.style.top = `${this.headerHeight}px`;
                this.$refs.sidebar.style.height =
                    window.innerHeight - this.headerHeight + 'px';
            } else {
                this.$refs.sidebar.removeAttribute('style');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersAdvice {
    $component: &;

    &-inner {
        display: flex;
        flex-wrap: wrap;
    }

    &-content {
        width: 100%;

        @include desktop--large {
            width: (1440 * 100% / 1920);
            border-right: 1px solid $c-black;
        }

        @include desktop {
            width: (1080 * 100% / 1440);
            border-right: 1px solid $c-black;
        }

        @include desktop--small {
            width: (900 * 100% / 1200);
            border-right: 1px solid $c-black;
        }
    }

    &-sidebar {
        position: sticky;
        display: none;
        background-color: $c-gray-95;
        overflow-y: auto;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }

        @include desktop--large {
            display: block;
            width: (480 * 100% / 1920);
            padding: scaling(100) scaling(32);
        }

        @include desktop {
            display: block;
            width: (360 * 100% / 1440);
            padding: scaling(80) scaling(24);
        }

        @include desktop--small {
            display: block;
            width: (300 * 100% / 1200);
            padding: scaling(60) scaling(20);
        }
    }
}
</style>
