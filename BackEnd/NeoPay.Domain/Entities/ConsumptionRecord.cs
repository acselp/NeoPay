namespace NeoPay.Domain.Entities;

public class ConsumptionRecord : BaseEntity
{
    public decimal AmountUsed { get; set; }
    public decimal Value { get; set; }
    public DateTime ReadingTimestamp { get; set; }
    public string Source { get; set; } = "manual";
    public string? Note { get; set; }
    public string? ExceptionReason { get; set; }
    public string? ClientGeneratedId { get; set; }
    public string? CreatedBy { get; set; }
    public int MeterId { get; set; }

    public virtual MeterEntity Meter { get; set; } = null!;
}