import { FileUpload } from 'graphql-upload';

export interface IFilesServiceUpload {
  files: FileUpload[];
}

export interface IFilesServiceDelete {
  filenames: string[];
}
