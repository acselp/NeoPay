using NeoPay.Domain.Enums;

namespace NeoPay.Domain.Entities;

public class UtilityEntity : BaseEntity
{
    public string Name { get; set; } = null!;
    public BillingType BillingType { get; set; }
    public int UnitId { get; set; }
    public virtual UnitEntity Unit { get; set; }
    public virtual ICollection<ConnectionEntity> Connections { get; set; } = new List<ConnectionEntity>();
}