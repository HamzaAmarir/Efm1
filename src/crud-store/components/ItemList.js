import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from '../redux/itemsSlice';
import { useNavigate } from 'react-router-dom';

const ItemList = ({ setCurrentItem }) => {
  const items = useSelector((state) => state.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [expandedItemId, setExpandedItemId] = useState(null);

  const handleToggleDetails = (itemId) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    navigate('/ItemForm');
  };

  return (
    <div className='container'>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate('/ItemForm')}
      >
        Add New Item
      </button>
      <ul className="list-group">
        {items.map((item) => (
          <li key={item.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <span onClick={() => handleToggleDetails(item.id)} style={{ cursor: 'pointer' }}>
                {item.name}
              </span>
              <div>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(deleteItem(item.id))}
                >
                  Delete
                </button>
              </div>
            </div>
            {expandedItemId === item.id && (
              <div className="mt-2">
                <p><strong>Description:</strong> {item.description}</p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;
