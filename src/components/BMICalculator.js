// src/BMICalculator.js
import React, { useReducer } from 'react';

const initialState = {
  weight: '',
  height: '',
  bmi: null,
  message: '',
  alertClass: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_WEIGHT':
      return { ...state, weight: action.payload };
    case 'SET_HEIGHT':
      return { ...state, height: action.payload };
    case 'CALCULATE_BMI':
      const bmi = (state.weight * 10000) / (state.height * state.height);
      let message = '';
      let alertClass = '';

      if (bmi < 19) {
        message = 'Sous poids';
        alertClass = 'alert alert-danger';
      } else if (bmi >= 19 && bmi < 25) {
        message = 'Normale';
        alertClass = 'alert alert-success';
      } else {
        message = 'Sur poids';
        alertClass = 'alert alert-warning';
      }

      return { ...state, bmi: bmi.toFixed(2), message, alertClass };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const BMICalculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleWeightChange = (e) => {
    dispatch({ type: 'SET_WEIGHT', payload: e.target.value });
  };

  const handleHeightChange = (e) => {
    dispatch({ type: 'SET_HEIGHT', payload: e.target.value });
  };

  const handleCalculateBMI = (e) => {
    e.preventDefault();
    dispatch({ type: 'CALCULATE_BMI' });
  };

  const handleReset = () => {
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">BMI Calculator</h1>
      <form onSubmit={handleCalculateBMI} className="bg-light p-4 rounded shadow">
        <div className="mb-3">
          <label className="form-label">Weight (kg):</label>
          <input
            type="number"
            className="form-control"
            value={state.weight}
            onChange={handleWeightChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Height (cm):</label>
          <input
            type="number"
            className="form-control"
            value={state.height}
            onChange={handleHeightChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Calculate BMI</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={handleReset}>Reset</button>
      </form>
      {state.bmi && (
        <div className={state.alertClass + " mt-4"}>
          <h2>Your BMI: {state.bmi}</h2>
          <h3>Status: {state.message}</h3>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
