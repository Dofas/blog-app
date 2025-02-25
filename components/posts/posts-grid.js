import PostItem from '@/components/posts/post-item';
import styles from './posts-grid.module.css';

export default function PostsGrid({ posts }) {
  return (
    <ul className={styles.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} {...post} />
      ))}
    </ul>
  );
}
