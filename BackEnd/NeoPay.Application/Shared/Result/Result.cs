namespace NeoPay.Application.Shared.Result;

public sealed class Result
{
    private Result(bool isSuccess, ResultStatusCode statusCode = ResultStatusCode.Success, List<string>? errors = null)
    {
        IsSuccess = isSuccess;
        StatusCode = statusCode;
        Errors = errors ?? new List<string>();
    }

    /// <summary>
    /// Gets a value indicating whether the operation succeeded.
    /// </summary>
    public bool IsSuccess { get; init; }

    /// <summary>
    /// Gets the status code that best represents this result.
    /// <see cref="F:NeoPay.Application.Shared.Result.ResultStatusCode.Success" /> when successful.
    /// Mapped to an HTTP status code by the API layer.
    /// </summary>
    public ResultStatusCode StatusCode { get; init; }

    /// <summary>
    /// Gets the list of error messages. Empty when <see cref="P:Result.IsSuccess" /> is <c>true</c>.
    /// </summary>
    public List<string> Errors { get; init; }

    /// <summary>Creates a successful result.</summary>
    public static Result Success() => new Result(true);

    /// <summary>
    /// Creates a successful result with the given value, inferring the type from the argument.
    /// </summary>
    public static ResultWithValue<T> Success<T>(T value) => ResultWithValue<T>.Success(value);

    /// <summary>
    /// Relays an existing result, preserving its status code and errors.
    /// Used to pass a failure up a layer whose value type differs, e.g. from
    /// <c>ResultWithValue&lt;TEntity&gt;</c> to <c>ResultWithValue&lt;TModel&gt;</c>.
    /// </summary>
    public static Result From(ResultStatusCode statusCode, List<string> errors)
    {
        return new Result(statusCode == ResultStatusCode.Success, statusCode, errors);
    }

    /// <summary>Creates a Not Found failure (maps to 404).</summary>
    public static Result NotFound(string error)
    {
        return new Result(false, ResultStatusCode.NotFound, [error]);
    }

    /// <summary>Creates a Conflict failure (maps to 409).</summary>
    public static Result Conflict(string error)
    {
        return new Result(false, ResultStatusCode.Conflict, [error]);
    }

    /// <summary>Creates an Unauthenticated failure (maps to 401).</summary>
    public static Result Unauthenticated(string error)
    {
        return new Result(false, ResultStatusCode.Unauthenticated, [error]);
    }

    /// <summary>Creates a Forbidden failure (maps to 403).</summary>
    public static Result Forbidden(string error)
    {
        return new Result(false, ResultStatusCode.Forbidden, [error]);
    }

    /// <summary>Creates a Validation failure with multiple errors (maps to 400).</summary>
    public static Result Validation(List<string> errors)
    {
        return new Result(false, ResultStatusCode.Validation, errors);
    }

    /// <summary>Creates a Validation failure with a single error (maps to 400).</summary>
    public static Result Validation(string error)
    {
        return new Result(false, ResultStatusCode.Validation, [error]);
    }

    /// <summary>Creates an internal failure (maps to 500).</summary>
    public static Result Failure(string error)
    {
        return new Result(false, ResultStatusCode.Failure, [error]);
    }

    /// <summary>Creates an internal failure with multiple errors (maps to 500).</summary>
    public static Result Failure(List<string> errors)
    {
        return new Result(false, ResultStatusCode.Failure, errors);
    }
}