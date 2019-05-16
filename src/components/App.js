import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

// importing needed components for app.js
import Header from './Header';
import Gallery from './Gallery';
import ErrorPage from './Error';
import Loader from './Loader';

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

  // after the components are first rendered
  // componentDidMount() function is called to call performSearch() to update&change the state of the app
  componentDidMount() {
    this.performSearch();
    this.performSearch('sunrise');
    this.performSearch('sunset');
    this.performSearch('waterfall');
    this.performSearch('rainbow');
    
  }

  // fetching data from Flickr API & setState based on query keyword
  performSearch = query => {
    // setting the loading state to true before every new fetch, so "Loading" will show correctly
    this.setState({
      loading: true
    });

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
          {/* always showing header, searcbar and nav links, passing performSearch() to Form component */}
          <Header onSearch={this.performSearch} />
          <Switch>
            {/* routing and rendering data based on fetched data state & showing "Loading" if fetching is not completed */}
            <Route exact path="/" />
            <Route exact path="/search/:tag" render={() => (this.state.loading) ? <Loader /> : <Gallery data={this.state.photos} searchTitle={this.state.tag} />} />
            <Route exact path="/sunset" render={() => (this.state.loading) ? <Loader />  : <Gallery data={this.state.sunset} searchTitle="sunset" />} />
            <Route exact path="/waterfall" render={() => (this.state.loading) ? <Loader />  : <Gallery data={this.state.waterfall} searchTitle="waterfall" />} />
            <Route exact path="/rainbow" render={() => (this.state.loading) ? <Loader />  : <Gallery data={this.state.rainbow} searchTitle="rainbow" />} />
            <Route exact path="/sunrise" render={() => (this.state.loading) ? <Loader />  : <Gallery data={this.state.sunrise} searchTitle="sunrise" />} />

            <Route component={ErrorPage} />

          </Switch>
        </div>
      </BrowserRouter>
    );

  }

}

