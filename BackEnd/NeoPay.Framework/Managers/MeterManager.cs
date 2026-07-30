using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Meter;
using NeoPay.Framework.Validators;

namespace NeoPay.Framework.Managers;

public class MeterManager
{
    private readonly IMeterService             _meterService;
    private readonly MeterMapper               _meterMapper;
    private readonly CreateMeterModelValidator _createMeterModelValidator;
    private readonly UpdateMeterModelValidator _updateMeterModelValidator;

    public MeterManager(
        IMeterService             meterService,
        MeterMapper               meterMapper,
        CreateMeterModelValidator createMeterModelValidator,
        UpdateMeterModelValidator updateMeterModelValidator)
    {
        _meterService              = meterService;
        _meterMapper               = meterMapper;
        _createMeterModelValidator = createMeterModelValidator;
        _updateMeterModelValidator = updateMeterModelValidator;
    }

    public async Task<Result> Create(CreateMeterModel model)
    {
        var validation = await _createMeterModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _meterService.Create(_meterMapper.Map(model));
    }

    public async Task<Result> Update(UpdateMeterModel model)
    {
        var validation = await _updateMeterModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _meterService.Update(_meterMapper.Map(model));
    }

    public async Task<Result> Delete(int id)
    {
        return await _meterService.Delete(id);
    }

    public async Task<ResultWithValue<MeterModel>> GetById(int id)
    {
        var result = await _meterService.GetById(id);
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_meterMapper.Map(result.Value!));
    }

    public async Task<ResultWithValue<IEnumerable<MeterModel>>> GetAll()
    {
        var result = await _meterService.GetAll();
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(result.Value!.Select(it => _meterMapper.Map(it)));
    }
}
