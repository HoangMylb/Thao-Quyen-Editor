const IS_CLIENT = typeof window !== 'undefined';

export const auth = {
  login(email: string, password: string): boolean {
    if (email === 'admin@thaoquyen.com' && password === 'admin123') {
      if (IS_CLIENT) {
        localStorage.setItem('tq_admin_logged_in', 'true');
      }
      return true;
    }
    return false;
  },

  logout(): void {
    if (IS_CLIENT) {
      localStorage.removeItem('tq_admin_logged_in');
    }
  },

  isLoggedIn(): boolean {
    if (!IS_CLIENT) return false;
    return localStorage.getItem('tq_admin_logged_in') === 'true';
  }
};
