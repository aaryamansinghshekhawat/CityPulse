export type ReportStatus = 'Pending' | 'In Progress' | 'Resolved';

export interface ReportOrComplaint {
  id: string;
  userId: string;
  type: 'Suggestion' | 'Feedback';
  title: string;
  description: string;
  location?: string;
  createdAt: string; // ISO
  status: ReportStatus;
}

export interface AlertOrNotice {
  id: string;
  title: string;
  message: string;
  createdAt: string; // ISO
  authorId: string;
  audience: 'All';
}

const REPORTS_KEY = 'citypulse_reports';
const ALERTS_KEY = 'citypulse_alerts';

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
  try {
    // Notify other listeners (storage event doesn't fire in same tab)
    const event: CustomEvent<{ key: string }> = new CustomEvent('citypulse:store:update', { detail: { key } });
    window.dispatchEvent(event);
  } catch {}
}

export function getAllReports(): ReportOrComplaint[] {
  return readJson<ReportOrComplaint[]>(REPORTS_KEY, []);
}

export function getReportsByUser(userId: string): ReportOrComplaint[] {
  return getAllReports().filter(r => r.userId === userId);
}

export function addReport(input: Omit<ReportOrComplaint, 'id' | 'createdAt' | 'status'> & { status?: ReportStatus }): ReportOrComplaint {
  const newReport: ReportOrComplaint = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: input.status ?? 'Pending'
  };
  const all = getAllReports();
  all.unshift(newReport);
  writeJson(REPORTS_KEY, all);
  return newReport;
}

export function updateReportStatus(id: string, status: ReportStatus): void {
  const all = getAllReports();
  const idx = all.findIndex(r => r.id === id);
  if (idx >= 0) {
    all[idx] = { ...all[idx], status };
    writeJson(REPORTS_KEY, all);
  }
}

export function getAllAlerts(): AlertOrNotice[] {
  return readJson<AlertOrNotice[]>(ALERTS_KEY, []);
}

export function addAlert(input: Omit<AlertOrNotice, 'id' | 'createdAt' | 'audience'>): AlertOrNotice {
  const alert: AlertOrNotice = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    audience: 'All'
  };
  const all = getAllAlerts();
  all.unshift(alert);
  writeJson(ALERTS_KEY, all);
  return alert;
}

export function onStoreUpdate(callback: (key: string) => void): () => void {
  const handler = (e: Event) => {
    const ce = e as CustomEvent<{ key: string }>;
    if (ce?.detail?.key) callback(ce.detail.key);
  };
  const storageHandler = (e: StorageEvent) => {
    if (e.key === REPORTS_KEY || e.key === ALERTS_KEY) callback(e.key ?? '');
  };
  window.addEventListener('citypulse:store:update', handler);
  window.addEventListener('storage', storageHandler);
  return () => {
    window.removeEventListener('citypulse:store:update', handler);
    window.removeEventListener('storage', storageHandler);
  };
}
