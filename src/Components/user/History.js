import React from 'react';
import UserNav from '../Nav/UserNav';

const History = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav></UserNav>
                </div>

                 <div className="col">
                   History Page 
                 </div>
            </div>
            
        </div>
    );
};

export default History;