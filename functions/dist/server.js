"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
require("reflect-metadata");
var core_1 = require("@angular/core");
var express = require("express");
var helmet = require("helmet");
var path_1 = require("path");
var express_engine_1 = require("@nguniversal/express-engine");
var module_map_ngfactory_loader_1 = require("@nguniversal/module-map-ngfactory-loader");
var app_config_1 = require("./src/app/configs/app.config");
core_1.enableProdMode();
// Because of this https://github.com/angular/angular/issues/18199#issue-243593688
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var app = express();
var PORT = process.env.PORT || 4000;
var DIST_FOLDER = path_1.join(process.cwd(), 'dist');
var routes = [
    { path: '/es/*', view: 'es/index', bundle: require(path_1.join(DIST_FOLDER, 'server', 'es', 'main')) },
    { path: '/*', view: 'index', bundle: require(path_1.join(DIST_FOLDER, 'server', 'en', 'main')) }
];
app.use(helmet());
app.use(helmet.referrerPolicy({ policy: 'same-origin' }));
app.use(helmet.noCache());
app.use(helmet.featurePolicy({
    features: {
        fullscreen: ['\'self\''],
        payment: ['\'none\''],
        syncXhr: ['\'none\'']
    }
}));
app.use(helmet.contentSecurityPolicy({
    directives: app_config_1.AppConfig.cspDirectives
}));
// Load your engine
app.engine('html', function (filePath, options, callback) {
    options.engine(filePath, { req: options.req, res: options.res }, callback);
});
app.set('view engine', 'html');
app.set('views', path_1.join(DIST_FOLDER, 'browser'));
app.get('*.*', express.static(path_1.join(DIST_FOLDER, 'browser')));
routes.forEach(function (route) {
    app.get(route.path, function (req, res) {
        res.render(route.view, {
            req: req, res: res, engine: express_engine_1.ngExpressEngine({
                bootstrap: route.bundle.AppServerModuleNgFactory,
                providers: [module_map_ngfactory_loader_1.provideModuleMap(route.bundle.LAZY_MODULE_MAP)]
            })
        });
    });
});
app.listen(PORT, function () {
    console.log("Node server listening on http://localhost:" + PORT);
});
exports.default = app;
//# sourceMappingURL=server.js.map