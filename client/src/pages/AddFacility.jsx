import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosSecure from '../utils/axiosSecure';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { FiPlus, FiX } from 'react-icons/fi';

const SPORT_TYPES = ['Football', 'Badminton', 'Swimming', 'Tennis', 'Basketball', 'Volleyball', 'Cricket', 'Table Tennis'];
const DEFAULT_SLOTS = ['06:00 AM - 08:00 AM', '08:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '04:00 PM - 06:00 PM', '06:00 PM - 08:00 PM', '08:00 PM - 10:00 PM'];

const AddFacility = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [slots, setSlots] = useState([]);
  const [customSlot, setCustomSlot] = useState('');
  const [form, setForm] = useState({
    name: '', facility_type: '', image: '', location: '',
    price_per_hour: '', capacity: '', description: ''
  });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const toggleSlot = (slot) => {
    setSlots(prev => prev.includes(slot) ? prev.filter(s => s !== slot) : [...prev, slot]);
  };
  const addCustomSlot = () => {
    if (customSlot && !slots.includes(customSlot)) { setSlots(s => [...s, customSlot]); setCustomSlot(''); }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (slots.length === 0) { toast.error('Add at least one time slot'); return; }
    setLoading(true);
    try {
      await axiosSecure.post('/facilities', {
        ...form,
        price_per_hour: Number(form.price_per_hour),
        capacity: Number(form.capacity),
        available_slots: slots,
        owner_email: user.email,
      });
      toast.success('Facility added successfully! 🎉');
      navigate('/manage-facilities');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add facility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-1">Owner Panel</p>
        <h1 className="section-title">Add New Facility</h1>
      </div>

      <div className="card p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Facility Name *</label>
              <input name="name" className="input-field" placeholder="e.g. Green Turf Arena" value={form.name} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sport Type *</label>
              <select name="facility_type" className="input-field" value={form.facility_type} onChange={handleChange} required>
                <option value="">Select sport type</option>
                {SPORT_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL (imgbb/postimage)</label>
            <input name="image" className="input-field" placeholder="https://i.ibb.co/..." value={form.image} onChange={handleChange} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location *</label>
            <input name="location" className="input-field" placeholder="e.g. Dhanmondi, Dhaka" value={form.location} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price Per Hour (৳) *</label>
              <input name="price_per_hour" type="number" className="input-field" placeholder="500" value={form.price_per_hour} onChange={handleChange} required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Capacity *</label>
              <input name="capacity" type="number" className="input-field" placeholder="20" value={form.capacity} onChange={handleChange} required />
            </div>
          </div>

          {/* Time Slots */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Available Time Slots *</label>
            <div className="flex flex-wrap gap-2 mb-3">
              {DEFAULT_SLOTS.map(slot => (
                <button type="button" key={slot} onClick={() => toggleSlot(slot)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition ${slots.includes(slot) ? 'bg-primary-400 text-white border-primary-400' : 'border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-primary-400'}`}>
                  {slot}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input className="input-field text-sm" placeholder="Add custom slot e.g. 02:00 PM - 04:00 PM"
                value={customSlot} onChange={e => setCustomSlot(e.target.value)} />
              <button type="button" onClick={addCustomSlot} className="btn-outline px-3 text-sm flex items-center gap-1"><FiPlus /> Add</button>
            </div>
            {slots.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {slots.map(s => (
                  <span key={s} className="flex items-center gap-1 bg-primary-50 dark:bg-gray-700 text-primary-600 dark:text-primary-300 text-xs px-3 py-1 rounded-full border border-primary-100 dark:border-gray-600">
                    {s} <button type="button" onClick={() => setSlots(p => p.filter(x => x !== s))}><FiX className="text-xs" /></button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
            <textarea name="description" className="input-field resize-none" rows={4} placeholder="Describe your facility..."
              value={form.description} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Owner Email</label>
            <input className="input-field bg-gray-50 dark:bg-gray-700" value={user?.email || ''} readOnly />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
            {loading && <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-4 h-4"></span>}
            {loading ? 'Adding...' : 'Add Facility'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddFacility;
