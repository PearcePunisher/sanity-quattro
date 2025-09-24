import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'reviewerName',
      title: "Reviewer's name",
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {title: 'reviewerName', content: 'content'},
    prepare({title, content}) {
      const subtitle = (content || '').split('\n')[0].slice(0, 80)
      return {title: title || 'Review', subtitle}
    },
  },
})
