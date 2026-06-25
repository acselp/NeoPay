using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoPay.Domain.Entities;

namespace NeoPay.Infrastructure.Persistence.Configurations;

public class MeterReadingConfigurator : IEntityTypeConfiguration<MeterReadingEntity>
{
    public void Configure(EntityTypeBuilder<MeterReadingEntity> builder)
    {
        builder.ToTable("consumption_record", "public");

        builder.HasKey(cr => cr.Id);

        builder.Property(cr => cr.Value)
            .IsRequired()
            .HasPrecision(10, 2);

        builder.HasOne(x => x.Meter)
            .WithMany(x => x.MeterReadingList)
            .HasForeignKey(x => x.MeterId);
    }
}
