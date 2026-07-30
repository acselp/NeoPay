using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Tariff;
using NeoPay.Framework.Validators.Tariff;

namespace NeoPay.Framework.Managers;

public class TariffManager
{
    private readonly ITariffService _tariffService;
    private readonly CreateTariffModelValidator _createTariffModelValidator;
    private readonly UpdateTariffModelValidator _updateTariffModelValidator;
    private readonly TariffMapper _tariffMapper;

    public TariffManager(ITariffService tariffService, CreateTariffModelValidator createTariffModelValidator, TariffMapper tariffMapper, UpdateTariffModelValidator updateTariffModelValidator)
    {
        _tariffService = tariffService;
        _createTariffModelValidator = createTariffModelValidator;
        _tariffMapper = tariffMapper;
        _updateTariffModelValidator = updateTariffModelValidator;
    }

    public async Task<Result> Create(CreateTariffModel model)
    {
        var validation = await _createTariffModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _tariffService.Create(_tariffMapper.Map(model));
    }

    public async Task<Result> Update(UpdateTariffModel model)
    {
        var validation = await _updateTariffModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _tariffService.Update(_tariffMapper.Map(model));
    }

    public async Task<Result> Delete(int id)
    {
        return await _tariffService.Delete(id);
    }

    public async Task<ResultWithValue<TariffModel>> GetById(int id)
    {
        var result = await _tariffService.GetById(id);
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_tariffMapper.Map(result.Value!));
    }

    public async Task<ResultWithValue<List<TariffModel>>> GetAll()
    {
        var result = await _tariffService.GetAll();
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_tariffMapper.Map(result.Value!));
    }
}
