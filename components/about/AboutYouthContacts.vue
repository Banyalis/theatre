<template>
    <div class="AboutYouthContacts">
        <div
            v-for="(item, index) in contacts"
            :key="index"
            class="AboutYouthContacts-item"
        >
            <div class="AboutYouthContacts-itemTitle" v-text="item.title"></div>
            <a
                v-if="item.email"
                :href="`mailto: ${item.email}`"
                class="AboutYouthContacts-itemEmail"
                v-text="item.email"
            ></a>
            <div v-if="item.logo" class="AboutYouthContacts-itemLogo">
                <img :src="item.logo" alt="" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutYouthContacts',

    props: {
        contacts: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutYouthContacts {
    $component: &;

    display: flex;
    flex-wrap: wrap;
    margin-top: scaling(20);
    border-top: 1px solid $c-black;
    border-bottom: 1px solid $c-black;

    @include desktop--large {
        margin-top: scaling(36);
    }

    @include desktop {
        margin-top: scaling(28);
    }

    @include desktop--small {
        margin-top: scaling(24);
    }

    &-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
        width: 50%;
        height: scaling(160);
        padding: scaling(16) scaling(16) scaling(20);

        @include desktop--large {
            height: scaling(256);
            padding: scaling(32) scaling(32) scaling(36);
        }

        @include desktop {
            height: scaling(192);
            padding: scaling(24) scaling(24) scaling(28);
        }

        @include desktop--small {
            padding: scaling(20) scaling(20) scaling(24);
        }

        @include tablet {
            height: scaling(156);
        }

        @include mobile {
            width: 100%;
            height: scaling(130);
        }

        &:first-child {
            border-right: 1px solid $c-black;

            @include mobile {
                border-right: none;
                border-bottom: 1px solid $c-black;
            }
        }

        &Title {
            color: $c-gray;
            font-size: scaling(14);
            line-height: $lh-150;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(24);
            }

            @include desktop {
                font-size: scaling(18);
                line-height: $lh-140;
            }

            @include mobile {
                line-height: $lh-130;
            }
        }

        &Email {
            color: $c-red;
            font-size: scaling(20);
            line-height: $lh-110;
            font-feature-settings: 'ss02' on;
            transition: color $d-hover ease-in-out;

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

            @include hover {
                &:hover {
                    color: $c-black;
                }
            }
        }

        &Logo {
            display: flex;
            align-items: flex-end;
            width: scaling(160);
            height: scaling(37);

            @include desktop--large {
                width: scaling(235);
                height: scaling(56);
            }

            @include desktop {
                width: scaling(192);
                height: scaling(45);
            }

            @include desktop--small {
                width: scaling(180);
                height: scaling(42);
            }

            img {
                @include m-objectFit(contain, left bottom);

                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>
