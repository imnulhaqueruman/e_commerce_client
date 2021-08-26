import React from 'react';
import StarRating from 'react-star-ratings';

export const showAverage = (p) =>{
    if(p && p.ratings){
        let ratingsArray = p && p.ratings 
        let total=[]
        let length = ratingsArray.length
        console.log('length',length)

        ratingsArray.map((r) => total.push(r.star))
        let totalReduced  = total.reduce((p, n) => p + n , 0)
        //console.log(totalReduced)

        let height = length * 5;
        // console.log(height)
        let result = (totalReduced*5) / height;
        console.log('result', result)

        return (
            <div className="text-danger pt-1 pb-3">
                <span>
                    <StarRating rating={result}/>
                </span>
            </div>
        )
    }
}