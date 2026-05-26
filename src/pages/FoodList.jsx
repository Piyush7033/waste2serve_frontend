// src/pages/FoodList.jsx
import { useEffect, useState } from "react";
import API from "../api/axios";

export default function FoodList() {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    API.get("/food").then((res) => setFoods(res.data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Available Food</h2>
      {foods.map((food) => (
        <div key={food.id} className="border p-4 mb-2">
          <h3>{food.title}</h3>
          <p>{food.description}</p>
          <button className="bg-blue-500 text-white px-3 py-1">
            Request
          </button>
        </div>
      ))}
    </div>
  );
}