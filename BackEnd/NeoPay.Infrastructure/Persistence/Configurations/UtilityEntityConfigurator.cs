using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoPay.Domain.Entities;

namespace NeoPay.Infrastructure.Persistence.Configurations;

public class UtilityEntityConfigurator : IEntityTypeConfiguration<UtilityEntity>
{
    public void Configure(EntityTypeBuilder<UtilityEntity> builder)
    {
        builder.ToTable("utility", "public");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Name)
            .IsRequired()
            .HasMaxLength(100);

        builder.Property(u => u.BillingType)
            .IsRequired();

        builder.HasOne<UnitEntity>(u => u.Unit)
            .WithMany(x => x.UtilityList)
            .HasForeignKey(u => u.UnitId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.HasMany(u => u.Connections)
            .WithOne(conn => conn.UtilityEntity)
            .HasForeignKey(conn => conn.UtilityId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
