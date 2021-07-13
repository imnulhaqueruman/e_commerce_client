import React from 'react';

const LocalSearch = ({keyWord,setKeyWord}) => {
    const handleSearchChange = (e) =>{
        e.preventDefault();
        setKeyWord(e.target.value.toLowerCase())
    }
    return (
        
            <input type="search"
                placeholder="Filter"
                value={keyWord} 
                onChange={handleSearchChange}
                className="form-control mb-4 my-2"
            />
   
    );
};

export default LocalSearch;