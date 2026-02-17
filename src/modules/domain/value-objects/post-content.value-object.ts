export class PostContent {
  private value: string;

  constructor(input: string) {
    this.validate(input);
  }

  private validate(input: string) {
    if (input.length === 0) {
      throw new Error('Content cannot be empty');
    }
  }

  public toString() {
    return this.value;
  }
}
