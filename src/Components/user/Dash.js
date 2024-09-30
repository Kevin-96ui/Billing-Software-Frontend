import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Dash = () => {
  const userData = useSelector((state) => state.userData); // Adjusted if userData is at the root level of the state
  
  // Check if userData is defined before accessing its properties
  if (!userData) {
    return <div>Loading...</div>; // Or any other loading state you prefer
  }
  console.log(userData);

  return (
    <div>
      <h1>Welcome, {userData.username}</h1>
      {/* Use userData properties safely */}
    </div>
  );
};

export default Dash;
