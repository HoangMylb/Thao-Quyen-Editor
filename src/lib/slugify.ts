/**
 * Generates a clean URL slug from string text, with support for Vietnamese characters.
 */
export function generateSlug(text: string): string {
  let slug = text.toLowerCase();
  
  // Remove Vietnamese accents
  slug = slug.replace(/[áàảãạăắằẳẵặâấầẩẫậ]/g, 'a');
  slug = slug.replace(/[éèẻẽẹêếềểễệ]/g, 'e');
  slug = slug.replace(/[íìỉĩị]/g, 'i');
  slug = slug.replace(/[óòỏõọôốồổỗộơớờởỡợ]/g, 'o');
  slug = slug.replace(/[úùủũụưứừửữự]/g, 'u');
  slug = slug.replace(/[ýỳỷỹỵ]/g, 'y');
  slug = slug.replace(/đ/g, 'd');
  
  // Remove special characters, replace spaces with dashes
  slug = slug
    .replace(/[^a-z0-9 -]/g, '') // remove non-alphanumeric except spaces/dashes
    .trim()
    .replace(/\s+/g, '-')       // replace spaces with single dash
    .replace(/-+/g, '-');       // replace multiple dashes with single dash

  return slug;
}
