/**
 * Dimensions
 */

export const MAP_WIDTH = 32;
export const MAP_HEIGHT = 32;

export const CELL_WIDTH = 16;
export const CELL_HEIGHT = 16;

export const FRAME_WIDTH = 2;

export const CIRCULAR_MAP = true;

export const GAME_SPEED = 75;

export const MAP_NET_WIDTH = (MAP_WIDTH * CELL_WIDTH) + (2 * FRAME_WIDTH) + 25;
export const MAP_NET_HEIGHT = (MAP_HEIGHT * CELL_HEIGHT) + (2 * FRAME_WIDTH);

/**
 * Identifiers
 */

export const GAME_CONTAINER_NAME = 'GAME_CONTAINER';
export const GAME_OVER_CONTAINER_NAME = 'GAME_OVER_CONTAINER';