using NeoPay.Application.Service;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.MeterReading;
using NeoPay.Framework.Models.Shared.StatusModels;

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

    public async Task<BaseStatusModel> Create(CreateMeterReadingModel model)
    {
        var result    = new BaseStatusModel { Success = true };
        var lastReading = await _meterReadingService.GetLastReadingByMeterId(model.MeterId);

        if (lastReading != null && model.Value < lastReading.Value)
        {
            result.Errors.Add($"Value must be greater or equal to previous");
            result.Success = false;
            
            return result;
        }
        
        await _meterReadingService.Create(_meterReadingMapper.Map(model));
        
        return result;
    }
}