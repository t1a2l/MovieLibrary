import axios from "axios";

export const getMovies = (search, page) => {
  return dispatch => {
    return axios
      .get(`http://www.omdbapi.com/?s=${search}&page=${page}&apikey=382c69b0`)
      .then(result => {
        let newMovies;
        if (result.data.Error) {
          newMovies = [];
        } else {
          newMovies = result.data.Search;
        }
        dispatch({
          type: "FETCH_MOVIES",
          movies: newMovies,
          listUpdated: true,
          search: search
        });
      });
  };
};

export const getMovieData = movieId => {
  return dispatch => {
    axios
      .get(`http://www.omdbapi.com/?i=${movieId}&apikey=382c69b0`)
      .then(res => res.data)
      .then(res => {
        let movieObj = {
          Runtime: res.Runtime,
          Genre: res.Genre,
          Director: res.Director,
          Poster: res.Poster
        };
        dispatch({
          type: "FETCH_MOVIE_DATA",
          movieObj: movieObj,
          movieId: movieId
        });
      });
  };
};

export const changePage = page => {
  return dispatch => {
    dispatch({
      type: "CHANGE_PAGE",
      page: page
    });
  };
};

export const modalToggle = (display, movieId) => {
  return dispatch => {
    dispatch({
      type: "MODAL_TOGGLE",
      display: display,
      movieId: movieId
    });
  };
};

export const toggleDialog = (display, movieId) => {
  return dispatch => {
    dispatch({
      type: "TOGGLE_DIALOG",
      display: display,
      movieId: movieId
    });
  };
};

export const inputChange = (id, value) => {
  return dispatch => {
    dispatch({
      type: "INPUT_CHANGE",
      id: id,
      value: value
    });
  };
};

export const saveChanges = error => {
  return dispatch => {
    dispatch({
      type: "SAVE_CHANGES",
      error: error
    });
  };
};

export const deleteMovie = id => {
  return dispatch => {
    dispatch({
      type: "DELETE_MOVIE",
      id: id
    });
  };
};

export const searchMovie = value => {
  return dispatch => {
    dispatch({
      type: "SEARCH_MOVIE",
      value: value
    });
  };
};

export const imageError = id => {
  return dispatch => {
    dispatch({
      type: "IMAGE_ERROR",
      id: id
    });
  };
};
