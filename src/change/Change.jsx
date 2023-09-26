import React, { useState } from 'react';
import './Change.css';

const Change = ({ balance }) => {
  const [money, setMoney] = useState([
    { name: 'Penny', value: 0.01, quantity: 10 },
    { name: 'Nickel', value: 0.05, quantity: 10 },
    { name: 'Quarter', value: 0.25, quantity: 10 },
    { name: 'Five Dollar', value: 5, quantity: 10 },
    { name: 'Ten Dollar', value: 10, quantity: 10 },
    { name: 'One-Hundred-Dollar', value: 100, quantity: 10 },
  ]);

  const calculateRowTotal = (item) => {
    return item.value * item.quantity;
  };

  const calculateTotalMoney = () => {
    return money.reduce((total, item) => {
      return total + calculateRowTotal(item);
    }, 0);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedMoney = [...money];
    updatedMoney[index].quantity = newQuantity;
    setMoney(updatedMoney);
  };
  const calculateChange = (balance) => {
    const moneyCopy = [...money];
    const change = {};
  
    for (let i = moneyCopy.length - 1; i >= 0; i--) {
      const denomination = moneyCopy[i];
      const count = Math.min(
        Math.floor(balance / denomination.value),
        denomination.quantity
      );
  
      if (count > 0) {
        change[denomination.name] = count;
        balance -= count * denomination.value;
      }
    }
    if (balance > 0) {
      return 'Cannot give change';
    }
    return change;
  };
  const change = calculateChange(balance);
  return (
    <div className='changeBlock'>
      <h1>Cash in Drawer</h1>
      <table>
        <thead>
          <tr>
            <th>Money</th>
            <th>Value</th>
            <th>Quantity</th>
            <th>Total Money</th>
          </tr>
        </thead>
        <tbody>
          {money.map((item, index) => {
            const rowTotal = calculateRowTotal(item);
            return (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.value}</td>
                <td>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(index, parseInt(e.target.value, 10))
                    }
                  />
                </td>
                <td>sum: {rowTotal}</td>
              </tr>
            );
          })}
          <tr>
            <td colSpan="3">Total Money:</td>
            <td>{calculateTotalMoney()}</td>
          </tr>
        </tbody>
      </table>
      <h3>Return:{balance}</h3>
      {typeof change === 'string' ? (
        <p className='returnMoney'>{change}</p>
      ) : (
        <ul>
          {Object.entries(change).map(([denomination, count]) => (
            <li className='returnMoney' key={denomination}>
              <b> {`${count} ${denomination}${count > 1 ? 's' : ''}`}</b>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Change;

