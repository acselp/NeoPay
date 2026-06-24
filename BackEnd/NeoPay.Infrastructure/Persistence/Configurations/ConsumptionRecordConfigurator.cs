using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoPay.Domain.Entities;

namespace NeoPay.Infrastructure.Persistence.Configurations;

public class ConsumptionRecordConfigurator : IEntityTypeConfiguration<ConsumptionRecord>
{
    public void Configure(EntityTypeBuilder<ConsumptionRecord> builder)
    {
        builder.ToTable("consumption_record", "public");

        builder.HasKey(cr => cr.Id);

        builder.Property(cr => cr.AmountUsed)
            .IsRequired()
            .HasPrecision(10, 2);

        builder.Property(cr => cr.MeterId)
            .IsRequired();
    }
}
