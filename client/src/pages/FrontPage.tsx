import React from 'react';
import BrowseTheShop from '../components/FrontPage/BrowseTheShop';
import Trending from '../components/FrontPage/Trending';
import InDepth from '../components/FrontPage/InDepth';
import RecentlyReviewed from '../components/FrontPage/RecentlyReviewed';
import SliderWithAd from '../components/FrontPage/SliderWithAd';

function FrontPage() {
  return (
    <div id="front-page">
      <SliderWithAd />
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
