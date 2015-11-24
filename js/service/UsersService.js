import { RestService } from './RestService';
import md5 from 'md5';

export class UsersService extends RestService {

    login(email, password) {
        return super.post('/auth', {
            email: email,
            password: md5(password)
        });
    }
}
