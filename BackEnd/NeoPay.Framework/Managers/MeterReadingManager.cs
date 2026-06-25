using NeoPay.Application.Service;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.MeterReading;

namespace NeoPay.Framework.Managers;

public class MeterReadingManager
{
    private readonly MeterReadingService _meterReadingService;
    private readonly MeterReadingMapper _meterReadingMapper;

    public MeterReadingManager(MeterReadingService meterReadingService, MeterReadingMapper meterReadingMapper)
    {
        _meterReadingService = meterReadingService;
        _meterReadingMapper = meterReadingMapper;
    }

    public async Task Create(CreateMeterReadingModel model)
    {
        await _meterReadingService.Create(_meterReadingMapper.Map(model));
    }
}