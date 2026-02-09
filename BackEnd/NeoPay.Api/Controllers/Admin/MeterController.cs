using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using NeoPay.Domain.Exceptions;
using NeoPay.Framework.Errors.FrontEndErrors;
using NeoPay.Framework.Managers;
using NeoPay.Framework.Models.Meter;

namespace NeoPay.Api.Controllers.Admin;

[Route("api/[controller]/[action]")]
public class MeterController : BaseAdminController
{
    private readonly MeterManager _meterManager;

    public MeterController(MeterManager meterManager)
    {
        _meterManager = meterManager;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateMeterModel meter)
    {
        try
        {
            await _meterManager.Create(meter);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return ValidationError(ex);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.ConnectionCouldNotBeFound);
        }
        catch (DuplicateException)
        {
            return BadRequest(FrontEndErrors.MeterSerialNumberExists);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateMeterModel meter)
    {
        try
        {
            await _meterManager.Update(meter);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return ValidationError(ex);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.MeterCouldNotBeFound);
        }
        catch (DuplicateException)
        {
            return BadRequest(FrontEndErrors.MeterSerialNumberExists);
        }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _meterManager.Delete(id);
            return Ok();
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.MeterCouldNotBeFound);
        }
    }

    // [HttpGet]
    // public async Task<IActionResult> GetAll([FromQuery] GetMeterFilterModel filter)
    // {
    //     try
    //     {
    //         var result = await _meterManager.GetAll(filter);
    //         return Ok(result);
    //     }
    //     catch (Exception)
    //     {
    //         return BadRequest(FrontEndErrors.ErrorLoadingMeters);
    //     }
    // }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var result = await _meterManager.GetById(id);
            return Ok(result);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.MeterCouldNotBeFound);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetByConnectionId(int connectionId)
    {
        try
        {
            var result = await _meterManager.GetByConnectionId(connectionId);
            return Ok(result);
        }
        catch (Exception)
        {
            return BadRequest(FrontEndErrors.ErrorLoadingMeters);
        }
    }
}
