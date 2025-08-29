import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaTimes, FaGripVertical, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import './MarqueeItemsEditor.css';

const MarqueeItemsEditor = ({ 
  value = '[]', 
  onChange, 
  placeholder = 'Saisissez un message...', 
  disabled = false,
  error = ''
}) => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Parse initial value
  useEffect(() => {
    setIsInitialized(false); // Reset initialization flag when value changes
    try {
      const parsedItems = typeof value === 'string' ? JSON.parse(value) : value;
      if (Array.isArray(parsedItems)) {
        setItems(parsedItems);
      } else if (value === '' || value === null || value === undefined) {
        setItems([]);
      }
    } catch (e) {
      console.warn('Invalid JSON for marquee items:', value);
      setItems([]);
    }
  }, [value]);

  // Update parent when items change (but not on initial load)
  
  useEffect(() => {
    if (isInitialized) {
      onChange && onChange(JSON.stringify(items));
    } else {
      setIsInitialized(true);
    }
  }, [items, onChange, isInitialized]);

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, newItem.trim()]);
      setNewItem('');
    }
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, newValue) => {
    const updatedItems = [...items];
    updatedItems[index] = newValue;
    setItems(updatedItems);
  };

  const moveItem = (index, direction) => {
    const newItems = [...items];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newItems.length) {
      [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
      setItems(newItems);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addItem();
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 }
  };

  return (
    <div className="marquee-items-editor">
      <div className="items-list">
        <AnimatePresence>
          {items.map((item, index) => (
            <motion.div
              key={`${item}-${index}`}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="marquee-item"
            >
              <div className="item-drag">
                <FaGripVertical />
              </div>
              <div className="item-content">
                <textarea
                  value={item}
                  onChange={(e) => updateItem(index, e.target.value)}
                  placeholder={placeholder}
                  disabled={disabled}
                  rows={1}
                  className="item-input"
                  onInput={(e) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
              </div>
              <div className="item-actions">
                <motion.button
                  type="button"
                  className="btn-move"
                  onClick={() => moveItem(index, 'up')}
                  disabled={disabled || index === 0}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaArrowUp />
                </motion.button>
                <motion.button
                  type="button"
                  className="btn-move"
                  onClick={() => moveItem(index, 'down')}
                  disabled={disabled || index === items.length - 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaArrowDown />
                </motion.button>
                <motion.button
                  type="button"
                  className="btn-remove"
                  onClick={() => removeItem(index)}
                  disabled={disabled}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <FaTimes />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {items.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">📝</span>
          <p>Aucun message défilant ajouté</p>
          <small>Utilisez le champ ci-dessous pour ajouter des messages</small>
        </div>
      )}

      <div className="add-item-section">
        <div className="add-item-input">
          <textarea
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="new-item-input"
            onInput={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
          />
          <motion.button
            type="button"
            className="btn-add"
            onClick={addItem}
            disabled={disabled || !newItem.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaPlus />
            <span>Ajouter</span>
          </motion.button>
        </div>
      </div>

      {items.length > 0 && (
        <div className="items-summary">
          <div className="summary-stats">
            <span className="stat">
              <strong>{items.length}</strong> message{items.length > 1 ? 's' : ''}
            </span>
            <span className="stat">
              <strong>{items.reduce((acc, item) => acc + item.length, 0)}</strong> caractères au total
            </span>
          </div>
        </div>
      )}

      {error && <div className="editor-error">{error}</div>}
    </div>
  );
};

export default MarqueeItemsEditor;