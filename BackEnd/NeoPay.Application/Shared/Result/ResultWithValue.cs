namespace NeoPay.Application.Shared.Result;

public sealed class ResultWithValue<T>
{
    private ResultWithValue(bool isSuccess, T? value = default, ResultStatusCode statusCode = ResultStatusCode.Success,
        List<string>? errors = null)
    {
        IsSuccess = isSuccess;
        Value = value;
        StatusCode = statusCode;
        Errors = errors ?? new List<string>();
    }

    /// <summary>
    /// Gets a value indicating whether the operation succeeded.
    /// </summary>
    public bool IsSuccess { get; init; }

    /// <summary>
    /// Gets the result value. Only meaningful when <see cref="P:ResultGeneric`1.IsSuccess" /> is <c>true</c>.
    /// </summary>
    public T? Value { get; init; }

    /// <summary>
    /// Gets the status code that best represents this result.
    /// <see cref="F:NeoPay.Application.Shared.Result.ResultStatusCode.Success" /> when successful.
    /// Mapped to an HTTP status code by the API layer.
    /// </summary>
    public ResultStatusCode StatusCode { get; init; }

    /// <summary>
    /// Gets the list of error messages. Empty when <see cref="P:ResultGeneric`1.IsSuccess" /> is <c>true</c>.
    /// </summary>
    public List<string> Errors { get; init; }

    /// <summary>
    /// Implicitly converts a non-generic <see cref="T:Result" /> (typically a failure)
    /// to <see cref="T:ResultGeneric`1" />.
    /// Enables returning <c>Result.Failure(msg)</c> from methods typed as <c>ResultGeneric&lt;T&gt;</c>.
    /// </summary>
    public static implicit operator ResultWithValue<T>(Result result)
    {
        return new ResultWithValue<T>(result.IsSuccess, default, result.StatusCode, result.Errors);
    }

    /// <summary>
    /// Implicitly discards the value, converting to a non-generic <see cref="T:Result" />.
    /// Enables returning a service call that produces a value from a method that only
    /// reports success or failure.
    /// </summary>
    public static implicit operator Result(ResultWithValue<T> result)
    {
        return Result.From(result.StatusCode, result.Errors);
    }

    /// <summary>Creates a successful result with the given value.</summary>
    public static ResultWithValue<T> Success(T value) => new ResultWithValue<T>(true, value);

    /// <summary>Creates a Not Found failure (maps to 404).</summary>
    public static ResultWithValue<T> NotFound(string error)
    {
        return new ResultWithValue<T>(false, statusCode: ResultStatusCode.NotFound, errors: [error]);
    }

    /// <summary>Creates a Conflict failure (maps to 409).</summary>
    public static ResultWithValue<T> Conflict(string error)
    {
        return new ResultWithValue<T>(false, statusCode: ResultStatusCode.Conflict, errors: [error]);
    }

    /// <summary>Creates an Unauthenticated failure (maps to 401).</summary>
    public static ResultWithValue<T> Unauthenticated(string error)
    {
        return new ResultWithValue<T>(false, statusCode: ResultStatusCode.Unauthenticated, errors: [error]);
    }

    /// <summary>Creates a Forbidden failure (maps to 403).</summary>
    public static ResultWithValue<T> Forbidden(string error)
    {
        return new ResultWithValue<T>(false, statusCode: ResultStatusCode.Forbidden, errors: [error]);
    }

    /// <summary>Creates a Validation failure with multiple errors (maps to 400).</summary>
    public static ResultWithValue<T> Validation(List<string> errors)
    {
        return new ResultWithValue<T>(false, statusCode: ResultStatusCode.Validation, errors: errors);
    }

    /// <summary>Creates a Validation failure with a single error (maps to 400).</summary>
    public static ResultWithValue<T> Validation(string error)
    {
        return new ResultWithValue<T>(false, statusCode: ResultStatusCode.Validation, errors: [error]);
    }

    /// <summary>Creates an internal failure (maps to 500).</summary>
    public static ResultWithValue<T> Failure(string error)
    {
        return new ResultWithValue<T>(false, statusCode: ResultStatusCode.Failure, errors: [error]);
    }

    /// <summary>Creates an internal failure with multiple errors (maps to 500).</summary>
    public static ResultWithValue<T> Failure(List<string> errors)
    {
        return new ResultWithValue<T>(false, statusCode: ResultStatusCode.Failure, errors: errors);
    }
}