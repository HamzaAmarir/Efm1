import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import BMICalculator from "./components/BMICalculator";
import Navbar from "./components/Navbar";
import ItemList from "./crud-store/components/ItemList";
import ItemForm from "./crud-store/components/ItemForm";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [currentItem, setCurrentItem] = useState(null);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BMICalculator />} />
        <Route path="/ItemList" element={<ItemList setCurrentItem={setCurrentItem} />} />
        <Route path="/ItemForm" element={<ItemForm currentItem={currentItem} setCurrentItem={setCurrentItem} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
