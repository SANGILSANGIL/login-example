import '../../../../core/client/components/input-pass/_core.common.input-pass.scss';
import './assets/stylesheets/main.scss';
import coreBaseModule from '../../../../core/client/modules/base/core.base.module';
import sessionModule from '../../../../core/client/modules/session/core.session.module';
import Unique from './services/app.main.unique.model';
import accountsManager from './services/app.main.accounts.manager';

import appResources from './services/app.main.constant';

import config from './config/app.main.config';
import routing from './config/app.main.route';

import MainCtrl from './controllers/app.main.controllers';

import navigator from './services/app.main.navigator';

const APP_NAME = "app.main";

angular.module(APP_NAME, [
    coreBaseModule,
    sessionModule])
    .config(config)
    .config(routing)
    .controller('MainCtrl', MainCtrl)
    .service("navigator", navigator)
    .service("accountsManager", accountsManager)
    .factory("Unique", Unique)

    .constant("appResources", appResources);

if (window.location.hash === '#_=_') window.location.hash = '';

angular.element(document).ready(function () {
    angular.bootstrap(document, [APP_NAME]);
});

export default APP_NAME;
