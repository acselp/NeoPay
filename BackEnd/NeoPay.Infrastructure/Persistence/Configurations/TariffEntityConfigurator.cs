using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoPay.Domain.Entities;

namespace NeoPay.Infrastructure.Persistence.Configurations;

public class TariffEntityConfigurator : IEntityTypeConfiguration<TariffEntity>
{
    public void Configure(EntityTypeBuilder<TariffEntity> builder)
    {
        builder.ToTable("tariff", "public");

        builder.HasKey(t => t.Id);

        builder.Property(t => t.Title)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(t => t.UnitPrice)
            .IsRequired();

        builder.HasOne(t => t.Utility)
            .WithMany(x => x.Tariffs)
            .HasForeignKey(t => t.UtilityId);
    }
}
