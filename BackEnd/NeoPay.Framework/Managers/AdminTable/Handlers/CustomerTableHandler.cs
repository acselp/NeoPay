using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Managers.AdminTable.Abstractions;
using NeoPay.Framework.Models.Customer;

namespace NeoPay.Framework.Managers.AdminTable.Handlers;

public class CustomerTableHandler : AdminTableHandler<CustomerModel, CustomerEntity>
{
    public override    string                     Entity { get; set; } = AdminTableEntities.Customer;
    protected override IQueryable<CustomerEntity> Query  { get; set; }

    public CustomerTableHandler(ICustomerRepository repository, AdminTableService service) : base(service)
    {
        Query = repository.GetQuery();
    }

    protected override CustomerModel Map(CustomerEntity entity)
    {
        return new CustomerModel
        {
            Id =  entity.Id,
            Email = entity.Email,
            FullName = $"{entity.FirstName} {entity.LastName}",
            AccountNr =  entity.AccountNr,
            CreatedOn = entity.CreatedOnUtc,
            Phone =  entity.Phone,
            Status =  entity.Status,
        };
    }
}