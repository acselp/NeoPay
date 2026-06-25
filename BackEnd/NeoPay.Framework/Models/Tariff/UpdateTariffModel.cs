namespace NeoPay.Framework.Models.Tariff;

public class UpdateTariffModel
{
    public int     Id        { get; set; }
    public string  Title     { get; set; }
    public decimal UnitPrice { get; set; }
    public int    UtilityId { get; set; }
}
