using FluentValidation;
using NeoPay.Application.Service;
using NeoPay.Domain.Exceptions;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Language;
using NeoPay.Framework.Validators.Language;

namespace NeoPay.Framework.Managers;

public class LanguageManager
{
    private readonly LanguageService _languageService;
    private readonly CreateLanguageModelValidator _createLanguageModelValidator;
    private readonly UpdateLanguageModelValidator _updateLanguageModelValidator;
    private readonly LanguageMapper _languageMapper;

    public LanguageManager(LanguageService LanguageService, CreateLanguageModelValidator createLanguageModelValidator, LanguageMapper LanguageMapper, UpdateLanguageModelValidator updateLanguageModelValidator)
    {
        _languageService = LanguageService;
        _createLanguageModelValidator = createLanguageModelValidator;
        _languageMapper = LanguageMapper;
        _updateLanguageModelValidator = updateLanguageModelValidator;
    }

    public async Task Create(CreateLanguageModel model)
    {
        await _createLanguageModelValidator.ValidateAndThrowAsync(model);
        await _languageService.Create(_languageMapper.Map(model));
    }

    public async Task Update(UpdateLanguageModel model)
    {
        await _updateLanguageModelValidator.ValidateAndThrowAsync(model);
        await _languageService.Update(_languageMapper.Map(model));
    }

    public async Task Delete(int id)
    {
        await _languageService.Delete(id);
    }

    public async Task<LanguageModel> GetById(int id)
    {
        var entity = await _languageService.GetById(id);
        if (entity == null)
            throw new NotFoundException($"Language with ID {id} not found");

        return _languageMapper.Map(entity);
    }

    public async Task<List<LanguageModel>> GetAll()
    {
        var entities = await _languageService.GetAll();
        return _languageMapper.Map(entities);
    }
}