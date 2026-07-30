using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using NeoPay.Api.Extensions;
using NeoPay.Framework.Managers;
using NeoPay.Framework.Models.Utility;
using NeoPay.Infrastructure.Constants;

namespace NeoPay.Api.Controllers.Admin;

[Route("api/[controller]/[action]")]
public class UtilityController : BaseAdminController
{
    private readonly UtilityManager _utilityManager;

    public UtilityController(UtilityManager utilityManager)
    {
        _utilityManager = utilityManager;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateUtilityModel model)
    {
        var result = await _utilityManager.Create(model);
        return result.ToActionResult();
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateUtilityModel utility)
    {
        var result = await _utilityManager.Update(utility);
        return result.ToActionResult();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _utilityManager.Delete(id);
        return result.ToActionResult();
    }

    [HttpGet]
    [OutputCache(PolicyName = CachePolicyConstants.Cache1Day)]
    public async Task<IActionResult> GetAll()
    {
        var result = await _utilityManager.GetAll();
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _utilityManager.GetById(id);
        return result.ToActionResult();
    }
}
