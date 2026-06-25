using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using NeoPay.Domain.Exceptions;
using NeoPay.Framework.Errors.FrontEndErrors;
using NeoPay.Framework.Managers;
using NeoPay.Framework.Models.Tariff;

namespace NeoPay.Api.Controllers.Admin;

[Route("api/[controller]/[action]")]
public class TariffController : BaseAdminController
{
    private readonly TariffManager _tariffManager;

    public TariffController(TariffManager tariffManager)
    {
        _tariffManager = tariffManager;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateTariffModel model)
    {
        try
        {
            await _tariffManager.Create(model);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return ValidationError(ex);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateTariffModel tariff)
    {
        try
        {
            await _tariffManager.Update(tariff);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return ValidationError(ex);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.TariffCouldNotBeFound);
        }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        await _tariffManager.Delete(id);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _tariffManager.GetAll();
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var result = await _tariffManager.GetById(id);
            return Ok(result);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.TariffCouldNotBeFound);
        }
    }
}
