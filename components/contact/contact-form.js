import styles from './contact-form.module.css';
import { useEffect, useState } from 'react';
import { sendContactData } from '@/lib/contact-util';
import Notification from '@/components/ui/notification';

export default function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState('');
  const [requestError, setRequestError] = useState('');

  useEffect(() => {
    if (requestStatus === 'success' || requestStatus === 'error') {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event) {
    event.preventDefault();

    setRequestStatus('pending');

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus('success');
      setEnteredName('');
      setEnteredEmail('');
      setEnteredMessage('');
    } catch (error) {
      setRequestError(error.message || 'Something went wrong');
      setRequestStatus('error');
    }
  }

  let notificationData;

  if (requestStatus === 'pending') {
    notificationData = {
      status: 'pending',
      title: 'Sending message, almost there...',
      message: 'Your message is on its way',
    };
  }

  if (requestStatus === 'success') {
    notificationData = {
      status: 'success',
      title: 'Success',
      message: 'Message sent successfully',
    };
  }

  if (requestStatus === 'error') {
    notificationData = {
      status: 'error',
      title: 'Error',
      message: requestError,
    };
  }

  return (
    <section className={styles.contact}>
      <h1>How can I help you ?</h1>
      <form className={styles.form} onSubmit={sendMessageHandler}>
        <div className={styles.controls}>
          <div className={styles.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={styles.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          />
        </div>
        <div className={styles.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notificationData && <Notification {...notificationData} />}
    </section>
  );
}
