using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Exceptions;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service;

public class TariffService
{
    private readonly ITariffRepository _tariffRepository;

    public TariffService(ITariffRepository tariffRepository)
    {
        _tariffRepository = tariffRepository;
    }

    public async Task<TariffEntity> Create(TariffEntity entity)
    {
        return await _tariffRepository.Insert(entity);
    }

    public async Task<TariffEntity?> GetById(int id)
    {
        return await _tariffRepository.GetById(id);
    }

    public async Task<IEnumerable<TariffEntity>> GetAll()
    {
        return await _tariffRepository.GetAll();
    }

    public async Task<PagedList<TariffEntity>> GetAll(PagedFilter filter)
    {
        return await _tariffRepository.GetAll(filter);
    }

    public async Task<TariffEntity> Update(TariffEntity entity)
    {
        return await _tariffRepository.Update(entity);
    }

    public async Task Delete(int id)
    {
        var tariff = await _tariffRepository.GetById(id);
        if (tariff == null)
            throw new NotFoundException($"Tariff with ID {id} not found");

        await _tariffRepository.Delete(tariff);
    }
}
