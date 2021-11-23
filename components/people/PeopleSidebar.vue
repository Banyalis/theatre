<template>
    <div class="PeopleSidebar">
        <div class="PeopleSidebar-header">
            <div class="PeopleSidebar-title" v-text="sidebar.title"></div>
            <p class="PeopleSidebar-text" v-text="sidebar.text"></p>
            <RoundedButton
                class="PeopleSidebar-button"
                type="isRed"
                :link="{
                    url: '/about/opera',
                    title: 'О программе'
                }"
            />
        </div>
        <div class="PeopleSidebar-footer">
            <div class="PeopleSidebar-caption" v-text="sidebar.caption"></div>
            <div class="PeopleSidebar-logo">
                <img src="~assets/images/people/partner.png" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { isDesktopMedium } from '@/utils/utils';
import RoundedButton from '@/components/other/RoundedButton';

export default {
    name: 'PeopleSidebar',

    components: {
        RoundedButton
    },

    props: {
        sidebar: {
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
            if (isDesktopMedium()) {
                this.$el.style.top = `${this.headerHeight - 1}px`;
                this.$el.style.height = `${
                    window.innerHeight - this.headerHeight
                }px`;
            } else {
                this.$el.removeAttribute('style');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.PeopleSidebar {
    $component: &;

    position: sticky;
    display: flex;
    flex-direction: column;
    border-top: 1px solid $c-black;

    @include desktop--large {
        width: (640 * 100% / 1920);
        padding: scaling(36) scaling(32);
    }

    @include desktop {
        width: (480 * 100% / 1440);
        padding: scaling(28) scaling(24);
    }

    @include desktop--small {
        flex-direction: row;
        align-items: center;
        padding: scaling(24) scaling(20);
    }

    @include laptop {
        flex-direction: row;
        align-items: center;
        padding: scaling(24) scaling(16);
    }

    @include tablet {
        flex-direction: row;
        align-items: center;
        padding: scaling(20) scaling(16);
    }

    @include mobile {
        padding: scaling(32) scaling(16);
    }

    &-header {
        flex: 1;
    }

    &-title {
        margin-bottom: scaling(32);
        font-size: scaling(20);
        line-height: $lh-130;
        letter-spacing: 0.02em;
        text-transform: uppercase;
        font-feature-settings: 'ss02' on;

        @include desktop--large {
            margin-bottom: scaling(64);
            font-size: scaling(36);
            letter-spacing: 0;
        }

        @include desktop {
            margin-bottom: scaling(48);
            font-size: scaling(28);
            letter-spacing: 0;
        }

        @include desktop--small {
            margin-bottom: scaling(40);
            font-size: scaling(24);
            line-height: $lh-110;
            letter-spacing: 0;
        }

        @include mobile {
            margin-bottom: scaling(12);
        }
    }

    &-text {
        border-bottom: 1px solid #c4c4c4;
        font-size: scaling(14);
        line-height: $lh-140;
        font-family: $family-graphic;

        @include desktop--large {
            margin-bottom: scaling(32);
            padding-bottom: scaling(32);
            font-size: scaling(24);
        }

        @include desktop {
            margin-bottom: scaling(24);
            padding-bottom: scaling(24);
            font-size: scaling(18);
        }

        @include desktop--small {
            margin-bottom: scaling(40);
            padding-bottom: scaling(20);
            line-height: $lh-150;
        }

        @include laptop {
            margin-bottom: scaling(16);
            padding-bottom: scaling(32);
            line-height: $lh-150;
        }

        @include tablet {
            margin-bottom: scaling(32);
            padding-bottom: scaling(16);
            line-height: $lh-160;
        }

        @include mobile {
            margin-bottom: scaling(16);
            padding-bottom: scaling(24);
            line-height: $lh-130;
        }
    }

    &-button {
        display: inline-flex;
    }

    &-footer {
        @include desktop--small {
            width: (200 * 100% / 1200);
            margin-left: scaling(45);
        }

        @include laptop {
            width: (208 * 100% / 960);
            margin-left: scaling(32);
        }

        @include tablet {
            width: (190 * 100% / 768);
            margin-left: scaling(25);
        }
    }

    &-caption {
        margin-bottom: scaling(16);
        font-size: scaling(14);
        line-height: $lh-130;
        font-family: $family-graphic;

        @include desktop--large {
            max-width: scaling(302);
            margin-bottom: scaling(17);
            font-size: scaling(20);
        }

        @include desktop {
            max-width: scaling(296);
            line-height: $lh-150;
        }

        @include desktop--small {
            margin-bottom: scaling(20);
        }

        @include tablet {
            margin-bottom: 0;
            margin-right: scaling(10);
            font-size: scaling(12);
            line-height: $lh-140;
        }

        @include mobile {
            margin: scaling(81) 0 scaling(8);
        }
    }

    &-logo {
        max-width: scaling(85);

        @include desktop--large {
            max-width: scaling(135);
        }

        @include desktop {
            max-width: scaling(105);
        }

        @include tablet {
            max-width: scaling(75);
        }

        @include mobile {
            max-width: scaling(65);
        }

        img {
            @include m-objectFit;

            width: 100%;
            height: 100%;
        }
    }
}
</style>
