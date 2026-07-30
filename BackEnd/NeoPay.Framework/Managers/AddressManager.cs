using NeoPay.Application.Service.Abstractions;
using NeoPay.Application.Shared.Result;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Address;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Validators;

namespace NeoPay.Framework.Managers;

public class AddressManager
{
    private readonly IAddressService             _addressService;
    private readonly AddressMapper               _addressMapper;
    private readonly CreateAddressModelValidator _createAddressModelValidator;
    private readonly UpdateAddressModelValidator _updateAddressModelValidator;

    public AddressManager(
        IAddressService             addressService,
        AddressMapper               addressMapper,
        CreateAddressModelValidator createAddressModelValidator,
        UpdateAddressModelValidator updateAddressModelValidator)
    {
        _addressService              = addressService;
        _addressMapper               = addressMapper;
        _createAddressModelValidator = createAddressModelValidator;
        _updateAddressModelValidator = updateAddressModelValidator;
    }

    public async Task<Result> Create(CreateAddressModel model)
    {
        var validation = await _createAddressModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _addressService.Create(_addressMapper.Map(model));
    }

    public async Task<Result> Update(UpdateAddressModel model)
    {
        var validation = await _updateAddressModelValidator.ValidateAsync(model);
        if (!validation.IsValid)
            return Result.Validation(validation.Errors.Select(it => it.ErrorMessage).ToList());

        return await _addressService.Update(_addressMapper.Map(model));
    }

    public async Task<Result> Delete(int id)
    {
        return await _addressService.Delete(id);
    }

    public async Task<ResultWithValue<PagedResultModel<AddressModel>>> GetAll(GetAddressFilterModel filterModel)
    {
        var filter = new PagedFilter
        {
            PageIndex = filterModel.PageIndex,
            PageSize  = filterModel.PageSize
        };

        var result = await _addressService.GetAll(filter);
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_addressMapper.Map(result.Value!));
    }

    public async Task<ResultWithValue<AddressModel>> GetById(int id)
    {
        var result = await _addressService.GetById(id);
        if (!result.IsSuccess)
            return Result.From(result.StatusCode, result.Errors);

        return Result.Success(_addressMapper.Map(result.Value!));
    }
}
