using Microsoft.AspNetCore.Mvc;
using NeoPay.Api.Extensions;
using NeoPay.Framework.Managers;
using NeoPay.Framework.Models.Unit;

namespace NeoPay.Api.Controllers.Admin;

[Route("api/[controller]/[action]")]
public class UnitController : BaseAdminController
{
    private readonly UnitManager _unitManager;

    public UnitController(UnitManager unitManager)
    {
        _unitManager = unitManager;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateUnitModel model)
    {
        var result = await _unitManager.Create(model);
        return result.ToActionResult();
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateUnitModel unit)
    {
        var result = await _unitManager.Update(unit);
        return result.ToActionResult();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _unitManager.Delete(id);
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _unitManager.GetAll();
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _unitManager.GetById(id);
        return result.ToActionResult();
    }
}
