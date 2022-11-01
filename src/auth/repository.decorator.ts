import { SetMetadata } from "@nestjs/common";
import { Repository } from "typeorm";

export const REPOSITORY_KEY = "repository";

export const RepositoryDecorator = (repository: any) => {
  return SetMetadata(REPOSITORY_KEY, repository);
}