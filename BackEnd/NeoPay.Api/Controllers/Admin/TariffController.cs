using Microsoft.AspNetCore.Mvc;
using NeoPay.Api.Extensions;
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
        var result = await _tariffManager.Create(model);
        return result.ToActionResult();
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateTariffModel tariff)
    {
        var result = await _tariffManager.Update(tariff);
        return result.ToActionResult();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _tariffManager.Delete(id);
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _tariffManager.GetAll();
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _tariffManager.GetById(id);
        return result.ToActionResult();
    }
}
