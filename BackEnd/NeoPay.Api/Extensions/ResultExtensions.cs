using System.Net;
using Microsoft.AspNetCore.Mvc;
using NeoPay.Application.Shared.Result;
using NeoPay.Framework.Errors;

namespace NeoPay.Api.Extensions;

/// <summary>
/// Translates an application-layer <see cref="Result" /> into the HTTP response the API contract expects.
/// This is the single place where <see cref="ResultStatusCode" /> becomes an HTTP status code —
/// adding a business error should never require a change here, only a new message.
/// </summary>
public static class ResultExtensions
{
    /// <summary>
    /// Maps a value-less result. Success produces <c>200 OK</c> with no body.
    /// </summary>
    public static IActionResult ToActionResult(this Result result)
    {
        return result.IsSuccess
            ? new OkResult()
            : ErrorResponse(result.StatusCode, result.Errors);
    }

    /// <summary>
    /// Maps a result carrying a value. Success produces <c>200 OK</c> with the value as the body.
    /// </summary>
    public static IActionResult ToActionResult<T>(this ResultWithValue<T> result)
    {
        return result.IsSuccess
            ? new OkObjectResult(result.Value)
            : ErrorResponse(result.StatusCode, result.Errors);
    }

    /// <summary>
    /// Maps a result carrying a value, projecting it through <paramref name="onSuccess" /> first.
    /// Lets a controller return a response model without unwrapping the result by hand.
    /// </summary>
    public static IActionResult ToActionResult<T, TOut>(this ResultWithValue<T> result, Func<T, TOut> onSuccess)
    {
        return result.IsSuccess
            ? new OkObjectResult(onSuccess(result.Value!))
            : ErrorResponse(result.StatusCode, result.Errors);
    }

    private static IActionResult ErrorResponse(ResultStatusCode statusCode, List<string> errors)
    {
        var httpStatusCode = ToHttpStatusCode(statusCode);
        var errorCode = ToErrorCode(statusCode);

        var model = new ApiErrorModel
        {
            Code    = errorCode,
            Message = errors.FirstOrDefault() ?? httpStatusCode.ToString(),
            Errors = errors.Select(error => new ApiErrorModel.ApiError
            {
                ErrorCode    = errorCode,
                ErrorMessage = error
            })
        };

        return new JsonResult(model) { StatusCode = (int)httpStatusCode };
    }

    private static HttpStatusCode ToHttpStatusCode(ResultStatusCode statusCode)
    {
        return statusCode switch
        {
            ResultStatusCode.Success         => HttpStatusCode.OK,
            ResultStatusCode.Validation      => HttpStatusCode.BadRequest,
            ResultStatusCode.Unauthenticated => HttpStatusCode.Unauthorized,
            ResultStatusCode.Forbidden       => HttpStatusCode.Forbidden,
            ResultStatusCode.NotFound        => HttpStatusCode.NotFound,
            ResultStatusCode.Conflict        => HttpStatusCode.Conflict,
            ResultStatusCode.Failure         => HttpStatusCode.InternalServerError,
            _                                => HttpStatusCode.InternalServerError
        };
    }

    private static string ToErrorCode(ResultStatusCode statusCode)
    {
        return statusCode switch
        {
            ResultStatusCode.Validation      => ApiErrorCodes.ValidationError,
            ResultStatusCode.Unauthenticated => ApiErrorCodes.Unauthenticated,
            ResultStatusCode.Forbidden       => ApiErrorCodes.Forbidden,
            ResultStatusCode.NotFound        => ApiErrorCodes.NotFound,
            ResultStatusCode.Conflict        => ApiErrorCodes.Conflict,
            _                                => ApiErrorCodes.InternalServerError
        };
    }
}
