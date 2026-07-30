using Microsoft.AspNetCore.Mvc;
using NeoPay.Api.Extensions;
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
        var result = await _languageManager.Create(model);
        return result.ToActionResult();
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateLanguageModel language)
    {
        var result = await _languageManager.Update(language);
        return result.ToActionResult();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _languageManager.Delete(id);
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _languageManager.GetAll();
        return result.ToActionResult();
    }

    [HttpGet]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _languageManager.GetById(id);
        return result.ToActionResult();
    }
}
