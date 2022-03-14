import React from 'react';

const HomePage = () => (
  <div  className="container mx-auto mt-3 font-thin">
    <h1 className="text-2xl mb-3 ">Your trips app</h1>
    <ul className='list-disc list-inside' >
      <li>Show the trips catalog</li>
      <li>Search in the trips list</li>
      <li>Add a new trip</li>
      <li>Update a trip</li>
      <li>Delete a trip</li>
    </ul>
  </div>
)

export default HomePage;