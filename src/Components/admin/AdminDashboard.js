import React from 'react';
import AdminNav from '../Nav/AdminNav';
const AdminDashboard = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav></AdminNav>
                </div>

                 <div className="col">
                   Admin Dashboard 
                 </div>
            </div>
            
        </div>
    );
};

export default AdminDashboard;