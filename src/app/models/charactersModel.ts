import { DifferentCharacterModel } from './differentCharacterModel';

export interface CharactersModel {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string
  }
  results: DifferentCharacterModel[];
}
