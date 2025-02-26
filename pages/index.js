import Hero from '@/components/home-page/hero';
import FeaturedPosts from '@/components/home-page/featured-posts';
import { getFeaturedPosts } from '@/lib/post-util';
import Head from 'next/head';

export default function HomePage({ posts }) {
  return (
    <>
      <Head>
        <title>Yevhen's blog</title>
        <meta name="description" content="I'm posting about nextjs" />
      </Head>
      <Hero />
      <FeaturedPosts posts={posts} />
    </>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}
