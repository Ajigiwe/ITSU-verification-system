import React, { useState, useEffect } from 'react';
import { Users, CheckCircle, XCircle, ClipboardList, QrCode, UserCheck } from 'lucide-react';

// Utility functions for local storage
const storage = {
  getRegistrations: () => {
    const data = localStorage.getItem('eventRegistrations');
    return data ? JSON.parse(data) : [];
  },
  saveRegistration: (registration) => {
    const registrations = storage.getRegistrations();
    const newReg = {
      ...registration,
      id: Date.now().toString(),
      registeredAt: new Date().toISOString(),
      checkedIn: false
    };
    registrations.push(newReg);
    localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
    return newReg;
  },
  checkIn: (id) => {
    const registrations = storage.getRegistrations();
    const updated = registrations.map(reg => 
      reg.id === id ? { ...reg, checkedIn: true, checkedInAt: new Date().toISOString() } : reg
    );
    localStorage.setItem('eventRegistrations', JSON.stringify(updated));
  },
  clearAll: () => {
    localStorage.removeItem('eventRegistrations');
  }
};

// Registration Form Component
const RegistrationForm = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ name: '', indexNumber: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.indexNumber) return;
    
    setSubmitting(true);
    const registration = storage.saveRegistration(formData);
    
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      if (onSuccess) onSuccess(registration);
    }, 500);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Registration Successful!</h2>
          <p className="text-gray-600 mb-6">
            You're all set for the Fun & Games session. Please save your registration details.
          </p>
          <div className="bg-green-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-1">Name</p>
            <p className="text-lg font-semibold text-gray-800">{formData.name}</p>
            <p className="text-sm text-gray-600 mt-3 mb-1">Index Number</p>
            <p className="text-lg font-semibold text-gray-800">{formData.indexNumber}</p>
          </div>
          <p className="text-sm text-gray-500">
            Remember to scan the QR code when you arrive at the event location!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <ClipboardList className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Event Registration</h1>
          <p className="text-gray-600">Sign up for the Fun & Games Session</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Index Number
            </label>
            <input
              type="text"
              value={formData.indexNumber}
              onChange={(e) => setFormData({ ...formData, indexNumber: e.target.value })}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition"
              placeholder="Enter your index number"
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Check-in Verification Component
const CheckInVerification = () => {
  const [indexNumber, setIndexNumber] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');
  const [checked, setChecked] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setError('');
    setStudent(null);
    setChecked(false);

    const registrations = storage.getRegistrations();
    const found = registrations.find(reg => 
      reg.indexNumber.toLowerCase() === indexNumber.toLowerCase()
    );

    if (found) {
      setStudent(found);
    } else {
      setError('Student not found in registration list');
    }
  };

  const handleCheckIn = () => {
    if (student) {
      storage.checkIn(student.id);
      setChecked(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-purple-100 rounded-full mb-4">
            <UserCheck className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Check-In Verification</h1>
          <p className="text-gray-600">Verify student registration</p>
        </div>

        {!student && (
          <form onSubmit={handleVerify} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Index Number
              </label>
              <input
                type="text"
                value={indexNumber}
                onChange={(e) => setIndexNumber(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition"
                placeholder="Enter index number"
                required
              />
            </div>

            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center">
                <XCircle className="w-6 h-6 text-red-500 mr-3" />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-3 rounded-lg hover:bg-purple-700 transition"
            >
              Verify Student
            </button>
          </form>
        )}

        {student && (
          <div className="space-y-6">
            <div className={`border-2 rounded-lg p-6 ${
              checked ? 'bg-green-50 border-green-300' : 'bg-blue-50 border-blue-300'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">Student Details</h3>
                {checked ? (
                  <CheckCircle className="w-8 h-8 text-green-600" />
                ) : student.checkedIn ? (
                  <div className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    Already Checked In
                  </div>
                ) : (
                  <div className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
                    Pending
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="text-xl font-semibold text-gray-800">{student.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Index Number</p>
                  <p className="text-xl font-semibold text-gray-800">{student.indexNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Registered</p>
                  <p className="text-sm text-gray-700">
                    {new Date(student.registeredAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            {!student.checkedIn && !checked && (
              <button
                onClick={handleCheckIn}
                className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg hover:bg-green-700 transition"
              >
                Confirm Check-In
              </button>
            )}

            {checked && (
              <div className="text-center">
                <p className="text-green-600 font-semibold mb-4">✓ Student checked in successfully!</p>
              </div>
            )}

            <button
              onClick={() => {
                setStudent(null);
                setIndexNumber('');
                setChecked(false);
              }}
              className="w-full bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-300 transition"
            >
              Verify Another Student
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [filter, setFilter] = useState('all'); // all, checked-in, pending
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadRegistrations();
  }, []);

  const loadRegistrations = () => {
    setRegistrations(storage.getRegistrations());
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear all registrations? This cannot be undone.')) {
      storage.clearAll();
      loadRegistrations();
    }
  };

  const filteredRegistrations = registrations
    .filter(reg => {
      if (filter === 'checked-in') return reg.checkedIn;
      if (filter === 'pending') return !reg.checkedIn;
      return true;
    })
    .filter(reg => 
      reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      reg.indexNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const stats = {
    total: registrations.length,
    checkedIn: registrations.filter(r => r.checkedIn).length,
    pending: registrations.filter(r => !r.checkedIn).length
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Users className="w-10 h-10 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
                <p className="text-gray-600">Event Registration Management</p>
              </div>
            </div>
            <button
              onClick={loadRegistrations}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Refresh
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-blue-50 rounded-lg p-4 border-2 border-blue-200">
              <p className="text-sm text-blue-600 font-semibold mb-1">Total Registrations</p>
              <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border-2 border-green-200">
              <p className="text-sm text-green-600 font-semibold mb-1">Checked In</p>
              <p className="text-3xl font-bold text-green-700">{stats.checkedIn}</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border-2 border-yellow-200">
              <p className="text-sm text-yellow-600 font-semibold mb-1">Pending</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by name or index number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === 'all' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('checked-in')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === 'checked-in' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Checked In
              </button>
              <button
                onClick={() => setFilter('pending')}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === 'pending' 
                    ? 'bg-yellow-600 text-white' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Pending
              </button>
            </div>
          </div>

          {/* Registration List */}
          <div className="space-y-3 mb-6">
            {filteredRegistrations.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No registrations found</p>
              </div>
            ) : (
              filteredRegistrations.map((reg) => (
                <div
                  key={reg.id}
                  className={`border-2 rounded-lg p-4 flex items-center justify-between ${
                    reg.checkedIn 
                      ? 'bg-green-50 border-green-200' 
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-gray-800">{reg.name}</h3>
                    <p className="text-gray-600">Index: {reg.indexNumber}</p>
                    <p className="text-sm text-gray-500">
                      Registered: {new Date(reg.registeredAt).toLocaleString()}
                    </p>
                    {reg.checkedIn && (
                      <p className="text-sm text-green-600 font-semibold">
                        ✓ Checked in: {new Date(reg.checkedInAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                  <div>
                    {reg.checkedIn ? (
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    ) : (
                      <div className="w-8 h-8 rounded-full border-2 border-gray-300" />
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Danger Zone */}
          {registrations.length > 0 && (
            <div className="border-2 border-red-200 rounded-lg p-4 bg-red-50">
              <h3 className="font-bold text-red-700 mb-2">Danger Zone</h3>
              <p className="text-sm text-red-600 mb-3">
                This will permanently delete all registration data.
              </p>
              <button
                onClick={handleClearAll}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Clear All Registrations
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main App Component with Navigation
const App = () => {
  const [currentView, setCurrentView] = useState('menu');

  const renderView = () => {
    switch (currentView) {
      case 'register':
        return <RegistrationForm onSuccess={() => {}} />;
      case 'checkin':
        return <CheckInVerification />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
              <div className="text-center mb-8">
                <QrCode className="w-20 h-20 text-indigo-600 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Event System</h1>
                <p className="text-gray-600">Fun & Games Session Management</p>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setCurrentView('register')}
                  className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-700 transition flex items-center justify-center"
                >
                  <ClipboardList className="w-5 h-5 mr-2" />
                  Student Registration
                </button>
                
                <button
                  onClick={() => setCurrentView('checkin')}
                  className="w-full bg-purple-600 text-white font-semibold py-4 rounded-lg hover:bg-purple-700 transition flex items-center justify-center"
                >
                  <UserCheck className="w-5 h-5 mr-2" />
                  Check-In Verification
                </button>
                
                <button
                  onClick={() => setCurrentView('admin')}
                  className="w-full bg-gray-700 text-white font-semibold py-4 rounded-lg hover:bg-gray-800 transition flex items-center justify-center"
                >
                  <Users className="w-5 h-5 mr-2" />
                  Admin Dashboard
                </button>
              </div>

              <div className="mt-8 p-4 bg-indigo-50 rounded-lg">
                <p className="text-sm text-indigo-700 text-center">
                  <strong>Note:</strong> In production, generate QR codes pointing to specific pages
                </p>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div>
      {currentView !== 'menu' && (
        <button
          onClick={() => setCurrentView('menu')}
          className="fixed top-4 left-4 bg-white px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition z-50"
        >
          ← Back to Menu
        </button>
      )}
      {renderView()}
    </div>
  );
};

export default App;
