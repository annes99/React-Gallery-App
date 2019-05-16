import React from 'react';
import ContentLoader from 'react-content-loader';

// animated placeholder loading
// https://github.com/danilowoz/react-content-loader#usage
const Loader = () => {

  return (
    <div className="loader">
      <h3>Loading</h3>
      <ContentLoader 
        speed={1}
        primaryColor="#f3f3f3"
        secondaryColor="#4c96d7"
        >
        <rect x="150" y="0" rx="5" ry="5" width="100" height="10" />
      </ContentLoader>
      
    </div>
  )
}

export default Loader;