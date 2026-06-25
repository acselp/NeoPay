using NeoPay.Framework.Models.Shared;

namespace NeoPay.Framework.Models.MeterReading;

public class MeterReadingModel : BaseModel
{
    public decimal Value { get; set; }
    public string MeterSerialNumber { get; set; }
    public List<string> UtilityTitleList { get; set; }
}