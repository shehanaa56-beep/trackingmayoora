import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import TrackingInput from '../components/TrackingInput';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';

const Home = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRef = ref(database, 'orders');
      const snapshot = await get(ordersRef);
      if (snapshot.exists()) {
        const ordersData = snapshot.val();
        const ordersArray = Object.keys(ordersData).map(key => ({
          id: key,
          ...ordersData[key]
        }));
        setOrders(ordersArray);
      }
    };
    fetchOrders();
  }, []);

  const handleTrack = (trackingId) => {
    const order = orders.find(o => o.trackingId === trackingId);
    if (order) {
      navigate(`/order-status/${trackingId}`);
    } else {
      alert('Order not found. Please check your Tracking ID.');
    }
  };

  return (
    <div className="home">
      <Header />
      <main className="main-content">
        <section className="hero">
          <h1>Track Your Custom Order</h1>
          <p>Real-time tracking for custom jerseys & merchandise</p>
          <TrackingInput onTrack={handleTrack} />
        </section>
        <section className="features">
          <h2>Why Track With Us</h2>
          <div className="feature-cards">
            <div className="card">
              <h3>Real-Time Updates</h3>
              <p>Get instant notifications on your order progress.</p>
            </div>
            <div className="card">
              <h3>7 Progress Stages</h3>
              <p>Track every step from design to delivery.</p>
            </div>
            <div className="card">
              <h3>Quality Assured</h3>
              <p>Premium materials and expert craftsmanship.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
