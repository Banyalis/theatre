import Vue from 'vue';
import { DateTime } from 'luxon';

Vue.mixin({
    methods: {
        // Format ISO Date
        formatDate(date, format) {
            return DateTime.fromISO(date, { locale: 'ru' }).toFormat(format);
        }
    }
});
