namespace NeoPay.Framework.Models.Mobile;

public class MobileReadingModel
{
    public int      Id        { get; set; }
    public int      MeterId   { get; set; }
    public DateTime Timestamp { get; set; }
    public decimal  Value     { get; set; }
    public string   Source    { get; set; } = "mobile";
    public string?  Note      { get; set; }
}

public class CreateMobileReadingModel
{
    public string   ClientGeneratedId { get; set; } = null!;
    public int      MeterId           { get; set; }
    public DateTime Timestamp         { get; set; }
    public decimal  Value             { get; set; }
    public string   Source            { get; set; } = "mobile";
    public string?  Note              { get; set; }
    public string?  ExceptionReason   { get; set; }
}

public class LastReadingResponseModel
{
    public MobileReadingModel? Reading            { get; set; }
    public decimal?            AverageConsumption { get; set; }
}
