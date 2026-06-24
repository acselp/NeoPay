using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using NeoPay.Domain.Exceptions;
using NeoPay.Framework.Errors.FrontEndErrors;
using NeoPay.Framework.Managers;
using NeoPay.Framework.Models.Unit;
using NeoPay.Framework.Models.Utility;

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
        try
        {
            await _unitManager.Create(model);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return ValidationError(ex);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateUnitModel utility)
    {
        try
        {
            await _unitManager.Update(utility);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return ValidationError(ex);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.UtilityCouldNotBeFound);
        }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        await _unitManager.Delete(id);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _unitManager.GetAll();
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var result = await _unitManager.GetById(id);
            return Ok(result);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.UtilityCouldNotBeFound);
        }
    }
}