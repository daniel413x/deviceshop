import React, { Suspense, lazy } from 'react';

const SliderWithAd = lazy(() => import('../../components/FrontPage/SliderWithAd'));
const BrowseTheShop = lazy(() => import('../../components/FrontPage/BrowseTheShop'));
const Trending = lazy(() => import('../../components/FrontPage/Trending'));
const InDepth = lazy(() => import('../../components/FrontPage/InDepth'));
const RecentlyReviewed = lazy(() => import('../../components/FrontPage/RecentlyReviewed'));
const Guarantees = lazy(() => import('../../components/FrontPage/Guarantees'));

function FrontPage() {
  return (
    <div id="front-page">
      <Suspense>
        <SliderWithAd />
        <div className="beneath-slider">
          <BrowseTheShop />
          <Trending />
        </div>
        <InDepth />
        <RecentlyReviewed />
        <Guarantees />
      </Suspense>
    </div>
  );
}

export default FrontPage;
