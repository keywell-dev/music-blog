import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: { kind: 'github', repo: 'keywell-dev/music-blog' },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        artist: fields.text({ label: 'Artist' }),
        album: fields.text({ label: 'Album' }),
        content: fields.markdoc({ label: 'Intro' }),
        lyrics: fields.array(
          fields.object({
            line: fields.text({ label: 'Lyric Line' }),
            annotation: fields.text({ 
              label: 'Annotation/Explanation',
              multiline: true,
            }),
          }),
          {
            label: 'Lyrics',
            itemLabel: (props) => props.fields.line.value || 'New line',
          }
        ),
      },
    }),
  },
});