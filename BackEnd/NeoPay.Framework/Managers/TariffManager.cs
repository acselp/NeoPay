using FluentValidation;
using NeoPay.Application.Service;
using NeoPay.Domain.Exceptions;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Tariff;
using NeoPay.Framework.Validators.Tariff;

namespace NeoPay.Framework.Managers;

public class TariffManager
{
    private readonly TariffService _tariffService;
    private readonly CreateTariffModelValidator _createTariffModelValidator;
    private readonly UpdateTariffModelValidator _updateTariffModelValidator;
    private readonly TariffMapper _tariffMapper;

    public TariffManager(TariffService tariffService, CreateTariffModelValidator createTariffModelValidator, TariffMapper tariffMapper, UpdateTariffModelValidator updateTariffModelValidator)
    {
        _tariffService = tariffService;
        _createTariffModelValidator = createTariffModelValidator;
        _tariffMapper = tariffMapper;
        _updateTariffModelValidator = updateTariffModelValidator;
    }

    public async Task Create(CreateTariffModel model)
    {
        await _createTariffModelValidator.ValidateAndThrowAsync(model);
        await _tariffService.Create(_tariffMapper.Map(model));
    }

    public async Task Update(UpdateTariffModel model)
    {
        await _updateTariffModelValidator.ValidateAndThrowAsync(model);
        await _tariffService.Update(_tariffMapper.Map(model));
    }

    public async Task Delete(int id)
    {
        await _tariffService.Delete(id);
    }

    public async Task<TariffModel> GetById(int id)
    {
        var entity = await _tariffService.GetById(id);
        if (entity == null)
            throw new NotFoundException($"Tariff with ID {id} not found");

        return _tariffMapper.Map(entity);
    }

    public async Task<List<TariffModel>> GetAll()
    {
        var entities = await _tariffService.GetAll();
        return _tariffMapper.Map(entities);
    }
}
