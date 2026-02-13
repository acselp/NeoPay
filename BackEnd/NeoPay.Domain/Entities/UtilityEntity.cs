using NeoPay.Domain.Enums;

namespace NeoPay.Domain.Entities;

public class UtilityEntity : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Unit { get; set; } = null!; // e.g., "kWh", "m³"
    public UnitType UnitType { get; set; }
    public string ReadingType { get; set; } = "cumulative"; // "cumulative" or "differential"
    public int DecimalsAllowed { get; set; } = 2;
    public decimal RolloverValue { get; set; } = 99999;
    public string RolloverBehavior { get; set; } = "reset"; // "reset" or "continue"
    public decimal WarningThreshold { get; set; } = 500;
    public string? UpdatedBy { get; set; }
    public virtual ICollection<ConnectionEntity> Connections { get; set; } = new List<ConnectionEntity>();
}