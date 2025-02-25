import styles from './hero.module.css';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.image}>
        <Image
          src="/images/site/cat.png"
          alt="An image showing Yevhen"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Yevhen</h1>
      <p>
        Currently battling with Next.js—I’ll keep you updated on my survival.
      </p>
    </section>
  );
}
