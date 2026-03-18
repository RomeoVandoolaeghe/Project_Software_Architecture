import { DomainException } from '../../../shared/errors/domain/exceptions/domain.exception';

export class InvalidTagNameException extends DomainException {
  constructor(message: string) {
    super(message, 'INVALID_TAG_NAME');
    this.name = 'InvalidTagNameException';
  }
}

export class TagName {
  private readonly value: string;

  private constructor(value: string) {
    this.value = value;
  }

  public static create(name: string): TagName {
    if (!name || name.trim().length === 0) {
      throw new InvalidTagNameException('Le nom du tag ne peut pas être vide');
    }

    const normalizedName = name.trim().toLowerCase();

    if (normalizedName.length < 2 || normalizedName.length > 50) {
      throw new InvalidTagNameException(
        'Le nom du tag doit contenir entre 2 et 50 caractères',
      );
    }

    const isValidFormat = /^[a-z0-9-]+$/.test(normalizedName);
    if (!isValidFormat) {
      throw new InvalidTagNameException(
        'Le nom du tag doit être alphanumérique et peut contenir des tirets',
      );
    }

    return new TagName(normalizedName);
  }

  public getValue(): string {
    return this.value;
  }

  public equals(other: TagName): boolean {
    if (other === null || other === undefined) {
      return false;
    }
    return this.value === other.getValue();
  }
}
