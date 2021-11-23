<template>
    <div class="AboutDocumentsAside">
        <div class="AboutDocumentsAside-list">
            <div
                v-for="(item, index) in menu"
                :key="index"
                class="AboutDocumentsAside-listItem"
            >
                <div
                    v-if="!item.redirect"
                    ref="menuItem"
                    class="AboutDocumentsAside-listItemWrapper"
                    @click="openDocument"
                >
                    <NuxtLink
                        class="AboutDocumentsAside-listItemInner"
                        :to="item.url"
                    >
                        <span
                            class="AboutDocumentsAside-listItemNumber"
                            v-text="index + 1"
                        ></span>
                        <span
                            class="AboutDocumentsAside-listItemTitle"
                            v-text="item.title"
                        ></span>
                    </NuxtLink>
                </div>
                <div
                    v-if="!!getFirstVisitUrl && item.redirect"
                    class="AboutDocumentsAside-listItemInner"
                    @click="redirectToVisit"
                >
                    <span
                        class="AboutDocumentsAside-listItemNumber"
                        v-text="index + 1"
                    ></span>
                    <span
                        class="AboutDocumentsAside-listItemTitle"
                        v-text="item.title"
                    ></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { isLaptop } from '@/utils/utils';

export default {
    name: 'AboutDocumentsAside',

    data() {
        return {
            menu: [
                {
                    url: '/about/documents/anticorruption',
                    title: 'Противодействие коррупции'
                },
                {
                    url: '/about/documents/buhdoc',
                    title: 'Документы бухгалтерского учета'
                },
                {
                    url: '/about/documents/work-conditions',
                    title: 'Специальная оценка условий труда'
                },
                {
                    url: '/about/documents/ticket-sales-rules',
                    title: 'Правила продажи билетов'
                },
                {
                    url: '/about/documents/temporary-restrictions',
                    title: 'Временные ограничения'
                },
                {
                    url: '/about/documents/privacy-policy',
                    title: 'Политика конфиденциальности'
                },
                {
                    url: '/about/documents/provision',
                    title: 'Положение о молодёжной балетной программе'
                },
                // {
                //     url: '/about/documents/excursions',
                //     title: 'Правила продажи электронных билетов на экскурсии'
                // },
                // {
                //     url: '/about/documents/buyingnew',
                //     title: 'Правила продажи и использования электронных билетов'
                // },
                {
                    url: '/about/documents/security-service-regulations',
                    title: 'Регламент работы службы охраны'
                }
            ]
        };
    },

    computed: {
        getFirstVisitUrl() {
            return this.categories[0]?.items[0]?.slug;
        },

        ...mapState(['headerHeight']),
        ...mapState('visit', ['categories'])
    },

    mounted() {
        this.$refs.menuItem.forEach((item) => {
            if (item.children[0].classList.contains('nuxt-link-active')) {
                item.classList.add('isActive');
            }
        });
    },

    destroyed() {
        window.removeEventListener('resize', this.onResize);
    },

    methods: {
        openDocument() {
            if (!isLaptop()) {
                const options = {
                    offset: -this.headerHeight + 1
                };

                this.$scrollTo(
                    document.querySelector('.CommonNavPage'),
                    500,
                    options
                );
            } else {
                setTimeout(() => {
                    window.addEventListener('resize', this.onResize);
                    this.$nextTick(this.onResize);
                    this.$emit('toggle-close-document', false);
                }, 300);
            }
        },

        redirectToVisit() {
            this.$router.push(
                this.localePath(`/visit/${this.getFirstVisitUrl}`)
            );
        },

        onResize() {
            if (isLaptop()) {
                this.blockScroll();
            } else {
                this.unblockScroll();
            }
        },

        ...mapMutations(['blockScroll', 'unblockScroll'])
    }
};
</script>

<style lang="scss" scoped>
.AboutDocumentsAside {
    $component: &;

    @include m-scrollbarHidden;

    width: 100%;

    @include desktop--large {
        position: sticky;
        top: scaling(96);
        max-height: calc(100vh - #{scaling(96)});
        overflow-y: auto;
    }

    @include desktop {
        position: sticky;
        top: scaling(72);
        max-height: calc(100vh - #{scaling(72)});
        overflow-y: auto;
    }

    @include desktop--small {
        position: sticky;
        top: scaling(60);
        max-height: calc(100vh - #{scaling(60)});
        overflow-y: auto;
    }

    @include laptop {
        position: sticky;
        top: scaling(64);
        max-height: calc(100vh - #{scaling(64)});
        overflow-y: auto;
    }

    &-list {
        display: flex;
        flex-wrap: wrap;

        @include tablet {
            margin: 0 -1px -1px 0;
        }

        &Item {
            width: 100%;

            @include tablet {
                width: calc(100% / 3);
            }

            &:last-child #{$component}-listItemInner {
                border-bottom: none;
            }

            &Wrapper {
                height: 100%;

                &.isActive {
                    pointer-events: none;

                    @include tablet {
                        pointer-events: all;
                    }

                    @include mobile {
                        pointer-events: all;
                    }
                }
            }

            &Inner {
                display: block;
                height: 100%;
                padding: scaling(20) scaling(16);
                border-bottom: 1px solid $c-black;
                background-color: $c-white;
                cursor: pointer;
                transition: background-color $d-hover ease-in-out;

                @include desktop--large {
                    padding: scaling(24) scaling(32);
                }

                @include desktop {
                    padding: scaling(20) scaling(24);
                }

                @include desktop--small {
                    padding: scaling(16) scaling(20);
                }

                @include laptop {
                    padding: scaling(12) scaling(16);
                }

                @include tablet {
                    border-right: 1px solid $c-black;
                }

                @include hover {
                    &:hover {
                        background-color: $c-black !important;

                        #{$component}-listItemTitle {
                            color: $c-white !important;
                        }
                    }
                }

                &.nuxt-link-active {
                    background-color: $c-black;
                    pointer-events: none;

                    @include tablet {
                        background-color: $c-white;
                        pointer-events: all;
                    }

                    @include mobile {
                        background-color: $c-white;
                        pointer-events: all;
                    }
                }
            }

            &Number {
                display: none;
                align-items: center;
                justify-content: center;
                width: scaling(29);
                height: scaling(29);
                border: 1px solid $c-gold--lighten;
                border-radius: 50%;
                color: $c-gold--lighten;
                font-size: scaling(14);
                line-height: $lh-120;
                letter-spacing: 0.05em;
                font-feature-settings: 'ss02' on;

                @include tablet {
                    display: flex;
                    margin-bottom: scaling(63);
                }

                @include mobile {
                    display: flex;
                    margin-bottom: scaling(40);
                }
            }

            &Title {
                color: $c-black;
                font-size: scaling(14);
                line-height: $lh-140;
                font-family: $family-graphic;
                transition: color $d-hover ease-in-out;

                @include desktop--large {
                    font-size: scaling(20);
                    line-height: $lh-170;
                }

                @include desktop {
                    font-size: scaling(18);
                    line-height: $lh-160;
                }

                @include desktop--small {
                    line-height: $lh-160;
                }

                @include tablet {
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    font-weight: $fw-bold;
                    font-family: $family-apoc;
                }

                @include mobile {
                    display: block;
                    width: scaling(200);
                    letter-spacing: 0.05em;
                    text-transform: uppercase;
                    font-weight: $fw-bold;
                    font-family: $family-apoc;
                }

                #{$component}-listItemInner.nuxt-link-active & {
                    color: $c-white;

                    @include tablet {
                        color: $c-black;
                    }

                    @include mobile {
                        color: $c-black;
                    }
                }
            }
        }
    }
}
</style>
