using NeoPay.Domain.Entities;

namespace NeoPay.Application.Repository;

public interface IConnectionRepository : IGenericRepository<ConnectionEntity>
{
    Task<IEnumerable<ConnectionEntity>> GetByCustomerId(int customerId);
    Task<IEnumerable<ConnectionEntity>> GetByUtilityId(int utilityId);
    Task<bool> ConnectionExists(int customerId, int utilityId);
    Task<ConnectionEntity?> GetByIdWithDetails(int id);
    Task<IEnumerable<ConnectionEntity>> SearchForMobile(string? query, string status);
}
