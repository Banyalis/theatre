<template>
    <div
        class="AboutBuildingSectionContentHint"
        :class="[
            insert.hint.centered ? `isCentered` : '',
            insert.full ? 'isFull' : ''
        ]"
    >
        <div
            v-if="insert.hint.subtitle"
            class="AboutBuildingSectionContentHint-subtitle"
            v-text="insert.hint.subtitle"
        ></div>
        <div
            v-if="insert.hint.title"
            class="AboutBuildingSectionContentHint-title"
            v-text="insert.hint.title"
        ></div>
        <div
            v-if="insert.hint.member"
            class="AboutBuildingSectionContentHint-member"
        >
            <div class="AboutBuildingSectionContentHint-memberImage">
                <img :src="insert.hint.member.image" alt="" />
            </div>
            <div
                class="AboutBuildingSectionContentHint-memberName"
                v-text="insert.hint.member.name"
            ></div>
        </div>
        <p
            v-if="insert.hint.text"
            class="AboutBuildingSectionContentHint-text"
            v-text="insert.hint.text"
        ></p>
        <div
            v-if="insert.hint.icon"
            class="AboutBuildingSectionContentHint-icon"
        >
            <svg-icon name="icon-fire" />
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutBuildingSectionContentHint',

    props: {
        insert: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutBuildingSectionContentHint {
    $component: &;

    position: static;
    top: 0;
    left: 100%;
    margin: scaling(32) 0;
    padding-top: scaling(20);
    padding-bottom: scaling(20);
    border-top: 1px solid rgba($c-gray-80, 0.5);
    border-bottom: 1px solid rgba($c-gray-80, 0.5);
    z-index: 10;

    @include desktop--large {
        position: absolute;
        width: scaling(416);
        margin: 0 0 0 scaling(32);
        padding-top: 0;
        padding-bottom: scaling(40);
        border-top: none;
        border-bottom-color: $c-gray--header;
    }

    @include desktop {
        position: absolute;
        width: scaling(312);
        margin: 0 0 0 scaling(24);
        padding-top: 0;
        padding-bottom: scaling(32);
        border-top: none;
        border-bottom-color: $c-gray--header;
    }

    @include desktop--small {
        position: absolute;
        width: scaling(260);
        margin: 0 0 0 scaling(20);
        padding-top: 0;
        padding-bottom: scaling(28);
        border-top: none;
        border-bottom-color: $c-gray--header;
    }

    &.isCentered {
        @include desktop--large {
            text-align: center;
        }

        @include desktop {
            text-align: center;
        }

        @include desktop--small {
            text-align: center;
        }
    }

    &.isFull {
        @include laptop {
            margin: scaling(32) scaling(112);
        }

        @include tablet {
            margin: scaling(32) scaling(112);
        }

        @include mobile {
            margin: scaling(32) scaling(16);
        }
    }

    &-subtitle {
        margin-bottom: scaling(8);
        color: $c-gold;
        font-size: scaling(12);
        line-height: $lh-160;
        letter-spacing: 0.05em;
        text-transform: uppercase;
        font-weight: $fw-medium;
        font-family: $family-graphic;

        @include desktop--large {
            margin-bottom: scaling(24);
            color: $c-black;
            font-size: scaling(20);
        }

        @include desktop {
            margin-bottom: scaling(20);
            color: $c-black;
            font-size: scaling(18);
            line-height: $lh-140;
        }

        @include desktop--small {
            margin-bottom: scaling(16);
            color: $c-black;
            font-size: scaling(14);
        }
    }

    &-title {
        color: $c-gray;
        font-size: scaling(14);
        line-height: $lh-160;
        font-family: $family-graphic;
        font-feature-settings: 'cpsp' on;

        @include desktop--large {
            color: $c-white;
            font-size: scaling(32);
            line-height: $lh-130;
            font-family: $family-apoc;
        }

        @include desktop {
            color: $c-white;
            font-size: scaling(26);
            line-height: $lh-130;
            font-family: $family-apoc;
        }

        @include desktop--small {
            color: $c-white;
            font-size: scaling(20);
            line-height: $lh-130;
            font-family: $family-apoc;
        }
    }

    &-text {
        color: $c-gray;
        font-size: scaling(14);
        line-height: $lh-160;
        font-family: $family-graphic;

        @include desktop--large {
            color: $c-gray--header;
            font-size: scaling(20);
            line-height: $lh-150;
        }

        @include desktop {
            color: $c-gray--header;
            font-size: scaling(18);
        }

        @include desktop--small {
            color: $c-gray--header;
        }
    }

    &-member {
        display: flex;
        flex-direction: column;
        align-items: center;

        @include laptop {
            flex-direction: row;
            margin-bottom: scaling(12);
        }

        @include tablet {
            flex-direction: row;
            margin-bottom: scaling(12);
        }

        @include mobile {
            flex-direction: row;
            margin-bottom: scaling(8);
        }

        &Image {
            width: scaling(32);
            height: scaling(32);
            margin-right: scaling(15);
            border-radius: 100%;

            @include desktop--large {
                width: scaling(160);
                height: scaling(160);
                margin-right: 0;
                padding: scaling(8);
                border: 1px solid $c-black;
            }

            @include desktop {
                width: scaling(128);
                height: scaling(128);
                margin-right: 0;
                padding: scaling(6);
                border: 1px solid $c-black;
            }

            @include desktop--small {
                width: scaling(112);
                height: scaling(112);
                margin-right: 0;
                padding: scaling(5);
                border: 1px solid $c-black;
            }

            @include mobile {
                margin-right: scaling(12);
            }

            img {
                @include m-objectFit;

                width: 100%;
                height: 100%;
            }
        }

        &Name {
            color: $c-gold;
            font-size: scaling(12);
            line-height: $lh-160;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-family: $family-graphic;
            font-feature-settings: 'ss02' on;

            @include desktop--large {
                margin: scaling(44) 0 scaling(32);
                color: $c-white;
                font-size: scaling(40);
                line-height: $lh-120;
                letter-spacing: 0.02em;
                text-transform: capitalize;
                font-family: $family-apoc;
            }

            @include desktop {
                margin: scaling(40) 0 scaling(28);
                color: $c-white;
                font-size: scaling(32);
                line-height: $lh-120;
                letter-spacing: 0.02em;
                text-transform: capitalize;
                font-family: $family-apoc;
            }

            @include desktop--small {
                margin: scaling(36) 0 scaling(24);
                color: $c-white;
                font-size: scaling(28);
                line-height: $lh-120;
                letter-spacing: 0.02em;
                text-transform: capitalize;
                font-family: $family-apoc;
            }
        }
    }

    &-icon {
        position: absolute;
        right: 0;
        bottom: 0;
        display: none;

        @include desktop--large {
            display: block;
            width: scaling(255);
            height: scaling(296);
        }

        @include desktop {
            display: block;
            width: scaling(177);
            height: scaling(205);
        }

        @include desktop--small {
            display: block;
            width: scaling(136);
            height: scaling(158);
        }

        svg {
            width: 100%;
            height: 100%;
        }
    }
}
</style>
