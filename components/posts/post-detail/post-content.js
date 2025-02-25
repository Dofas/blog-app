import PostHeader from '@/components/posts/post-detail/post-header';
import styles from './post-content.module.css';
import ReactMarkDown from 'react-markdown';

export default function PostContent({ slug, image, title, content }) {
  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <article className={styles.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkDown>{content}</ReactMarkDown>
    </article>
  );
}
