import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FilesService } from './files.service';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver()
export class FilesResolver {
  constructor(
    private readonly filesService: FilesService, //
  ) {}

  @Mutation(() => [String])
  uploadFile(
    @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[],
  ): Promise<string[]> {
    // 브라우저에서 파일 받아옴
    return this.filesService.upload({ files });
  }
}
