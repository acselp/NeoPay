namespace NeoPay.Application.Models.MeterReading;

public class MeterReadingSimpleEntityModel
{
    public int Id { get; set; }
    public string SerialNumber { get; set; }
    public decimal Value { get; set; }
    public List<string> UtilityNameList { get; set; }
}