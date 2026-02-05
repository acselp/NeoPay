using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Models.Customer;
using NeoPay.Framework.Models.Shared;

namespace NeoPay.Framework.Mappers;

public class CustomerMapper
{
    // Map Entity to Model (for responses)
    public CustomerModel Map(CustomerEntity customer)
    {
        return new CustomerModel
        {
            Id        = customer.Id,
            FirstName = customer.FirstName,
            LastName  = customer.LastName,
            Email     = customer.Email,
            Phone     = customer.Phone,
            AccountNr = customer.AccountNr
        };
    }

    // Map CreateModel to Entity (for creation)
    public CustomerEntity Map(CreateCustomerModel customer)
    {
        return new CustomerEntity
        {
            FirstName = customer.FirstName,
            LastName  = customer.LastName,
            Email     = customer.Email,
            Phone     = customer.Phone,
            AccountNr = customer.AccountNr
        };
    }

    // Map UpdateModel to Entity (for update)
    public CustomerEntity Map(UpdateCustomerModel customer)
    {
        return new CustomerEntity
        {
            Id        = customer.Id,
            FirstName = customer.FirstName,
            LastName  = customer.LastName,
            Email     = customer.Email,
            Phone     = customer.Phone,
            AccountNr = customer.AccountNr
        };
    }

    // Map list of Entities to list of Models
    public List<CustomerModel> Map(IEnumerable<CustomerEntity> customers)
    {
        return customers.Select(Map).ToList();
    }

    // Map PagedList to PagedResultModel
    public PagedResultModel<CustomerModel> Map(PagedList<CustomerEntity> pagedList)
    {
        return new PagedResultModel<CustomerModel>
        {
            Total     = pagedList.TotalCount,
            PageIndex = pagedList.PageIndex,
            PageSize  = pagedList.PageSize,
            Data      = pagedList.Select(x => Map(x)).ToList()
        };
    }
}