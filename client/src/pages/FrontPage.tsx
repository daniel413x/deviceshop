import React from 'react';
import Slider from '../components/FrontPage/Slider';
import BrowseTheShop from '../components/FrontPage/BrowseTheShop';
import Trending from '../components/FrontPage/Trending';
import InDepth from '../components/FrontPage/InDepth';
import RecentlyReviewed from '../components/FrontPage/RecentlyReviewed';

function FrontPage() {
  return (
    <div id="front-page">
      <Slider />
      <div className="beneath-slider-row">
        <BrowseTheShop />
        <Trending />
      </div>
      <InDepth />
      <RecentlyReviewed />
    </div>
  );
}

export default FrontPage;
