import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'party',
  title: 'Party',
  type: 'document',
  fields: [
    defineField({
      name: 'lineup',
      title: 'Lineup',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Poster',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
})
