import { RestService } from './RestService';

export class ExpensesService extends RestService {

    loadOverview() {
        return super.get('/expenses/overview');
    }

    loadExpenses(pageNumber) {
        return super.get('/expenses?page=' + pageNumber );
    }

    loadById(id) {
        return super.get('/expenses/' + id);
    }

    delete(id) {
        return super.delete('/expenses/' + id);
    }

    update(id, expense) {
        return super.put('/expenses/' + id, expense);
    }

    add(expense) {
        return super.post('/expenses', expense);
    }
}
