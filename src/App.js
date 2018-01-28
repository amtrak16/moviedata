import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = 
      {
        movieVal: '',
        movieMsg: '',
        movieErr: false,
        disableSbmBtn: true,
        movieSuccess: false,
        movieRspMsg:'',
        movieYear: '',
        movieDir: '',
        moviePlot: ''
      }

      this.onMovieIn = this.onMovieIn.bind(this)
      this.onSbmClick = this.onSbmClick.bind(this)

    }      

  onMovieIn({target}) {
    console.log(target)
    if (target.value.length === 0) {
      this.setState({ movieVal: target.value, movieErr: true, movieMsg: 'Please enter a movie to search on.', movieSuccess: false, disableSbmBtn: true})
    } else {
      this.setState({ movieVal: target.value, movieErr: false, movieMsg: '', movieSuccess: false, disableSbmBtn: false})
    }
  }

  onSbmClick(evt) {
    evt.preventDefault();
    let apiPfx = 'http://www.omdbapi.com/?apikey=51478a0d&t=';
    let apiVal = apiPfx + this.state.movieVal
    const promise = axios.get(apiVal)
      // .then(function ({data}) {
      //   console.log(data)
      // })
    promise.then(response => {
      console.log(response)
      if (response.data.hasOwnProperty('Error')){
        let movieRspErr = "Request failed with status: " + response.data.Response + " with message: " + response.data.Error
        this.setState({ movieSuccess: false, movieRspMsg: movieRspErr })
      } else {
        this.setState({ movieSuccess: true, movieRspMsg: '', movieYear: response.data.Year, movieDir: response.data.Director, moviePlot: response.data.Plot })
      }
    });
    promise.catch(error => {
      console.log(error)
      let movieRspErr = "Request failed with status: " + error.response.status + " with message: " + error.response.data.message
      this.setState({ movieSuccess: false, movieRspMsg: movieRspErr })
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <div class="card">
          <form onSubmit={this.onSbmClick}>
            <div class="row">
              <div class="small-4 columns md-text-field with-floating-label">
                <input type="text" id="movie_in" value={this.state.movieVal} onChange={this.onMovieIn} />
                <label for="movie_in"></label>
                <span class="error">{this.state.movieMsg}</span>
              </div>
            </div>
            <div class="row padding-small">
              <button class="button btn-cta" disabled={this.state.disableSbmBtn} onChange={this.onSbmClick}>Search</button>
            </div>
            {this.state.movieSuccess &&
            <div class="row">
              <div class="row">
                <span class="label small">Year: </span>
                <span id="movieYear" class=".small-1" >{this.state.movieYear}</span>
              </div>
              <div class="row">
                <span class="label small">Director: </span>
                <span id="movieDir" class=".small-1" >{this.state.movieDir}</span>
              </div>
              <div class="row">
                <span class="label small">Plot: </span>
                <span id="moviePlot" class=".small-1" >{this.state.moviePlot}</span>
              </div>
            </div>
            }
            {!this.state.movieSuccess &&
              <div class="row">
                <span class="label small"></span>
              <span id="movieRspErr" class=".small-1" >{this.state.movieRspMsg}</span>
              </div>
            }
          </form>
        </div>
      </div>
    );
  }
}

export default App;
