/**
 * Define a custom ApiError class inheriting from the built-in Error class.
 */
class ApiError extends Error {
  // Define properties
  statusCode: number

  constructor(statusCode: number, message: string) {
    // Call the parent Error class constructor to utilize its features
    super(message)

    // Set the name of this custom Error, default to "Error" if not set
    this.name = "ApiError"

    // Assign the HTTP status code
    this.statusCode = statusCode

    // Capture the stack trace for debugging convenience
    Error.captureStackTrace(this, this.constructor)
  }
}

export default ApiError
