import React from 'react';
import GalleryItem from './GalleryItem';
import NotFound from './NotFound';

const Gallery = props => {

  const results = props.data;

  let photos;
  // iterating over app.js state array data and passing data to GalleryItem component to make list of photos
  if (results.length > 0) {
    photos = results.map(photo =>
      <GalleryItem
        url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`}
        alt={photo.title}
        key={photo.id}
      />
    );
  } else {
    //  if app.js state array is empty show NotFound component
    photos = <NotFound />
  }

  return (

    <div className="photo-container">
      <h2>Search results for: {props.searchTitle}</h2>
      <ul>
        {photos}
      </ul>
    </div>

  );
}

export default Gallery;