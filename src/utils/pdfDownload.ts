/**
 * High-performance PDF download utility for Exception IT Solutions.
 * Designed for guaranteed, direct file downloads across:
 * - Mobile Chrome (Android) -> saves directly to phone's Downloads folder
 * - Mobile Safari (iOS) -> prompts native "Do you want to download?" saving directly to Files
 * - Desktop browsers (Chrome, Edge, Firefox, Safari)
 */

export interface DownloadOptions {
  filename?: string;
  onStart?: () => void;
  onSuccess?: () => void;
  onError?: (err: Error) => void;
}

/**
 * Triggers a direct, actual file download of a static PDF asset on both mobile and desktop.
 * Fetches the asset as a Blob and uses URL.createObjectURL with application/octet-stream
 * and HTML5 download attribute. This prevents mobile browsers from redirecting to a
 * preview tab and forces a true file download directly onto the device.
 */
export async function downloadPdfFile(url: string, defaultFilename: string, options?: DownloadOptions): Promise<void> {
  const filename = options?.filename || defaultFilename;

  try {
    options?.onStart?.();

    // 1. Fetch file as a binary blob
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/pdf',
      },
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
    }

    const blob = await response.blob();
    // Using application/octet-stream forces mobile and desktop browsers to treat it as an attachment download
    const downloadBlob = new Blob([blob], { type: 'application/octet-stream' });
    const blobUrl = window.URL.createObjectURL(downloadBlob);

    // 2. Programmatically trigger download via hidden anchor
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up memory
    setTimeout(() => {
      window.URL.revokeObjectURL(blobUrl);
    }, 5000);

    options?.onSuccess?.();
  } catch (err) {
    console.warn('Blob download fallback triggered:', err);

    // Fallback: direct anchor with download attribute
    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_self';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      options?.onSuccess?.();
    } catch (fallbackErr) {
      console.error('Final PDF download error:', fallbackErr);
      options?.onError?.(fallbackErr instanceof Error ? fallbackErr : new Error(String(fallbackErr)));
    }
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
