import { useState } from 'react';
import type { Airline, AirlineType } from '../types/airline';
import { mockAirlines } from '../data/mockAirlines';
import './AirlinesPage.css';

const AIRLINE_TYPES: { value: AirlineType; label: string }[] = [
  { value: 'budget', label: 'Budget' },
  { value: 'full_service', label: 'Full Service' },
];

function generateId(): string {
  return String(Date.now());
}

export default function AirlinesPage() {
  const [airlines, setAirlines] = useState<Airline[]>(mockAirlines);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', airline_type: 'full_service' as AirlineType });

  const openModal = () => {
    setForm({ name: '', code: '', airline_type: 'full_service' });
    setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.code.trim()) return;
    setAirlines((prev) => [
      ...prev,
      { id: generateId(), name: form.name.trim(), code: form.code.trim().toUpperCase(), airline_type: form.airline_type },
    ]);
    closeModal();
  };

  const handleRemove = (id: string) => {
    const airline = airlines.find((a) => a.id === id);
    if (airline && window.confirm(`Remove "${airline.name}" from the list?`)) {
      setAirlines((prev) => prev.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="airlines-page">
      <header className="airlines-page__header">
        <h1>Airlines</h1>
        <button type="button" className="airlines-page__add-btn" onClick={openModal}>
          Add Airline
        </button>
      </header>

      <div className="airlines-page__table-wrap">
        <table className="airlines-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Code</th>
              <th>Airline Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {airlines.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.code}</td>
                <td>{a.airline_type === 'full_service' ? 'Full Service' : 'Budget'}</td>
                <td>
                  <button
                    type="button"
                    className="airlines-table__remove-btn"
                    onClick={() => handleRemove(a.id)}
                    aria-label={`Remove ${a.name}`}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal} role="presentation">
          <div className="modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-labelledby="add-airline-title">
            <h2 id="add-airline-title">Add Airline</h2>
            <form onSubmit={handleSubmit} className="airline-form">
              <div className="airline-form__field">
                <label htmlFor="airline-name">Name</label>
                <input
                  id="airline-name"
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  required
                  autoFocus
                />
              </div>
              <div className="airline-form__field">
                <label htmlFor="airline-code">Code</label>
                <input
                  id="airline-code"
                  type="text"
                  value={form.code}
                  onChange={(e) => setForm((f) => ({ ...f, code: e.target.value.toUpperCase() }))}
                  maxLength={4}
                  required
                />
              </div>
              <div className="airline-form__field">
                <label htmlFor="airline-type">Airline type</label>
                <select
                  id="airline-type"
                  value={form.airline_type}
                  onChange={(e) => setForm((f) => ({ ...f, airline_type: e.target.value as AirlineType }))}
                >
                  {AIRLINE_TYPES.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="airline-form__actions">
                <button type="button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
