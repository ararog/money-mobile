import { RestService } from './RestService';

export class CategoriesService extends RestService {

  loadAll() {
    return super.get('/categories');
  }
}
