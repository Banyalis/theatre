<template>
    <div class="AboutListeningAside">
        <div class="AboutListeningAside-group">
            <div class="AboutListeningAside-head">Актуальные</div>
            <div class="AboutListeningAside-items">
                <NuxtLink
                    :to="`/about/listening/listening-0`"
                    class="AboutListeningAside-item"
                >
                    <div class="AboutListeningAside-itemTitle">
                        Конкурс в хор на замещение вакантной должности
                        хормейстера
                    </div>
                    <div class="AboutListeningAside-itemCaption">
                        Доступны итоги I тура
                    </div>
                    <div class="AboutListeningAside-itemDate">
                        1–6 октября, 2020
                    </div>
                </NuxtLink>
                <NuxtLink
                    :to="`/about/listening/listening-1`"
                    class="AboutListeningAside-item"
                >
                    <div class="AboutListeningAside-itemTitle">
                        Конкурс на замещение вакантной должности концертмейстера
                        балета
                    </div>
                    <div class="AboutListeningAside-itemDate">
                        1–6 октября, 2020
                    </div>
                </NuxtLink>
                <NuxtLink
                    :to="`/about/listening/listening-2`"
                    class="AboutListeningAside-item"
                >
                    <div class="AboutListeningAside-itemTitle">
                        Конкурс в хор на замещение вакантной должности
                        хормейстера
                    </div>
                    <div class="AboutListeningAside-itemDate">
                        1—6 октября, 2020
                    </div>
                </NuxtLink>
            </div>
        </div>
        <div class="AboutListeningAside-group">
            <div class="AboutListeningAside-head">Архив</div>
            <div class="AboutListeningAside-items">
                <NuxtLink
                    :to="`/about/listening/listening-3`"
                    class="AboutListeningAside-item"
                >
                    <div class="AboutListeningAside-itemTitle">
                        Конкурс в хор на замещение вакантной должности
                        хормейстера
                    </div>
                    <div class="AboutListeningAside-itemDate">
                        3—5 августа 2019
                    </div>
                </NuxtLink>
                <NuxtLink
                    :to="`/about/listening/listening-4`"
                    class="AboutListeningAside-item"
                >
                    <div class="AboutListeningAside-itemTitle">
                        Конкурс в симфонический оркестр
                    </div>
                    <div class="AboutListeningAside-itemDate">
                        3—5 августа 2019
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AboutListeningAside'
};
</script>

<style lang="scss" scoped>
.AboutListeningAside {
    $component: &;

    &-group {
        border-bottom: 1px solid $c-black;

        &:last-child {
            border-bottom: none;
        }
    }

    &-head {
        @include heading-label;

        text-align: center;
        border-bottom: 1px solid $c-black;
        padding: scaling(32) 0 scaling(16);
        background-color: $c-white;
        z-index: $z-two;

        @include desktop--large {
            padding: scaling(64) scaling(40) scaling(32);
        }

        @include desktop {
            padding: scaling(48) scaling(30) scaling(24);
        }

        @include desktop--small {
            padding: scaling(40) 0 scaling(20);
        }
    }

    &-items {
        display: flex;
        flex-wrap: wrap;
    }

    &-item {
        display: block;
        border-bottom: 1px solid $c-black;

        &.nuxt-link-active {
            background-color: $c-black;
            pointer-events: none;
            color: $c-white;

            #{$component}-itemTitle {
                color: $c-white;
            }
        }

        @include desktop--large {
            padding: scaling(28) scaling(32);
        }

        @include desktop {
            padding: scaling(20) scaling(16) scaling(24);
        }

        @include desktop--small {
            padding: scaling(20);
        }

        @include laptop {
            padding: scaling(20) scaling(16);
        }

        @include tablet {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            width: (256 * 100%) / 768;
            padding: scaling(16);
            border: none;
            box-shadow: 0 0 0 0.5px $c-black;
        }

        @include mobile {
            width: 100%;
            padding: scaling(16) scaling(48) scaling(16) scaling(16);
        }

        &:last-child {
            border-bottom: none;
        }

        &Title {
            @include body-2;

            color: $c-black;
            margin-bottom: scaling(8);

            @include desktop--large {
                margin-bottom: scaling(16);
            }

            @include desktop {
                margin-bottom: scaling(12);
            }

            @include desktop--small {
                margin-bottom: scaling(12);
            }
        }

        &Caption {
            @include button-text;

            color: $c-gold--lighten;
        }

        &Date {
            @include text;

            margin-top: scaling(40);
            color: $c-gray;

            @include desktop--small {
                margin-top: scaling(36);
            }

            @include laptop {
                margin-top: scaling(32);
            }

            @include mobile {
                margin-top: scaling(36);
            }
        }
    }
}
</style>
