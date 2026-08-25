import { config, fields, collection } from "@keystatic/core";

export default config({
  storage:
    process.env.NODE_ENV === "development"
      ? { kind: "local" }
      : { kind: "github", repo: "ChrisBlassiaux/satisa-formation" },
  collections: {
    posts: collection({
      label: "Articles du blog",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      schema: {
        title: fields.slug({ name: { label: "Titre", validation: { isRequired: true } } }),
        category: fields.select({
          label: "Catégorie",
          options: [
            { label: "Certification RNCP/RS", value: "certification" },
            { label: "Formations & digital", value: "formations" },
          ],
          defaultValue: "certification",
        }),
        date: fields.date({
          label: "Date de publication",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        readingTime: fields.text({
          label: "Temps de lecture",
          description: 'Ex. "5 min de lecture"',
          defaultValue: "5 min de lecture",
        }),
        coverImage: fields.image({
          label: "Image de couverture",
          description: "Format recommandé : 16:10 (ex. 1200x750px). Optionnel.",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        excerpt: fields.text({
          label: "Description (SEO)",
          multiline: true,
          validation: { isRequired: true },
        }),
        content: fields.markdoc({ label: "Contenu de l'article" }),
      },
    }),
  },
});
