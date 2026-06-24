using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoPay.Domain.Entities;

namespace NeoPay.Infrastructure.Persistence.Configurations;

public class MeterEntityConfigurator : IEntityTypeConfiguration<MeterEntity>
{
    public void Configure(EntityTypeBuilder<MeterEntity> builder)
    {
        builder.ToTable("meter", "public");

        builder.HasKey(m => m.Id);

        builder.Property(m => m.SerialNumber)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(m => m.Status)
            .IsRequired();

        builder.Property(m => m.ConnectionId)
            .IsRequired();

        builder.HasMany(m => m.ConsumptionRecords)
            .WithOne(cr => cr.Meter)
            .HasForeignKey(cr => cr.MeterId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
