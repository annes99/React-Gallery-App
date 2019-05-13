import React, { Component } from 'react';
import apiKey from '../config';
import axios from 'axios';
import Header from './Header';
import Gallery from './Gallery';
import ErrorPage from './Error';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      photos: [],
      cats: [],
      dogs: [],
      computers: [],
      tag: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.performSearch();
    this.performSearch('cats');
    this.performSearch('dogs');
    this.performSearch('computers');

  }

  performSearch = query => {
    console.log(query)
    axios.get(`https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        // handle success

        if (query === 'cats' || query === 'dogs' || query === 'computers') {
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
      .catch(error => {
        // handle error
        console.log('Error fetching data', error);
      })
  }


  render() {

    return (
      <BrowserRouter>
        <div className="container">
          <Header title="Gallery App" onSearch={this.performSearch} />
          <Switch>

            <Route exact path="/" />
            <Route path="/search/:tag" render={() => (this.state.loading) ? <p>Loading....</p> : <Gallery data={this.state.photos} searchTitle={this.state.tag} />} />
            <Route exact path="/cats" render={() => (this.state.loading) ? <p>Loading....</p> : <Gallery data={this.state.cats} searchTitle="cats" />} />
            <Route exact path="/dogs" render={() => (this.state.loading) ? <p>Loading....</p> : <Gallery data={this.state.dogs} searchTitle="dogs" />} />
            <Route exact path="/computers" render={() => (this.state.loading) ? <p>Loading....</p> : <Gallery data={this.state.computers} searchTitle="computers" />} />
            <Route component={ErrorPage} />

          </Switch>
        </div>
      </BrowserRouter>
    );

  }

}

