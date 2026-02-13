using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using NeoPay.Domain.Exceptions;
using NeoPay.Framework.Errors.FrontEndErrors;
using NeoPay.Framework.Managers;
using NeoPay.Framework.Models.Mobile;

namespace NeoPay.Api.Controllers.Mobile;

[Route("api/mobile")]
public class MobileApiController : BaseMobileController
{
    private readonly MobileManager _mobileManager;

    public MobileApiController(MobileManager mobileManager)
    {
        _mobileManager = mobileManager;
    }

    /// <summary>
    /// Get meter by barcode value
    /// </summary>
    [HttpGet("meters/by-barcode/{barcode}")]
    public async Task<IActionResult> GetMeterByBarcode(string barcode)
    {
        try
        {
            var result = await _mobileManager.GetMeterByBarcode(barcode);
            if (result == null)
                return NotFound(FrontEndErrors.MeterCouldNotBeFound);

            return Ok(result);
        }
        catch (Exception)
        {
            return BadRequest(FrontEndErrors.ErrorLoadingMeters);
        }
    }

    /// <summary>
    /// Get meter by ID
    /// </summary>
    [HttpGet("meters/{id}")]
    public async Task<IActionResult> GetMeterById(int id)
    {
        try
        {
            var result = await _mobileManager.GetMeterById(id);
            return Ok(result);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.MeterCouldNotBeFound);
        }
    }

    /// <summary>
    /// Get last reading for a meter
    /// </summary>
    [HttpGet("meters/{meterId}/last-reading")]
    public async Task<IActionResult> GetLastReading(int meterId)
    {
        try
        {
            var result = await _mobileManager.GetLastReading(meterId);
            return Ok(result);
        }
        catch (Exception)
        {
            return BadRequest(FrontEndErrors.ErrorLoadingMeters);
        }
    }

    /// <summary>
    /// Get connection by ID
    /// </summary>
    [HttpGet("connections/{id}")]
    public async Task<IActionResult> GetConnectionById(int id)
    {
        try
        {
            var result = await _mobileManager.GetConnectionById(id);
            return Ok(result);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.ConnectionCouldNotBeFound);
        }
    }

    /// <summary>
    /// Search connections
    /// </summary>
    [HttpGet("connections")]
    public async Task<IActionResult> SearchConnections([FromQuery] MobileConnectionSearchModel searchModel)
    {
        try
        {
            var result = await _mobileManager.SearchConnections(searchModel);
            return Ok(result);
        }
        catch (Exception)
        {
            return BadRequest(FrontEndErrors.ErrorLoadingConnections);
        }
    }

    /// <summary>
    /// Submit a new reading
    /// </summary>
    [HttpPost("readings")]
    public async Task<IActionResult> CreateReading([FromBody] CreateMobileReadingModel model)
    {
        try
        {
            var result = await _mobileManager.CreateReading(model);
            return Ok(result);
        }
        catch (ValidationException ex)
        {
            return ValidationError(ex);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.MeterCouldNotBeFound);
        }
    }
}
