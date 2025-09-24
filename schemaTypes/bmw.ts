import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'bmw',
  title: 'BMW Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Page subtitle',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt text', type: 'string', description: 'Describe the image for accessibility.' }),
      ],
    }),
    defineField({
      name: 'commonServices',
      title: 'Common Services',
      description: 'List of common services for BMW vehicles',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'service',
          title: 'Service',
          fields: [
            defineField({ name: 'title', title: 'Service title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'description', title: 'Description', type: 'text' }),
          ],
          preview: {
            select: {title: 'title', description: 'description'},
            prepare({title, description}) {
              return {title: title || 'Service', subtitle: (description || '').slice(0, 60)}
            },
          },
        },
      ],
    }),
    defineField({
      name: 'modelCoverage',
      title: 'Model Coverage',
      description: 'List of BMW models supported',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'maintenanceIntervals',
      title: 'Maintenance Intervals',
      description: 'Standard maintenance intervals with title and interval text',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'interval',
          title: 'Interval',
          fields: [
            defineField({ name: 'title', title: 'Service title', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'intervalText', title: 'Interval', type: 'string', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: {title: 'title', intervalText: 'intervalText'},
            prepare({title, intervalText}) {
              return {title: title || 'Interval', subtitle: intervalText}
            },
          },
        },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          title: 'FAQ Item',
          fields: [
            defineField({ name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required() }),
            defineField({ name: 'answer', title: 'Answer', type: 'text', validation: (Rule) => Rule.required() }),
          ],
          preview: {
            select: {title: 'question'},
            prepare({title}) {
              return {title: title || 'FAQ Item', subtitle: 'FAQ'}
            },
          },
        },
      ],
    }),
  ],
})
