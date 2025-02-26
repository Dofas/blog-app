import PostHeader from '@/components/posts/post-detail/post-header';
import styles from './post-content.module.css';
import ReactMarkDown from 'react-markdown';
import Image from 'next/image';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const customComponents = {
  p(paragraph) {
    const { node } = paragraph;

    if (node.children[0].tagName === 'img') {
      const markdownImage = node.children[0];
      return (
        <div className={styles.image}>
          <Image
            src={markdownImage.properties.src}
            alt={markdownImage.properties.alt}
            width={600}
            height={300}
            priority
          />
        </div>
      );
    }
    return <p>{paragraph.children}</p>;
  },

  code(code) {
    const { className, children } = code;
    const language = className.split('-')[1];
    return (
      <SyntaxHighlighter language={language} style={atomDark}>
        {children}
      </SyntaxHighlighter>
    );
  },
};

export default function PostContent({ slug, image, title, content }) {
  const imagePath = `/images/posts/${slug}/${image}`;

  return (
    <article className={styles.content}>
      <PostHeader title={title} image={imagePath} />
      <ReactMarkDown components={customComponents}>{content}</ReactMarkDown>
    </article>
  );
}
