import React, { Component } from "react";
import { connect } from "react-redux";
import { ListGroup, ListGroupItem, Button, Modal } from "react-bootstrap";
import {
  modalToggle,
  deleteMovie,
  toggleDialog,
  imageError
} from "../actions/projectActions";

class movie extends Component {
  editMovie = () => {
    this.props.modalToggle(true, this.props.movieId);
  };

  deleteMovie = () => {
    this.toggleDialog();
    this.props.deleteMovie(this.props.modalMovieId);
  };

  toggleDialog = () => {
    this.props.toggleDialog(this.props.dialogDisplay, this.props.movieId);
  };

  imageError = () => {
    this.props.imageError(this.props.movieId);
  };

  render() {
    let movieObj = this.props.movies.find(
      item => item.imdbID === this.props.movieId
    );
    return (
      <div>
        <Modal
          show={this.props.dialogDisplay}
          onHide={this.toggleDialog.bind(this)}
        >
          <Modal.Header>
            <Modal.Title>Delete Movie</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete this movie</Modal.Body>
          <Modal.Footer>
            <Button onClick={this.toggleDialog.bind(this)}>Cancel</Button>
            <Button bsStyle="primary" onClick={this.deleteMovie.bind(this)}>
              OK
            </Button>
          </Modal.Footer>
        </Modal>
        <div
          className="myMovie"
          style={{
            width: "300px",
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "5px",
            padding: "10px",
            margin: "10px",
            backgroundColor: "#263c70"
          }}
        >
          <img
            className="image-root"
            onError={this.imageError.bind(this)}
            alt="Movie"
            src={movieObj.Poster}
            style={{
              width: "100%",
              height: "300px",
              objectFit: "cover",
              borderWidth: "1px",
              borderStyle: "solid"
            }}
          />
          <div className="movieData">
            <ListGroup>
              <ListGroupItem
                style={{
                  height: "40px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  backgroundColor: "#F0FFFF"
                }}
              >
                {movieObj.imdbID}
              </ListGroupItem>
              <ListGroupItem
                style={{
                  height: "40px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  backgroundColor: "#F0FFFF"
                }}
              >
                {movieObj.Title}
              </ListGroupItem>
              <ListGroupItem
                style={{
                  height: "40px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  backgroundColor: "#F0FFFF"
                }}
              >
                {movieObj.Year}
              </ListGroupItem>
              <ListGroupItem
                style={{
                  height: "40px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  backgroundColor: "#F0FFFF"
                }}
              >
                {movieObj.Runtime}
              </ListGroupItem>
              <ListGroupItem
                style={{
                  height: "40px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  backgroundColor: "#F0FFFF"
                }}
              >
                {movieObj.Genre}
              </ListGroupItem>
              <ListGroupItem
                style={{
                  height: "40px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  backgroundColor: "#F0FFFF"
                }}
              >
                {movieObj.Director}
              </ListGroupItem>
            </ListGroup>
            <Button
              bsStyle="info"
              onClick={this.editMovie.bind(this)}
              style={{ color: "#0f1113" }}
            >
              Edit
            </Button>
            &nbsp;
            <Button
              bsStyle="warning"
              onClick={this.toggleDialog.bind(this)}
              style={{ color: "#0f1113" }}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies,
    modalDisplay: state.modalDisplay,
    dialogDisplay: state.dialogDisplay,
    modalMovieId: state.modalMovieId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggle: (display, movieId) => {
      dispatch(modalToggle(display, movieId));
    },
    deleteMovie: movieId => {
      dispatch(deleteMovie(movieId));
    },
    toggleDialog: (display, movieId) => {
      dispatch(toggleDialog(display, movieId));
    },
    imageError: movieId => {
      dispatch(imageError(movieId));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(movie);
