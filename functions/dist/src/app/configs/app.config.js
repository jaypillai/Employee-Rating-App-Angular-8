"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
exports.APP_CONFIG = new core_1.InjectionToken('app.config');
exports.AppConfig = {
    votesLimit: 1000,
    topEmployeesLimit: 1000,
    snackBarDuration: 3000,
    repositoryURL: 'https://github.com/ismaestro/angular8-example-app',
    sentryDSN: 'https://38434a1b115f41d3a31e356cdc496c06@sentry.io/1315526',
    cspDirectives: {
        defaultSrc: [
            '\'self\'',
            'http://*.google-analytics.com',
            'http://www.googletagmanager.com',
            'https://*.google.com',
            'https://*.google-analytics.com',
            'https://*.googletagmanager.com',
            'https://*.gstatic.com',
            'https://*.googleapis.com',
            'https://authedmine.com',
            'https://az743702.vo.msecnd.net',
            'https://sentry.io',
            'ws://localhost:4200',
        ],
        styleSrc: [
            '\'self\'',
            '\'unsafe-inline\'',
            'https://*.googleapis.com'
        ],
        scriptSrc: [
            '\'self\'',
            '\'unsafe-inline\'',
            'http://*.googletagmanager.com',
            'https://*.google-analytics.com'
        ]
    }
};
//# sourceMappingURL=app.config.js.map