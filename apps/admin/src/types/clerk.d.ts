export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: 'dashboardUser' | 'storeUser';
    };
  }
}
