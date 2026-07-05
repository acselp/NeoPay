using FluentValidation;
using Microsoft.AspNetCore.Mvc;
using NeoPay.Domain.Exceptions;
using NeoPay.Framework.Errors.FrontEndErrors;
using NeoPay.Framework.Managers;
using NeoPay.Framework.Models.Language;

namespace NeoPay.Api.Controllers.Admin;

[Route("api/[controller]/[action]")]
public class LanguageController : BaseAdminController
{
    private readonly LanguageManager _languageManager;

    public LanguageController(LanguageManager languageManager)
    {
        _languageManager = languageManager;
    }

    [HttpPost]
    public async Task<IActionResult> Create(CreateLanguageModel model)
    {
        try
        {
            await _languageManager.Create(model);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return ValidationError(ex);
        }
        catch (DuplicateException ex)
        {
            return BadRequest(FrontEndErrors.LanguageCodeDuplicateFound);
        }
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateLanguageModel language)
    {
        try
        {
            await _languageManager.Update(language);
            return Ok();
        }
        catch (ValidationException ex)
        {
            return ValidationError(ex);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.LanguageCouldNotBeFound);
        }
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        await _languageManager.Delete(id);
        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _languageManager.GetAll();
        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        try
        {
            var result = await _languageManager.GetById(id);
            return Ok(result);
        }
        catch (NotFoundException)
        {
            return NotFound(FrontEndErrors.LanguageCouldNotBeFound);
        }
    }
}