using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoPay.Domain.Entities;

namespace NeoPay.Infrastructure.Persistence.Configurations;

public class CustomerEntityConfigurator : IEntityTypeConfiguration<CustomerEntity>
{
    public void Configure(EntityTypeBuilder<CustomerEntity> builder)
    {
        builder.ToTable("customer", "public");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.FirstName)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(c => c.LastName)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(c => c.Email)
            .HasMaxLength(200);

        builder.Property(c => c.Phone)
            .HasMaxLength(20);

        builder.Property(c => c.AccountNr)
            .IsRequired();

        builder.HasIndex(c => c.AccountNr)
            .IsUnique();

        builder.HasMany(c => c.Connections)
            .WithOne(conn => conn.CustomerEntity)
            .HasForeignKey(conn => conn.CustomerId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}