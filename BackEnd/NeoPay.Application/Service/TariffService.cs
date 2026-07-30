using NeoPay.Application.Repository;
using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service;

public class TariffService : ITariffService
{
    private readonly ITariffRepository _tariffRepository;

    public TariffService(ITariffRepository tariffRepository)
    {
        _tariffRepository = tariffRepository;
    }

    public async Task<ResultWithValue<TariffEntity>> Create(TariffEntity entity)
    {
        return Result.Success(await _tariffRepository.Insert(entity));
    }

    public async Task<ResultWithValue<TariffEntity>> GetById(int id)
    {
        var tariff = await _tariffRepository.GetById(id);
        if (tariff == null)
            return Result.NotFound($"Tariff with ID {id} not found");

        return Result.Success(tariff);
    }

    public async Task<ResultWithValue<IEnumerable<TariffEntity>>> GetAll()
    {
        return Result.Success(await _tariffRepository.GetAll());
    }

    public async Task<ResultWithValue<PagedList<TariffEntity>>> GetAll(PagedFilter filter)
    {
        return Result.Success(await _tariffRepository.GetAll(filter));
    }

    public async Task<ResultWithValue<TariffEntity>> Update(TariffEntity entity)
    {
        return Result.Success(await _tariffRepository.Update(entity));
    }

    public async Task<Result> Delete(int id)
    {
        var tariff = await _tariffRepository.GetById(id);
        if (tariff == null)
            return Result.NotFound($"Tariff with ID {id} not found");

        await _tariffRepository.Delete(tariff);
        return Result.Success();
    }
}
