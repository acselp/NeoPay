using FluentValidation;
using NeoPay.Application.Service;
using NeoPay.Domain.Exceptions;
using NeoPay.Domain.Paged;
using NeoPay.Framework.Mappers;
using NeoPay.Framework.Models.Shared;
using NeoPay.Framework.Models.Utility;
using NeoPay.Framework.Validators;

namespace NeoPay.Framework.Managers;

public class UtilityManager
{
    private readonly UtilityService              _utilityService;
    private readonly UtilityMapper               _utilityMapper;
    private readonly CreateUtilityModelValidator _createUtilityModelValidator;
    private readonly UpdateUtilityModelValidator _updateUtilityModelValidator;

    public UtilityManager(
        UtilityService              utilityService,
        UtilityMapper               utilityMapper,
        CreateUtilityModelValidator createUtilityModelValidator,
        UpdateUtilityModelValidator updateUtilityModelValidator)
    {
        _utilityService              = utilityService;
        _utilityMapper               = utilityMapper;
        _createUtilityModelValidator = createUtilityModelValidator;
        _updateUtilityModelValidator = updateUtilityModelValidator;
    }

    public async Task Create(CreateUtilityModel model)
    {
        await _createUtilityModelValidator.ValidateAndThrowAsync(model);
        await _utilityService.Create(_utilityMapper.Map(model));
    }

    public async Task Update(UpdateUtilityModel model)
    {
        await _updateUtilityModelValidator.ValidateAndThrowAsync(model);
        await _utilityService.Update(_utilityMapper.Map(model));
    }

    public async Task Delete(int id)
    {
        await _utilityService.Delete(id);
    }

    public async Task<PagedResultModel<UtilityModel>> GetAll(GetUtilityFilterModel filterModel)
    {
        var filter = new PagedFilter
        {
            PageIndex = filterModel.PageIndex,
            PageSize  = filterModel.PageSize
        };

        var pagedList = await _utilityService.GetAll(filter);
        return _utilityMapper.Map(pagedList);
    }

    public async Task<UtilityModel> GetById(int id)
    {
        var entity = await _utilityService.GetById(id);
        if (entity == null)
            throw new NotFoundException($"Utility with ID {id} not found");

        return _utilityMapper.Map(entity);
    }
}