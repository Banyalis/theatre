<template>
    <div
        class="AboutContactsTextCard b-scaled-paddings"
        :class="`AboutContactsTextCard--${mod}`"
    >
        <div class="AboutContactsTextCard-content">
            <div class="AboutContactsTextCard-title" v-text="card.title"></div>
            <div v-if="card.contacts" class="AboutContactsTextCard-items">
                <div
                    v-for="(column, columnUndex) in card.contacts"
                    :key="columnUndex"
                    class="AboutContactsTextCard-column"
                    :class="{ isOneColumn: card.contacts.length === 1 }"
                >
                    <div
                        v-for="(row, rowIndex) in column.rows"
                        :key="rowIndex"
                        class="AboutContactsTextCard-row"
                        :class="{ isSmall: row.small }"
                    >
                        <div
                            v-for="(contact, contactIndex) in row.items"
                            :key="contactIndex"
                            class="AboutContactsTextCard-item"
                        >
                            <div
                                v-if="contact.caption"
                                class="AboutContactsTextCard-itemCaption"
                                v-text="contact.caption"
                            ></div>
                            <a
                                v-if="contact.type === 'phone'"
                                :href="`tel:` + contact.title"
                                class="AboutContactsTextCard-itemTitle"
                                v-text="contact.title"
                            ></a>
                            <a
                                v-if="contact.type === 'mail'"
                                :href="`mailto:` + contact.title"
                                class="AboutContactsTextCard-itemTitle"
                                v-text="contact.title"
                            ></a>
                            <div
                                v-if="!contact.type"
                                class="AboutContactsTextCard-itemTitle"
                                v-text="contact.title"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutContactsTextCard',

    props: {
        mod: {
            type: String,
            default: 'default'
        },

        card: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutContactsTextCard {
    $component: &;

    height: 100%;
    width: 100%;
    padding-top: scaling(32);
    padding-bottom: scaling(36);

    &--default {
        background-color: $c-white;
    }

    &--gold {
        background-color: $c-gold--lighten;

        #{$component}-row {
            border-bottom-color: rgba(0, 0, 0, 0.3);
        }

        #{$component}-column {
            border-bottom-color: rgba(0, 0, 0, 0.3);
        }
    }

    &-content {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    &-title {
        @include heading-4;

        margin-bottom: scaling(48);
        white-space: pre-line;

        @include desktop--large {
            margin-bottom: scaling(120);
        }

        @include desktop {
            margin-bottom: scaling(80);
        }

        @include desktop--small {
            margin-bottom: scaling(72);
        }

        @include tablet {
            margin-bottom: scaling(12);
        }
    }

    &-items {
        margin-top: auto;
        display: flex;
        align-items: flex-end;

        @include mobile {
            flex-direction: column;
        }
    }

    &-column {
        margin-right: scaling(16);
        width: 50%;

        @include desktop--large {
            margin-right: scaling(64);
        }

        @include desktop {
            margin-right: scaling(48);
        }

        @include desktop--small {
            margin-right: scaling(40);
        }

        @include mobile {
            width: 100%;
            margin-right: 0;
            border-bottom: 1px solid #e6e6e6;
            margin-bottom: scaling(16);
            padding-bottom: scaling(16);

            &:last-child {
                border-bottom: none;
                margin-bottom: 0;
                padding-bottom: 0;
            }
        }

        &:last-child {
            margin-right: 0;
        }

        &.isOneColumn {
            width: 100%;
        }
    }

    &-row {
        display: flex;
        flex-wrap: wrap;
        border-bottom: 1px solid #e6e6e6;
        padding-bottom: scaling(16);
        margin-bottom: scaling(16);

        @include desktop--large {
            padding-bottom: scaling(20);
            margin-bottom: scaling(20);
        }

        @include desktop {
            padding-bottom: scaling(20);
            margin-bottom: scaling(20);
        }

        &:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
            border-bottom: none;
        }

        &.isSmall {
            border-bottom: none;
            padding-bottom: 0;

            #{$component}-item {
                margin-right: scaling(24);

                &:last-child {
                    margin-right: 0;
                }
            }

            #{$component}-itemTitle {
                @include caption-1;
            }

            #{$component}-itemCaption {
                @include caption-1;
            }
        }
    }

    &-item {
        &Caption {
            @include body-3;

            margin-bottom: scaling(8);
            font-weight: $fw-normal;
            color: $c-black;
            opacity: 0.5;
        }

        &Title {
            color: $c-black;
            font-family: 'Apoc LC';
            font-size: scaling(20);
            line-height: $lh-110;
            transition: color $d-hover ease-in-out;

            @include desktop--large {
                font-size: scaling(32);
                line-height: $lh-110;
            }

            @include desktop {
                font-size: scaling(26);
            }

            @include hover {
                &:is(a):hover {
                    color: $c-red;
                }
            }
        }
    }
}
</style>
