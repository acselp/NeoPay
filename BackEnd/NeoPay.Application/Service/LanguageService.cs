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
        return await _languageRepository.Update(entity);
    }

    public async Task Delete(int id)
    {
        var utility = await _languageRepository.GetById(id);
        if (utility == null)
            throw new NotFoundException($"Language with ID {id} not found");

        await _languageRepository.Delete(utility);
    }
}