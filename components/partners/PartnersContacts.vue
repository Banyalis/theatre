<template>
    <div
        class="PartnersContacts"
        :class="[modifier ? `PartnersContacts--${modifier}` : '']"
    >
        <div
            v-for="(item, index) in contacts"
            :key="index"
            class="PartnersContacts-item"
        >
            <div class="PartnersContacts-itemTitle" v-text="item.title"></div>
            <a
                v-if="item.phone"
                :href="`tel: ${item.phone}`"
                class="PartnersContacts-itemPhone"
                v-text="item.phone"
            ></a>
            <a
                v-if="item.email"
                :href="`mailto: ${item.email}`"
                class="PartnersContacts-itemEmail"
                v-text="item.email"
            ></a>
            <p
                v-if="item.address"
                class="PartnersContacts-itemAddress"
                v-text="item.address"
            ></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PartnersContacts',

    props: {
        contacts: {
            type: Array,
            required: true
        },
        modifier: {
            type: String,
            default: ''
        }
    }
};
</script>

<style lang="scss" scoped>
.PartnersContacts {
    $component: &;

    display: grid;
    grid-template-columns: repeat(3, 1fr);

    @include mobile {
        grid-template-columns: repeat(1, 1fr);
    }

    &--sponsor {
        grid-template-columns: repeat(1, 1fr);
        flex-shrink: 0;

        @include laptop {
            grid-template-columns: repeat(3, 1fr);
            border-bottom: 1px solid $c-black;
        }

        @include tablet {
            grid-template-columns: repeat(3, 1fr);
            border-bottom: 1px solid $c-black;
        }

        @include mobile {
            border-bottom: 1px solid $c-black;
        }
    }

    &-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        padding: scaling(16) scaling(16) scaling(20);

        @include desktop--large {
            padding: scaling(32) scaling(32) scaling(36);
        }

        @include desktop {
            padding: scaling(24) scaling(24) scaling(28);
        }

        @include desktop--small {
            padding: scaling(20) scaling(20) scaling(24);
        }

        &:not(:nth-child(3n + 3)) {
            border-right: 1px solid $c-black;

            @include mobile {
                border-right: none;
            }

            #{$component}--sponsor & {
                @include laptop {
                    border-right: 1px solid $c-black;
                }

                @include tablet {
                    border-right: 1px solid $c-black;
                }
            }
        }

        &:not(:last-child) {
            @include mobile {
                border-bottom: 1px solid $c-black;
            }
        }

        #{$component}--sponsor & {
            border-right: none;
            border-bottom: 1px solid $c-black;

            @include laptop {
                border-bottom: none;
            }

            @include tablet {
                border-bottom: none;
            }

            &:last-child {
                border-bottom: none;
            }
        }

        &Title {
            margin-bottom: scaling(59);
            color: $c-gray;
            font-size: scaling(14);
            line-height: $lh-150;
            font-family: $family-graphic;

            @include desktop--large {
                margin-bottom: scaling(68);
                font-size: scaling(24);
            }

            @include desktop {
                margin-bottom: scaling(57);
                font-size: scaling(18);
                line-height: $lh-140;
            }

            @include desktop--small {
                margin-bottom: scaling(51);
            }

            @include mobile {
                margin-bottom: scaling(42);
                line-height: $lh-130;
            }

            #{$component}--sponsor & {
                @include desktop {
                    margin-bottom: scaling(52);
                }

                @include desktop--small {
                    margin-bottom: scaling(44);
                }
            }
        }

        &Email,
        &Phone,
        &Address {
            font-size: scaling(20);
            line-height: $lh-110;
            font-weight: $fw-bold;
            font-feature-settings: 'ss02' on;

            @include desktop--large {
                font-size: scaling(32);
                line-height: $lh-130;
            }

            @include desktop {
                font-size: scaling(26);
            }

            @include tablet {
                font-size: scaling(18);
            }
        }

        &Email,
        &Phone {
            color: $c-black;
            transition: color $d-hover ease-in-out;

            @include hover {
                &:hover {
                    color: $c-red;
                }
            }
        }
    }
}
</style>
