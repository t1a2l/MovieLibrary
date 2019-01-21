import React, { Component } from "react";
import {
  Modal,
  Form,
  FormControl,
  Button,
  Alert,
  ControlLabel,
  FormGroup
} from "react-bootstrap";
import {
  modalToggle,
  inputChange,
  saveChanges
} from "../actions/projectActions";
import { connect } from "react-redux";

class modal extends Component {
  handleChange = e => {
    let target = e.target;
    this.props.inputChange(target.id, target.value);
  };

  saveChanges = () => {
    let format = /[!@#$%^&*()_+\-=\]{};':"\\|.<>?]/;
    let movieObj = this.props.modalEditMovie;
    let found = this.props.movies.find(
      item => item.Title === movieObj.Title && item.imdbID !== movieObj.imdbID
    );
    let error = "";
    if (found) {
      error = "Title already exists";
    } else if (movieObj.Title === "" || format.test(movieObj.Title) || found) {
      error =
        "Title could not be empty and should include alpha numeric charecters";
    } else if (movieObj.Year === "" || isNaN(Date.parse(movieObj.Year))) {
      error = "Please enter a valid year e.g 2014";
    } else if (movieObj.Runtime === "" || isNaN(movieObj.Runtime)) {
      error = "Runtime should contain only numbers";
    } else if (movieObj.Genre === "" || format.test(movieObj.Genre)) {
      error = "Genre should be a list of words seperated by comma";
    } else if (movieObj.Director === "" || format.test(movieObj.Director)) {
      error = "Director could not be empty and should include director name";
    }
    this.props.saveChanges(error);
  };

  modalClose = () => {
    this.props.modalToggle(false, null);
  };

  render() {
    return (
      <div className="myModal">
        <Modal
          show={this.props.modalDisplay}
          onHide={this.modalClose.bind(this)}
        >
          <Modal.Header>
            <Modal.Title>
              Movie details - {this.props.modalEditMovie.imdbID}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Alert
              bsStyle="warning"
              className={this.props.modalError ? "" : "hidden"}
            >
              <h4>Error!</h4>
              <p>{this.props.modalError}</p>
            </Alert>
            <Form>
              <FormGroup>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  id="Title"
                  type="text"
                  value={this.props.modalEditMovie.Title}
                  onChange={this.handleChange.bind(this)}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Year</ControlLabel>
                <FormControl
                  id="Year"
                  type="text"
                  value={this.props.modalEditMovie.Year}
                  onChange={this.handleChange.bind(this)}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Runtime</ControlLabel>
                <FormControl
                  id="Runtime"
                  type="text"
                  value={this.props.modalEditMovie.Runtime}
                  onChange={this.handleChange.bind(this)}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Genre</ControlLabel>
                <FormControl
                  id="Genre"
                  type="text"
                  value={this.props.modalEditMovie.Genre}
                  onChange={this.handleChange.bind(this)}
                />
              </FormGroup>
              <FormGroup>
                <ControlLabel>Director</ControlLabel>
                <FormControl
                  id="Director"
                  type="text"
                  value={this.props.modalEditMovie.Director}
                  onChange={this.handleChange.bind(this)}
                />
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.saveChanges.bind(this)} bsStyle="primary">
              Save
            </Button>
            <Button onClick={this.modalClose.bind(this)}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    movies: state.movies,
    modalDisplay: state.modalDisplay,
    modalMovieId: state.modalMovieId,
    modalEditMovie: state.modalEditMovie,
    modalError: state.modalError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    modalToggle: (display, movieId) => {
      dispatch(modalToggle(display, movieId));
    },
    inputChange: (id, value) => {
      dispatch(inputChange(id, value));
    },
    saveChanges: error => {
      dispatch(saveChanges(error));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(modal);
