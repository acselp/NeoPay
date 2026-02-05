using NeoPay.Domain.Entities;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Models.Address;
using NeoPay.Framework.Models.Shared;

namespace NeoPay.Framework.Mappers;

public class AddressMapper
{
    public AddressModel Map(AddressEntity address)
    {
        return new AddressModel
        {
            Id         = address.Id,
            Country    = address.Country,
            Region     = address.Region,
            City       = address.City,
            Street     = address.Street,
            House      = address.House,
            Entrance   = address.Entrance,
            Apartment  = address.Apartment,
            PostalCode = address.PostalCode,
            CustomerId = address.CustomerId
        };
    }

    public AddressEntity Map(CreateAddressModel address)
    {
        return new AddressEntity
        {
            Country    = address.Country,
            Region     = address.Region,
            City       = address.City,
            Street     = address.Street,
            House      = address.House,
            Entrance   = address.Entrance,
            Apartment  = address.Apartment,
            PostalCode = address.PostalCode,
            CustomerId = address.CustomerId
        };
    }

    public AddressEntity Map(UpdateAddressModel address)
    {
        return new AddressEntity
        {
            Id         = address.Id,
            Country    = address.Country,
            Region     = address.Region,
            City       = address.City,
            Street     = address.Street,
            House      = address.House,
            Entrance   = address.Entrance,
            Apartment  = address.Apartment,
            PostalCode = address.PostalCode,
            CustomerId = address.CustomerId
        };
    }

    public List<AddressModel> Map(IEnumerable<AddressEntity> addresses)
    {
        return addresses.Select(Map).ToList();
    }

    public PagedResultModel<AddressModel> Map(PagedList<AddressEntity> pagedList)
    {
        return new PagedResultModel<AddressModel>
        {
            Total     = pagedList.TotalCount,
            PageIndex = pagedList.PageIndex,
            PageSize  = pagedList.PageSize,
            Data      = pagedList.ToList().Select(x => Map(x)).ToList()
        };
    }
}