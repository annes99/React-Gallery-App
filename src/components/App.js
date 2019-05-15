import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// importing needed components for app.js
import Header from './Header';
import Gallery from './Gallery';
import ErrorPage from './Error';

// get a Flickr API key from config.js
import apiKey from '../config';


export default class App extends Component {

  constructor() {
    super();
    // keeping all fetched data states
    this.state = {
      photos: [],
      sunrise:[],
      sunset: [],
      waterfall: [],
      rainbow: [],
      tag: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.performSearch();
    this.performSearch('sunrise');
    this.performSearch('sunset');
    this.performSearch('waterfall');
    this.performSearch('rainbow');
  }

  // fetching data from Flickr API & setState based on query keyword
  performSearch = query => {
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        // handle success
        if (query === 'sunset' || query === 'waterfall' || query === 'rainbow' || query === 'sunrise') {
          this.setState({
            [query]: response.data.photos.photo,
            loading: false

          });
        } else if (query !== undefined) {
          this.setState({
            photos: response.data.photos.photo,
            tag: query,
            loading: false
          });

        } 
      })
      // handle error
      .catch(error => {
        
        console.log('Error fetching data', error);
      })
  }


  render() {

    return (
      <BrowserRouter>
        <div className="container">
          <Header onSearch={this.performSearch} />

          <Switch>
            {/* routing and rendering data based on fetched data state & showing "Loading" if fetching is not completed */}
            <Route exact path="/" />
            <Route path="/search/:tag" render={() => (this.state.loading) ? <p>Loading....</p> : <Gallery data={this.state.photos} searchTitle={this.state.tag} />} />
            <Route exact path="/sunset" render={() => (this.state.loading) ? <p>Loading....</p> : <Gallery data={this.state.sunset} searchTitle="sunset" />} />
            <Route exact path="/waterfall" render={() => (this.state.loading) ? <p>Loading....</p> : <Gallery data={this.state.waterfall} searchTitle="waterfall" />} />
            <Route exact path="/rainbow" render={() => (this.state.loading) ? <p>Loading....</p> : <Gallery data={this.state.rainbow} searchTitle="rainbow" />} />
            <Route exact path="/sunrise" render={() => (this.state.loading) ? <p>Loading....</p> : <Gallery data={this.state.sunrise} searchTitle="sunrise" />} />
            <Route component={ErrorPage} />

          </Switch>
        </div>
      </BrowserRouter>
    );

  }

}

