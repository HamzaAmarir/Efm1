import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addItem, updateItem } from '../redux/itemsSlice';
import { useNavigate } from 'react-router-dom';

const ItemForm = ({ currentItem, setCurrentItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  useEffect(() => {
    if (currentItem) {
      setName(currentItem.name);
      setDesc(currentItem.description);
    }
  }, [currentItem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentItem) {
      dispatch(updateItem({ ...currentItem, name, description: desc }));
    } else {
      dispatch(addItem({ id: Date.now(), name, description: desc }));
    }
    setName('');
    setDesc('');
    setCurrentItem(null); 
    navigate('/ItemList');
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Item name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            className="form-control"
            placeholder="Item Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">
            {currentItem ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;
