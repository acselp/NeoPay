using Microsoft.AspNetCore.Mvc;
using NeoPay.Api.Extensions;
using NeoPay.Framework.Managers;
using NeoPay.Framework.Models.Address;

namespace NeoPay.Api.Controllers.Admin;

[Route("api/[controller]/[action]")]
public class AddressController : BaseAdminController
{
    private readonly AddressManager _addressManager;

    public AddressController(AddressManager addressManager)
    {
        _addressManager = addressManager;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateAddressModel address)
    {
        var result = await _addressManager.Create(address);
        return result.ToActionResult();
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateAddressModel address)
    {
        var result = await _addressManager.Update(address);
        return result.ToActionResult();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _addressManager.Delete(id);
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll(GetAddressFilterModel filter)
    {
        var result = await _addressManager.GetAll(filter);
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _addressManager.GetById(id);
        return result.ToActionResult();
    }
}
