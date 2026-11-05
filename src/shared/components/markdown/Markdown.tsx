import ReactMarkdown, { type Components } from 'react-markdown';
import { Link } from 'react-router-dom';
import bash from 'refractor/bash';
import { refractor } from 'refractor/core';
import javascript from 'refractor/javascript';
import json from 'refractor/json';
import typescript from 'refractor/typescript';
import rehypePrismGenerator from 'rehype-prism-plus/generator';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// Only the languages the posts use: the full set adds hundreds of KB to the bundle.
[bash, javascript, json, typescript].forEach((language) => refractor.register(language));
const rehypePrism = rehypePrismGenerator(refractor);

const remarkPlugins = [remarkGfm];
const rehypePlugins = [rehypeRaw, [rehypePrism, { ignoreMissing: true }]] as const;

// Maps plain Markdown onto the site's post styles.
const components: Components = {
  a({ node: _node, href = '', children, ...props }) {
    if (href.startsWith('/')) {
      return (
        <Link to={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener" {...props}>
        {children}
      </a>
    );
  },
  ol: ({ node: _node, ...props }) => <ol {...props} className="post-ol" />,
  blockquote: ({ node: _node, ...props }) => <blockquote {...props} className="post-blockquote" />,
  table: ({ node: _node, ...props }) => (
    <div className="post-table-wrap">
      <table {...props} className="post-table" />
    </div>
  ),
};

interface MarkdownProps {
  children: string;
}

export function Markdown({ children }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={remarkPlugins}
      rehypePlugins={rehypePlugins as never}
      components={components}
    >
      {children}
    </ReactMarkdown>
  );
}
