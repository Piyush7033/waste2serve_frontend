import React from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/receiver.css';

const FoodDetails = () => {

  const { id } = useParams();

  return (
    <div className="receiver-container">

      <h2>🍽️ Food Details</h2>

      <p>Food ID: {id}</p>

      <button className="btn">
        Request Food
      </button>

    </div>
  );
};

export default FoodDetails;