// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,

    API_CLIENTE: {
        URL: 'http://localhost:8081',
        CONTENT_TYPE: 'application/json'
    },

    API_UF: {
        URL: 'http://localhost:8083',
        CONTENT_TYPE: 'application/json'
    },

    API_CNPJ: {
        URL: 'https://www.receitaws.com.br/v1/cnpj/',
        CONTENT_TYPE: 'application/json',
        ACCEPT: '*/*'
    },

    API_CEP: {
        URL: 'https://webmaniabr.com/api/1/cep/',
        CONTENT_TYPE: 'application/json',
        APP_KEY: '/?app_key=MXjyVuowlRxpvJ2ESKhasqQ3Z2yc1opV',
        APP_SECRET: '&app_secret=YeRnuEIW8Ug63iVuhr6t1whrfCRQEGEvHl0KCRdFcaym71Dt'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
