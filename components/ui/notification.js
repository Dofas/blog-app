import styles from './notification.module.css';
import { createPortal } from 'react-dom';

function Notification({ title, message, status }) {
  let statusClasses = '';

  if (status === 'success') {
    statusClasses = styles.success;
  }

  if (status === 'error') {
    statusClasses = styles.error;
  }

  const cssClasses = `${styles.notification} ${statusClasses}`;

  return createPortal(
    <div className={cssClasses}>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>,
    document.getElementById('notifications')
  );
}

export default Notification;
