using NeoPay.Domain.Entities;

namespace NeoPay.Framework.Helpers;

public class MeterHelper
{
    public string FormatValueWithUnits(MeterReadingEntity reading)
    {
        return $"{reading.Value} {reading.Meter.ConnectionList.FirstOrDefault()?.UtilityEntity.Unit.Symbol}";
    }
}