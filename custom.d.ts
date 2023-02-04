declare module '*.svg' {
  const content: string;
  const ReactComponent: React.FunctionComponent<
    React.SVGAttributes<SVGElement>
  >;
  export default content;
  export { ReactComponent };
}

declare module '*.jpg';
declare module '*.png';
