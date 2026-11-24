'use client';

import { useMemo, useState } from 'react';
import type { Category } from '@/data/projects';
import type { Dict } from '@/data/i18n';

export type ProjectView = {
  slug: string;
  categories: Category[];
  image?: string;
  link?: string;
  tags: string[];
  title: string;
  description: string;
};

type Props = {
  projects: ProjectView[];
  filters: Dict['projects']['filters'];
  filterLabel: string;
  visit: string;
};

function initialsOf(title: string): string {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('');
}

export default function ProjectsGrid({ projects, filters, filterLabel, visit }: Props) {
  const [active, setActive] = useState<'all' | Category>('all');

  // On n'affiche que les filtres qui contiennent au moins un projet.
  const categories = useMemo(
    () =>
      (['fullstack', 'ai', 'data'] as Category[]).filter((c) =>
        projects.some((p) => p.categories.includes(c)),
      ),
    [projects],
  );

  const shown = active === 'all' ? projects : projects.filter((p) => p.categories.includes(active));

  return (
    <>
      <div className="filters" role="group" aria-label={filterLabel}>
        {(['all', ...categories] as ('all' | Category)[]).map((c) => (
          <button
            key={c}
            type="button"
            className={`filter ${active === c ? 'filter-active' : ''}`}
            aria-pressed={active === c}
            onClick={() => setActive(c)}
          >
            {filters[c]}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {shown.map((p) => {
          const external = p.link?.startsWith('http');
          return (
            <article key={p.slug} className="card project-card">
              <div className="project-media">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt="" loading="lazy" />
                ) : (
                  <div className="project-fallback" aria-hidden="true">
                    {initialsOf(p.title)}
                  </div>
                )}
              </div>
              <h3>{p.title}</h3>
              <p className="muted">{p.description}</p>
              <ul className="tags">
                {p.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
              {p.link && (
                <a
                  className="link-arrow"
                  href={p.link}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {visit} <span aria-hidden="true">→</span>
                </a>
              )}
            </article>
          );
        })}
      </div>
    </>
  );
}
