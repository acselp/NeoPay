namespace NeoPay.Framework.Models.Mobile;

public class MobileConnectionModel
{
    public int    Id            { get; set; }
    public string CustomerName  { get; set; } = null!;
    public string LocationLabel { get; set; } = null!;
    public string UtilityName   { get; set; } = null!;
    public string Status        { get; set; } = null!;
    public int?   MeterId       { get; set; }
}

public class MobileConnectionDetailModel : MobileConnectionModel
{
    public MobileMeterModel? Meter { get; set; }
}

public class MobileConnectionSearchModel
{
    public string? Query  { get; set; }
    public string  Status { get; set; } = "Active";
}
