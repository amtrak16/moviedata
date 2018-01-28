import React, { Component } from 'react';
// import './App.css';
import axios from 'axios'
import './ui-toolkit/css/nm-cx/main.css'

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
      this.setState({ movieVal: target.value, movieErr: true, movieMsg: 'Please enter a movie to search on.', movieSuccess: false, movieRspMsg: '', disableSbmBtn: true})
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
        let movieRspErr = "Request failed with status: " + response.data.Response + " and message: " + response.data.Error
        this.setState({ movieSuccess: false, movieRspMsg: movieRspErr })
      } else {
        this.setState({ movieSuccess: true, movieRspMsg: '', movieYear: response.data.Year, movieDir: response.data.Director, moviePlot: response.data.Plot })
      }
    });
    promise.catch(error => {
      console.log(error)
      let movieRspErr = "Request failed with status: " + error.response.status + " and message: " + error.response.data.message
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
              <div class="small-12 columns">
                <div class="small-4 columns md-text-field with-floating-label icon-left">
                  <input type="search" id="movie_in" placeholder='Enter the  movie title to search for.' value={this.state.movieVal} onChange={this.onMovieIn} />
                  <label for="movie_in"></label>
                  <span class="error">{this.state.movieMsg}</span>
                  <span class="icon icon-sysicon-search"></span>
                </div>
                <div class="small-1 columns padding-small">
                  <button class="button btn-cta" disabled={this.state.disableSbmBtn} onChange={this.onSbmClick}>Search</button>
                </div>
                <div class="small-8 columns" ></div>
              </div>
            </div>
          </form>  
        </div>          
            {this.state.movieSuccess &&
              <div class="card">
                <div class="row">
                  <div class="row">
                    <div id="movieYear" class="large-2 columns"><span class="label small">Year: </span>{this.state.movieYear}</div>
                    <div class="large-10 columns" ></div>
                  </div>
                  <div class="row">
                    <div id="movieDir" class="large-6 columns" ><span class="label small">Directors: </span>{this.state.movieDir}</div>
                    <div class="large-6 columns" ></div>
                  </div>
                  <div class="row">
                    <div id="moviePlot" class="large-12 columns" ><span class="label small">Plot: </span>{this.state.moviePlot}</div>
                  </div>
                </div>
              </div>
            }
            {!this.state.movieSuccess &&
            <div class="card">
              <div class="row">
                <div class="row">
                  <div id="movieRspMsg" class="large-12 columns" >{this.state.movieRspMsg}</div>
                </div>
              </div>
            </div>
            }
        </div>
    );
  }
}

export default App;
