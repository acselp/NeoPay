using NeoPay.Framework.Models.Shared;

namespace NeoPay.Framework.Models.MeterReading;

public class ListMeterReadingModel : BaseModel
{
    public string Value             { get; set; }
    public string MeterSerialNumber { get; set; }
    public string UtilityName       { get; set; }
    public string CustomerName      { get; set; }
    public string FormatedDate      { get; set; }
}