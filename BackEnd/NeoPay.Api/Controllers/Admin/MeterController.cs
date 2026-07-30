using Microsoft.AspNetCore.Mvc;
using NeoPay.Api.Extensions;
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
        var result = await _meterManager.Create(meter);
        return result.ToActionResult();
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateMeterModel meter)
    {
        var result = await _meterManager.Update(meter);
        return result.ToActionResult();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _meterManager.Delete(id);
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _meterManager.GetById(id);
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _meterManager.GetAll();
        return result.ToActionResult();
    }
}
