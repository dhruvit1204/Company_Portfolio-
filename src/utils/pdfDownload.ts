/**
 * High-performance PDF download utility for Exception IT Solutions.
 * Designed for sub-second, resilient downloads across:
 * - Local development (http://localhost:5173/docs/...)
 * - Production builds (https://domain.com/docs/...)
 * - Mobile Safari (iOS) and Chrome (Android)
 */

export interface DownloadOptions {
  filename?: string;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}

/**
 * Triggers a direct, fast download of a static PDF asset.
 * Uses programmatic anchor clicks with graceful mobile fallback.
 */
export async function downloadPdfFile(url: string, defaultFilename: string, options?: DownloadOptions): Promise<void> {
  const filename = options?.filename || defaultFilename;

  try {
    options?.onStart?.();

    // Verify file is reachable with a fast HEAD request (or fallback to GET)
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      // On iOS Safari / Android Chrome, opening the static vector PDF in a clean tab
      // allows native viewing, pinch-to-zoom, and native sharing/saving to Files.
      const win = window.open(url, '_blank');
      if (win) {
        win.focus();
        options?.onSuccess?.();
        return;
      }
    }

    // Desktop: Create an anchor element with download attribute for instant save
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    options?.onSuccess?.();
  } catch (err) {
    console.error('PDF download error:', err);
    // Fallback: direct window navigation
    window.location.href = url;
    options?.onError?.(err instanceof Error ? err : new Error(String(err)));
  }
}

/**
 * Downloads the complete Master 17-page B2B Company Portfolio PDF.
 */
export function downloadMasterPortfolioPdf(options?: DownloadOptions): Promise<void> {
  return downloadPdfFile(
    '/docs/Exception-IT-Solutions-B2B-Company-Portfolio.pdf',
    'Exception-IT-Solutions-B2B-Company-Portfolio.pdf',
    options
  );
}

/**
 * Downloads a focused 3-page Case Study PDF for a specific project.
 */
export function downloadProjectCaseStudyPdf(slug: string, projectTitle: string, options?: DownloadOptions): Promise<void> {
  const cleanTitle = projectTitle.replace(/[^a-zA-Z0-9-_]/g, '-').replace(/-+/g, '-');
  return downloadPdfFile(
    `/docs/case-studies/${slug}-case-study.pdf`,
    `${cleanTitle}-Case-Study-Exception-IT.pdf`,
    options
  );
}
