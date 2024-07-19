export const SET_PHOTO_LIST = "SET_PHOTO_LIST";
export const SET_FILTERED_PHOTOS = "SET_FILTERED_PHOTOS";
export const SET_SEARCH_INPUT = "SET_SEARCH_INPUT";

export const setPhotoList = (photos) => ({
  type: SET_PHOTO_LIST,
  payload: photos,
});

export const setFilteredPhotos = (photos) => ({
  type: SET_FILTERED_PHOTOS,
  payload: photos,
});

export const setSearchInput = (input) => ({
  type: SET_SEARCH_INPUT,
  payload: input,
});
