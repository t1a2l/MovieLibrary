const initState = {
  page: 1,
  movies: [],
  updateMoviesSearch: true,
  updateMoviesList: false,
  modalDisplay: false,
  dialogDisplay: false,
  modalMovieId: null,
  modalEditMovie: {
    imdbID: "",
    Title: "",
    Year: "",
    Runtime: "",
    Genre: "",
    Director: "",
    Poster: ""
  },
  modalError: "",
  search: "new-york",
  searchTimeout: "",
  newMovieIndex: 0
};

const projectReducer = (state = initState, action) => {
  if (action.type === "FETCH_MOVIES") {
    let movies = [...state.movies];

    action.movies.forEach(newMovie => {
      newMovie.Title = fixTitle(newMovie.Title);
      let foundIndex = movies.findIndex(
        exisitingMovie => newMovie.imdbID === exisitingMovie.imdbID
      );
      if (foundIndex !== -1) {
        movies[foundIndex] = newMovie;
      } else {
        movies.push(newMovie);
      }
    });
    function fixTitle(movieTitle) {
      movieTitle = movieTitle.replace(/[^a-zA-Z0-9 ]/g, "");
      movieTitle
        .toLowerCase()
        .split(" ")
        .map(s => s.charAt(0).toUpperCase() + s.substring(1))
        .join(" ");
      return movieTitle;
    }
    return {
      ...state,
      movies: movies,
      updateMoviesSearch: false,
      updateMoviesList: action.listUpdated,
      search: action.search
    };
  } else if (action.type === "FETCH_MOVIE_DATA") {
    let i = state.movies.findIndex(item => item.imdbID === action.movieId);
    let movieObj = Object.assign({}, state.movies[i], action.movieObj);
    let newMovies = [...state.movies];
    newMovies.splice(i, 1, movieObj);
    return {
      ...state,
      movies: newMovies,
      updateMoviesList: false
    };
  } else if (action.type === "CHANGE_PAGE") {
    let page = action.page + 1;
    return {
      ...state,
      page: page
    };
  } else if (action.type === "MODAL_TOGGLE") {
    let i = state.movies.findIndex(item => item.imdbID === action.movieId);
    let movieObj = state.movies[i];
    let modalObj = { ...state.modalEditMovie };
    let error = state.modalError;
    if (action.movieId && action.movieId !== "") {
      modalObj = {
        imdbID: movieObj.imdbID,
        Title: movieObj.Title,
        Year: movieObj.Year,
        Runtime: movieObj.Runtime.match(/\d+/g).map(Number)[0],
        Genre: movieObj.Genre,
        Director: movieObj.Director,
        Poster: movieObj.Poster
      };
    } else if (action.movieId === "") {
      modalObj = {
        imdbID: "new-movie-" + state.newMovieIndex,
        Title: "",
        Year: "",
        Runtime: "",
        Genre: "",
        Director: "",
        Poster: ""
      };
    } else {
      error = "";
      modalObj = {
        imdbID: "",
        Title: "",
        Year: "",
        Runtime: "",
        Genre: "",
        Director: "",
        Poster: ""
      };
    }
    return {
      ...state,
      modalError: error,
      modalDisplay: action.display,
      modalMovieId: action.movieId,
      modalEditMovie: modalObj
    };
  } else if (action.type === "INPUT_CHANGE") {
    if (action.id !== "") {
      let movieObj = { ...state.modalEditMovie, [action.id]: action.value };
      return {
        ...state,
        modalEditMovie: movieObj
      };
    } else {
      return {
        ...state,
        search: action.value
      };
    }
  } else if (action.type === "SAVE_CHANGES") {
    if (action.error === "") {
      let movieObj = { ...state.modalEditMovie };
      let index = state.newMovieIndex;
      movieObj.Runtime = movieObj.Runtime + " min";
      let i = state.movies.findIndex(item => item.imdbID === movieObj.imdbID);
      let editMovies = [...state.movies];
      if (i !== -1) {
        editMovies.splice(i, 1, movieObj);
      } else {
        editMovies.splice(0, 0, movieObj);
        index++;
      }
      return {
        ...state,
        movies: editMovies,
        modalError: action.error,
        modalDisplay: false,
        newMovieIndex: index
      };
    } else {
      return {
        ...state,
        modalError: action.error
      };
    }
  } else if (action.type === "DELETE_MOVIE") {
    let movies = [...state.movies];
    let i = state.movies.findIndex(item => item.imdbID === action.id);
    movies.splice(i, 1);
    return {
      ...state,
      movies: movies
    };
  } else if (action.type === "TOGGLE_DIALOG") {
    if (!action.display) {
      action.display = true;
    } else {
      action.display = false;
    }
    return {
      ...state,
      dialogDisplay: action.display,
      modalMovieId: action.movieId
    };
  } else if (action.type === "SEARCH_MOVIE") {
    return {
      ...state,
      movies: [],
      updateMoviesSearch: true,
      search: action.value
    };
  } else if (action.type === "IMAGE_ERROR") {
    let movies = [...state.movies];
    let i = movies.findIndex(item => item.imdbID === action.id);
    movies[i].Poster = "/noImg.png";
    return {
      ...state,
      movies: movies,
      dialogDisplay: action.display,
      modalMovieId: action.movieId
    };
  } else return state;
};

export default projectReducer;
