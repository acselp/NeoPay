using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using NeoPay.Domain.Exceptions;
using NeoPay.Framework.Errors.FrontEndErrors;
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
    public async Task<IActionResult> Create([FromBody] CreateCustomerModel customer)
    {
        try
        {
            await _customerManager.Create(customer);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return ValidationError(ex);
        }
        catch (CustomerAccountNumberAlreadyExists)
        {
            return BadRequest(FrontEndErrors.CustomerAccountNrAlreadyExists);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateCustomerModel customer)
    {
        try
        {
            await _customerManager.Update(customer);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return ValidationError(ex);
        }
        catch (CustomerAccountNumberAlreadyExists ex)
        {
            return BadRequest(FrontEndErrors.CustomerAccountNrAlreadyExists);
        }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _customerManager.Delete(id);
            return Ok();
        }
        catch (NotFoundException)
        {
            return BadRequest(FrontEndErrors.CustomerCouldNotBeFound);
        }
    }

    [HttpPost]
    public async Task<IActionResult> GetAll([FromBody] GetCustomerFilterModel filter)
    {
        try
        {
            var result = await _customerManager.GetAll(filter);
            return Ok(result);
        }
        catch (Exception)
        {
            return BadRequest(FrontEndErrors.ErrorLoadingCustomers);
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var result = await _customerManager.GetById(id);
            return Ok(result);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.CustomerCouldNotBeFound);
        }
    }
}