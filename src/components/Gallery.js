import React from 'react';
import GalleryItem from './GalleryItem';
import NotFound from './NotFound';

const Gallery = props => {

  const results = props.data;

  let photos;

  if (results.length > 0) {
    photos = results.map(photo =>
      <GalleryItem
        url={`https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_m.jpg`}
        alt={photo.title}
        key={photo.id}
      />
    );
  } else {
    photos = <NotFound />
  }

  return (

    <div className="photo-container">
      <h2>Search results for - {props.searchTitle}</h2>
      <ul>
        {photos}
      </ul>
    </div>

  );
}

export default Gallery;