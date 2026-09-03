export const useUser = () => ({
  isLoaded: true,
  isSignedIn: false,
  user: null,
});

export const useClerk = () => ({
  signOut: async () => {},
});