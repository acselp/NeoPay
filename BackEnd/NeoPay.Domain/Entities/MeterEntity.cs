namespace NeoPay.Domain.Entities;

public class MeterEntity : BaseEntity
{
    public string SerialNumber { get; set; } = null!;
    public int Status { get; set; }
    public string? Description { get; set; }

    public virtual IEnumerable<ConnectionEntity> ConnectionList { get; set; }
}