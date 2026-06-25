using NeoPay.Framework.Models.Shared;

namespace NeoPay.Framework.Models.Tariff;

public class TariffModel : BaseModel
{
    public string  Title     { get; set; }
    public decimal UnitPrice { get; set; }
    public int    UtilityId { get; set; }
}
