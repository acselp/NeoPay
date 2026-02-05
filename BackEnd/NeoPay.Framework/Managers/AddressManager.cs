using FluentValidation;
using NeoPay.Application.Service;
using NeoPay.Domain.Exceptions;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Address;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Validators;

namespace NeoPay.Framework.Managers;

public class AddressManager
{
    private readonly AddressService              _addressService;
    private readonly AddressMapper               _addressMapper;
    private readonly CreateAddressModelValidator _createAddressModelValidator;
    private readonly UpdateAddressModelValidator _updateAddressModelValidator;

    public AddressManager(
        AddressService              addressService,
        AddressMapper               addressMapper,
        CreateAddressModelValidator createAddressModelValidator,
        UpdateAddressModelValidator updateAddressModelValidator)
    {
        _addressService              = addressService;
        _addressMapper               = addressMapper;
        _createAddressModelValidator = createAddressModelValidator;
        _updateAddressModelValidator = updateAddressModelValidator;
    }

    public async Task Create(CreateAddressModel model)
    {
        await _createAddressModelValidator.ValidateAndThrowAsync(model);
        await _addressService.Create(_addressMapper.Map(model));
    }

    public async Task Update(UpdateAddressModel model)
    {
        await _updateAddressModelValidator.ValidateAndThrowAsync(model);
        await _addressService.Update(_addressMapper.Map(model));
    }

    public async Task Delete(int id)
    {
        await _addressService.Delete(id);
    }

    public async Task<PagedResultModel<AddressModel>> GetAll(GetAddressFilterModel filterModel)
    {
        var filter = new PagedFilter
        {
            PageIndex = filterModel.PageIndex,
            PageSize  = filterModel.PageSize
        };

        var pagedList = await _addressService.GetAll(filter);
        return _addressMapper.Map(pagedList);
    }

    public async Task<AddressModel> GetById(int id)
    {
        var entity = await _addressService.GetById(id);
        if (entity == null)
            throw new NotFoundException($"Address with ID {id} not found");

        return _addressMapper.Map(entity);
    }
}