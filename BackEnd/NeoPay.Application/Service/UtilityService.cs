using NeoPay.Application.Repository;
using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service;

public class UtilityService : IUtilityService
{
    private readonly IUtilityRepository _utilityRepository;

    public UtilityService(IUtilityRepository utilityRepository)
    {
        _utilityRepository = utilityRepository;
    }

    public async Task<ResultWithValue<UtilityEntity>> Create(UtilityEntity entity)
    {
        return Result.Success(await _utilityRepository.Insert(entity));
    }

    public async Task<ResultWithValue<UtilityEntity>> GetById(int id)
    {
        var utility = await _utilityRepository.GetById(id);
        if (utility == null)
            return Result.NotFound($"Utility with ID {id} not found");

        return Result.Success(utility);
    }

    public async Task<ResultWithValue<IEnumerable<UtilityEntity>>> GetAll()
    {
        return Result.Success(await _utilityRepository.GetAll());
    }

    public async Task<ResultWithValue<PagedList<UtilityEntity>>> GetAll(PagedFilter filter)
    {
        return Result.Success(await _utilityRepository.GetAll(filter));
    }

    public async Task<ResultWithValue<UtilityEntity>> Update(UtilityEntity entity)
    {
        var existingUtility = await _utilityRepository.GetById(entity.Id);
        if (existingUtility == null)
            return Result.NotFound($"Utility with ID {entity.Id} not found");

        return Result.Success(await _utilityRepository.Update(entity));
    }

    public async Task<Result> Delete(int id)
    {
        var utility = await _utilityRepository.GetById(id);
        if (utility == null)
            return Result.NotFound($"Utility with ID {id} not found");

        await _utilityRepository.Delete(utility);
        return Result.Success();
    }
}
