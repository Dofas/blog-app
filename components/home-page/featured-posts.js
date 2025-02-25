import styles from './featured-posts.module.css';
import PostsGrid from '@/components/posts/posts-grid';

export default function FeaturedPosts({ posts }) {
  return (
    <section className={styles.latest}>
      <h2>Featured posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}
