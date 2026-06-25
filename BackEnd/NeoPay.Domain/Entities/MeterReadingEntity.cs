namespace NeoPay.Domain.Entities;

public class MeterReadingEntity : BaseEntity
{
    public decimal Value { get; set; }
    public int MeterId { get; set; }

    public virtual MeterEntity Meter { get; set; } = null!;
}