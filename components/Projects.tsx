import { projects } from '@/data/projects';
import type { Dict, Lang } from '@/data/i18n';
import ProjectsGrid, { type ProjectView } from '@/components/ProjectsGrid';

export default function Projects({ lang, t }: { lang: Lang; t: Dict['projects'] }) {
  const items: ProjectView[] = projects.map((p) => ({
    slug: p.slug,
    categories: p.categories,
    image: p.image,
    link: p.link,
    tags: p.tags,
    title: p.title[lang],
    description: p.description[lang],
  }));

  return (
    <section id="projects" className="container section">
      <p className="eyebrow">{t.eyebrow}</p>
      <h2 className="section-title">{t.title}</h2>
      <ProjectsGrid
        projects={items}
        filters={t.filters}
        filterLabel={t.filterLabel}
        visit={t.visit}
      />
    </section>
  );
}
