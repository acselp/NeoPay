using NeoPay.Application.Repository;
using NeoPay.Domain.Entities;
using NeoPay.Framework.Managers.AdminTable.Abstractions;
using NeoPay.Framework.Models.Customer;

namespace NeoPay.Framework.Managers.AdminTable.Handlers;

public class CustomerTableHandler : AdminTableHandler<CustomerModel, CustomerEntity>
{
    public override    string                     Entity { get; set; } = "Customer";
    protected override IQueryable<CustomerEntity> Query  { get; set; }

    public CustomerTableHandler(ICustomerRepository repository, AdminTableService service) : base(service)
    {
        Query = repository.GetQuery();
    }

    public override Dictionary<string, string> ColumnMappings => new()
    {
        { nameof(CustomerModel.Id), nameof(CustomerEntity.Id) },
        { nameof(CustomerModel.FirstName), nameof(CustomerEntity.FirstName) },
        { nameof(CustomerModel.LastName), nameof(CustomerEntity.LastName) },
        { nameof(CustomerModel.Email), nameof(CustomerEntity.Email) },
        { nameof(CustomerModel.Phone), nameof(CustomerEntity.Phone) }
    };
}