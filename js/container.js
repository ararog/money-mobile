import Jimple from 'jimple';

import { UsersService } from './services/UsersService';
import { ExpensesService } from './services/ExpensesService';
import { CategoriesService } from './services/CategoriesService';

export let container = new Jimple()

container.set('API_URL', function (c) {
    return 'http://localhost:8080/api'
});

container.set('API_VERSION', function (c) {
    return '1.0.0'
});

container.set('USERS_SERVICE', function (c) {
    return new UsersService(c.get('API_URL'), c.get('API_VERSION'))
});

container.set('EXPENSES_SERVICE', function (c) {
    return new ExpensesService(c.get('API_URL'), c.get('API_VERSION'))
});
