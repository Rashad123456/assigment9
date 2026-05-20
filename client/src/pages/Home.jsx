import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import FacilityCard from '../components/FacilityCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiArrowRight, FiSearch, FiShield, FiStar, FiCalendar, FiCheckCircle } from 'react-icons/fi';

const SPORT_TYPES = ['All', 'Football', 'Badminton', 'Swimming', 'Tennis', 'Basketball', 'Volleyball'];

const Home = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/facilities`)
      .then(res => setFacilities(res.data.slice(0, 6)))
      .catch(() => setFacilities([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-primary-800 via-primary-600 to-primary-400 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white"></div>
          <div className="absolute bottom-0 left-20 w-40 h-40 rounded-full bg-white"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">
              🏆 Bangladesh's #1 Sports Booking
            </span>
            <h1 className="font-display text-6xl md:text-7xl text-white leading-tight mb-5">
              PLAY YOUR<br /><span className="text-accent-400">BEST GAME</span>
            </h1>
            <p className="text-primary-100 text-lg leading-relaxed mb-8 max-w-xl">
              Discover and book top sports facilities near you — football turfs, badminton courts, swimming lanes, and more. Instant confirmation, no hassle.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/facilities" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 flex items-center gap-2">
                Explore Facilities <FiArrowRight />
              </Link>
              <Link to="/register" className="btn-outline border-white text-white hover:bg-white/10">
                Get Started Free
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 pt-10 border-t border-white/20">
            {[
              { num: '120+', label: 'Facilities' },
              { num: '5,000+', label: 'Bookings Made' },
              { num: '12', label: 'Sports Types' },
              { num: '4.8★', label: 'Average Rating' },
            ].map(s => (
              <div key={s.label} className="text-center">
                <div className="font-display text-3xl text-accent-400">{s.num}</div>
                <div className="text-primary-100 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED FACILITIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-baseline justify-between mb-8">
          <div>
            <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-1">Top Picks</p>
            <h2 className="section-title">Featured Facilities</h2>
          </div>
          <Link to="/facilities" className="text-primary-400 text-sm font-medium hover:underline flex items-center gap-1">
            View all <FiArrowRight />
          </Link>
        </div>

        {loading ? <LoadingSpinner /> : facilities.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-5xl mb-4">🏟️</p>
            <p className="text-lg font-medium">No facilities yet. Be the first to add one!</p>
            <Link to="/add-facility" className="btn-primary mt-4 inline-flex">Add Facility</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {facilities.map(f => <FacilityCard key={f._id} facility={f} />)}
          </div>
        )}
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-primary-50 dark:bg-gray-800/50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-1">Simple Process</p>
            <h2 className="section-title">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: <FiSearch className="text-2xl" />, title: 'Browse Facilities', desc: 'Search by sport type, location, and price range to find your perfect venue.' },
              { step: '02', icon: <FiCalendar className="text-2xl" />, title: 'Pick a Time Slot', desc: 'Select your preferred date and available time slot from the facility calendar.' },
              { step: '03', icon: <FiCheckCircle className="text-2xl" />, title: 'Confirm & Play', desc: 'Book instantly with instant confirmation. Show up and enjoy your game!' },
            ].map(item => (
              <div key={item.step} className="card p-6 text-center">
                <div className="font-display text-5xl text-primary-100 dark:text-gray-700 mb-2">{item.step}</div>
                <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-gray-700 flex items-center justify-center text-primary-400 mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SPORTS WE COVER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-10">
          <p className="text-primary-400 text-sm font-semibold uppercase tracking-widest mb-1">Variety</p>
          <h2 className="section-title">Sports We Cover</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { emoji: '⚽', label: 'Football' }, { emoji: '🏸', label: 'Badminton' },
            { emoji: '🏊', label: 'Swimming' }, { emoji: '🎾', label: 'Tennis' },
            { emoji: '🏀', label: 'Basketball' }, { emoji: '🏐', label: 'Volleyball' },
            { emoji: '🏏', label: 'Cricket' }, { emoji: '🏓', label: 'Table Tennis' },
          ].map(s => (
            <Link key={s.label} to={`/facilities?type=${s.label.toLowerCase()}`}
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-400 hover:text-primary-400 transition text-sm font-medium">
              <span>{s.emoji}</span>{s.label}
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-primary-800 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-accent-400 text-sm font-semibold uppercase tracking-widest mb-1">Reviews</p>
            <h2 className="font-display text-4xl text-white tracking-wide">What Players Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Rakibul Khan', role: 'Football Player', initials: 'RK', review: 'Booking a turf used to be a hassle. SportNest made it super easy — found a great field in 2 minutes! Will keep using it.' },
              { name: 'Sumaiya Jahan', role: 'Facility Owner', initials: 'SJ', review: 'I added my badminton court and bookings started coming in the same day. Excellent platform for facility owners!' },
              { name: 'Nabil Hossain', role: 'Basketball Player', initials: 'NH', review: 'Love the search and filter feature. Found an affordable basketball court near my house instantly. 5 stars!' },
            ].map(t => (
              <div key={t.name} className="bg-primary-700/50 dark:bg-gray-800 rounded-2xl p-6">
                <div className="text-accent-400 text-lg mb-3">★★★★★</div>
                <p className="text-primary-100 text-sm leading-relaxed mb-5">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-400 flex items-center justify-center text-white font-semibold text-sm">{t.initials}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-primary-200 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-primary-600 to-primary-400 rounded-3xl p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white"></div>
          </div>
          <div className="relative">
            <FiShield className="text-white text-4xl mx-auto mb-4" />
            <h2 className="font-display text-4xl md:text-5xl text-white mb-4">Own a Sports Facility?</h2>
            <p className="text-primary-100 text-lg mb-8 max-w-lg mx-auto">List your facility on SportNest and reach thousands of sports enthusiasts. Start earning more today.</p>
            <Link to="/add-facility" className="inline-flex items-center gap-2 bg-white text-primary-600 font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition">
              List Your Facility <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
