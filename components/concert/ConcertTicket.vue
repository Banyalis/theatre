<template>
    <div class="ConcertTicket b-paddings">
        <div class="ConcertTicket-top">
            <div class="ConcertTicket-date" v-text="ticket.date"></div>
            <div class="ConcertTicket-time" v-text="ticket.time"></div>
        </div>
        <div class="ConcertTicket-bottom">
            <div
                class="ConcertTicket-text ConcertTicket-day"
                v-text="ticket.day"
            ></div>
            <div
                class="ConcertTicket-text ConcertTicket-tickets"
                v-text="ticket.ticketsAmount"
            ></div>
            <div
                class="ConcertTicket-amountRange ConcertTicket-text"
                v-text="ticket.priceRange"
            ></div>
            <div class="ConcertTicket-button">
                <RoundedButton
                    :type="ticket.button.type"
                    :link="{
                        title: ticket.button.title,
                        url: ticket.button.url,
                        isExternal: true
                    }"
                />
            </div>
        </div>
    </div>
</template>

<script>
import RoundedButton from '@/components/other/RoundedButton';

export default {
    name: 'ConcertTicket',

    components: { RoundedButton },

    props: {
        ticket: {
            type: Object,
            required: true
        }
    }
};
</script>

<style lang="scss" scoped>
.ConcertTicket {
    padding-top: scaling(20);
    padding-bottom: scaling(20);
    box-shadow: 0 1px 0 $c-black;

    @include desktop--large {
        padding-top: scaling(36);
        padding-bottom: scaling(36);
    }

    @include desktop {
        padding-top: scaling(32);
        padding-bottom: scaling(32);
    }

    @include desktop--small {
        padding-top: scaling(24);
        padding-bottom: scaling(24);
    }

    @include mobile {
        padding-top: scaling(28);
        padding-bottom: scaling(28);
    }

    &-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-bottom: scaling(12);
        margin-bottom: scaling(12);
        border-bottom: 1px solid #d6d6d6;

        @include desktop--large {
            padding-bottom: scaling(16);
            margin-bottom: scaling(16);
        }

        @include tablet {
            padding-bottom: scaling(8);
            margin-bottom: scaling(8);
        }

        @include tablet {
            padding-bottom: scaling(8);
            margin-bottom: scaling(8);
        }

        @include mobile {
            padding-bottom: 0;
            margin-bottom: scaling(4);
            border-bottom: none;
        }
    }

    &-date {
        @include title--sans;

        color: $c-red;
        text-transform: none;
    }

    &-time {
        @include title--sans;
    }

    &-bottom {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;

        @include desktop--large {
            justify-content: flex-start;
        }

        @include desktop {
            justify-content: flex-start;
        }
    }

    &-day {
        @include mobile {
            width: 50%;
            border-bottom: 1px solid #d6d6d6;
            padding-bottom: scaling(12);
            margin-bottom: scaling(12);
            font-size: scaling(12) !important;
            color: $c-gray;
        }
    }

    &-tickets {
        @include mobile {
            width: 50%;
            text-align: right;
            border-bottom: 1px solid #d6d6d6;
            padding-bottom: scaling(12);
            margin-bottom: scaling(12);
            font-size: scaling(12) !important;
            color: $c-gray;
        }
    }

    &-text {
        flex: 1;

        @include text;

        @include mobile {
            flex: unset;
        }
    }

    &-button {
        @include desktop--large {
            margin-left: auto;
        }

        @include desktop {
            margin-left: auto;
        }
    }
}
</style>
