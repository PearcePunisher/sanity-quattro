import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'contentRichText',
      title: 'Content Sections',
      description: 'Repeatable sections: one Heading (with anchor ID) paired with one Paragraph.',
      type: 'array',
      validation: (Rule) => Rule.required().min(1).error('Add at least one content section'),
      of: [
        {
          type: 'object',
          name: 'contentSection',
          title: 'Section',
          fields: [
            { name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required() },
            {
              name: 'id',
              title: 'Anchor ID',
              type: 'string',
              description:
                'Kebab-case anchor for ToC links (e.g., warning-lights). Tip: mirror the heading.',
              validation: (Rule) =>
                Rule.required()
                  .regex(/^[a-z0-9-]+$/, { name: 'kebab-case', invert: false })
                  .max(96)
                  .error('Use lowercase letters, numbers and hyphens only'),
            },
            { name: 'text', title: 'Paragraph', type: 'text', rows: 5, validation: (Rule) => Rule.required() },
          ],
          preview: {
            select: {heading: 'heading', text: 'text'},
            prepare({heading, text}) {
              const subtitle = (text || '').split('\n')[0]
              return {title: heading || 'Section', subtitle: subtitle || 'Paragraph'}
            },
          },
        },
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
