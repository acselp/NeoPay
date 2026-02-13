namespace NeoPay.Domain.Entities;

public class MeterEntity : BaseEntity
{
    public string SerialNumber { get; set; } = null!;
    public string? BarcodeValue { get; set; }
    public int Digits { get; set; } = 6;
    public decimal Multiplier { get; set; } = 1;
    public int Status { get; set; }
    public int? ConnectionId { get; set; }
    public DateTime? InstallDate { get; set; }
    public string? Manufacturer { get; set; }
    public string? Model { get; set; }

    public virtual ConnectionEntity? Connection { get; set; }
    public virtual ICollection<ConsumptionRecord> ConsumptionRecords { get; set; } = new List<ConsumptionRecord>();
    public virtual ICollection<MeterHistoryEntity> MeterHistory { get; set; } = new List<MeterHistoryEntity>();
}