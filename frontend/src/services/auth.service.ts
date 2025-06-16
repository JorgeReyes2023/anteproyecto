export class AuthService {
  private user = { username: 'admin', role: 'admin' }; // exemple

  getCurrentUser() {
    // TODO: Implement actual logic to retrieve the current user
    return this.user;
  }
}
