<template>

    <div class="uk-margin uk-flex uk-flex-space-between uk-flex-wrap" data-uk-margin>
        <div data-uk-margin>

            <h2 class="uk-margin-remove">{{ 'Localization' | trans }}</h2>

        </div>
        <div data-uk-margin>

            <button class="uk-button uk-button-primary" type="submit">{{ 'Save' | trans }}</button>

        </div>
    </div>

    <div class="uk-form-row">
        <label for="form-sitelocale" class="uk-form-label">{{ 'Site Locale' | trans }}</label>
        <div class="uk-form-controls">
            <select id="form-sitelocale" class="uk-form-width-large" v-model="options.site.locale" options="locales | toOptions"></select>
        </div>
    </div>

    <div class="uk-form-row">
        <label for="form-adminlocale" class="uk-form-label">{{ 'Admin Locale' | trans }}</label>
        <div class="uk-form-controls">
            <select id="form-adminlocale" class="uk-form-width-large" v-model="options.admin.locale" options="locales | toOptions"></select>
        </div>
    </div>
    
    <div class="uk-form-row">
        <label for="form-timezone" class="uk-form-label">{{ 'Time Zone' | trans }}</label>
        <div class="uk-form-controls">
            <select id="form-timezone" class="uk-form-width-large" v-model="options.timezone" options="timezones | toOptions"></select>
        </div>
    </div>

</template>

<script>

    module.exports = {

        label: 'Localization',
        priority: 20,

        data: function() {
            return window.$system
        },

        ready: function() {

            this.options = this.$parent.$get('options.system');

        }

    };

</script>
