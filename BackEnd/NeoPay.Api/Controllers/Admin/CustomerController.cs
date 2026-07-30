using Microsoft.AspNetCore.Mvc;
using NeoPay.Api.Extensions;
using NeoPay.Framework.Managers;
using NeoPay.Framework.Models.Customer;

namespace NeoPay.Api.Controllers.Admin;

[Route("api/[controller]/[action]")]
public class CustomerController : BaseAdminController
{
    private readonly CustomerManager _customerManager;

    public CustomerController(CustomerManager customerManager)
    {
        _customerManager = customerManager;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateCustomerModel model)
    {
        var result = await _customerManager.Create(model);
        return result.ToActionResult();
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateCustomerModel customer)
    {
        var result = await _customerManager.Update(customer);
        return result.ToActionResult();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _customerManager.Delete(id);
        return result.ToActionResult();
    }

    [HttpPost]
    public async Task<IActionResult> GetAll([FromBody] GetCustomerFilterModel filter)
    {
        var result = await _customerManager.GetAll(filter);
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _customerManager.GetById(id);
        return result.ToActionResult();
    }
}
