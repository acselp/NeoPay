using Microsoft.AspNetCore.Components.Web;

namespace NeoPay.Domain.Entities;

public class LanguageEntity : BaseEntity
{
    public string Code { get; set; } = null!;
    public string Title { get; set; } = null!;
    public int Status { get; set; } = 0;
}