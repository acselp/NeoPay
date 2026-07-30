using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Unit;
using NeoPay.Framework.Validators.Unit;

namespace NeoPay.Framework.Managers;

public class UnitManager
{
    private readonly IUnitService _unitService;
    private readonly CreateUnitModelValidator _createUtilityModelValidator;
    private readonly UpdateUnitModelValidator _updateUtilityModelValidator;
    private readonly UnitMapper _unitMapper;

    public UnitManager(IUnitService unitService, CreateUnitModelValidator createUtilityModelValidator, UnitMapper unitMapper, UpdateUnitModelValidator updateUtilityModelValidator)
    {
        _unitService = unitService;
        _createUtilityModelValidator = createUtilityModelValidator;
        _unitMapper = unitMapper;
        _updateUtilityModelValidator = updateUtilityModelValidator;
    }

    public async Task<Result> Create(CreateUnitModel model)
    {
        var validation = await _createUtilityModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _unitService.Create(_unitMapper.Map(model));
    }

    public async Task<Result> Update(UpdateUnitModel model)
    {
        var validation = await _updateUtilityModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _unitService.Update(_unitMapper.Map(model));
    }

    public async Task<Result> Delete(int id)
    {
        return await _unitService.Delete(id);
    }

    public async Task<ResultWithValue<UnitModel>> GetById(int id)
    {
        var result = await _unitService.GetById(id);
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_unitMapper.Map(result.Value!));
    }

    public async Task<ResultWithValue<List<UnitModel>>> GetAll()
    {
        var result = await _unitService.GetAll();
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_unitMapper.Map(result.Value!));
    }
}
