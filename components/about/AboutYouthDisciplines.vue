<template>
    <div class="AboutYouthDisciplines">
        <div
            class="AboutYouthDisciplines-title"
            v-text="`Учебные дисциплины`"
        ></div>
        <div
            v-for="(item, index) in disciplines"
            :key="index"
            class="AboutYouthDisciplines-item"
        >
            <div
                class="AboutYouthDisciplines-itemTitle"
                v-text="item.title"
            ></div>
            <div
                class="AboutYouthDisciplines-itemNumber"
                v-text="index + 1"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutYouthDisciplines',

    props: {
        disciplines: {
            type: Array,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.AboutYouthDisciplines {
    $component: &;

    margin-top: scaling(52);

    @include desktop--large {
        margin-top: scaling(80);
    }

    @include desktop {
        margin-top: scaling(72);
    }

    @include desktop--small {
        margin-top: scaling(64);
    }

    @include mobile {
        margin-top: scaling(40);
    }

    &-title {
        margin-bottom: scaling(24);
        font-size: scaling(24);
        line-height: $lh-150;
        letter-spacing: 0.02em;
        font-feature-settings: 'cpsp' on;

        @include desktop--large {
            margin-bottom: scaling(32);
            font-size: scaling(40);
        }

        @include desktop {
            margin-bottom: scaling(24);
            font-size: scaling(32);
        }

        @include desktop--small {
            margin-bottom: scaling(20);
            font-size: scaling(28);
        }

        @include mobile {
            margin-bottom: scaling(32);
            font-size: scaling(20);
            letter-spacing: 0;
        }
    }

    &-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: scaling(12) 0;
        border-bottom: 1px solid $c-gray-80;

        @include desktop--large {
            padding: scaling(20) 0;
        }

        @include desktop {
            padding: scaling(19) 0;
        }

        @include desktop--small {
            padding: scaling(16) 0;
        }

        &:nth-child(2) {
            border-top: 1px solid $c-gray-80;
        }

        &Title {
            font-size: scaling(12);
            line-height: $lh-160;
            letter-spacing: 0.05em;
            text-transform: uppercase;
            font-weight: $fw-medium;
            font-family: $family-graphic;

            @include desktop--large {
                font-size: scaling(20);
            }

            @include desktop {
                font-size: scaling(18);
                line-height: $lh-140;
            }

            @include desktop--small {
                font-size: scaling(14);
            }
        }

        &Number {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            width: scaling(29);
            height: scaling(29);
            margin-left: scaling(20);
            border: 1px solid $c-black;
            border-radius: 100%;
            font-size: scaling(14);
            line-height: $lh-120;
            letter-spacing: 0.05em;
            font-weight: $fw-bold;
            font-feature-settings: 'ss02' on;

            @include desktop--large {
                width: scaling(40);
                height: scaling(40);
                font-size: scaling(20);
            }

            @include desktop {
                width: scaling(34);
                height: scaling(34);
                font-size: scaling(18);
            }
        }
    }
}
</style>
