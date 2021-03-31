export const getAllUsersAC = (users) => ({
  type: 'GET_USER',
  payload: users,
});

export const getAllRoomsAC = (rooms) => ({
  type: 'GET_ROOMS',
  payload: rooms,
});
