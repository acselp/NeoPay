using NeoPay.Domain.Entities;
using NeoPay.Application.Models.MeterReading;

namespace NeoPay.Application.Mappers;

public class MeterReadingMapper
{
    public MeterReadingSimpleEntityModel MapToSimpleModel(MeterReadingEntity entity)
    {
        return new MeterReadingSimpleEntityModel
        {
            Id = entity.Id,
            SerialNumber = entity.Meter.SerialNumber,
            Value = entity.Value,
            UtilityNameList = entity.Meter.ConnectionList.Select(x => x.UtilityEntity.Name).ToList()
        };
    }
}