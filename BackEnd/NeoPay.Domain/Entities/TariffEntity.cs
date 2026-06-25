namespace NeoPay.Domain.Entities;

public class TariffEntity : BaseEntity
{
    public string Title { get; set; } = null!;
    public decimal UnitPrice { get; set; }
    public int UtilityId { get; set; }
    public virtual UtilityEntity Utility { get; set; }
}
