export const checkUserAC = (user) => ({
  type: 'checkUser',
  payload: user,
});

export const exitAccountAC = () => ({
  type: 'EXIT_ACCOUNT',
});
