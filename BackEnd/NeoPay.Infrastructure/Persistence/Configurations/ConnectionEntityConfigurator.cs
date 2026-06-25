using System.Diagnostics.Metrics;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoPay.Domain.Entities;

namespace NeoPay.Infrastructure.Persistence.Configurations;

public class ConnectionEntityConfigurator : IEntityTypeConfiguration<ConnectionEntity>
{
    public void Configure(EntityTypeBuilder<ConnectionEntity> builder)
    {
        builder.ToTable("connection", "public");

        builder.HasKey(c => c.Id);

        builder.Property(c => c.Status)
            .IsRequired();

        builder.Property(c => c.CustomerId)
            .IsRequired();

        builder.Property(c => c.UtilityId)
            .IsRequired();

        builder.Property(c => c.Description);

        builder.HasOne(c => c.CustomerEntity)
            .WithMany(cust => cust.Connections)
            .HasForeignKey(c => c.CustomerId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasOne(c => c.UtilityEntity)
            .WithMany(u => u.Connections)
            .HasForeignKey(c => c.UtilityId)
            .OnDelete(DeleteBehavior.Cascade);
        
        builder.HasOne(c => c.MeterEntity)
            .WithMany(x => x.ConnectionList)
            .HasForeignKey(c => c.MeterId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
