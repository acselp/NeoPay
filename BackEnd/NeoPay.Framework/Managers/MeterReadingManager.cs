using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.MeterReading;

namespace NeoPay.Framework.Managers;

public class MeterReadingManager
{
    private readonly IMeterReadingService _meterReadingService;
    private readonly MeterReadingMapper   _meterReadingMapper;

    public MeterReadingManager(IMeterReadingService meterReadingService, MeterReadingMapper meterReadingMapper)
    {
        _meterReadingService = meterReadingService;
        _meterReadingMapper  = meterReadingMapper;
    }

    public async Task<Result> Create(CreateMeterReadingModel model)
    {
        // A meter with no previous reading is not an error — the first reading has nothing to compare against.
        var lastReading = await _meterReadingService.GetLastReadingByMeterId(model.MeterId);

        if (lastReading.IsSuccess && model.Value < lastReading.Value!.Value)
            return Result.Validation("Value must be greater or equal to previous");

        return await _meterReadingService.Create(_meterReadingMapper.Map(model));
    }
}
