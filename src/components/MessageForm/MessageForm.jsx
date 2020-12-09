import React from 'react';
import './MessageForm.scss';

export const MessageForm = () => (
  <div className="message-form">
    <div className="message-form__detail">
      {/* <img src="" alt="" srcset=""/> */}
      <h2>name</h2>
      <p>description</p>
    </div>
    <div className="message-form__messages">
      {/* {sendMes('/', (req, res) => {
          res.send('<h1>Hello world</h1>');
        })} */}
    </div>
    <form className="message-form__form">
      <input
        type="text"
        placeholder="Start chatting!"
        className="message-form__input"
      />
      <button
        type="button"
        className="message-form__button"
      >
        Send message
      </button>
    </form>
  </div>
);
