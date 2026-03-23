export class PostSlug {
  private constructor(private readonly value: string) {}

  public getValue(): string {
    return this.value;
  }

  public static create(title: string): PostSlug {
    if (!title || title.trim().length === 0) {
      throw new Error('Le titre ne peut pas être vide pour générer un slug.');
    }

    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    return new PostSlug(slug);
  }

  public static reconstitute(slug: string): PostSlug {
    return new PostSlug(slug);
  }
}
