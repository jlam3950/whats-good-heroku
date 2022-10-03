import React from 'react'

const MenuItem = () => {




  return (
    <div className="card bg-white shadow-xl m-3 md:card-side">
        <figure><img src="" alt="Food Pic"/></figure>
        <div className="card-body">
            <h2 className="card-title">Food Item 1</h2>
            <p>Review: 5/5</p>
            <div className="card-actions flex justify-center">
            <button className="bg-blue-500 text-white m-2 py-1 px-2 border border-blue-700 rounded">Read Reviews</button>
            </div>
        </div>
    </div>
   )
}

export default MenuItem