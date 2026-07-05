using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Exceptions;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service;

public class LanguageService
{
    private readonly ILanguageRepository _languageRepository;

    public LanguageService(ILanguageRepository languageRepository)
    {
        _languageRepository = languageRepository;
    }

    public async Task<LanguageEntity> Create(LanguageEntity entity)
    {
        if (await _languageRepository.CodeAlreadyExists(entity.Code))
            throw new DuplicateException("Language code already exists");
        return await _languageRepository.Insert(entity);
    }

    public async Task<LanguageEntity?> GetById(int id)
    {
        return await _languageRepository.GetById(id);
    }

    public async Task<IEnumerable<LanguageEntity>> GetAll()
    {
        return await _languageRepository.GetAll();
    }

    public async Task<PagedList<LanguageEntity>> GetAll(PagedFilter filter)
    {
        return await _languageRepository.GetAll(filter);
    }

    public async Task<LanguageEntity> Update(LanguageEntity entity)
    {
        var exists = await _languageRepository.LanguageExists(entity.Id);
        if (!exists)
            throw new NotFoundException($"Language with ID {entity.Id} not found");
        return await _languageRepository.Update(entity);
    }

    public async Task Delete(int id)
    {
        var languageEntity = await _languageRepository.GetById(id);
        if (languageEntity == null)
            throw new NotFoundException($"Language with ID {id} not found");

        await _languageRepository.Delete(languageEntity);
    }
}