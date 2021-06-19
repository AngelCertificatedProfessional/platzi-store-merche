import React, { useContext } from 'react';
import { PayPalButton } from 'react-paypal-button';
import AppContext from '../context/AppContext';
import '../styles/components/Payment.css';
import { handleSumTotal } from '../utils/index';
import { useHistory } from 'react-router-dom';

const Payment = () => {
  const APIPAYPAL = process.env.APIPAYPAL;
  const { state, addNewOrder } = useContext(AppContext);
  const { cart, buyer } = state;
  const history = useHistory();

  /*configuracion del paypaloptions */
  const paypalOptions = {
    clientId: APIPAYPAL,
    intent: 'capture',
    currency: 'USD',
  };

  const buttonStyles = {
    layout: 'vertical',
    shape: 'rect',
  };

  const handlePaymentSuccess = (data) => {
    console.log(data);
    if (data.status === 'COMPLETED') {
      const newOrder = {
        buyer,
        product: cart,
        payment: data,
      };
      addNewOrder(newOrder);
      history.push('/checkout/success');
    }
  };

  return (
    <div className="Payment">
      <div className="Payment-content">
        <h3> Resumen del pedido:</h3>
        {cart.map((item) => (
          <div className="Payment-item" key={item.title}>
            <div className="Payment-element">
              <h4> {item.title}</h4>
              <span>$ {item.price}</span>
            </div>
          </div>
        ))}
        <div className="Payment-button">
          {/* 
            Opciones
            paypalOptions = opciones de paypal
            buttonStyles = estilos de paypal
            amount = cuanto va a costar o el pago que se va a hacer
            onPaymentStart = funciones de informacion que podemos observar
            onPaymentSuccess = cuando todo pasa bien
            onPaymentError = cuando pasa un error
            onPaymentCancel = cuando el usuario cancela una opcion
          */}
          <PayPalButton
            paypalOptions={paypalOptions}
            buttonStyles={buttonStyles}
            amount={handleSumTotal(cart)}
            onPaymentStart={() => console.log('Start Payment')}
            onPaymentSuccess={(data) => handlePaymentSuccess(data)}
            onPaymentError={(error) => console.log(error)}
            onPaymentCancel={(data) => console.log(data)}
          />
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Payment;
