export type ApiEnvelope<T> = {
  code: string;
  message: string;
  data: T;
};

type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  timeoutMs?: number;
  retries?: number;
  retryDelayMs?: number;
  signal?: AbortSignal;
};

const DEFAULT_TIMEOUT_MS = 8000;
const DEFAULT_RETRIES = 1;
const DEFAULT_RETRY_DELAY_MS = 400;

export class ApiError extends Error {
  status: number;
  code: string;
  data?: unknown;

  constructor(message: string, status = 500, code = 'UNKNOWN_ERROR', data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.data = data;
  }

  get isRetryable() {
    return this.status === 0 || this.status >= 500 || this.code === 'NETWORK_ERROR' || this.code === 'TIMEOUT';
  }
}

const ERROR_MESSAGES: Record<string, string> = {
  VALIDATION_ERROR: '提交内容有误，请检查后重试。',
  NEWSLETTER_EXISTS: '该邮箱已订阅。',
  TIMEOUT: '请求超时，请稍后重试。',
  NETWORK_ERROR: '网络连接异常，请检查网络后重试。',
};

function getAuthToken() {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem('aman_access_token') ?? '';
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<ApiEnvelope<T>> {
  const {
    method = 'GET',
    body,
    headers = {},
    timeoutMs = DEFAULT_TIMEOUT_MS,
    retries = DEFAULT_RETRIES,
    retryDelayMs = DEFAULT_RETRY_DELAY_MS,
    signal,
  } = options;

  let attempt = 0;
  let lastError: ApiError | null = null;

  while (attempt <= retries) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(new Error('timeout')), timeoutMs);

    try {
      if (signal) {
        signal.addEventListener('abort', () => controller.abort(signal.reason), { once: true });
      }

      const token = getAuthToken();
      const response = await fetch(path, {
        method,
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });

      const payload = (await response.json()) as Partial<ApiEnvelope<T>>;
      if (!response.ok) {
        throw new ApiError(
          mapErrorMessage(payload.code ?? 'UNKNOWN_ERROR', payload.message ?? '请求失败'),
          response.status,
          payload.code ?? 'UNKNOWN_ERROR',
          payload.data
        );
      }

      return {
        code: payload.code ?? 'OK',
        message: payload.message ?? '成功',
        data: payload.data as T,
      };
    } catch (error) {
      if (error instanceof ApiError) {
        lastError = error;
      } else if (error instanceof DOMException && error.name === 'AbortError') {
        lastError = new ApiError(mapErrorMessage('TIMEOUT', '请求超时'), 0, 'TIMEOUT');
      } else {
        lastError = new ApiError(mapErrorMessage('NETWORK_ERROR', '网络错误'), 0, 'NETWORK_ERROR');
      }

      if (attempt >= retries || !lastError.isRetryable) {
        throw lastError;
      }

      await sleep(retryDelayMs * (attempt + 1));
      attempt += 1;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  throw lastError ?? new ApiError('请求失败');
}

export function mapErrorMessage(code: string, fallback: string) {
  return ERROR_MESSAGES[code] ?? fallback;
}
