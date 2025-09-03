// types/formidable.d.ts
declare module "formidable" {
  import { IncomingMessage } from "http";

  export interface File {
    filepath: string;
    originalFilename: string | null;
    mimetype: string | null;
    newFilename: string;
    size: number;
  }

  export interface Files {
    [key: string]: File | File[];
  }

  export interface Fields {
    [key: string]: string | string[];
  }

  export interface Options {
    multiples?: boolean;
    uploadDir?: string;
    keepExtensions?: boolean;
  }

  export class IncomingForm {
    constructor(options?: Options);
    parse(
      req: IncomingMessage,
      callback: (err: unknown, fields: Fields, files: Files) => void
    ): void;
  }

  export default IncomingForm;
}
