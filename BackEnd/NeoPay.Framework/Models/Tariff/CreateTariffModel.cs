namespace NeoPay.Framework.Models.Tariff;

public class CreateTariffModel
{
    public string Title { get; set; }
    public decimal UnitPrice { get; set; }
    public int UtilityId { get; set; }
}
