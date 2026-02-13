namespace NeoPay.Domain.Entities;

public class ConnectionEntity : BaseEntity
{
    public int Status { get; set; }
    public int CustomerId { get; set; }
    public int UtilityId { get; set; }
    public int? LocationId { get; set; }
    public string? AccountNumber { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public string? UpdatedBy { get; set; }

    public virtual CustomerEntity Customer { get; set; } = null!;
    public virtual UtilityEntity UtilityEntity { get; set; } = null!;
    public virtual LocationEntity? Location { get; set; }
    public virtual MeterEntity? Meter { get; set; }
    public virtual ICollection<MeterHistoryEntity> MeterHistory { get; set; } = new List<MeterHistoryEntity>();
}