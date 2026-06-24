namespace NeoPay.Domain.Entities;

public class UnitEntity : BaseEntity
{
    public string Code { get; set; } = null!;
    public string LongName { get; set; } = null!;
    public string Symbol { get; set; } = null!;
    public string Description { get; set; } = null!;

    public virtual IEnumerable<UtilityEntity> UtilityList { get; set; }
}