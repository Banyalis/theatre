<template>
    <div
        class="CommonPopupMain"
        :class="[theme ? `CommonPopupMain--${theme}` : '']"
    >
        <CommonPopupHead
            ref="head"
            :title="customTitleDesktop"
            :title-mobile="customTitleMobile"
        />
        <div ref="mainInner" class="CommonPopupMain-inner">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { isLaptop } from '@/utils/utils';
import CommonPopupHead from '@/components/common/CommonPopupHead';

export default {
    name: 'CommonPopupMain',

    components: {
        CommonPopupHead
    },

    props: {
        theme: {
            type: String,
            default: ''
        }
    },

    computed: {
        ...mapState('popup', ['customTitleDesktop', 'customTitleMobile'])
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
            this.headHeight = this.$refs.head.$el.offsetHeight;

            this.setMainIndent();
            this.setMainHeight();
        },

        setMainIndent() {
            if (isLaptop()) {
                const sidebarHeight = document.querySelector(
                    '.CommonPopupSidebar'
                ).offsetHeight;

                this.$refs.head.$el.style.marginTop = `-${
                    this.headHeight + sidebarHeight
                }px`;
                this.$refs.mainInner.style.marginTop = `${sidebarHeight}px`;
            } else {
                this.$refs.head.$el.style.marginTop = '0';
                this.$refs.mainInner.style.marginTop = '0';
            }
        },

        setMainHeight() {
            if (!isLaptop()) {
                this.$refs.mainInner.style.height = `${
                    window.innerHeight - this.headHeight
                }px`;
            } else {
                this.$refs.mainInner.style.height = 'auto';
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.CommonPopupMain {
    $component: &;

    background-color: $c-white;

    &-inner {
        @include m-scrollbarHidden;

        overflow-y: auto;

        #{$component}--performance & {
            padding: scaling(64) scaling(64) scaling(120);

            @include desktop {
                padding: scaling(56) scaling(48) scaling(100);
            }

            @include desktop--small {
                padding: scaling(40) scaling(40) scaling(80);
            }

            @include laptop {
                padding: scaling(32) scaling(32) scaling(64);
            }

            @include tablet {
                padding: scaling(64) scaling(80) scaling(120);
            }

            @include mobile {
                padding: scaling(32) scaling(16) scaling(64);
            }
        }
    }
}
</style>
