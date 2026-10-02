export interface ImageInfo {
  alt: string;
  source: string;
}
export const getImagesById = (id: string) => {
  const modules = import.meta.glob('/src/assets/*/gallery/*.{jpg,jpeg,png}', { eager: true });

  const filtered = Object.entries(modules)
    .filter(([path]) => path.includes(`/assets/${id}/`)) // id에 해당하는 경로만 필터링
    .map(([path, mod]) => {
      const filename = path.split('/').pop()?.split('.')[0] || 'unknown';
      return {
        alt: filename,
        source: (mod as { default: string }).default,
      };
    });

  return filtered.sort((a, b) => a.alt.localeCompare(b.alt, undefined, { numeric: true }));
};

export const getMainImageById = (id: string) => {
  const modules = import.meta.glob('/src/assets/*/main/main.{jpg,jpeg,png}', { eager: true });

  const filtered = Object.entries(modules)
    .filter(([path]) => path.includes(`/assets/${id}/`)) // id에 해당하는 경로만 필터링
    .map(([path, mod]) => {
      const filename = path.split('/').pop()?.split('.')[0] || 'unknown';
      return {
        alt: filename,
        source: (mod as { default: string }).default,
      };
    });

  return filtered.sort((a, b) => a.alt.localeCompare(b.alt));
};

export const getVideoThumbnailById = (id: string) => {
  const modules = import.meta.glob(
    '/src/assets/*/main/video_thumbnail.{jpg,jpeg,png}',
    { eager: true }
  );

  const filtered = Object.entries(modules)
    .filter(([path]) => path.includes(`/assets/${id}/`))
    .map(([path, mod]) => {
      const filename = path.split('/').pop()?.split('.')[0] || 'main_gallery';
      return {
        alt: filename,
        source: (mod as { default: string }).default,
      };
    });

  // 🔑 메인 이미지는 1장만 쓰는 게 자연스러움
  return filtered[0] ?? null;
};

// Images.ts
export const getMainGalleryImageById = (id: string) => {
  const modules = import.meta.glob(
    '/src/assets/*/main/main_gallery.{jpg,jpeg,png}',
    { eager: true }
  );

  const filtered = Object.entries(modules)
    .filter(([path]) => path.includes(`/assets/${id}/`))
    .map(([path, mod]) => {
      const filename = path.split('/').pop()?.split('.')[0] || 'main_gallery';
      return {
        alt: filename,
        source: (mod as { default: string }).default,
      };
    });

  // 🔑 메인 이미지는 1장만 쓰는 게 자연스러움
  return filtered[0] ?? null;
};

export const getInvitationAssetsById = (id: string) => {
  const modules = import.meta.glob('/src/assets/*/main/main_{paragraph,icon}.{jpg,jpeg,png}', { eager: true });

  const assets: { paragraph?: string; icon?: string } = {};

  Object.entries(modules)
    .filter(([path]) => path.includes(`/assets/${id}/`))
    .forEach(([path, mod]) => {
      const filename = path.split('/').pop()?.split('.')[0];
      if (filename === 'main_paragraph') assets.paragraph = (mod as { default: string }).default;
      if (filename === 'main_icon') assets.icon = (mod as { default: string }).default;
    });

  return assets;
};
