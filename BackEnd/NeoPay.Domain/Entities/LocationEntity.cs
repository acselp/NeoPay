namespace NeoPay.Domain.Entities;

public class LocationEntity : BaseEntity
{
    public int CustomerId { get; set; }
    public string Label { get; set; } = null!;
    public string Address { get; set; } = null!;
    public string City { get; set; } = null!;
    public string? State { get; set; }
    public string? ZipCode { get; set; }

    public virtual CustomerEntity Customer { get; set; } = null!;
    public virtual ICollection<ConnectionEntity> Connections { get; set; } = new List<ConnectionEntity>();
}
