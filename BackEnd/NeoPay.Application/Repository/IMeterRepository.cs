using NeoPay.Domain.Entities;

namespace NeoPay.Application.Repository;

public interface IMeterRepository : IGenericRepository<MeterEntity>
{
    Task<IEnumerable<MeterEntity>> GetByConnectionId(int connectionId);
    Task<MeterEntity?> GetBySerialNumber(string serialNumber);
    Task<MeterEntity?> GetByBarcode(string barcode);
}
