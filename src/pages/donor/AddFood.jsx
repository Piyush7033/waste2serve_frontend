import React, { useState } from "react";
import API from "../../api/axios";
import "../../styles/addfood.css";

import {
  UtensilsCrossed,
  FileText,
  Package,
  MapPin,
  Clock,
  PlusCircle,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from "lucide-react";

// =========================================
// EMPTY FORM
// =========================================

const EMPTY = {
  title: "",
  description: "",
  quantity: "",
  location: "",
  expiryTime: "",
};

// =========================================
// COMPONENT
// =========================================

const AddFood = () => {

  const [food, setFood] = useState(EMPTY);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const [error, setError] = useState("");

  // =========================================
  // HANDLE INPUT
  // =========================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFood((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================
  // HANDLE SUBMIT
  // =========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    setError("");

    setSuccess(false);

    try {

      // =====================================
      // CHECK TOKEN
      // =====================================

      const token = localStorage.getItem("token");

      console.log("🔑 TOKEN => ", token);

      if (!token) {

        setError("Please login first.");

        setLoading(false);

        return;
      }

      // =====================================
      // PAYLOAD
      // =====================================

      const payload = {

        title: food.title,

        description: food.description,

        quantity: food.quantity,

        location: food.location,

        expiryTime: food.expiryTime
          ? new Date(food.expiryTime).toISOString()
          : null,
      };

      console.log("📦 PAYLOAD => ", payload);

      // =====================================
      // API CALL
      // =====================================

      // ❌ NO MANUAL AUTH HEADER
      // axios interceptor already handles JWT

      const response = await API.post(
        "/food",
        payload
      );

      console.log("✅ SUCCESS => ", response.data);

      // =====================================
      // SUCCESS
      // =====================================

      setSuccess(true);

      setFood(EMPTY);

    } catch (err) {

      console.error("❌ ADD FOOD ERROR => ", err);

      console.log("STATUS => ", err.response?.status);

      console.log("DATA => ", err.response?.data);

      // =====================================
      // ERROR HANDLING
      // =====================================

      if (err.response?.status === 401) {

        setError(
          "Unauthorized. Please login again."
        );

      } else if (err.response?.status === 403) {

        setError(
          "Access denied. Only DONOR can add food."
        );

      } else {

        setError(
          err.response?.data?.message ||
          err.response?.data ||
          "Failed to add food donation."
        );
      }

    } finally {

      setLoading(false);
    }
  };

  // =========================================
  // RENDER
  // =========================================

  return (

    <div className="af-page">

      {/* =====================================
          LEFT PANEL
      ===================================== */}

      <div className="af-left">

        <div className="af-left-content">

          <div className="af-left-icon">

            <UtensilsCrossed
              size={48}
              strokeWidth={1.4}
            />

          </div>

          <h1 className="af-left-title">

            Share Food,
            <br />
            Share Hope

          </h1>

          <p className="af-left-sub">

            Your donation can feed a family today.
            Fill in the details and we will connect
            your food with someone who needs it most.

          </p>

          <div className="af-steps">

            {[
              {
                step: "01",
                text: "Fill in food details",
              },

              {
                step: "02",
                text: "Set pickup location",
              },

              {
                step: "03",
                text: "Submit donation",
              },

            ].map(({ step, text }) => (

              <div className="af-step" key={step}>

                <span className="af-step-num">
                  {step}
                </span>

                <span className="af-step-text">
                  {text}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* =====================================
          RIGHT PANEL
      ===================================== */}

      <div className="af-right">

        <div className="af-form-wrap">

          {/* HEADER */}

          <div className="af-form-header">

            <div className="af-form-header-icon">

              <PlusCircle
                size={22}
                strokeWidth={2}
              />

            </div>

            <div>

              <h2 className="af-form-title">
                Add Food Donation
              </h2>

              <p className="af-form-sub">
                All fields are required
              </p>

            </div>

          </div>

          {/* SUCCESS */}

          {success && (

            <div className="af-alert af-alert-success">

              <CheckCircle2
                size={18}
                strokeWidth={2}
              />

              <span>
                Food donation added successfully!
              </span>

            </div>

          )}

          {/* ERROR */}

          {error && (

            <div className="af-alert af-alert-error">

              <AlertTriangle
                size={18}
                strokeWidth={2}
              />

              <span>{error}</span>

            </div>

          )}

          {/* FORM */}

          <form
            onSubmit={handleSubmit}
            className="af-form"
          >

            {/* TITLE */}

            <div className="af-field">

              <label htmlFor="title">

                <UtensilsCrossed
                  size={14}
                  strokeWidth={2}
                />

                Food Title

              </label>

              <input
                id="title"
                type="text"
                name="title"
                value={food.title}
                onChange={handleChange}
                placeholder="e.g. Rice and Curry"
                required
              />

            </div>

            {/* DESCRIPTION */}

            <div className="af-field">

              <label htmlFor="description">

                <FileText
                  size={14}
                  strokeWidth={2}
                />

                Description

              </label>

              <textarea
                id="description"
                name="description"
                value={food.description}
                onChange={handleChange}
                placeholder="Describe the food..."
                rows={3}
                required
              />

            </div>

            {/* ROW */}

            <div className="af-field-row">

              {/* QUANTITY */}

              <div className="af-field">

                <label htmlFor="quantity">

                  <Package
                    size={14}
                    strokeWidth={2}
                  />

                  Quantity

                </label>

                <input
                  id="quantity"
                  type="text"
                  name="quantity"
                  value={food.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 10 plates"
                  required
                />

              </div>

              {/* LOCATION */}

              <div className="af-field">

                <label htmlFor="location">

                  <MapPin
                    size={14}
                    strokeWidth={2}
                  />

                  Pickup Location

                </label>

                <input
                  id="location"
                  type="text"
                  name="location"
                  value={food.location}
                  onChange={handleChange}
                  placeholder="e.g. Main Street"
                  required
                />

              </div>

            </div>

            {/* EXPIRY */}

            <div className="af-field">

              <label htmlFor="expiryTime">

                <Clock
                  size={14}
                  strokeWidth={2}
                />

                Expiry Date & Time

              </label>

              <input
                id="expiryTime"
                type="datetime-local"
                name="expiryTime"
                value={food.expiryTime}
                onChange={handleChange}
                required
              />

            </div>

            {/* ACTIONS */}

            <div className="af-actions">

              {/* RESET */}

              <button
                type="button"
                className="af-btn af-btn-reset"
                onClick={() => {

                  setFood(EMPTY);

                  setSuccess(false);

                  setError("");

                }}
              >

                <RotateCcw
                  size={15}
                  strokeWidth={2}
                />

                Reset

              </button>

              {/* SUBMIT */}

              <button
                type="submit"
                className="af-btn af-btn-submit"
                disabled={loading}
              >

                {loading ? (

                  <>
                    <span className="af-spinner" />
                    Submitting...
                  </>

                ) : (

                  <>
                    <PlusCircle
                      size={16}
                      strokeWidth={2}
                    />

                    Submit Donation
                  </>

                )}

              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default AddFood;