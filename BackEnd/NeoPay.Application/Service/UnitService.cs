using NeoPay.Application.Repository;
using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service;

public class UnitService : IUnitService
{
    private readonly IUnitRepository _unitRepository;

    public UnitService(IUnitRepository unitRepository)
    {
        _unitRepository = unitRepository;
    }

    public async Task<ResultWithValue<UnitEntity>> Create(UnitEntity entity)
    {
        return Result.Success(await _unitRepository.Insert(entity));
    }

    public async Task<ResultWithValue<UnitEntity>> GetById(int id)
    {
        var unit = await _unitRepository.GetById(id);
        if (unit == null)
            return Result.NotFound($"Unit with ID {id} not found");

        return Result.Success(unit);
    }

    public async Task<ResultWithValue<IEnumerable<UnitEntity>>> GetAll()
    {
        return Result.Success(await _unitRepository.GetAll());
    }

    public async Task<ResultWithValue<PagedList<UnitEntity>>> GetAll(PagedFilter filter)
    {
        return Result.Success(await _unitRepository.GetAll(filter));
    }

    public async Task<ResultWithValue<UnitEntity>> Update(UnitEntity entity)
    {
        return Result.Success(await _unitRepository.Update(entity));
    }

    public async Task<Result> Delete(int id)
    {
        var unit = await _unitRepository.GetById(id);
        if (unit == null)
            return Result.NotFound($"Unit with ID {id} not found");

        await _unitRepository.Delete(unit);
        return Result.Success();
    }
}
