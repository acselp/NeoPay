using FluentValidation;
using NeoPay.Application.Service;
using NeoPay.Domain.Exceptions;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Meter;
using NeoPay.Framework.Validators;

namespace NeoPay.Framework.Managers;

public class MeterManager
{
    private readonly MeterService                 _meterService;
    private readonly MeterMapper                  _meterMapper;
    private readonly CreateMeterModelValidator    _createMeterModelValidator;
    private readonly UpdateMeterModelValidator    _updateMeterModelValidator;

    public MeterManager(
        MeterService                 meterService,
        MeterMapper                  meterMapper,
        CreateMeterModelValidator    createMeterModelValidator,
        UpdateMeterModelValidator    updateMeterModelValidator)
    {
        _meterService                 = meterService;
        _meterMapper                  = meterMapper;
        _createMeterModelValidator    = createMeterModelValidator;
        _updateMeterModelValidator    = updateMeterModelValidator;
    }

    public async Task Create(CreateMeterModel model)
    {
        await _createMeterModelValidator.ValidateAndThrowAsync(model);
        await _meterService.Create(_meterMapper.Map(model));
    }

    public async Task Update(UpdateMeterModel model)
    {
        await _updateMeterModelValidator.ValidateAndThrowAsync(model);
        await _meterService.Update(_meterMapper.Map(model));
    }

    public async Task Delete(int id)
    {
        await _meterService.Delete(id);
    }

    public async Task<MeterModel> GetById(int id)
    {
        var entity = await _meterService.GetById(id);
        if (entity == null)
            throw new NotFoundException($"Meter with ID {id} not found");

        return _meterMapper.Map(entity);
    }
    
    public async Task<IEnumerable<MeterModel>> GetAll()
    {
        var entityList = await _meterService.GetAll();
        return entityList.Select(x => _meterMapper.Map(x));
    }
}
