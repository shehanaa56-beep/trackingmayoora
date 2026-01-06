import React from 'react';

const ProgressStep = ({ step, completed }) => {
  const getIconClass = (stepName) => {
    switch (stepName) {
      case 'Order Received':
        return 'bi-box';
      case 'Designing':
        return 'bi-palette';
      case 'Printing':
        return 'bi-printer';
      case 'Ironing':
        return 'bi-tools';
      case 'Quality Check':
        return 'bi-search';
      case 'Packing':
        return 'bi-box-seam';
      case 'Ready for Delivery':
        return 'bi-truck';
      default:
        return 'bi-circle';
    }
  };

  return (
    <div className={`progress-step ${completed ? 'completed' : ''}`}>
      <div className="step-icon">
        <i className={`bi ${getIconClass(step)}`}></i>
      </div>
      <span className="step-label">{step}</span>
      {completed && (
        <div className="step-tick">
          <i className="bi bi-check-circle"></i>
        </div>
      )}
    </div>
  );
};

export default ProgressStep;
