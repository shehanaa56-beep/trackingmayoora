import React, { useState, useEffect } from 'react';
import { database } from '../firebase';
import { ref, get, update, push, remove } from 'firebase/database';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    phoneNumber: '',
    trackingId: '',
    customerName: '',
    description: '',
    ironing: false,
    printing: false
  });

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

  const updateProgress = async (orderId, stepIndex, completed) => {
    const orderRef = ref(database, `orders/${orderId}`);
    const order = orders.find(o => o.id === orderId);
    if (order) {
      const updatedProgress = [...order.progress];
      updatedProgress[stepIndex] = completed;
      await update(orderRef, { progress: updatedProgress });
      setOrders(orders.map(o =>
        o.id === orderId ? { ...o, progress: updatedProgress } : o
      ));
    }
  };

  const removeOrder = async (orderId) => {
    const orderRef = ref(database, `orders/${orderId}`);
    await remove(orderRef);
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const newOrder = {
      ...formData,
      progress: [false, false, false, false, false, false, false] // 7 steps
    };
    const ordersRef = ref(database, 'orders');
    const newOrderRef = push(ordersRef);
    await update(newOrderRef, newOrder);
    setOrders([...orders, { id: newOrderRef.key, ...newOrder }]);
    setFormData({
      phoneNumber: '',
      trackingId: '',
      customerName: '',
      description: '',
      ironing: false,
      printing: false
    });
    setShowForm(false);
  };

  const steps = [
    'Order Received',
    'Designing',
    'Printing',
    'Ironing',
    'Quality Check',
    'Packing',
    'Ready for Delivery'
  ];

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <button onClick={() => setShowForm(!showForm)} className="add-order-btn">
        {showForm ? 'Cancel' : 'Add New Order'}
      </button>
      {showForm && (
        <form onSubmit={handleFormSubmit} className="order-form">
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Tracking ID</label>
            <input
              type="text"
              name="trackingId"
              value={formData.trackingId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">Add Order</button>
        </form>
      )}
      <div className="orders-list">
        {orders.map(order => (
          <div key={order.id} className="order-card">
            <h3>{order.trackingId} - {order.customerName}</h3>
            <p>{order.description}</p>
            <button onClick={() => removeOrder(order.id)} className="remove-btn">🗙</button>
            <div className="progress-controls">
              {steps.map((step, index) => (
                <label key={index}>
                  <input
                    type="checkbox"
                    checked={order.progress[index]}
                    onChange={(e) => updateProgress(order.id, index, e.target.checked)}
                  />
                  {step}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
