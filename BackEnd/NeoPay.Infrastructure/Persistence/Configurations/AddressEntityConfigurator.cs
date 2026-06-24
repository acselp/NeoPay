using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoPay.Domain.Entities;

namespace NeoPay.Infrastructure.Persistence.Configurations;

public class AddressEntityConfigurator : IEntityTypeConfiguration<AddressEntity>
{
    public void Configure(EntityTypeBuilder<AddressEntity> builder)
    {
        builder.ToTable("address", "public");

        builder.HasKey(a => a.Id);

        builder.Property(a => a.Country)
            .HasMaxLength(100);

        builder.Property(a => a.Region)
            .HasMaxLength(100);

        builder.Property(a => a.City)
            .HasMaxLength(100);

        builder.Property(a => a.Street)
            .HasMaxLength(255);

        builder.Property(a => a.House)
            .HasMaxLength(50);

        builder.Property(a => a.Entrance)
            .HasMaxLength(50);

        builder.Property(a => a.Apartment)
            .HasMaxLength(50);

        builder.Property(a => a.PostalCode)
            .HasMaxLength(20);

        builder.Property(a => a.CustomerId)
            .IsRequired();
    }
}