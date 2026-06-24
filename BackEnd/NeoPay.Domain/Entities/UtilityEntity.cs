namespace NeoPay.Domain.Entities;

public class UtilityEntity : BaseEntity
{
    public string Name { get; set; } = null!;
    public int UnitId { get; set; }
    public virtual UnitEntity Unit { get; set; }
    public virtual ICollection<ConnectionEntity> Connections { get; set; } = new List<ConnectionEntity>();
}