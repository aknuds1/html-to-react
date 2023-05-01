declare module 'html-to-react' {
  import { ParserOptions } from 'htmlparser2';
  import { ReactElement } from 'react';

  function Html2ReactParser(options?: ParserOptions): {
    parse: (html: string) => JSX.Element | JSX.Element[];
    parseWithInstructions: (
      html: string,
      isValidNode: (node: any) => boolean,
      processingInstructions?: ProcessingInstructionType[],
      preprocessingInstructions?: PreProcessingInstructionType[]
    ) => JSX.Element | JSX.Element[];
  };

  type ProcessNodeFunctionType = (node: any, children: any, index: number) => ReactElement;
  type PreProcessingInstructionType = { 
    shouldPreprocessNode: (node: any) => boolean;
    preprocessNode: ProcessNodeFunctionType;
  };
  type ProcessingInstructionType = {
    shouldProcessNode: (node: any) => boolean;
    processNode: ProcessNodeFunctionType;
  };

  function ProcessingInstructions(): {
    defaultProcessingInstructions: ProcessingInstructionType;
  };

  function ProcessNodeDefinitions(): {
    processDefaultNode: ProcessNodeFunctionType;
  };

  const IsValidNodeDefinitions: {
    alwaysValid(): boolean;
  };

  export { Html2ReactParser as Parser, ProcessingInstructions, IsValidNodeDefinitions, ProcessNodeDefinitions };
}
