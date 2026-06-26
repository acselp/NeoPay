using NeoPay.Domain.Entities;
using NeoPay.Framework.Helpers;
using NeoPay.Framework.Models.MeterReading;

namespace NeoPay.Framework.Mappers;

public class MeterReadingMapper
{
    private readonly MeterHelper _meterHelper;

    public MeterReadingMapper(MeterHelper meterHelper)
    {
        _meterHelper = meterHelper;
    }

    public ListMeterReadingModel Map(MeterReadingEntity entity)
    {
        var customer = entity.Meter.ConnectionList.FirstOrDefault()?.CustomerEntity;
        var utility  = entity.Meter.ConnectionList.FirstOrDefault()?.UtilityEntity;

        return new ListMeterReadingModel
        {
            Id                = entity.Id,
            Value             = _meterHelper.FormatValueWithUnits(entity),
            MeterSerialNumber = entity.Meter.SerialNumber,
            CustomerName      = $"{customer?.FirstName} {customer?.LastName}",
            UtilityName       = utility?.Name ?? string.Empty,
            FormatedDate = entity.CreatedOnUtc.ToLocalTime().ToString("yyyy-MM-dd HH:mm:ss"),
        };
    }

    public MeterReadingEntity Map(CreateMeterReadingModel model)
    {
        return new MeterReadingEntity
        {
            MeterId = model.MeterId,
            Value   = model.Value,
        };
    }
}