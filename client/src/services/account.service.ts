import axios from 'axios';

class AccountService {
  api: any;
  constructor() {
    this.api = axios.create({
      baseURL: 'https://localhost:5011/api/account',
    });
  }

  login(loginData: any) {
    return this.api.post('/login', loginData);
  }

  register(registerData: any) {
    return this.api.post('/register', registerData);
  }
}

export default AccountService;