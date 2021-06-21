export const TOGGLE_DRAWER = 'TOGGLE_DRAWER';

export const toggleDrawer = (payload) => ({
  type: TOGGLE_DRAWER,
  isOpen: payload.isOpen
});