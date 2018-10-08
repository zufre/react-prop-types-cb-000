import React from 'react';
import PropTypes from 'prop-types';
 
class Order extends React.Component {
 
  render() {
    // ...
  }
}
 
Order.defaultProps = {
  cone: true,
  size: 'regular'
};
 
Order.propTypes = {};

Order.propTypes = {

  cone: PropTypes.bool,
  size: PropTypes.string,
  scoops: PropTypes.arrayOf(PropTypes.string).isRequired,
  orderInfo: PropTypes.shape({
    customerName: PropTypes.string.isRequired,
    orderedAt: PropTypes.number.isRequired // We're using UNIX timestamps here
  }).isRequired
};