import { SetMetadata } from "@nestjs/common";

export const REPOSITORY_KEY = "repository";

export const RepositoryDecorator = (repository: any) => {
  return SetMetadata(REPOSITORY_KEY, repository);
}