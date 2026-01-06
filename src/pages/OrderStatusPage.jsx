import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import ProgressStep from '../components/ProgressStep';
import { database } from '../firebase';
import { ref, get } from 'firebase/database';
import './OrderStatusPage.css';

const OrderStatusPage = () => {
  const { trackingId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const ordersRef = ref(database, 'orders');
        const snapshot = await get(ordersRef);
        if (snapshot.exists()) {
          const ordersData = snapshot.val();
          const ordersArray = Object.keys(ordersData).map(key => ({
            id: key,
            ...ordersData[key]
          }));
          const foundOrder = ordersArray.find(o => o.trackingId === trackingId);
          if (foundOrder) {
            setOrder(foundOrder);
          } else {
            setError('Order not found. Please check your Tracking ID.');
          }
        } else {
          setError('No orders found.');
        }
      } catch (err) {
        setError('Error fetching order data.');
      } finally {
        setLoading(false);
      }
    };

    if (trackingId) {
      fetchOrder();
    }
  }, [trackingId]);

  const steps = [
    'Order Received',
    'Designing',
    'Printing',
    'Ironing',
    'Quality Check',
    'Packing',
    'Ready for Delivery'
  ];

  if (loading) {
    return (
      <div className="order-status-page">
        <Header />
        <main className="status-content">
          <div className="loading">Loading order status...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-status-page">
        <Header />
        <main className="status-content">
          <div className="error-container">
            <h2>Order Not Found</h2>
            <p>{error}</p>
            <button onClick={() => navigate('/')} className="back-btn">
              Back to Home
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="order-status-page">
      <Header />
      <main className="status-content">
        <div className="status-header">
          <h1>Order Status</h1>
          <button onClick={() => navigate('/')} className="back-btn">
            ← Back to Home
          </button>
        </div>

        <div className="order-details-card">
          <h2>Order Details</h2>
          <div className="order-info">
            <div className="info-item">
              <span className="label">Tracking ID:</span>
              <span className="value">{order.trackingId}</span>
            </div>
            <div className="info-item">
              <span className="label">Customer Name:</span>
              <span className="value">{order.customerName}</span>
            </div>
            <div className="info-item">
              <span className="label">Description:</span>
              <span className="value">{order.description}</span>
            </div>
          </div>
        </div>

        <div className="progress-section">
          <h2>Progress</h2>
          <div className="progress-container">
            {steps.map((step, index) => (
              <ProgressStep
                key={index}
                step={step}
                completed={order.progress[index]}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderStatusPage;
