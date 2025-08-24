# Notion-Powered Next.js Blog 


Live at: https://blog-vd.vercel.app/

A modern, fast, and customizable blog template powered by Notion as a CMS and Next.js. This template allows you to use Notion as your content management system while serving your blog with Next.js.

## Features

- 🚀 Built with Next.js 14+ and App Router
- 📝 Use Notion as a CMS
- 🎨 Beautiful and responsive design
- ⚡ Fast page loads with static generation
- 🔍 SEO optimized
- 📱 Mobile-friendly
- 🌙 Dark mode support
- ✨ Syntax highlighting for code blocks
- 📊 Table support
- 🖼️ Image optimization
- 📅 Reading time and word count

## Customizing the Template

### Adding New Properties

1. In your Notion database, you can add new properties by clicking "+ Add a property"
2. To use new properties in your blog, modify `src/lib/notion.ts`:

```typescript
export interface Post {
  // ... existing properties ...
  yourNewProperty?: string; // Add your new property
}

export async function getPost(pageId: string): Promise<Post | null> {
  try {
    // ... existing code ...
    const post: Post = {
      // ... existing properties ...
      yourNewProperty: properties.YourNewProperty?.your_property_type?.value,
    };
    // ... rest of the code ...
  }
}
```

### Customizing the Layout

- Modify `src/app/posts/[slug]/page.tsx` to change the blog post layout
- Update `src/components/mdx-component.tsx` to customize markdown rendering
- Style components using Tailwind CSS classes

## Database Properties

The template uses these default properties:

- `Title` - The post title (required)
- `Status` - Publication status (Published/Draft)
- `Published Date` - Post publication date
- `Author` - Post author
- `Tags` - Post tags (multi-select)
- `Category` - Post category (select)
- `Featured Image` - Cover image URL
