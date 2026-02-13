namespace NeoPay.Domain.Entities;

public class MeterHistoryEntity : BaseEntity
{
    public int ConnectionId { get; set; }
    public int MeterId { get; set; }
    public string Action { get; set; } = null!; // "installed" or "removed"
    public DateTime ActionDate { get; set; }
    public string? PerformedBy { get; set; }
    public string? Notes { get; set; }
    public decimal? FinalReading { get; set; }
    public decimal? InitialReading { get; set; }

    public virtual ConnectionEntity Connection { get; set; } = null!;
    public virtual MeterEntity Meter { get; set; } = null!;
}
