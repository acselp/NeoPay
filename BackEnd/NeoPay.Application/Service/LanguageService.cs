using NeoPay.Application.Repository;
using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service;

public class LanguageService : ILanguageService
{
    private readonly ILanguageRepository _languageRepository;

    public LanguageService(ILanguageRepository languageRepository)
    {
        _languageRepository = languageRepository;
    }

    public async Task<ResultWithValue<LanguageEntity>> Create(LanguageEntity entity)
    {
        if (await _languageRepository.CodeAlreadyExists(entity.Code))
            return Result.Conflict("Language code already exists");

        return Result.Success(await _languageRepository.Insert(entity));
    }

    public async Task<ResultWithValue<LanguageEntity>> GetById(int id)
    {
        var language = await _languageRepository.GetById(id);
        if (language == null)
            return Result.NotFound($"Language with ID {id} not found");

        return Result.Success(language);
    }

    public async Task<ResultWithValue<IEnumerable<LanguageEntity>>> GetAll()
    {
        return Result.Success(await _languageRepository.GetAll());
    }

    public async Task<ResultWithValue<PagedList<LanguageEntity>>> GetAll(PagedFilter filter)
    {
        return Result.Success(await _languageRepository.GetAll(filter));
    }

    public async Task<ResultWithValue<LanguageEntity>> Update(LanguageEntity entity)
    {
        var exists = await _languageRepository.LanguageExists(entity.Id);
        if (!exists)
            return Result.NotFound($"Language with ID {entity.Id} not found");

        return Result.Success(await _languageRepository.Update(entity));
    }

    public async Task<Result> Delete(int id)
    {
        var languageEntity = await _languageRepository.GetById(id);
        if (languageEntity == null)
            return Result.NotFound($"Language with ID {id} not found");

        await _languageRepository.Delete(languageEntity);
        return Result.Success();
    }
}
