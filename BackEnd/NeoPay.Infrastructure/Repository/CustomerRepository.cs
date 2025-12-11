using Microsoft.EntityFrameworkCore;
using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Domain.Filters;
using NeoPay.Domain.Paged;
using NeoPay.Infrastructure.Persistence;

namespace NeoPay.Infrastructure.Repository;

public class CustomerRepository(PostgresDbContext context)
    : GenericRepository<CustomerEntity>(context), ICustomerRepository
{
    public async Task<bool> AccountNrExists(int accountNr)
    {
        return await Table.AnyAsync(x => x.AccountNr == accountNr);
    }

    public Task<PagedList<CustomerEntity>> GetAll(CustomerGetAllFilter filter)
    {
        var query = Table.AsQueryable();

        // Apply search filter (searches across multiple fields)
        if (!string.IsNullOrWhiteSpace(filter.SearchTerm))
        {
            var searchTerm = filter.SearchTerm.ToLower();
            query = query.Where(x =>
                x.FirstName.ToLower().Contains(searchTerm) ||
                x.LastName.ToLower().Contains(searchTerm) ||
                (x.Email != null && x.Email.ToLower().Contains(searchTerm)) ||
                (x.Phone != null && x.Phone.Contains(searchTerm)) ||
                x.AccountNr.ToString().Contains(searchTerm));
        }

        // Apply specific field filters
        if (!string.IsNullOrWhiteSpace(filter.FirstName))
            query = query.Where(x => x.FirstName.ToLower().Contains(filter.FirstName.ToLower()));

        if (!string.IsNullOrWhiteSpace(filter.LastName))
            query = query.Where(x => x.LastName.ToLower().Contains(filter.LastName.ToLower()));

        if (!string.IsNullOrWhiteSpace(filter.Email))
            query = query.Where(x => x.Email != null && x.Email.ToLower().Contains(filter.Email.ToLower()));

        if (!string.IsNullOrWhiteSpace(filter.Phone))
            query = query.Where(x => x.Phone != null && x.Phone.Contains(filter.Phone));

        if (filter.AccountNr.HasValue)
            query = query.Where(x => x.AccountNr == filter.AccountNr.Value);

        // Apply sorting
        if (!string.IsNullOrWhiteSpace(filter.SortField))
        {
            var isDescending = filter.SortDirection?.ToLower() == "desc";

            query = filter.SortField.ToLower() switch
            {
                "firstname" => isDescending ? query.OrderByDescending(x => x.FirstName) : query.OrderBy(x => x.FirstName),
                "lastname" => isDescending ? query.OrderByDescending(x => x.LastName) : query.OrderBy(x => x.LastName),
                "email" => isDescending ? query.OrderByDescending(x => x.Email) : query.OrderBy(x => x.Email),
                "phone" => isDescending ? query.OrderByDescending(x => x.Phone) : query.OrderBy(x => x.Phone),
                "accountnr" => isDescending ? query.OrderByDescending(x => x.AccountNr) : query.OrderBy(x => x.AccountNr),
                "id" => isDescending ? query.OrderByDescending(x => x.Id) : query.OrderBy(x => x.Id),
                _ => query.OrderBy(x => x.Id)
            };
        }
        else
        {
            query = query.OrderBy(x => x.Id);
        }

        return query.ToPagedAsync(filter.PageIndex, filter.PageSize);
    }
}