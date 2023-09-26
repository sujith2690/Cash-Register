import React, { useState } from 'react';
import './App.css';
import Change from './change/Change';

const App = () => {
  const [price, setPrice] = useState('');
  const [payment, setPayment] = useState('');
  const [balance, setBalance] = useState(0)

  const checkCashRegister = (e) => {
    e.preventDefault();
    if (price && payment) {
      findBalance(price, payment)
    }
  };
  const findBalance = (price, payment) => {
    // const balance = (price - payment).toFixed(2);
    // return parseFloat(balance);
    if (price > payment) {
      return setBalance('Payment is not complete')
    }
    let bal = (price - payment).toFixed(2);

    let value = parseFloat(bal)
    const bce = (price - payment)

    setBalance(Math.abs(value))
    return Math.abs(value);
    // return balance
  }
  const handleClear = () => {
    setPrice('')
    setPayment('')
    setBalance(0)
  }

  return (
    <div className='main'>
      <form onSubmit={checkCashRegister} className="cashRegister">
        <div className='values'>
          <label htmlFor="price">Price:</label>
          <input className='inputField'
            placeholder='Enter The Price'
            id='price'
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className='values'>
          <label htmlFor="payment">Payment:</label>
          <input className='inputField'
            placeholder='Payed Amount'
            id='payment'
            type="text"
            value={payment}
            onChange={(e) => setPayment(e.target.value)}
          />
        </div>
        <button className='btn' type='submit'>Submit</button>
        <button className='btn' onClick={handleClear}>Clear</button>
        <h3>Balance : {balance}</h3>
        <Change balance={balance} />
      </form>
    </div>
  );
};

export default App;
