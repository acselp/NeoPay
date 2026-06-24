using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NeoPay.Domain.Entities;

namespace NeoPay.Infrastructure.Persistence.Configurations;

public class UnitEntityConfigurator : IEntityTypeConfiguration<UnitEntity>
{
    public void Configure(EntityTypeBuilder<UnitEntity> builder)
    {
        builder.ToTable("unit", "public");

        builder.HasKey(u => u.Id);

        builder.Property(u => u.Code)
            .IsRequired()
            .HasMaxLength(50);
        
        builder.Property(u => u.LongName)
            .IsRequired()
            .HasMaxLength(100);
        
        builder.Property(u => u.Description)
            .IsRequired()
            .HasMaxLength(255);
        
        builder.Property(u => u.Symbol)
            .IsRequired()
            .HasMaxLength(255);
    }
}
