namespace NeoPay.Domain.Entities;

public class ConnectionEntity : BaseEntity
{
    public int Status { get; set; }
    public int CustomerId { get; set; }
    public int UtilityId { get; set; }

    public virtual CustomerEntity CustomerEntity { get; set; } = null!;
    public virtual UtilityEntity UtilityEntity { get; set; } = null!;
}