/** Resolve a file in /public so it works under the GitHub Pages base path. */
export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

/** True for text that is still a placeholder like "[Add name]". */
export const isPlaceholder = (s: string) => s.trim().startsWith('[');
