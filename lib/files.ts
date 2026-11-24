import fs from 'node:fs';
import path from 'node:path';

/**
 * Renvoie le chemin public ("/photo.jpg") du premier fichier existant
 * dans le dossier `public/`, ou null si aucun n'existe.
 * Appelé côté serveur (au moment du build), jamais dans le navigateur.
 */
export function firstPublicFile(names: string[]): string | null {
  for (const name of names) {
    if (fs.existsSync(path.join(process.cwd(), 'public', name))) {
      return `/${name}`;
    }
  }
  return null;
}
