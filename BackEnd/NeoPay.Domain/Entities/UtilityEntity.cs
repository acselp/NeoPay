using NeoPay.Domain.Enums;

namespace NeoPay.Domain.Entities;

public class UtilityEntity : BaseEntity
{
    public string Name { get; set; } = null!;
    public UnitType UnitType { get; set; }
    public virtual ICollection<ConnectionEntity> Connections { get; set; } = new List<ConnectionEntity>();
}