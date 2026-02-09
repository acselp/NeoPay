using FluentValidation;
using NeoPay.Application.Service;
using NeoPay.Domain.Exceptions;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Meter;
using NeoPay.Framework.Models.Shared;
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
    //
    // public async Task<PagedResultModel<MeterModel>> GetAll(GetMeterFilterModel filterModel)
    // {
    //     var filter = new PagedFilter
    //     {
    //         PageIndex = filterModel.PageIndex,
    //         PageSize  = filterModel.PageSize
    //     };
    //
    //     var pagedList = await _meterService.GetAll(filter);
    //     return _meterMapper.Map(pagedList);
    // }

    public async Task<MeterModel> GetById(int id)
    {
        var entity = await _meterService.GetById(id);
        if (entity == null)
            throw new NotFoundException($"Meter with ID {id} not found");

        return _meterMapper.Map(entity);
    }

    public async Task<List<MeterModel>> GetByConnectionId(int connectionId)
    {
        var entities = await _meterService.GetByConnectionId(connectionId);
        return _meterMapper.Map(entities);
    }
}
