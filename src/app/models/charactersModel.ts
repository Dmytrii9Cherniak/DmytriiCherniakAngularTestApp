import { DifferentCharacter } from './differentCharacter';

export interface CharactersModel {
  info: {
    count: number,
    pages: number,
    next: string,
    prev: string
  }
  results: DifferentCharacter[];
}
