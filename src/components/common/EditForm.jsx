import { useState } from 'react';

export default function EditForm({ item, onSave, onCancel, type }) {
  const [formData, setFormData] = useState({
    name: item.name,
    rating: item.rating
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-form">
      <h3>Modifier {type}</h3>
      <div className="form-group">
        <label htmlFor="edit-name">Nom</label>
        <input
          id="edit-name"
          type="text"
          value={formData.name}
          onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
          required
        />
      </div>
      
      {type === 'joueur' && (
        <div className="form-group">
          <label htmlFor="edit-rating">Note (0-5): {formData.rating}</label>
          <input
            type="range"
            id="edit-rating"
            min="0"
            max="5"
            step="1"
            value={formData.rating}
            onChange={e => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
          />
        </div>
      )}

      <div className="form-actions">
        <button type="submit" className="save-button">Enregistrer</button>
        <button type="button" className="cancel-button" onClick={onCancel}>Annuler</button>
      </div>
    </form>
  );
} 