declare module 'react' {
  import * as React from 'react';
  export = React;
  export as namespace React;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
