using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using NeoPay.Framework.Managers;
using NeoPay.Framework.Models.MeterReading;

namespace NeoPay.Api.Controllers.Admin;

[Route("api/[controller]/[action]")]
public class MeterReadingController : BaseAdminController
{
    private readonly MeterReadingManager _meterReadingManager;

    public MeterReadingController(MeterReadingManager meterReadingManager)
    {
        _meterReadingManager = meterReadingManager;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateMeterReadingModel model)
    {
        try
        {
            return Ok(await _meterReadingManager.Create(model));
        }
        catch (ValidationException ex)
        {
            return ValidationError(ex);
        }
    }
}
