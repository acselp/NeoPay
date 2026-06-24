using FluentValidation;
using NeoPay.Application.Service;
using NeoPay.Domain.Exceptions;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Unit;
using NeoPay.Framework.Validators.Unit;

namespace NeoPay.Framework.Managers;

public class UnitManager
{
    private readonly UnitService _unitService;
    private readonly CreateUnitModelValidator _createUtilityModelValidator;
    private readonly UpdateUnitModelValidator _updateUtilityModelValidator;
    private readonly UnitMapper _unitMapper;

    public UnitManager(UnitService unitService, CreateUnitModelValidator createUtilityModelValidator, UnitMapper unitMapper, UpdateUnitModelValidator updateUtilityModelValidator)
    {
        _unitService = unitService;
        _createUtilityModelValidator = createUtilityModelValidator;
        _unitMapper = unitMapper;
        _updateUtilityModelValidator = updateUtilityModelValidator;
    }

    public async Task Create(CreateUnitModel model)
    {
        await _createUtilityModelValidator.ValidateAndThrowAsync(model);
        await _unitService.Create(_unitMapper.Map(model));
    }

    public async Task Update(UpdateUnitModel model)
    {
        await _updateUtilityModelValidator.ValidateAndThrowAsync(model);
        await _unitService.Update(_unitMapper.Map(model));
    }

    public async Task Delete(int id)
    {
        await _unitService.Delete(id);
    }

    public async Task<UnitModel> GetById(int id)
    {
        var entity = await _unitService.GetById(id);
        if (entity == null)
            throw new NotFoundException($"Unit with ID {id} not found");

        return _unitMapper.Map(entity);
    }

    public async Task<List<UnitModel>> GetAll()
    {
        var entities = await _unitService.GetAll();
        return _unitMapper.Map(entities);
    }
}