using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Exceptions;
using NeoPay.Domain.Paged;

namespace NeoPay.Application.Service;

public class UnitService
{
    private readonly IUnitRepository _unitRepository;

    public UnitService(IUnitRepository unitRepository)
    {
        _unitRepository = unitRepository;
    }

    public async Task<UnitEntity> Create(UnitEntity entity)
    {
        return await _unitRepository.Insert(entity);
    }

    public async Task<UnitEntity?> GetById(int id)
    {
        return await _unitRepository.GetById(id);
    }

    public async Task<IEnumerable<UnitEntity>> GetAll()
    {
        return await _unitRepository.GetAll();
    }

    public async Task<PagedList<UnitEntity>> GetAll(PagedFilter filter)
    {
        return await _unitRepository.GetAll(filter);
    }

    public async Task<UnitEntity> Update(UnitEntity entity)
    { 
        return await _unitRepository.Update(entity);
    }

    public async Task Delete(int id)
    {
        var utility = await _unitRepository.GetById(id);
        if (utility == null)
            throw new NotFoundException($"Unit with ID {id} not found");

        await _unitRepository.Delete(utility);
    }
}