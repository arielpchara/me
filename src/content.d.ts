declare module '*.md' {
  const content: { attributes: unknown; body: string };
  export default content;
}
