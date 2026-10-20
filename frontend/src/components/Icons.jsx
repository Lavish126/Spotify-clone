const base = { width: 20, height: 20, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true };

export const PlayIcon = (p) => (
  <svg {...base} {...p}><path d="M8 5.14v13.72a1 1 0 0 0 1.52.85l10.6-6.86a1 1 0 0 0 0-1.7L9.52 4.29A1 1 0 0 0 8 5.14Z" /></svg>
);
export const PauseIcon = (p) => (
  <svg {...base} {...p}><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
);
export const NextIcon = (p) => (
  <svg {...base} {...p}><path d="M6 6.5v11a.8.8 0 0 0 1.24.67L15 13v4.5a1 1 0 0 0 2 0v-11a1 1 0 0 0-2 0V11L7.24 5.83A.8.8 0 0 0 6 6.5Z" /></svg>
);
export const PrevIcon = (p) => (
  <svg {...base} {...p}><path d="M18 6.5v11a.8.8 0 0 1-1.24.67L9 13v4.5a1 1 0 0 1-2 0v-11a1 1 0 0 1 2 0V11l7.76-5.17A.8.8 0 0 1 18 6.5Z" /></svg>
);
export const VolumeIcon = (p) => (
  <svg {...base} {...p}><path d="M4 9.5v5a1 1 0 0 0 1 1h3l4.3 3.6a1 1 0 0 0 1.7-.77V5.67a1 1 0 0 0-1.7-.77L8 8.5H5a1 1 0 0 0-1 1Z" /><path d="M16.5 8.5a5 5 0 0 1 0 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
export const HomeIcon = (p) => (
  <svg {...base} {...p}><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z" /></svg>
);
export const AlbumIcon = (p) => (
  <svg {...base} {...p}><path fillRule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z" /></svg>
);
export const StudioIcon = (p) => (
  <svg {...base} {...p}><path d="M12 2a4 4 0 0 0-4 4v6a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4Z" /><path d="M5 11a7 7 0 0 0 14 0M12 18v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
);
export const LogoIcon = (p) => (
  <svg {...base} {...p}><rect x="3" y="9" width="3" height="6" rx="1.5" /><rect x="8" y="5" width="3" height="14" rx="1.5" /><rect x="13" y="2" width="3" height="20" rx="1.5" /><rect x="18" y="7" width="3" height="10" rx="1.5" /></svg>
);
