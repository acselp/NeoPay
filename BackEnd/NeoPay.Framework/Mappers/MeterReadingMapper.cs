using NeoPay.Domain.Entities;
using NeoPay.Framework.Models.MeterReading;

namespace NeoPay.Framework.Mappers;

public class MeterReadingMapper
{
    public MeterReadingModel Map(MeterReadingEntity entity)
    {
        return new MeterReadingModel
        {
            Id = entity.Id,
            Value = entity.Value,
            MeterSerialNumber = entity.Meter.SerialNumber,
            UtilityTitleList = entity.Meter.ConnectionList.Select(x => x.UtilityEntity.Name).ToList(),
        };
    }
    
    public MeterReadingEntity Map(CreateMeterReadingModel model)
    {
        return new MeterReadingEntity
        {
            MeterId =  model.MeterId,
            Value = model.Value,
        };
    }
}