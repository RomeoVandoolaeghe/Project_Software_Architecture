import { DomainException } from '../../../shared/errors/domain/exceptions/domain.exception';

export class CommentContentException extends DomainException {
  constructor(message: string, code: string = 'COMMENT_CONTENT_ERROR') {
    super(message, code);
  }
}

export class CommentContent {
  constructor(private readonly value: string) {
    if (!value || value.trim().length === 0) {
      throw new CommentContentException(
        'Le commentaire ne peut pas être vide.',
      );
    }
    if (value.length > 500) {
      throw new CommentContentException(
        'Le commentaire ne peut pas dépasser 500 caractères.',
      );
    }
    this.value = value.trim();
  }

  public getValue(): string {
    return this.value;
  }
}
