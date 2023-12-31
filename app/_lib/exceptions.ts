import { NextResponse } from "next/server";

/**
 * @param {string} message - Error message
 * @param {number} code - Error code
 * @param {string} detail - Error detail
 * @returns {CustomError} - Custom error
 *
 */
export class AuthRequiredError extends Error {
    code: number;
    detail?: string;
    constructor(
        message = "Authentication Required",
        code: number = 401,
        detail?: string
    ) {
        super(message);
        this.name = "AuthRequiredError";
        this.code = code;
        this.detail = detail;
    }
}

/**
 * @param {string} message - Error message
 * @param {number} code - Error code
 * @param {string} detail - Error detail
 * @returns {CustomError} - Custom error
 *
 */
export class AuthFailedError extends Error {
    code: number;
    detail?: string;
    constructor(
        message = "Authentication Failed",
        code: number = 401,
        detail?: string
    ) {
        super(message);
        this.name = "AuthFailedError";
        this.code = code;
        this.detail = detail;
    }
}

/**
 * @param {string} message - Error message
 * @param {number} code - Error code
 * @param {string} detail - Error detail
 * @returns {CustomError} - Custom error
 *
 */
export class CustomError extends Error {
    code: number;
    detail?: string;
    constructor(
        message: string = "Fetch request failed",
        code: number = 500,
        detail?: string
    ) {
        super(message);
        this.name = "Error";
        this.code = code;
        this.detail = detail;
    }
}

export function handleErrorResponse(error: unknown) {
    if (
        error instanceof AuthRequiredError ||
        error instanceof AuthFailedError ||
        error instanceof CustomError
    ) {
        return NextResponse.json(
            { error: error.message },
            { status: error.code, statusText: error.detail || error.message }
        );
    }
    return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500, statusText: "Unknown error." }
    );
}

export function handleError(error: unknown) {
    if (
        error instanceof AuthRequiredError ||
        error instanceof AuthFailedError ||
        error instanceof CustomError
    ) {
        throw new CustomError(error.message, error.code, error.detail);
    }
    throw new CustomError("Internal Server Error", 500, "Unknown error.");
}
