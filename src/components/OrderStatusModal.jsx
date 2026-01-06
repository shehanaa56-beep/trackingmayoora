import React from 'react';
import ProgressStep from './ProgressStep';

const OrderStatusModal = ({ order, onClose }) => {
  if (!order) return null;

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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>Order Status</h2>
        <div className="order-details">
          <p><strong>Tracking ID:</strong> {order.trackingId}</p>
          <p><strong>Customer Name:</strong> {order.customerName}</p>
          <p><strong>Description:</strong> {order.description}</p>
        </div>
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
    </div>
  );
};

export default OrderStatusModal;
