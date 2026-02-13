using FluentValidation;
using NeoPay.Application.Service;
using NeoPay.Domain.Exceptions;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Mobile;
using NeoPay.Framework.Validators;

namespace NeoPay.Framework.Managers;

public class MobileManager
{
    private readonly ConnectionService                _connectionService;
    private readonly MeterService                     _meterService;
    private readonly ConsumptionRecordService         _consumptionService;
    private readonly MobileMapper                     _mobileMapper;
    private readonly CreateMobileReadingModelValidator _createReadingValidator;

    public MobileManager(
        ConnectionService                connectionService,
        MeterService                     meterService,
        ConsumptionRecordService         consumptionService,
        MobileMapper                     mobileMapper,
        CreateMobileReadingModelValidator createReadingValidator)
    {
        _connectionService      = connectionService;
        _meterService           = meterService;
        _consumptionService     = consumptionService;
        _mobileMapper           = mobileMapper;
        _createReadingValidator = createReadingValidator;
    }

    public async Task<MobileMeterModel?> GetMeterByBarcode(string barcode)
    {
        var meter = await _meterService.GetByBarcode(barcode);
        return meter != null ? _mobileMapper.MapMeter(meter) : null;
    }

    public async Task<MobileMeterModel> GetMeterById(int id)
    {
        var meter = await _meterService.GetById(id);
        if (meter == null)
            throw new NotFoundException($"Meter with ID {id} not found");

        return _mobileMapper.MapMeter(meter);
    }

    public async Task<MobileConnectionDetailModel> GetConnectionById(int id)
    {
        var connection = await _connectionService.GetByIdWithDetails(id);
        if (connection == null)
            throw new NotFoundException($"Connection with ID {id} not found");

        return _mobileMapper.MapConnectionDetail(connection);
    }

    public async Task<List<MobileConnectionModel>> SearchConnections(MobileConnectionSearchModel searchModel)
    {
        var connections = await _connectionService.SearchForMobile(
            searchModel.Query,
            searchModel.Status);

        return _mobileMapper.MapConnections(connections);
    }

    public async Task<LastReadingResponseModel> GetLastReading(int meterId)
    {
        var lastReading = await _consumptionService.GetLastByMeterId(meterId);
        var avgConsumption = await _consumptionService.GetAverageConsumption(meterId);

        return new LastReadingResponseModel
        {
            Reading            = lastReading != null ? _mobileMapper.MapReading(lastReading) : null,
            AverageConsumption = avgConsumption
        };
    }

    public async Task<MobileReadingModel> CreateReading(CreateMobileReadingModel model)
    {
        await _createReadingValidator.ValidateAndThrowAsync(model);

        // Check for duplicate (idempotency)
        var existing = await _consumptionService.GetByClientGeneratedId(model.ClientGeneratedId);
        if (existing != null)
        {
            return _mobileMapper.MapReading(existing);
        }

        // Verify meter exists
        var meter = await _meterService.GetById(model.MeterId);
        if (meter == null)
            throw new NotFoundException($"Meter with ID {model.MeterId} not found");

        // Calculate consumption
        var lastReading = await _consumptionService.GetLastByMeterId(model.MeterId);
        decimal amountUsed = 0;
        if (lastReading != null)
        {
            amountUsed = (model.Value - lastReading.Value) * meter.Multiplier;
            if (amountUsed < 0)
            {
                // Handle rollover
                var maxValue = (decimal)Math.Pow(10, meter.Digits);
                amountUsed = ((maxValue - lastReading.Value) + model.Value) * meter.Multiplier;
            }
        }

        var entity = _mobileMapper.MapCreateReading(model);
        entity.AmountUsed = amountUsed;

        var created = await _consumptionService.Create(entity);
        return _mobileMapper.MapReading(created);
    }
}
