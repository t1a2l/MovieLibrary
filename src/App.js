import React, { Component } from "react";
import MovieLibrary from "./components/movieLibrary";
import Modal from "./components/modal";
import { connect } from "react-redux";
import {
  searchMovie,
  modalToggle,
  inputChange
} from "./actions/projectActions";
import { FormControl, Button } from "react-bootstrap";

class App extends Component {
  handleChange = e => {
    let target = e.target;
    this.props.inputChange(target.id, target.value);
  };

  searchMovie = () => {
    if (this.props.search !== "") {
      this.props.searchMovie(this.props.search);
    }
  };

  editMovie = () => {
    this.props.modalToggle(true, "");
  };

  render() {
    return (
      <div
        className="App container-fluid"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#171717"
        }}
      >
        <div
          className="app-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "6px solid #7FFFD4",
            flexWrap: "wrap"
          }}
        >
          <h2 style={{ color: "#FFF", marginTop: "10px" }}>Movie Library</h2>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around"
            }}
          >
            <FormControl
              className="searchMovieStyle"
              onChange={this.handleChange.bind(this)}
              value={this.props.search}
              style={{
                marginTop: "8px",
                fontSize: "18px"
              }}
            />
            <Button
              bsStyle="primary"
              onClick={this.searchMovie.bind(this)}
              style={{
                marginTop: "8px",
                marginLeft: "20px",
                fontSize: "18px"
              }}
            >
              Search
            </Button>
          </div>
          <Button
            bsStyle="primary"
            onClick={this.editMovie.bind(this)}
            style={{
              marginTop: "8px",
              fontSize: "18px"
            }}
          >
            Add new movie
          </Button>
        </div>
        <MovieLibrary />
        <Modal />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.search
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchMovie: searchText => {
      dispatch(searchMovie(searchText));
    },
    modalToggle: (display, movieId) => {
      dispatch(modalToggle(display, movieId));
    },
    inputChange: (id, value) => {
      dispatch(inputChange(id, value));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
