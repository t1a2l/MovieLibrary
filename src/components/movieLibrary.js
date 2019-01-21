import React, { Component } from "react";
import { connect } from "react-redux";
import { getMovies, getMovieData, changePage } from "../actions/projectActions";
import Movie from "./movie";

class movieLibrary extends Component {
  componentWillMount() {
    this.props.getMovies(this.props.search, this.props.page);
    document.addEventListener("scroll", this.pageScrolling.bind(this));
  }

  componentDidUpdate() {
    if (this.props.updateMoviesSearch) {
      let page = 1;
      this.props.getMovies(this.props.search, page);
    } else if (this.props.updateMoviesList) {
      this.props.movies.forEach(item => {
        this.props.getMovieData(item.imdbID);
      });
    }
  }

  pageScrolling = () => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 20
    ) {
      this.props.changePage(this.props.page);
      this.props.getMovies(this.props.search, this.props.page);
    }
  };

  render() {
    return (
      <div
        className="movieCatalog"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        {this.props.movies.map(item => {
          return <Movie key={item.imdbID} movieId={item.imdbID} />;
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    page: state.page,
    movies: state.movies,
    updateMoviesSearch: state.updateMoviesSearch,
    updateMoviesList: state.updateMoviesList,
    search: state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovies: (search, page) => {
      dispatch(getMovies(search, page));
    },
    getMovieData: movieId => {
      dispatch(getMovieData(movieId));
    },
    changePage: page => {
      dispatch(changePage(page));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(movieLibrary);
