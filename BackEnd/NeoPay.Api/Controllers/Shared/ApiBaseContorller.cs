using System.Net;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using NeoPay.Framework.Errors;
using NeoPay.Framework.Errors.ApiError;
using NeoPay.Framework.Errors.FrontEndErrors;
using NeoPay.Framework.Models.Shared;

namespace NeoPay.Api.Controllers.Shared;

[ApiController]
public class ApiBaseController : Controller
{
    protected PagedResultModel<T> PagedResult<T>(IList<T> data, int page, int pageSize)
    {
        return new PagedResultModel<T>
        {
            Total     = data.Count,
            PageSize  = pageSize,
            PageIndex = page,
            Data      = data
        };
    }

    protected IActionResult ValidationError(ValidationException exception)
    {
        var error = new ApiErrorModel
        {
            Code    = FrontEndErrors.ValidationError.ErrorCode,
            Message = FrontEndErrors.ValidationError.ErrorMessage,
            Errors = exception.Errors.Select(it => new ApiErrorModel.ApiError
            {
                AttemptedValue = it.AttemptedValue,
                ErrorCode      = it.ErrorCode,
                ErrorMessage   = it.ErrorMessage,
                PropertyName   = it.PropertyName
            })
        };

        return BadRequest(error);
    }

    protected IActionResult Forbidden(ApiErrorModel model)
    {
        return RestResponse(HttpStatusCode.Forbidden, model);
    }

    protected IActionResult ForbiddenError()
    {
        var error = CreateError(ApiErrorCodes.Forbidden)
                   .SetMessage("This operation is forbidden.")
                   .Build();

        return RestResponse(HttpStatusCode.Forbidden, error);
    }

    protected IActionResult UnAuthorizedActionError()
    {
        var error = CreateError(ApiErrorCodes.Forbidden)
                   .SetMessage(
                               "It appears that you don't have permission to access this page. Please  make sure you're authorized to view this content and/or contact your administrator.")
                   .Build();

        return RestResponse(HttpStatusCode.Forbidden, error);
    }

    protected IActionResult Unauthorized(ApiErrorModel model)
    {
        return RestResponse(HttpStatusCode.Unauthorized, model);
    }

    protected IActionResult NotFound(ApiErrorModel model)
    {
        return RestResponse(HttpStatusCode.NotFound, model);
    }

    protected IActionResult RestResponse(HttpStatusCode code, object body = null)
    {
        var restResponse = new JsonResult(body) { StatusCode = (int)code };
        return restResponse;
    }

    protected ApiErrorBuilder CreateError(string code)
    {
        var descriptor = ControllerContext
           .ActionDescriptor;

        return ApiErrorBuilder.New()
                              .SetCode(code);
    }

    protected IActionResult BadRequest(Error errorModel)
    {
        var error = CreateError(errorModel.ErrorCode)
                   .SetMessage(errorModel.ErrorMessage)
                   .Build();
        return BadRequest(error);
    }
}