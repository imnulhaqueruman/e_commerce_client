import React from 'react';
import Jumbotron from '../Cards/Jumbotron';
import NewArrivals from './NewArrivals';
import BestSellers from './BestSellers'
import CategoryList from '../Category/CategoryList';

const Home = () => {

    return (
       <div>
        <div className="jumbotron jumbotron-fluid bg-secondary my-2 py-5 text-info h1 font-weight-bold text-center">
          <Jumbotron text={['Latest Products', 'New Arrivals', "Best Sellers"]}/>
        </div>
        <h4 className="text-center p-3 mt-5 mb-5 display-3 bg-secondary">
          New Arrivals
        </h4>
        <NewArrivals></NewArrivals>

        <br/>
        <br/>
        <h4 className="text-center p-3 mt-5 mb-5 display-3 bg-secondary">
          Best Sellers
        </h4>
        <BestSellers></BestSellers>
        <h4 className="text-center p-3 mt-5 mb-5 display-3 bg-secondary">
          Categories
        </h4>
        <CategoryList/>

        <br/>
        <br/>
       </div>
    );
};

export default Home;