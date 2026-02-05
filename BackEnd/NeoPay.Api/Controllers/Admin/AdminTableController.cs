using Microsoft.AspNetCore.Mvc;
using NeoPay.Api.Controllers.Shared;
using NeoPay.Framework.Managers.AdminTable;
using NeoPay.Framework.Models.Shared.GridModels;

namespace NeoPay.Api.Controllers.Admin;

[Route("api/[controller]/[action]")]
public class AdminTableController : ApiBaseController
{
    private readonly AdminTableManager _adminTableManager;

    public AdminTableController(AdminTableManager adminTableManager)
    {
        _adminTableManager = adminTableManager;
    }

    [HttpPost]
    public async Task<IActionResult> Search([FromBody] GridCommand command)
    {
        var data = await _adminTableManager.Search(command);
        return Ok(data);
    }
}