using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Utility;
using NeoPay.Framework.Validators;

namespace NeoPay.Framework.Managers;

public class UtilityManager
{
    private readonly IUtilityService             _utilityService;
    private readonly UtilityMapper               _utilityMapper;
    private readonly CreateUtilityModelValidator _createUtilityModelValidator;
    private readonly UpdateUtilityModelValidator _updateUtilityModelValidator;

    public UtilityManager(
        IUtilityService             utilityService,
        UtilityMapper               utilityMapper,
        CreateUtilityModelValidator createUtilityModelValidator,
        UpdateUtilityModelValidator updateUtilityModelValidator)
    {
        _utilityService              = utilityService;
        _utilityMapper               = utilityMapper;
        _createUtilityModelValidator = createUtilityModelValidator;
        _updateUtilityModelValidator = updateUtilityModelValidator;
    }

    public async Task<Result> Create(CreateUtilityModel model)
    {
        var validation = await _createUtilityModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _utilityService.Create(_utilityMapper.Map(model));
    }

    public async Task<Result> Update(UpdateUtilityModel model)
    {
        var validation = await _updateUtilityModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _utilityService.Update(_utilityMapper.Map(model));
    }

    public async Task<Result> Delete(int id)
    {
        return await _utilityService.Delete(id);
    }

    public async Task<ResultWithValue<PagedResultModel<UtilityModel>>> GetAll(GetUtilityFilterModel filterModel)
    {
        var filter = new PagedFilter
        {
            PageIndex = filterModel.PageIndex,
            PageSize  = filterModel.PageSize
        };

        var result = await _utilityService.GetAll(filter);
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_utilityMapper.Map(result.Value!));
    }

    public async Task<ResultWithValue<List<UtilityModel>>> GetAll()
    {
        var result = await _utilityService.GetAll();
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_utilityMapper.Map(result.Value!));
    }

    public async Task<ResultWithValue<UtilityModel>> GetById(int id)
    {
        var result = await _utilityService.GetById(id);
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_utilityMapper.Map(result.Value!));
    }
}
