import React, { useState, useEffect } from 'react';
import { Star, Instagram, Facebook } from 'lucide-react';
import nidhi12 from "./assets/nidhi12.jpeg"
import nidhi21 from "./assets/nidhi21.jpeg"

export default function YogWithNidhee() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 30,
    seconds: 45
  });

  const [showForm, setShowForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    healthConcerns: ''
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToPlans = () => {
    const element = document.getElementById('pricing-plans');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBuyNow = (plan) => {
    setSelectedPlan(plan);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    // Validate fields
    if (!formData.name.trim()) {
      alert('Please enter your name');
      return;
    }
    if (!formData.email.trim()) {
      alert('Please enter your email');
      return;
    }
    if (!formData.phone.trim()) {
      alert('Please enter your phone number');
      return;
    }
    if (!formData.age) {
      alert('Please enter your age');
      return;
    }
    
    // Create message
    const msg = `Hi! I want to register for ${selectedPlan.name} plan (${selectedPlan.price}). My details - Name: ${formData.name}, Email: ${formData.email}, Phone: ${formData.phone}, Age: ${formData.age}, Health Concerns: ${formData.healthConcerns || 'None'}`;
    
    // Create WhatsApp URL
    const url = 'https://wa.me/917047791125?text=' + encodeURIComponent(msg);
    
    // Open WhatsApp
    window.open(url, '_blank');
    
    // Close form
    setShowForm(false);
    setFormData({ name: '', email: '', phone: '', age: '', healthConcerns: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Registration Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto" onClick={() => setShowForm(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full my-8" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">Register for {selectedPlan?.name}</h3>
                  <p className="text-sm mt-2">{selectedPlan?.price}</p>
                </div>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-white text-4xl hover:text-gray-200 font-bold leading-none -mt-1"
                  type="button"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none text-base"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none text-base"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none text-base"
                  placeholder="Enter 10-digit phone number"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Age *</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleFormChange}
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none text-base"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2 text-sm">Health Concerns (Optional)</label>
                <textarea
                  name="healthConcerns"
                  value={formData.healthConcerns}
                  onChange={handleFormChange}
                  rows="2"
                  className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:border-purple-600 focus:outline-none resize-none text-base"
                  placeholder="Briefly describe your health concerns"
                />
              </div>

              <div className="flex gap-3 pt-2 pb-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 text-white py-3 rounded-lg font-bold transition-all text-base"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-bold transition-all shadow-lg text-base"
                >
                  Submit & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="text-center py-3 bg-black text-white">
        <p className="text-base font-medium">"500+ women have already transformed their Life — Next You"</p>
      </div>

      {/* Countdown Timer */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">Hurry! Special Offer Ends In:</h2>
          <div className="flex justify-center items-center gap-2 md:gap-4 text-center">
            <div>
              <div className="bg-white text-purple-600 rounded-lg px-4 md:px-6 py-3 text-3xl md:text-4xl font-bold min-w-[70px]">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <p className="text-xs md:text-sm mt-2 font-medium">Days</p>
            </div>
            <div className="text-3xl md:text-4xl font-bold">:</div>
            <div>
              <div className="bg-white text-purple-600 rounded-lg px-4 md:px-6 py-3 text-3xl md:text-4xl font-bold min-w-[70px]">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <p className="text-xs md:text-sm mt-2 font-medium">Hours</p>
            </div>
            <div className="text-3xl md:text-4xl font-bold">:</div>
            <div>
              <div className="bg-white text-purple-600 rounded-lg px-4 md:px-6 py-3 text-3xl md:text-4xl font-bold min-w-[70px]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <p className="text-xs md:text-sm mt-2 font-medium">Minutes</p>
            </div>
            <div className="text-3xl md:text-4xl font-bold">:</div>
            <div>
              <div className="bg-white text-purple-600 rounded-lg px-4 md:px-6 py-3 text-3xl md:text-4xl font-bold min-w-[70px]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <p className="text-xs md:text-sm mt-2 font-medium">Seconds</p>
            </div>
          </div>
          <div className="text-center mt-8">
            <button 
              onClick={scrollToPlans}
              className="bg-white text-purple-600 px-10 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-all"
            >
              Click Here
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section - Clean Design */}
      <div className="bg-gradient-to-br from-teal-700 to-teal-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-block bg-teal-200 text-teal-900 px-6 py-2 rounded-full text-sm font-bold mb-6">
              🥇 #1 Best Online Yoga Class For PCOD/PCOS & Fertility
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              <span className="text-yellow-400">Heal PCOD, Thyroid & Fertility Naturally with Yoga</span>
              <span className="text-white block mt-2">—No Diets, No Pills, Just Results, </span>
              <span className="text-yellow-400">100% Naturally!</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-teal-100 max-w-3xl mx-auto">
              Zero Medicines, Zero Side Effects, 100% Naturally- 100% Safe- 100% Effective, Drug-Free Solution from the Comfort of your Home!
            </p>
            
            <p className="text-2xl font-bold text-white mb-12">
              See The Difference In Just Day 1
            </p>

            {/* Photo Sections */}
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto my-12">
              <div className="bg-gradient-to-br from-teal-100 to-emerald-100 rounded-3xl p-6 shadow-2xl">
                <div className="w-full h-96 bg-gradient-to-br from-teal-200 to-emerald-200 rounded-2xl flex items-center justify-center">
                   <div className="text-center p-8 relative w-full h-96 rounded-2xl overflow-hidden">
                <img className='absolute inset-0 w-full h-full object-cover' src={nidhi12} alt="" />
                <p className="text-sm text-rose-700">Meditation Pose Image</p>
              </div>
                </div>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-3xl p-6 shadow-2xl">
                <div className="w-full h-96 bg-gradient-to-br from-pink-200 to-purple-200 rounded-2xl flex items-center justify-center">
                   <div className="text-center p-8 relative w-full h-96 rounded-2xl overflow-hidden">
                <img className='absolute inset-0 w-full h-full object-cover' src={nidhi21} alt="" />
                <p className="text-sm text-rose-700">Meditation Pose Image</p>
              </div>
                </div>
              </div>
            </div>

            {/* Expert Info */}
            <div className="text-center mt-12">
              <h3 className="text-3xl font-bold text-white mb-2">Nidhee</h3>
              <p className="text-xl text-teal-200 mb-2">5+ years experienced & Transformed 500+ Lives</p>
              <p className="text-lg text-teal-300 font-semibold mb-6">PCOD/PCOS Specialist & Natural Fertility Expert</p>
              <button 
                onClick={scrollToPlans}
                className="bg-blue-500 hover:bg-blue-600 text-white px-12 py-4 rounded-lg text-xl font-bold shadow-lg transition-all transform hover:scale-105"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-black mb-6">Reviews Of Our Enrolled Members:</h2>
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-10 h-10 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-br from-purple-600 to-pink-600 text-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
            This 45 Minutes a Day PCOD/PCOS Reset is for You
          </h2>
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold mb-10 text-center">Why Your Body Will Thank You:</h3>
            <ul className="space-y-4 text-lg md:text-xl max-w-3xl mx-auto mb-8">
              <li>• Hormonal Balance – Regulate periods naturally</li>
              <li>• Natural Fertility – Support ovulation & conception</li>
              <li>• Weight Management – Balance metabolism</li>
              <li>• Emotional Wellness – Reduce stress & anxiety</li>
              <li>• Feel Balanced, Energetic, and Hopeful Again!</li>
            </ul>
          </div>
          <div className="text-center mt-12">
            <button 
              onClick={scrollToPlans}
              className="bg-white text-purple-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transition-all"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div id="pricing-plans" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-black mb-20">Select Your Plans</h1>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Jump Start Plan */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-300">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold text-black mb-2">₹2,499/-</h2>
                <p className="text-gray-600 text-xl mb-4">Three Months</p>
                <h3 className="text-3xl font-bold text-black mb-2">JUMP START</h3>
                <p className="text-lg text-gray-600">Your Yog Journey Starts Here</p>
              </div>

              <ul className="space-y-3 mb-8 text-gray-800 text-sm">
                <li>• Live sessions (3 days/week)</li>
                <li>• Duration - 45 Minutes</li>
                <li>• Access - 3 Months</li>
                <li>• Morning 8:15-9:15 AM or Evening 7:30-8:30 PM</li>
                <li>• Community support group</li>
                <li>• Certified expert guidance</li>
              </ul>

              <div className="border-t-2 pt-6 mb-8">
                <p className="font-bold text-red-600 mb-2">❌ Not Included:</p>
                <p className="text-xs text-gray-600">No recordings, WhatsApp support, tracking, diet, or consultation</p>
              </div>

              <button 
                onClick={() => handleBuyNow({ name: 'JUMP START', price: '₹3,999/- (Three Months)' })}
                className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-full text-lg font-bold"
              >
                Buy Now
              </button>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-purple-600 transform md:scale-105">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold text-black mb-2">₹999/-</h2>
                <p className="text-gray-600 text-xl mb-4">per month</p>
                <h3 className="text-3xl font-bold text-black mb-2">PRO</h3>
                <p className="text-lg text-gray-600">Shape Your Results</p>
              </div>

              <ul className="space-y-3 mb-8 text-gray-800 text-sm">
                <li>• Live sessions (5 days/week)</li>
                <li>• Duration - 45 Minutes</li>
                <li>• Session recordings available</li>
                <li>• Community group access</li>
                <li>• Weekly progress tracking</li>
                <li>• WhatsApp support</li>
              </ul>

              <div className="border-t-2 pt-6 mb-8">
                <p className="font-bold text-red-600 mb-2">❌ Not Included:</p>
                <p className="text-xs text-gray-600">No personalized diet or advanced guidance</p>
              </div>

              <button 
                onClick={() => handleBuyNow({ name: 'PRO', price: '₹999/- per month' })}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-full text-lg font-bold"
              >
                Buy Now
              </button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-gray-300">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold text-black mb-2">₹1,499/-</h2>
                <p className="text-gray-600 text-xl mb-4">per month</p>
                <h3 className="text-3xl font-bold text-black mb-2">PREMIUM</h3>
                <p className="text-lg text-gray-600">Complete Transformation</p>
              </div>

              <div className="bg-purple-50 rounded-lg p-3 mb-6">
                <p className="font-bold text-purple-800 text-xs text-center">Includes Everything!</p>
              </div>

              <ul className="space-y-3 mb-8 text-gray-800 text-sm">
                <li>• Live sessions (6 days/week)</li>
                <li>• Session recordings</li>
                <li>• Weekly tracking & WhatsApp support</li>
                <li>• Saturday Cleansing Sessions</li>
                <li>• Personalized diet guidance</li>
                <li>• Ayurvedic consultation</li>
                <li>• Advanced health guidance</li>
              </ul>

              <div className="bg-green-50 rounded-lg p-3 mb-6">
                <p className="font-bold text-green-800 text-xs">Best For: Complete transformation</p>
              </div>

              <button 
                onClick={() => handleBuyNow({ name: 'PREMIUM', price: '₹1,499/- per month' })}
                className="w-full bg-black hover:bg-gray-800 text-white py-4 rounded-full text-lg font-bold"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">YogWithNidhee</h3>
            <p className="text-purple-300 mb-2">Transform your health naturally with therapeutic yoga for PCOD/PCOS and fertility.</p>
            <p className="text-purple-300 mb-6">Empowering women to achieve hormonal balance and embrace motherhood through holistic wellness.</p>
            
            <div className="flex justify-center gap-6 mb-8">
              <a
                href="https://wa.me/917047791125"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/yogwithnidhee?igsh=MTVnZHozd3N0d200aA=="
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 text-white p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.facebook.com/share/1aR3iEw7w5/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all transform hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
            </div>
            
            <p className="text-sm mb-6">Contact: +91 7047791125</p>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917047791125"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 z-50"
        aria-label="Contact on WhatsApp"
      >
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  );
}