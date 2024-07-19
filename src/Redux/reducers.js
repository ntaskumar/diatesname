import { combineReducers } from "redux";
import {
  SET_PHOTO_LIST,
  SET_FILTERED_PHOTOS,
  SET_SEARCH_INPUT,
} from "./actions";

const initialState = {
  photoList: [],
  filteredPhotos: [],
  searchInput: "",
};

const photoReducer = (state = initialState.photoList, action) => {
  switch (action.type) {
    case SET_PHOTO_LIST:
      return action.payload;
    default:
      return state;
  }
};

const filteredPhotosReducer = (state = initialState.filteredPhotos, action) => {
  switch (action.type) {
    case SET_FILTERED_PHOTOS:
      return action.payload;
    default:
      return state;
  }
};

const searchInputReducer = (state = initialState.searchInput, action) => {
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  photoList: photoReducer,
  filteredPhotos: filteredPhotosReducer,
  searchInput: searchInputReducer,
});

export default rootReducer;
