export type ApiErrorCode =
    | 'NETWORK'
    | 'TIMEOUT'
    | 'USER_EXISTS'
    | 'EMAIL_EXISTS'
    | 'INVALID_CREDENTIALS'
    | 'UNAUTHORIZED'
    | 'SERVER'
    | 'UNKNOWN';

export class ApiError extends Error {
    readonly isApiError = true;
    readonly code: ApiErrorCode;
    readonly status?: number;

    constructor(code: ApiErrorCode, message: string, status?: number) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.status = status;
        // Mantém o instanceof funcionando quando o Babel transpila a classe.
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export function isApiError(error: unknown): error is ApiError {
    return typeof error === 'object' && error !== null && (error as ApiError).isApiError === true;
}

export function getErrorMessage(error: unknown, fallback: string): string {
    if (error instanceof Error && error.message) {
        return error.message;
    }

    return fallback;
}
