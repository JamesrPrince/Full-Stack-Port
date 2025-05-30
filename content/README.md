# Blog Content Management

This directory contains all blog posts in Markdown format with front matter. The blog system automatically reads these files and generates the blog pages.

## Adding a New Blog Post

1. Create a new `.md` file in the `content/blog/` directory
2. Use a URL-friendly filename (lowercase, hyphens instead of spaces)
3. Add the required front matter at the top of the file

### Front Matter Template

```markdown
---
title: "Your Blog Post Title"
excerpt: "A brief description of your post that appears in listings"
date: "YYYY-MM-DD"
readTime: "X min read"
category: "Category Name"
tags: ["Tag1", "Tag2", "Tag3"]
image: "https://images.unsplash.com/photo-xxxxx"
author:
  name: "Prince Chisenga"
  avatar: "/placeholder-user.jpg"
---

# Your Blog Post Title

Your markdown content goes here...
```

### Required Fields

- **title**: The post title (used in meta tags and display)
- **excerpt**: Short description for post previews
- **date**: Publication date in YYYY-MM-DD format
- **readTime**: Auto-calculated if omitted, or specify manually
- **category**: Must match one of the predefined categories
- **tags**: Array of relevant tags
- **image**: Header image URL (preferably from Unsplash)
- **author**: Author information

### Available Categories

- Data Engineering
- Frontend Development
- Machine Learning
- Database
- Data Analysis
- Backend Development

### Markdown Features

The blog supports:
- Standard Markdown syntax
- GitHub Flavored Markdown (GFM)
- Code syntax highlighting
- Tables
- Task lists
- Automatic link detection

### Code Blocks

Use triple backticks with language specification:

```python
def example_function():
    return "Hello, World!"
```

### Images

Use standard markdown image syntax:
```markdown
![Alt text](image-url)
```

### Best Practices

1. **Filename**: Use kebab-case (lowercase with hyphens)
   - Good: `my-awesome-post.md`
   - Bad: `My Awesome Post.md`

2. **Images**: Use high-quality images from Unsplash
   - Format: `https://images.unsplash.com/photo-xxxxx?w=800&h=400&fit=crop&auto=format`

3. **Categories**: Stick to existing categories for consistency

4. **Tags**: Use relevant, specific tags (3-5 recommended)

5. **Excerpts**: Keep under 200 characters for better display

### File Structure

```
content/
├── README.md (this file)
└── blog/
    ├── building-scalable-data-pipelines.md
    ├── react-server-components-guide.md
    ├── machine-learning-production.md
    └── your-new-post.md
```

### Deployment

After adding a new post:
1. Commit the new file to git
2. Push to the main branch
3. The post will automatically appear on the blog page

The blog system will:
- Parse the front matter
- Convert Markdown to HTML
- Calculate reading time
- Sort posts by date
- Generate the blog listing and individual post pages