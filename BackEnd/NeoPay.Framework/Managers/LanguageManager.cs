using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Language;
using NeoPay.Framework.Validators.Language;

namespace NeoPay.Framework.Managers;

public class LanguageManager
{
    private readonly ILanguageService _languageService;
    private readonly CreateLanguageModelValidator _createLanguageModelValidator;
    private readonly UpdateLanguageModelValidator _updateLanguageModelValidator;
    private readonly LanguageMapper _languageMapper;

    public LanguageManager(ILanguageService LanguageService, CreateLanguageModelValidator createLanguageModelValidator, LanguageMapper LanguageMapper, UpdateLanguageModelValidator updateLanguageModelValidator)
    {
        _languageService = LanguageService;
        _createLanguageModelValidator = createLanguageModelValidator;
        _languageMapper = LanguageMapper;
        _updateLanguageModelValidator = updateLanguageModelValidator;
    }

    public async Task<Result> Create(CreateLanguageModel model)
    {
        var validation = await _createLanguageModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _languageService.Create(_languageMapper.Map(model));
    }

    public async Task<Result> Update(UpdateLanguageModel model)
    {
        var validation = await _updateLanguageModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _languageService.Update(_languageMapper.Map(model));
    }

    public async Task<Result> Delete(int id)
    {
        return await _languageService.Delete(id);
    }

    public async Task<ResultWithValue<LanguageModel>> GetById(int id)
    {
        var result = await _languageService.GetById(id);
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_languageMapper.Map(result.Value!));
    }

    public async Task<ResultWithValue<List<LanguageModel>>> GetAll()
    {
        var result = await _languageService.GetAll();
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_languageMapper.Map(result.Value!));
    }
}
