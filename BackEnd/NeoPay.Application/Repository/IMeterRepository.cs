using NeoPay.Domain.Entities;

namespace NeoPay.Application.Repository;

public interface IMeterRepository : IGenericRepository<MeterEntity>
{
    Task<MeterEntity?> GetBySerialNumber(string serialNumber);
}
