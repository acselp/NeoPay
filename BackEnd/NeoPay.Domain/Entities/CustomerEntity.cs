using NeoPay.Domain.Enums;

namespace NeoPay.Domain.Entities;

public class CustomerEntity : BaseEntity
{
    public string FirstName { get; set; } = null!;
    public string LastName { get; set; } = null!;
    public string? Email { get; set; }
    public string? Phone { get; set; }
    public int AccountNr { get; set; }
    public CustomerStatus Status { get; set; }
    public string? Notes { get; set; }

    // Computed property for full name
    public string FullName => $"{FirstName} {LastName}";

    public virtual AddressEntity? Address { get; set; }
    public virtual ICollection<LocationEntity> Locations { get; set; } = new List<LocationEntity>();
    public virtual ICollection<ConnectionEntity> Connections { get; set; } = new List<ConnectionEntity>();
}